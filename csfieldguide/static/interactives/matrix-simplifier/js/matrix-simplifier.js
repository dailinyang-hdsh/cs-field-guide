const dragula = require('./../../../../node_modules/dragula/dragula');
const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

m1 = mathjs.matrix([[1,0,0],[0,1,0],[0,0,1]]);
m2 = mathjs.matrix([[3,0,0],[0,3,0],[0,0,3]]);
m3 = mathjs.matrix([[1,0,0],[0,1,0],[0,0,1]]);

v1 = mathjs.matrix([[1], [0], [0]]);

var matrices = [m1, m2, m3];
var vectors = [v1];


var mjaxURL  = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe.js';
// load mathjax script
$.getScript(mjaxURL, function() {
    // mathjax successfully loaded, let it render
    showOutput();
});


$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
});


function addMatrix() {
  matrixArray = getMatrix();
  matrix = mathjs.matrix(matrixArray);
  matrices.push(matrix);
  matrixString = formatMatrix(matrixArray);
  $('#matrix-1').html(matrixString);
  showOutput();
}


function getMatrix() {
  row0 = [
    $('#matrix-row-0-col-0').val(),
    $('#matrix-row-0-col-1').val(),
    $('#matrix-row-0-col-2').val(),
  ];

  row1 = [
    $('#matrix-row-1-col-0').val(),
    $('#matrix-row-1-col-1').val(),
    $('#matrix-row-1-col-2').val(),
  ];

  row2 = [
    $('#matrix-row-2-col-0').val(),
    $('#matrix-row-2-col-1').val(),
    $('#matrix-row-2-col-2').val(),
  ];

  return [row0, row1, row2];
}


function formatMatrix(matrix) {
  row0 = vsprintf(ROW_TEMPLATE, matrix[0]);
  row1 = vsprintf(ROW_TEMPLATE, matrix[1]);
  row2 = vsprintf(ROW_TEMPLATE, matrix[2]);

  return sprintf(MATRIX_TEMPLATE, row0, row1, row2);
}


function addVector() {
  vectorArray = [
    [$('#vector-row-0').val()], 
    [$('#vector-row-1').val()], 
    [$('#vector-row-2').val()]
  ];
  vector = mathjs.matrix(vectorArray);
  vectors.push(vector);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorArray[0], vectorArray[1], vectorArray[2]);
  $('#vector-2').html(vectorString);
  showOutput();
}


/* Set the matrices to the default values */
function resetMatrices() {
  // reset to default values of matrices
  $('#matrix-row-0-col-0').val(1);
  $('#matrix-row-0-col-1').val(0);
  $('#matrix-row-0-col-2').val(0);

  $('#matrix-row-1-col-0').val(0);
  $('#matrix-row-1-col-1').val(1);
  $('#matrix-row-1-col-2').val(0);

  $('#matrix-row-2-col-0').val(0);
  $('#matrix-row-2-col-1').val(0);
  $('#matrix-row-2-col-2').val(1);

  $('#vector-row-0').val(1);
  $('#vector-row-1').val(0);
  $('#vector-row-2').val(0);
}


function showOutput() {
  var result = calculateOutput();
  var matrix = result[0];
  var vector = result[1];

  var vectorRows = matrixToArray(vector);
  var matrixRows = matrixToArray(matrix);
  matrixString = formatMatrix(matrixRows);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorRows[0], vectorRows[1], vectorRows[2]);

  $('#matrix-output').html(matrixString);
  $('#vector-output').html(vectorString);
  render();
}


function calculateOutput() {
  var matrixResult = mathjs.zeros(3, 3);
  var vectorResult = mathjs.zeros(3, 1);

  if (matrices.length == 1) {
    matrixResult = matrices[0];
  } else if (matrices.length > 1) {
    // 2 or more matrices
    matricesCopy = matrices; // copy list for recursive multiplying in place
    matrixResult = multiplyMatrices(matricesCopy);
  }

  if (vectors.length == 1) {
    vectorResult = vectors[0];
  } else if (vectors.length > 1) {
    // 2 or more vectors
    vectorsCopy = vectors; // copy list for recursive adding in place
    vectorResult = addVectors(vectorsCopy);
  }

  return [matrixResult, vectorResult];

}


function multiplyMatrices(m) {
  var multiply = true;
  while (multiply) {
    if (m.length == 2) {
      multiply = false;
      return mathjs.multiply(m[0], m[1]);
    } else {
      result = mathjs.multiply(m[0], m[1]);
      // remove the first matrix in array
      m.shift();
      // replace the new first element in array with result
      m[0] = result;
    }
  }
}


function addVectors(v) {
  var add = true;
  while (add) {
    if (v.length == 2) {
      add = false;
      return mathjs.add(v[0], v[1]);
    } else {
      result = mathjs.add(v[0], v[1]);
      v.shift();
      v[0] = result;
    }
  }
}


/**
 * Defines draging and button handlers
 */
$(function() {
  var matrix_list = $('.containers').toArray();
  var drake = dragula(matrix_list, {
    accepts: function(el, target, source, sibling) {
      // Don't allow dragging of vectors to matrices container and vice versa
      return target.parentNode.id === source.parentNode.id;
    }
  });
  drake.on('drag', function(el, source) {
    scrollable = false;
  });
  drake.on('drop', (matrix, target_container, source_container) => {
    // If an matrix is dragged on top of another matrix..
    if (target_container.children.length == 2) {
      swap(matrix, target_container, source_container);
    }
    scrollable = true;
  });
});


/**
  * Swaps the matrix in the target container and the matrix in the source container
  */
function swap(matrix, target_container, source_container) {
  // save the original matrix in target_container to a temp var
  temp = target_container.children[0];
  // matrix is original matrix in source_container. Swap the matrices.
  target_container.appendChild(matrix);
  source_container.appendChild(temp);
}


/**
 * Converts mathjs matrix to an Array
 */
function matrixToArray(matrix) {
  var matrixArray = [[], [], []];

  matrix.forEach(function (value, index, m) {
    i = index[0];
    j = index[1];
    matrixArray[i][j] = value;
  });

  return matrixArray;
}


function render() {
  // Request re-render
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  MathJax.Hub.Queue(
    function () {
      $('#matrix-1').removeClass('invisible');
      $('#matrix-2').removeClass('invisible');
      $('#matrix-3').removeClass('invisible');
      $('#vector-1').removeClass('invisible');
      $('#vector-2').removeClass('invisible');
      $('#output-container').removeClass('invisible');
  });
}
