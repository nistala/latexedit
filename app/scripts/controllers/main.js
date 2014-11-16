'use strict';

var symbollist = ['abs.png', 'acute.png', 'aleph.png', 'alpha.png', 'amalg.png', 'angle.png', 'approx.png', 'ast.png', 'asymp.png', 'average.png', 'backslash.png', 'bar.png', 'bars.png', 'beta.png', 'between.png', 'bigcap.png', 'bigcirc.png', 'bigcup.png', 'bigodot.png', 'bigoplus.png', 'bigotimes.png', 'bigsqcup.png', 'bigstar.png', 'bigtriangledown.png', 'bigtriangleup.png', 'biguplus.png', 'bigvee.png', 'bigwedge.png', 'binom.png', 'blacklozenge.png', 'blacksquare.png', 'blacktriangle.png', 'blacktriangledown.png', 'bold.png', 'bot.png', 'bowtie.png', 'Box.png', 'bra.png', 'braket.png', 'breve.png', 'bullet.png', 'cap.png', 'cdot.png', 'cdots.png', 'check.png', 'chi.png', 'circ.png', 'clubsuit.png', 'complement.png', 'complex.png', 'cong.png', 'coprod.png', 'cup.png', 'curl.png', 'curly.png', 'dagger.png', 'dashv.png', 'ddagger.png', 'ddot.png', 'ddots.png', 'degree.png', 'Delta.png', 'derivative.png', 'Diamond.png', 'diamondsuit.png', 'div.png', 'divergence.png', 'dot.png', 'doteq.png', 'Downarrow.png', 'ell.png', 'emptyset.png', 'epsilon.png', 'eq.png', 'equiv.png', 'eta.png', 'exists.png', 'exp.png', 'factorial.png', 'flat.png', 'forall.png', 'frac.png', 'frown.png', 'Gamma.png', 'geq.png', 'geqslant.png', 'gets.png', 'gg.png', 'grad.png', 'grave.png', 'greater.png', 'hamiltonian.png', 'hat.png', 'hbar.png', 'heartsuit.png', 'hermitian.png', 'hookleftarrow.png', 'hookrightarrow.png', 'Im.png', 'imath.png', 'in.png', 'index.html', 'infty.png', 'int.png', 'integers.png', 'integral.png', 'iota.png', 'jmath.png', 'Join.png', 'kappa.png', 'ket.png', 'lagrangian.png', 'Lambda.png', 'langle.png', 'laplacian.png', 'latexdb.txt', 'lceil.png', 'ldots.png', 'leadsto.png', 'Leftarrow.png', 'leftharpoondown.png', 'leftharpoonup.png', 'Leftrightarrow.png', 'leq.png', 'leqslant.png', 'less.png', 'lfloor.png', 'lhd.png', 'll.png', 'Longleftarrow.png', 'Longleftrightarrow.png', 'longmapsto.png', 'Longrightarrow.png', 'mapsto.png', 'mathring.png', 'matrix.png', 'matrixel.png', 'mho.png', 'mid.png', 'minus.png', 'models.png', 'mp.png', 'mu.png', 'nabla.png', 'natural.png', 'naturals.png', 'nearrow.png', 'neg.png', 'neq.png', 'ni.png', 'norm.png', 'nu.png', 'nwarrow.png', 'odot.png', 'oint.png', 'Omega.png', 'ominus.png', 'oplus.png', 'oslash.png', 'otimes.png', 'parallel.png', 'partial.png', 'partialder.png', 'percent.png', 'perp.png', 'Phi.png', 'Pi.png', 'plus.png', 'pm.png', 'prec.png', 'preceq.png', 'prime.png', 'prod.png', 'propto.png', 'Psi.png', 'quotient.png', 'rangle.png', 'rationals.png', 'rceil.png', 'Re.png', 'reals.png', 'rfloor.png', 'rhd.png', 'rho.png', 'Rightarrow.png', 'rightharpoondown.png', 'rightharpoonup.png', 'rightleftharpoons.png', 'root.png', 'searrow.png', 'section.png', 'setminus.png', 'sharp.png', 'Sigma.png', 'sim.png', 'simeq.png', 'smile.png', 'spadesuit.png', 'sqcap.png', 'sqcup.png', 'sqrt.png', 'sqsubset.png', 'sqsubseteq.png', 'sqsupset.png', 'sqsupseteq.png', 'star.png', 'subscript.png', 'subset.png', 'subseteq.png', 'succ.png', 'succeq.png', 'sum.png', 'supset.png', 'supseteq.png', 'surd.png', 'swarrow.png', 'tau.png', 'therefore.png', 'Theta.png', 'tilde.png', 'times.png', 'to.png', 'top.png', 'transpose.png', 'triangle.png', 'triangleleft.png', 'triangleq.png', 'triangleright.png', 'unlhd.png', 'unrhd.png', 'Uparrow.png', 'Updownarrow.png', 'uplus.png', 'Upsilon.png', 'varepsilon.png', 'varnothing.png', 'varphi.png', 'varpi.png', 'varpropto.png', 'varrho.png', 'varsigma.png', 'vartheta.png', 'vdash.png', 'vdots.png', 'vec.png', 'vee.png', 'wedge.png', 'widehat.png', 'widetilde.png', 'wp.png', 'wr.png', 'Xi.png', 'zeta.png'];

/**
 * Set interface in JS used for maintaing a list of unique values and return it in a list.
 * Provides all basic set methods such as add, remove, length, contains and toString.
 */
function Set() {
  this._obj = {};
}

Set.prototype.add = function (entry) {
  if (this._obj.hasOwnProperty(entry)) {
    this._obj[entry]++;
  } else {
    this._obj[entry] = 0;
  }
};

Set.prototype.contains = function (entry) {
  return this._obj.hasOwnProperty(entry);
};

Set.prototype.remove = function (entry) {
  if (this._obj.hasOwnProperty(entry)) {
    delete this._obj.entry;
  }
};

Set.prototype.length = function () {
  return Object.keys(this._obj).length;
};

Set.prototype.toArray = function (limit) {
  if (limit) {
    return Object.keys(this._obj).slice(0, limit);
  }
  return Object.keys(this._obj);
};

Set.prototype.toString = function () {
  console.log(this.toArray());
};


var formulaBoilerplate = ('\\documentclass[12pt]{article}\n' +
  '\\usepackage[utf8]{inputenc}\n' +
  '\\usepackage{amssymb,amsmath}\n' +
  '\\usepackage{color}\n' +
  '\\usepackage{amsfonts}\n' +
  '\\usepackage{amssymb}\n' +
  '\\usepackage{pst-plot}\n' +
  '\\begin{document}\n' +
  '\\pagestyle{empty}\n' +
  '\\begin{displaymath}\n' +
  '% Enter your formula here \n' +
  '\\sum_{i = 0}^{i = n} \\frac{i}{2}\n' +
  '% End formula \n' +
  '\\end{displaymath}\n' +
  '\\end{document}\n');

var assignmentBoilerPlate = ['\\documentclass[12pt]{article}',
  '\\usepackage[margin=1in]{geometry}',
  '\\usepackage{amsmath,amsthm,amssymb,amsfonts}',
  '\\newcommand{\\N}{\\mathbb{N}}',
  '\\newcommand{\\Z}{\\mathbb{Z}}',
  '',
  '\\newenvironment{problem}[2][Problem]{\\begin{trivlist}',
  '\\item[\\hskip \\labelsep {\\bfseries #1}\\hskip \\labelsep {\\bfseries #2.}]}{\\end{trivlist}}',
  '',
  '\\begin{document}',
  '',
  '',
  '\\title{Homework template}',
  '\\author{Author}',
  '\\maketitle',
  '',
  '\\begin{problem}{x.yz}',
  'Statement of problem goes here',
  '\\end{problem}',
  '',
  '\\begin{proof}',
  'Proof goes here. Repeat as needed',
  '\\end{proof}',
  '',
  '\\end{document}'].join('\n');

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, $location) {

    // Handle use case where route params are given.
    if ($routeParams.urlId && $routeParams.versionId) {
      $http.get('/getUrl/' + $routeParams.urlId + '/' + $routeParams.versionId)
      .success(function (response) {
        $scope.userinput = response.data;
      })
      .error(function (data, status, headers, config) {
        $scope.userinput = 'Error fectching data for this URL';
      });
    }

    $scope.isSaving = false;
    $scope.initOn = true;
    $scope.editorType = 'Empty';
    $scope.pending = false;
    $scope.error = false;
    $scope.folder = '';
    $scope.files = [];
    $scope.autocompleteVisible = false;
    $scope.selectedRow = -1;
    
    $scope.mappings = {};

    // Get all images for symlist and create a map for autocomplete.
    $http.get('/images/SYMLIST').success(function (contents) {
      contents = contents.split('\n');
      
      contents.forEach(function (entry) {
        if (entry.length === 1) {
          var curMap;
          if ($scope.mappings.hasOwnProperty(entry)) {
            curMap = $scope.mappings[entry];
          } else {
            curMap = new Set();
          }
          curMap.add(entry);
          $scope.mappings[entry] = curMap;
        } else {
          var curWord = '';
          for (var i = 0; i < entry.length; i++) {
            curWord += entry[i];

            var curMap;
            if ($scope.mappings.hasOwnProperty(curWord)) {
              curMap = $scope.mappings[curWord];
            } else {
              curMap = new Set();
            }
            
            curMap.add(entry);
            $scope.mappings[curWord] = curMap;
          }
        }
        
      });

      // Add mappings for words without backslash.
      for (var item in $scope.mappings) {
        if ($scope.mappings.hasOwnProperty(item)) {
          $scope.mappings[item.substring(1)] = $scope.mappings[item];
        }
      }

    });

    // Editor panel listener.
    $scope.$watch('editorType', function (newVal, oldVal) {
      if (newVal && newVal.toLowerCase() === 'formula') {
        $scope.userinput = formulaBoilerplate;
      } else if (newVal.toLowerCase() === 'assignment') {
        $scope.userinput = assignmentBoilerPlate;
      } else {
        $scope.userinput = '';
      }
    });

    /**
     * Refreshes the output in the latex panel.
     */
    $scope.refreshOutput = function () {
      $scope.pending = true;
      $scope.errorStr = '';
      $scope.showError = false;
      $scope.error = false;
      $scope.folder = '';
      $scope.files = [];
      var json = {
        data: jQuery('#inputarea').val()
      };
      $http({
        method: 'POST',
        url: '/translate',
        data: json
      }).success(function (data, status, headers, config) {
        $scope.pending = false;
        $scope.folder = data.folder;
        $scope.files = data.files;
      }).error(function (data, status, headers, config) {
        $scope.error = true;
        $scope.showError = true;
        $scope.errorStr = data;
        $scope.pending = false;
      });

      
    };

    /**
     * Handles event everytime input changes in input area.
     */
    $scope.inputChange = function () {
      $scope.selectedRow = -1;
      $scope.initOn = false;
      $scope.latexWords = [];
      var positionData = jQuery('#inputarea').getCursorPosition();
      var offset = jQuery('#inputarea').offset();
      var word = getLastWord(positionData.text);
      if (word.length) {
        if ($scope.mappings.hasOwnProperty(word)) {
          $scope.latexWords = $scope.mappings[word].toArray(10);
          $scope.autocompleteVisible = true;
        } else {
          $scope.autocompleteVisible = false;
        }
      } else {
        $scope.autocompleteVisible = false;
      }

      var topLength = offset.top + positionData.rows.length * 14 * 1.5;
      topLength *= 0.95;
      topLength += 10;
      
      jQuery('#autocomplete-div').css({
        top: topLength,
        left: positionData.left + 15
      });
    };
  
    /**
     * Handles clicking on a auto complete dropdown.
     */
    $scope.handleSelect = function (word) {
      enterWord(word);
    };

    /**
     * Sets selected for autocomplete.
     */
    $scope.setAutocompleteSelected = function (index) {
      $scope.selectedRow = index;
    };

    /**
     * Binds keyboard shortcuts for autocomplete to make it seem natural.
     */
    $scope.bindKey = function (e) {
      if (!$scope.autocompleteVisible) {
        return;
      }

      var keyCode = e.keyCode;
      var down = 40;
      var up = 38;
      var enter = 13;
      var escape = 27;

      if (keyCode === down) {
        
        e.preventDefault();
        if ($scope.selectedRow + 1 < jQuery('.autocomplete-word').length) {
          $scope.selectedRow++;  
        }
        return false;

      } else if (keyCode === up) {
        
        e.preventDefault();
        if ($scope.selectedRow - 1 >= -1) {
          $scope.selectedRow--;
        }
        return false;

      } else if (keyCode === enter) {
        if ($scope.selectedRow != -1) {
          // Add word as enter button was clicked.
          var txtToAdd = jQuery('.autocomplete-word.selected span').text();
          e.preventDefault();
          enterWord(txtToAdd);  
        }
        
      } else if (keyCode === escape) {
        resetAutocomplete()
      }

    };

    /**
     * Saves current session or rewrites new session to backend.
     */
    $scope.saveSession = function () {
      $scope.isSaving = true;
      var newUrl = $routeParams.urlId;
      if(!$routeParams.urlId) {
        newUrl = Math.random().toString(24).slice(2);
      }

      $http({
        url: '/saveSession',
        method: 'POST',
        data: {
          latex: $scope.userinput,
          url: newUrl
        }
      }).success(function (urlData) {
        $scope.isSaving = false;
        $location.path('/' + urlData.url + '/' + urlData.version);
      }).error(function (data, status, headers, config) {
        $scope.isSaving = false;
        alert('Problem saving session. Please try again later.');
      });
    };

    /**
     * Resets autocomplete back to default.
     */
    var resetAutocomplete = function () {
        $scope.latexWords = [];
        $scope.autocompleteVisible = false;
        $scope.selectedRow = 0;
    };

    /**
     * Enters word into text area at the correct position.
     */
    var enterWord = function (word) {
      if (!word) {
        resetAutocomplete();
        return;
      }

      // Get caret position inside text area.
      var caretPos = jQuery('#inputarea')[0].selectionStart;
      var textAreaTxt = jQuery('#inputarea').val();

      // Get last occuring word (one we are auto filling)
      var lastword = getLastWord(textAreaTxt.substring(0, caretPos));
      
      // Get begin location for last word.
      var begin = textAreaTxt.substring(0, caretPos - lastword.length);
      
      // Replace text with new text containing auto filled word.
      jQuery('#inputarea').val(begin + word + textAreaTxt.substring(caretPos));

      // Set cursor postion back to after inserted.
      jQuery('#inputarea').selectRange(caretPos - lastword.length + word.length);

      resetAutocomplete();
    };

    /**
     * Checks if image exists in symbol list.
     */
    $scope.imageExists = function (word) {
      return symbollist.indexOf(word.slice(1) + '.png') != -1;
    };

    /**
     * Gets image name.
     */
    $scope.getImg = function (imgLoc) {
      return imgLoc.replace(/\W/g, '');
    };

    /**
     * Gets the last word of the text area.
     */
    var getLastWord = function (text) {
      return text.split('\n').pop().split(' ').pop().trim();
    };
    
  });
