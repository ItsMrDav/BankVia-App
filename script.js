'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BankVia APP

// Data
const account1 = {
  owner: 'Davut Simsek',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////// SLICE METHOD returns new array

// let arr = [`a`, `b`, `c`, `d`, `e`];

// console.log(arr);
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));

// // Shallow Copy (either with slice() or with (...) operator)
// console.log(arr.slice());
// console.log([...arr]);

///////////////////////////////////////// SPLICE METHOD mutator, deletes array element
// console.log(arr.splice(4)); // removes all elements starting 2nd index
// console.log(arr);
// arr.splice(1, 2); // starting from index 1st delete 2 elements
// console.log(arr);
// arr.splice(-1); // removes last element
// console.log(arr);

///////////////////////////////////////// REVERSE METHOD mutator, reverses array
// const arr2 = [`e`, `d`, `c`, `b`, `a`];
// console.log(arr2);
// console.log(arr2.reverse());

///////////////////////////////////////// CONCAT METHOD returns new array, joins arrays
// const letters = arr.concat(arr2);
// // console.log(...arr, ...arr2); // another way to join arrays with ... operator
// console.log(letters);

///////////////////////////////////////// JOIN METHOD returns new STRING, joins array elements
// console.log(letters.join(` - `));

///////////////////////////////////////// AT METHOD returns an element, shows the element at the index
// const arr = [23, 11, 64];
// console.log(arr[0]); // finding with [] bracket notation
// console.log(arr.at(0));

// // Traditional ways to get the last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// // Modern way to get the last element
// console.log(arr.at(-1));

///////////////////////////////////////// FOR EACH METHOD loops the array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // Looping with for of loop
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// // Looping with forEach method (Cons of forEach: doesnt have break or continue statement)
// movements.forEach((mov, i, arr) => {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// forEach Method with MAPS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// forEach Method with SETS
const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`);
});
