'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BankVia APP

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// DATA
// const account1 = {
//   owner: 'Davut Simsek',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
//   type: `premium`,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
//   type: `standard`,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
//   type: `premium`,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
//   type: `basic`,
// };

// const accounts = [account1, account2, account3, account4];
const account1 = {
  owner: 'Davut Simsek',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// ELEMENTS
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
//////////////////////////////////////////////////// IMPLEMENT USER NAME CREATION
const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(name => name[0])
      .join(``);
  });
};
createUserNames(accounts);
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT UPDATE UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Calculate, display balance
  calcDisplayBalance(acc);
  // Calculate, display summary
  calcDisplaySummary(acc);
};
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// IMPLEMENT DISPLAY MOVEMENTS
const displayMovements = function (movements, sort = false) {
  // Using, innerHTML DOM>Element method, setting all HTML content
  containerMovements.innerHTML = ``;

  // Sorting movements logic
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // Using with forEach method, according to account movements, adding a html movement row
  movs.forEach((mov, i) => {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    }. ${type}</div>
      <div class="movements__value">${mov.toFixed(2)} €</div>
    </div>`;

    // Using, insertAdjacentHTML DOM>Element method, adding HTML content to parent
    // Choosing `afterbegin` option adds any new row after the last one
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT CALCULATING and DISPLAYING BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT CALCULATING DISPLAYING MOVEMENTS SUMMARY
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT USER LOGIN
// Login Button Event Handler
let currentAccount;
btnLogin.addEventListener(`click`, function (e) {
  // since its a form submit button, this prevents default(form from submitting)
  e.preventDefault();
  // if user matches with any account's username define current user
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // check if pin is equal to current user's pin
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and welcome message
    labelWelcome.textContent = `Good Afternoon, ${
      currentAccount.owner.split(` `)[0]
    }!`;
    containerApp.style.opacity = 1;
    // Clear user and pin input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();
    // UPDATE UI
    updateUI(currentAccount);
  }
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT TRANSFERS
// Transfor money button event handler
btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Clear transfer to and amount input fields
  inputTransferTo.value = inputTransferAmount.value = ``;
  // Check condition for transfering
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // UPDATE UI
    updateUI(currentAccount);
  }
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT GETTING LOAN
// Loan Button Event Handler
btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();
  // Store loan amount
  const amount = Math.floor(inputLoanAmount.value);
  // Check condition for loan
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add loan movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  // Clear loan input field
  inputLoanAmount.value = ``;
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT CLOSE ACCOUNT
// Close Account Button Event Handler
btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  // Check condition for deleting
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc === currentAccount);
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    // Clear close account name and pin input fields
    inputCloseUsername.value = inputClosePin.value = ``;
  }
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT MOVEMEMENT SORTING BUTTON
let sorted = false;
// Button Sort Event Handler
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// ARRAY GROPING(ES2024)
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const groupedMovements = Object.groupBy(movements, mov =>
//   mov > 0 ? `deposits` : `withdrawal`
// );
// console.log(groupedMovements);
// console.log(typeof groupedMovements);

// const groupedByActivity = Object.groupBy(accounts, account => {
//   const movementCount = account.movements.length;
//   if (movementCount >= 8) return `very active`;
//   if (movementCount >= 4) return `active`;
//   if (movementCount >= 1) return `moderate`;
//   return `inactive`;
// });
// console.log(groupedByActivity);

// const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
// console.log(groupedAccounts);
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// MORE WAYS CREATING AND FILLING ARRAYS
// // Empty arrays + fill method
// const arr = [1, 2, 3, 4, 5];
// console.log(new Array(1, 2, 3, 4, 5));

// const x = new Array(7);
// x.fill(1, 3, 5);
// console.log(x);
// console.log(arr.fill(23, 2, 4));
// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const aa = Array.from({ length: 10 }, () => Math.ceil(Math.random() * 100));
// console.log(aa);

// // Array from can be worked with DOM elements
// labelBalance.addEventListener(`click`, function (e) {
//   e.preventDefault();
//   const movementsUI = Array.from(
//     document.querySelectorAll(`.movements__value`),
//     el => Number(el.textContent.replace(`€`, ``))
//   );
//   console.log(movementsUI);

//   // Same thing with Array.from static method can be happen with spread operator
//   const movementsUI2 = [...document.querySelectorAll(`.movements__value`)].map(
//     el => Number(el.textContent.replace(`€`, ``))
//   );
//   console.log(movementsUI2);
// });
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////// NON-DESTRUCTIVE ALTERNATIVES: toSorted, toReversed, toSpliced, with
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// // toReversed
// const reversedMov = movements.toReversed();
// console.log(reversedMov);

// // with
// const newMovements = movements.with(1, 2000);
// console.log(newMovements);
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// SUMMARY OF ARRAY METHODS
// // 1.
// const bankDepositSum = accounts
//   .flatMap(mov => mov.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur);
// console.log(bankDepositSum);
// // 2.
// // const numDeposits1000 = accounts
// //   .flatMap(mov => mov.movements)
// //   .filter(mov => mov >= 1000).length;
// const numDeposits1000 = accounts
//   .flatMap(mov => mov.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(numDeposits1000);

// // Prefixed a ++ operator
// let a = 10;
// console.log(++a);
// console.log(a);
// // 3.
// const { deposits, withdrawals } = accounts
//   .flatMap(mov => mov.movements)
//   .reduce(
//     (sums, mov) => {
//       sums[mov > 0 ? `deposits` : `withdrawals`] += mov;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);
// // 3.1.
// const bankDepositSum1 = accounts.reduce((sum, acc) => {
//   return (
//     sum + acc.movements.reduce((acc, mov) => (mov > 0 ? acc + mov : acc), 0)
//   );
// }, 0);
// console.log(bankDepositSum1);
// // 3.2.
// const numDeposits10001 = accounts.reduce((count, cur) => {
//   return (
//     count +
//     cur.movements.reduce((count, cur) => (cur >= 1000 ? ++count : count), 0)
//   );
// }, 0);
// console.log(numDeposits10001);
// // 3.3.
// const { deposits1, withdrawals1 } = accounts.reduce(
//   (sums, acc) => {
//     return acc.movements.reduce((accSum, mov) => {
//       accSum[mov > 0 ? 'deposits1' : 'withdrawals1'] += mov;
//       return accSum;
//     }, sums);
//   },
//   { deposits1: 0, withdrawals1: 0 }
// );
// console.log(deposits1, withdrawals1);
// 4.
// const convertTitleCase = function (title) {
//   const capitilaze = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = [`a`, `an`, `and`, `the`, `but`, `or`, `on`, `in`, `with`];
//   const titleCase = title
//     .trim()
//     .toLowerCase()
//     .split(` `)
//     .map(word => (exceptions.includes(word) ? word : capitilaze(word)))
//     .join(` `);
//   return capitilaze(titleCase);
// };

// console.log(convertTitleCase(` this is a nice title`));
// console.log(convertTitleCase(`    this is a LONG title but not too long`));
// console.log(convertTitleCase(` and here is another title with an EXAMPLE   `));
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// NUMBERS
// console.log(23 === 23.0);
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(typeof Number(`23`));
// console.log(typeof +`23`);

// // Parsing (string has to be start with number otherwise wouldnt work)
// console.log(Number.parseInt(`30px`, 10));
// console.log(Number.parseInt(`e23`, 10));

// console.log(Number.parseInt(`  2.5rem`));
// // parseFloat is better way to get a number from a string
// console.log(Number.parseFloat(` 2.5rem`));

// // isNaN (Check if value is NaN)
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));

// // isFinite (BEST WAY to check if a value is a number)
// console.log(Number.isFinite(20));
// console.log(Number.isFinite(`20`));
// console.log(Number.isFinite(+`20X`));
// console.log(Number.isFinite(23 / 0));

// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// MATH
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, `23`, 11, 2));
// console.log(Math.max(5, 18, `23px`, 11, 2));

// console.log(Math.min(5, 18, 23, 11, 2));

// console.log(Math.PI * Number.parseFloat(`10px`) ** 2);

// console.log(Math.ceil(Math.random() * 6));

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
// console.log(randomInt(10, 20));
// console.log(randomInt(0, 3));

// Rounding Integers
// console.log(Math.trunc(23.3));

// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor(`23.9`));

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// Rounding Integers
// console.log((2.7).toFixed());
// console.log((2.7).toFixed(3));
// console.log((2.7212312).toFixed(3));
// console.log((2).toPrecision(3));

// console.log((3).toExponential(3));
