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
      <div class="movements__value">${mov} €</div>
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
  labelBalance.textContent = `${acc.balance} €`;
};
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// IMPLEMENT CALCULATING DISPLAYING MOVEMENTS SUMMARY
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
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
  const amount = +inputLoanAmount.value;
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
