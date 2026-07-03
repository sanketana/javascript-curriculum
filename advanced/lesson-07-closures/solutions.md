# Session 7 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — A greeter that remembers

```js
const makeGreeter = (greeting) => {
  return (name) => `${greeting}, ${name}!`;
};

const hi = makeGreeter("Hello");
console.log(hi("Sam"));    // "Hello, Sam!"
console.log(hi("Aria"));   // "Hello, Aria!"
```

`makeGreeter` finished the instant it returned, but the returned function packed `greeting` in its backpack, so both calls still know it's `"Hello"`.

## Task 2 — A multiplier factory

```js
const makeMultiplier = (factor) => {
  return (n) => n * factor;
};

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(double(5), triple(5));   // 10 15
```

`double` and `triple` came from the same factory but hold different `factor` values in separate backpacks — they never interfere.

## Task 3 — Private state (a mini bank)

```js
const makeAccount = (start) => {
  let balance = start;                    // private
  return {
    deposit: (amount) => { balance = balance + amount; return balance; },
    balance: () => balance,
  };
};

const acc = makeAccount(100);
acc.deposit(50);
console.log(acc.balance());   // 150
```

The money — the `balance` variable — is sealed inside the closure; `balance()` is just a *function* that reads it. The only way to change the money is `deposit`. Try `acc.balance = 999`: all you've done is overwrite the *method* with a number, so calling `acc.balance()` now throws (a number isn't a function). The real, private `balance` is still 150, completely untouched — you never had a way to reach it.

## Task 4 — Bug hunt

The fault: `let count = 0` lives *inside the returned function*, so it re-creates `count` as 0 on every single call.

```js
const makeBrokenCounter = () => {
  return () => {
    let count = 0;      // runs EVERY call → always resets to 0
    count = count + 1;
    return count;
  };
};
```

Fix: move `count` up into the outer function, so it's created *once* and then remembered:

```js
const makeCounter = () => {
  let count = 0;        // runs ONCE, when the factory is called
  return () => {
    count = count + 1;
    return count;
  };
};

const c = makeCounter();
console.log(c(), c(), c());   // 1 2 3
```

The rule to keep: **the remembered variable lives in the outer (factory) function, not in the one you hand back.**

## Stretch — withdraw with a floor

```js
const makeAccount = (start) => {
  let balance = start;
  return {
    deposit: (amount) => { balance = balance + amount; return balance; },
    withdraw: (amount) => {
      if (amount > balance) {
        console.log("Not enough funds.");
        return balance;                   // unchanged
      }
      balance = balance - amount;
      return balance;
    },
    balance: () => balance,
  };
};

const acc = makeAccount(100);
acc.withdraw(30);    // 70
acc.withdraw(500);   // "Not enough funds." → still 70
console.log(acc.balance());   // 70
```

`withdraw` is a new public door onto the same private `balance`. The guard lives inside, where nothing outside can bypass it.
