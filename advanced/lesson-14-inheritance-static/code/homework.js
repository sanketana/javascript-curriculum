// Session 14 Homework — instances, static, inheritance
// Open homework.html with Live Server, then open the console (F12) to check your work.

// A base class to build on:
class Animal {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `${this.name} is a ${this.sound()} animal`;
  }
  sound() {
    return "silent";
  }
}

// --- Task 1: inheritance with super ---
// Write a Dog class that extends Animal. Its constructor takes a name and passes
// it up with super(name). Override sound() to return "woof". Then log
// new Dog("Rex").describe() — you should get "Rex is a woof animal".
// class Dog extends Animal { ... }
// console.log(new Dog("Rex").describe());


// --- Task 2: another subclass ---
// Write a Cat class the same way, whose sound() returns "meow".
// Confirm new Cat("Milo").describe() gives "Milo is a meow animal".
// The describe() method is inherited — you only change sound().


// --- Task 3: a static method ---
// Add a static method Animal.chorus(animals) that returns all their sounds joined
// with " + ". Call it on the CLASS with a mix of dogs and cats.
// Example: Animal.chorus([new Dog("R"), new Cat("M")]) → "woof + meow"
// (Add the static method inside the Animal class above.)


// --- Task 4: Bug hunt ---
// leader is a STATIC method, so it lives on the class, not on an instance.
// This code calls it on an instance and crashes. Fix the call.
class Team {
  constructor(name) {
    this.name = name;
    this.wins = 0;
  }
  static leader(teams) {
    return teams.reduce((best, t) => (t.wins > best.wins ? t : best), teams[0]);
  }
}
const teams = [new Team("Red"), new Team("Blue")];
teams[1].wins = 4;
// const top = teams[0].leader(teams);   // ERROR: leader is static — fix the call
// console.log(top.name);                 // should log "Blue"
