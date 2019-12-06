/*
--- Day 2: 1202 Program Alarm ---
On the way to your gravity assist around the Moon, your ship computer beeps angrily about a "1202 program alarm". On the radio, an Elf is already explaining how to handle the situation: "Don't worry, that's perfectly norma--" The ship computer bursts into flames.

You notify the Elves that the computer's magic smoke seems to have escaped. "That computer ran Intcode programs like the gravity assist program it was working on; surely there are enough spare parts up there to build a new Intcode computer!"

An Intcode program is a list of integers separated by commas (like 1,0,0,3,99). To run one, start by looking at the first integer (called position 0). Here, you will find an opcode - either 1, 2, or 99. The opcode indicates what to do; for example, 99 means that the program is finished and should immediately halt. Encountering an unknown opcode means something went wrong.

Opcode 1 adds together numbers read from two positions and stores the result in a third position. The three integers immediately after the opcode tell you these three positions - the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.

For example, if your Intcode computer encounters 1,10,20,30, it should read the values at positions 10 and 20, add those values, and then overwrite the value at position 30 with their sum.

Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them. Again, the three integers after the opcode indicate where the inputs and outputs are, not their values.

Once you're done processing an opcode, move to the next one by stepping forward 4 positions.

For example, suppose you have the following program:

1,9,10,3,2,3,11,0,99,30,40,50
For the purposes of illustration, here is the same program split into multiple lines:

1,9,10,3,
2,3,11,0,
99,
30,40,50
The first four integers, 1,9,10,3, are at positions 0, 1, 2, and 3. Together, they represent the first opcode (1, addition), the positions of the two inputs (9 and 10), and the position of the output (3). To handle this opcode, you first need to get the values at the input positions: position 9 contains 30, and position 10 contains 40. Add these numbers together to get 70. Then, store this value at the output position; here, the output position (3) is at position 3, so it overwrites itself. Afterward, the program looks like this:

1,9,10,70,
2,3,11,0,
99,
30,40,50
Step forward 4 positions to reach the next opcode, 2. This opcode works just like the previous, but it multiplies instead of adding. The inputs are at positions 3 and 11; these positions contain 70 and 50 respectively. Multiplying these produces 3500; this is stored at position 0:

3500,9,10,70,
2,3,11,0,
99,
30,40,50
Stepping forward 4 more positions arrives at opcode 99, halting the program.

Here are the initial and final states of a few more small programs:

1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.
Once you have a working computer, the first step is to restore the gravity assist program (your puzzle input) to the "1202 program alarm" state it had just before the last computer caught fire. To do this, before running the program, replace position 1 with the value 12 and replace position 2 with the value 2. What value is left at position 0 after the program halts?
*/

const testInput = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];

const actualInput = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  10,
  19,
  1,
  19,
  6,
  23,
  2,
  23,
  13,
  27,
  1,
  27,
  5,
  31,
  2,
  31,
  10,
  35,
  1,
  9,
  35,
  39,
  1,
  39,
  9,
  43,
  2,
  9,
  43,
  47,
  1,
  5,
  47,
  51,
  2,
  13,
  51,
  55,
  1,
  55,
  9,
  59,
  2,
  6,
  59,
  63,
  1,
  63,
  5,
  67,
  1,
  10,
  67,
  71,
  1,
  71,
  10,
  75,
  2,
  75,
  13,
  79,
  2,
  79,
  13,
  83,
  1,
  5,
  83,
  87,
  1,
  87,
  6,
  91,
  2,
  91,
  13,
  95,
  1,
  5,
  95,
  99,
  1,
  99,
  2,
  103,
  1,
  103,
  6,
  0,
  99,
  2,
  14,
  0,
  0
];
// console.log(input);
// return;

const ADD = 1;
const MULTIPLY = 2;
const QUIT = 3;
const shouldAdd = optCode => optCode === 1;
const shouldMultiply = optCode => optCode === 2;
const shouldQuit = optCode => optCode === 99;

const mathFuncAdd = (a, b) => a + b;
const mathFuncMultiply = (a, b) => a * b;

let index = 0;

function getNextCommand(input, index) {
  return input.slice(index, index + 4);
}

function performOperation(input, positionA, positionB, mathFunc) {
  console.log("A: ", input[positionA]);
  console.log("B: ", input[positionB]);
  return mathFunc(input[positionA], input[positionB]);
}

// const replaceValueAt = (position, value) => {
//   input[position] = value;
// };

function processOneCommand(input, command) {
  console.log(command);
  const action = command[0];
  const positionA = command[1];
  const positionB = command[2];
  const destination = command[3];
  let exitCode = 0;
  console.log("\nCommand: ", command);

  if (action === ADD) {
    const value = performOperation(positionA, positionB, mathFuncAdd);
    console.log("Replacing destination ", destination);
    console.log("With New value: ", value);
    input[destination] = value;
    exitCode = 0;
    // replaceValueAt(destination, value);
  } else if (action === MULTIPLY) {
    const value = performOperation(positionA, positionB, mathFuncMultiply);
    console.log("New value: ", value);
    input[destination] = value;
    exitCode = 0;
    // replaceValueAt(destination, value);
  } else if (action === QUIT) {
    // shouldContinue = false;
    exitCode = 1;
  } else {
    // unknown
    // shouldContinue = false;
    exitCode = 2;
  }
  return shouldContinue;
}

function processCommandArray(input, commands) {
  const inputCopy = input.slice();
  let exitCode = 0;
  while (index < input.length && exitCode === 0) {
    const command = getNextCommand(index);
    exitCode = processOneCommand(command);
    index += 4;
  }
  console.log(input);
}

// console.log(input);
// return;

// console.log(getNextCommand(index));
// const command1 = getNextCommand(index);

// processCommand(command1);
// index += 1;
// console.log(getNextCommand(index));
