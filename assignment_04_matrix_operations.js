// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols) {
  const matrix = [];
  for (let r = 0; r < rows; r++) {
	const line = readlineSync.question(`Enter row ${r + 1}: `).trim();
	const values = line.split(' ').map(Number);
	if (values.length !== cols) {
	  console.log(`Error: expected ${cols} values on the row.`);
	  return null;
	}
	matrix.push(values);
  }
  return matrix;
}

function printMatrix(matrix) {
  for (let r = 0; r < matrix.length; r++) {
	console.log(matrix[r].join('  '));
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
  for (let c = 0; c < cols; c++) {
	const row = [];
	for (let r = 0; r < rows; r++) row.push(matrix[r][c]);
	result.push(row);
  }
  return result;
}

function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];
  for (let r = 0; r < rows; r++) {
	const row = [];
	for (let c = 0; c < cols; c++) {
	  row.push(a[r][c] + b[r][c]);
	}
	result.push(row);
  }
  return result;
}

function multiplyMatrices(a, b) {
  const m = a.length; // rows of A
  const n = a[0].length; // cols of A = rows of B
  const p = b[0].length; // cols of B
  const result = [];
  for (let i = 0; i < m; i++) {
	const row = [];
	for (let j = 0; j < p; j++) {
	  let sum = 0;
	  for (let k = 0; k < n; k++) sum += a[i][k] * b[k][j];
	  row.push(sum);
	}
	result.push(row);
  }
  return result;
}

function partA() {
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');
  const m = readMatrix(rows, cols);
  if (!m) return;
  console.log('\nOriginal Matrix:');
  printMatrix(m);
  console.log('\nTransposed Matrix:');
  printMatrix(transposeMatrix(m));
}

function partB() {
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');
  console.log('Matrix A:');
  const a = readMatrix(rows, cols);
  if (!a) return;
  console.log('Matrix B:');
  const b = readMatrix(rows, cols);
  if (!b) return;
  console.log('\nA + B =');
  printMatrix(addMatrices(a, b));
}

function partC() {
  const m = readlineSync.questionInt('Enter number of rows for matrix A: ');
  const n = readlineSync.questionInt('Enter number of columns for matrix A (and rows for B): ');
  const p = readlineSync.questionInt('Enter number of columns for matrix B: ');
  console.log('Matrix A:');
  const a = readMatrix(m, n);
  if (!a) return;
  console.log('Matrix B:');
  const b = readMatrix(n, p);
  if (!b) return;
  console.log('\nA x B =');
  printMatrix(multiplyMatrices(a, b));
}

function main() {
  console.log('Choose part to run:\n1) Transpose\n2) Add\n3) Multiply');
  const choice = readlineSync.questionInt('Select (1-3): ');
  if (choice === 1) partA();
  else if (choice === 2) partB();
  else if (choice === 3) partC();
  else console.log('Invalid choice.');
}

if (require.main === module) main();
