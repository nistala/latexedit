var express = require('express');
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var rmdir = require('rimraf');
var app = express();
var passport = require('passport');
var Authentication = require('./authentication');

// Parse data and init.
var Parse = require('parse').Parse;
Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_APP_KEY);
var UrlEntry = Parse.Object.extend("UrlEntry");
var query = new Parse.Query(UrlEntry);

var DEST_FOLDER = __dirname + '/../app/images/output/';

app.use(express.logger('dev'));

// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

app.use(express.cookieParser());
app.use(express.session({ secret: 'i am not telling you' }));
app.use(express.bodyParser());

// Add csrf support
// app.use(express.csrf({value: Authentication.csrf}));
app.use(function(req, res, next) {
   res.cookie('XSRF-TOKEN', req.session._csrf);
   next();
});

// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(Authentication.localStrategy);
passport.serializeUser(Authentication.serializeUser);
passport.deserializeUser(Authentication.deserializeUser);

app.post('/login', Authentication.login);
app.get('/logout', Authentication.logout);

app.get('/user', Authentication.ensureAuthenticated, function(req, res, next) {
  return res.json(req.session.user);
});

/**
 * API to get data from a URL based on URL ID and version ID.
 */
app.get('/getUrl/:urlId/:versionId', function (req, res, next) {

  // Check version id first.
  if (isNaN(req.params.versionId)) {
    res.status(500).send('Incorrect version id sent.');
  }

  var urlId = req.params.urlId;
  var versionId = parseInt(req.params.versionId);
  query.equalTo('url', urlId);
  query.equalTo('version', versionId);
  query.find({
    success: function (result) {
      if (result.length) {
        res.send(result[0]);
      } else {
        res.status(500).send('There seems to be a problem with the URL.');
      }
    },
    error: function (object, error) {
      res.status(500).send('Could not find URL');
    }
  });
});

app.post('/saveSession', function (req, res, next) {
  if (!req.body.latex || !req.body.url) {
    var errrr = 'no data specified in request';
    console.error(errrr);
    res.status(400).send(errrr);
    return;
  }

  var latex = req.body.latex;
  var version = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  var url = req.body.url;

  var urlEntry = new UrlEntry({
    data: latex,
    version: version,
    url: url
  });
  urlEntry.save(null, {

    success: function (urlEntry) {
      res.send(urlEntry);
    },
    error: function (urlEntry, error) {
      res.status(500).send('Problem saving session.')
    }
  });
});

app.post('/getpdf', function (req, res, next) {
  if (!('data' in req.body)) {
    var errrr = 'no data specified in request';
    console.error(errrr);
    res.status(400).send(errrr);
    return;
  }

  var data = req.body.data;
  var fileName = uuid.v4();
  var fileDir = '/var/tmp/' + fileName;
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
    fs.mkdirSync(fileDir + '/output');
  } else {
    console.error('Hash directory exists, somethings not right!');
    res.status(500).send("Something's not right");
    cleanUp(fileDir);
    return;
  }

  var insideFile = fileDir + '/' + fileName;
  fs.writeFile(insideFile, data, function (err) {
    if (err) {
      console.error('couldnt write file for data ' + data);
      res.status(500).send(err);
      cleanUp(fileDir);
      return;
    }

    exec('pdflatex -output-directory='+fileDir + ' ' + insideFile, {
      timeout: 5000
    }, function (err) {
      if (err) {
        console.error('Could not convert to pdf ' + err);
        res.status(500).send('Could not convert to pdf');
        cleanUp(fileDir);
        return;
      }
      var pdfName = insideFile + '.pdf';
      res.download(pdfName, 'download.pdf', function (err) {
        cleanUp(fileDir);
      });
    });
  });
});

app.post('/translate', function (req, res, next) {
  if (!('data' in req.body)) {
    var errrr = 'no data specified in request';
    console.error(errrr);
    res.status(400).send(errrr);
    return;
  }

  var data = req.body.data;
  var fileName = uuid.v4();
  var fileDir = '/var/tmp/' + fileName;
  var targetFolder = DEST_FOLDER + fileName;
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
    fs.mkdirSync(fileDir + '/output');
    fs.mkdirSync(targetFolder);
  } else {
    console.error('Hash directory exists, somethings not right!');
    res.status(500).send("Something's not right");
    cleanUp(fileDir);
    cleanUp(targetFolder);
    return;
  }

  var insideFile = fileDir + '/' + fileName;
  fs.writeFile(insideFile, data, function (err) {
    if (err) {
      console.error('couldnt write file for data ' + data);
      res.status(500).send(err);
      cleanUp(fileDir);
      cleanUp(targetFolder);
      return;
    }


    exec('latex -output-directory=' + fileDir + ' ' + insideFile, {
      timeout: 5000
    }, function (serr, sout, sterr) {
      if(serr || sterr) {
        console.error("latex error", serr, sterr);
        var errStr = sterr ? sterr : serr;
        res.status(500).send(sout);
        cleanUp(fileDir);
        cleanUp(targetFolder);
        return;
      }

      exec('dvipng -o ' + fileDir + '/output/' + fileName + '%d.png ' + insideFile + '.dvi',
        {timeout: 5000}, function (derr, dout, dterr) {
        if(derr) {
          var errStr = derr ? derr : dterr;
          console.error("png error", derr, dterr);
          res.status(500).send(errStr);
          cleanUp(fileDir);
          cleanUp(targetFolder);
          return;
        }


        ncp(fileDir + '/output', targetFolder, function (terr) {
          if (terr) {
            console.error('Error copying to ', targetFolder, terr);
            res.status(500).send(terr);
            cleanUp(fileDir);
            cleanUp(targetFolder);
            return;
          }

          fs.readdir(targetFolder, function (ferr, files) {
            if (ferr) {
              console.error('Could not read files after copying.'. ferr);
              res.status(500).send(ferr);
              cleanUp(fileDir);
              cleanUp(targetFolder);
              return;
            }

            res.send({
              folder: fileName,
              files: files
            });
            cleanUp(fileDir);

          });
        });
      });
    });
  });
});

function cleanUp (fileDir) {
  //Clean up.
  rmdir(fileDir, function (rerr) {
    if (rerr) {
      console.error("file removal error", rerr);
    }
  });
}

module.exports = app;