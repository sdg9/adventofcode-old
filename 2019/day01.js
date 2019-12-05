// https://adventofcode.com/2019/day/1

/*
--- Day 1: The Tyranny of the Rocket Equation ---
Santa has become stranded at the edge of the Solar System while delivering presents to other planets! To accurately calculate his position in space, safely align his warp drive, and return to Earth in time to save Christmas, he needs you to bring him measurements from fifty stars.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

The Elves quickly load you into a spacecraft and prepare to launch.

At the first Go / No Go poll, every Elf is Go until the Fuel Counter-Upper. They haven't determined the amount of fuel required yet.

Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

For example:

For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
For a mass of 1969, the fuel required is 654.
For a mass of 100756, the fuel required is 33583.
The Fuel Counter-Upper needs to know the total fuel requirement. To find it, individually calculate the fuel needed for the mass of each module (your puzzle input), then add together all the fuel values.

What is the sum of the fuel requirements for all of the modules on your spacecraft?
*/

var assert = require("assert");

const input2 = [12, 14];
const input = [
  93912,
  138996,
  112824,
  110011,
  139024,
  132292,
  74029,
  81664,
  138077,
  109614,
  121056,
  136338,
  132771,
  86611,
  131526,
  123101,
  61315,
  93900,
  62070,
  97957,
  67168,
  119464,
  119066,
  111076,
  56856,
  144203,
  109400,
  120187,
  57915,
  143353,
  71308,
  67695,
  141275,
  106552,
  136209,
  86990,
  98969,
  57207,
  99103,
  71940,
  63145,
  91765,
  121095,
  139700,
  128851,
  77138,
  66712,
  91318,
  96924,
  132235,
  99897,
  67479,
  87996,
  121100,
  55411,
  61715,
  130658,
  121030,
  141445,
  83939,
  90402,
  121107,
  59618,
  120112,
  58140,
  103514,
  90538,
  55552,
  142739,
  61770,
  147374,
  80038,
  128830,
  93328,
  52369,
  71801,
  144536,
  147140,
  118213,
  128056,
  92155,
  114384,
  89234,
  124451,
  94214,
  79174,
  108427,
  111041,
  96715,
  128414,
  62521,
  93897,
  107428,
  90637,
  126176,
  78676,
  69504,
  93663,
  80869,
  124230
];

// input.forEach();

function getFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

// console.log(getFuel(12));
// console.log(getFuel(14));
// console.log(getFuel(1969));
// console.log(getFuel(100756));

assert(getFuel(12) === 2);
assert(getFuel(14) === 2);
assert(getFuel(1969) === 654);
assert(getFuel(100756) === 33583);

const output = input.reduce(
  (previousValue, currentValue) => previousValue + getFuel(currentValue),
  0
);

// let output2 = 0;
// input.forEach(mass => {
//   output2 += getFuel(mass);
// });

console.log("Output Part 1: ", output);
// console.log("Output Part 1: ", output2);
// console.log("Output Part 1 Short: ", output2);

/*
--- Part Two ---
During the second Go / No Go poll, the Elf in charge of the Rocket Equation Double-Checker stops the launch sequence. Apparently, you forgot to include additional fuel for the fuel you just added.

Fuel itself requires fuel just like a module - take its mass, divide by three, round down, and subtract 2. However, that fuel also requires fuel, and that fuel requires fuel, and so on. Any mass that would require negative fuel should instead be treated as if it requires zero fuel; the remaining mass, if any, is instead handled by wishing really hard, which has no mass and is outside the scope of this calculation.

So, for each module mass, calculate its fuel and add it to the total. Then, treat the fuel amount you just calculated as the input mass and repeat the process, continuing until a fuel requirement is zero or negative. For example:

A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2 divided by 3 and rounded down is 0, which would call for a negative fuel), so the total fuel required is still just 2.
At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires 216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires 21 fuel, which requires 5 fuel, which requires no further fuel. So, the total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 = 966.
The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.
What is the sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel? (Calculate the fuel requirements for each module separately, then add them all up at the end.)
*/

function getFuelRecursive(mass) {
  let fuel = getFuel(mass);
  if (fuel > 0) {
    return fuel + getFuelRecursive(fuel);
  } else {
    return 0;
  }
}

assert(getFuelRecursive(14) === 2);
assert(getFuelRecursive(1969) === 966);
assert(getFuelRecursive(100756) === 50346);

// console.log("Output Part 2: ", output2);
const output2 = input.reduce(
  (previousValue, currentValue) =>
    previousValue + getFuelRecursive(currentValue),
  0
);
console.log("Output Part 2: ", output2);
