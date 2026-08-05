// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readlineSync = require('readline-sync');

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('DIV_ZERO');
  return a / b;
}
function modulus(a, b) { return a % b; }
function exponent(a, b) { return a ** b; }

function getTwoNumbers() {
  const a = Number(readlineSync.question('Enter first number : '));
  const b = Number(readlineSync.question('Enter second number: '));
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return [a, b];
}

function main() {
  while (true) {
	console.log('\n============================\n     SIMPLE CALCULATOR\n============================');
	console.log('1. Addition\n2. Subtraction\n3. Multiplication\n4. Division\n5. Modulus\n6. Exponentiation\n7. Quit');
	const choice = readlineSync.questionInt('Select an operation (1-7): ');
	if (choice === 7) { console.log('Goodbye!'); break; }
	const nums = getTwoNumbers();
	if (!nums) { console.log('Error: invalid number(s).'); continue; }
	const [a, b] = nums;
	try {
	  let result;
	  switch (choice) {
		case 1: result = add(a, b); break;
		case 2: result = subtract(a, b); break;
		case 3: result = multiply(a, b); break;
		case 4: result = divide(a, b); break;
		case 5: result = modulus(a, b); break;
		case 6: result = exponent(a, b); break;
		default:
		  console.log('Invalid choice.');
		  continue;
	  }
	  console.log(`Result: ${a} ${choice === 1 ? '+' : choice === 2 ? '-' : choice === 3 ? '*' : choice === 4 ? '/' : choice === 5 ? '%' : '**'} ${b} = ${Number.isFinite(result) ? result.toFixed(2) : result}`);
	} catch (err) {
	  if (err.message === 'DIV_ZERO') console.log('Error: Cannot divide by zero.');
	  else console.log('Error:', err.message);
	}
  }
}

if (require.main === module) main();
