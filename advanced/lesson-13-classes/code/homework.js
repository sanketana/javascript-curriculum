// Session 13 Homework — ES6 classes
// Open homework.html with Live Server, then open the console (F12) to check your work.

// --- Task 1: your first class ---
// Write a Dog class with a constructor that takes a name, and a speak() method
// that returns `${this.name} says woof`. Make a dog and log dog.speak().
// class Dog { ... }
// const rex = new Dog("Rex");
// console.log(rex.speak());   // "Rex says woof"


// --- Task 2: a class with data + behaviour ---
// Write a BankAccount class:
//   - constructor takes a starting balance and stores it in this.balance
//   - deposit(amount) adds to the balance
//   - withdraw(amount) subtracts, but refuses (and logs "Not enough") if the
//     amount is more than the balance
// Test: make an account with 100, deposit 50, withdraw 30, log the balance (120).
// class BankAccount { ... }


// --- Task 3: many instances ---
// Make TWO separate BankAccount objects and confirm they don't share a balance:
// deposit into one and check the other is unchanged.


// --- Task 4: Bug hunt ---
// This Player class is meant to greet by name, but greet() returns "Hi undefined".
// The constructor forgot one thing. Find and fix it.
class Player {
  constructor(name) {
    name = name;          // this line does nothing useful — what's missing?
  }
  greet() {
    return "Hi " + this.name;
  }
}
const p = new Player("Sam");
console.log(p.greet());   // "Hi undefined" — should be "Hi Sam"
