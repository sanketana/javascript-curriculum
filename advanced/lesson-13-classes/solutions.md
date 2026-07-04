# Session 13 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — Your first class

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} says woof`;
  }
}

const rex = new Dog("Rex");
console.log(rex.speak());   // "Rex says woof"
```

The constructor saves the name onto the instance with `this.name = name`, and `speak` reads it back with `this.name`.

## Task 2 — A class with data + behaviour

```js
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  deposit(amount) {
    this.balance = this.balance + amount;
  }
  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Not enough");
      return;
    }
    this.balance = this.balance - amount;
  }
}

const acc = new BankAccount(100);
acc.deposit(50);    // 150
acc.withdraw(30);   // 120
console.log(acc.balance);   // 120
acc.withdraw(999);  // "Not enough" — balance stays 120
```

The data (`balance`) and the behaviour (`deposit`/`withdraw`) live together on the object. Note the contrast with Session 7: closures *hid* the balance completely; a class keeps it on `this.balance`, which is readable — classes trade some privacy for a clearer, reusable shape. (There are ways to make class fields private too, but that's beyond today.)

## Task 3 — Many instances

```js
const a = new BankAccount(100);
const b = new BankAccount(100);

a.deposit(50);
console.log(a.balance);   // 150
console.log(b.balance);   // 100 — completely unaffected
```

Each `new` builds a separate object with its own `balance`. Changing `a` never touches `b`.

## Task 4 — Bug hunt

`name = name` assigns the parameter back to itself — nothing is stored on the object, so `this.name` is `undefined` later:

```js
class Player {
  constructor(name) {
    name = name;          // stores nothing on the instance
  }
  greet() {
    return "Hi " + this.name;
  }
}
```

Fix — write it onto `this`:

```js
class Player {
  constructor(name) {
    this.name = name;     // now the name lives on the instance
  }
  greet() {
    return "Hi " + this.name;
  }
}

const p = new Player("Sam");
console.log(p.greet());   // "Hi Sam"
```

The rule: anything you want the object to remember must be assigned to `this.` in the constructor.

## Stretch — a Timer class

```js
class Timer {
  constructor(seconds) {
    this.seconds = seconds;
  }
  tick() {
    if (this.seconds > 0) {
      this.seconds = this.seconds - 1;
    }
  }
  isDone() {
    return this.seconds === 0;
  }
}

const t = new Timer(3);
t.tick();   // 2
t.tick();   // 1
t.tick();   // 0
console.log(t.isDone());   // true
t.tick();   // stays 0 (guarded)
console.log(t.seconds);    // 0
```

`tick` guards against going below zero, and `isDone` reports on the instance's own `seconds`. Same data-plus-behaviour bundle as the quiz's classes, in miniature.
