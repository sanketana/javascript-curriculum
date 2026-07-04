// Widget Workshop — Session 8: the `this` keyword
// `this` is the most misunderstood word in JavaScript. The secret is simple:
// `this` is NOT decided by where a function is written — it's decided by HOW the
// function is CALLED. Look for the object just before the dot at call time.

// 1. In a method call, `this` is the object before the dot.
const person = {
  firstName: "Aria",
  greet() {
    return "Hi, I'm " + this.firstName;   // called as person.greet() → this = person
  },
};
console.log(person.greet());   // "Hi, I'm Aria"

// 2. THE classic trap: pull the method off the object and `this` is lost —
//    there's no object before the dot any more.
const loose = person.greet;
// console.log(loose());   // "Hi, I'm undefined" — no object before the dot; uncomment to see

// 3. Arrow functions don't get their own `this`. They borrow it from where they
//    were written. That's what makes them perfect for callbacks INSIDE a method,
//    like the setInterval in stopwatch.start() below.

// The mini-build: a stopwatch object whose methods talk to each other via `this`.
const stopwatch = {
  seconds: 0,
  timerId: null,
  el: document.querySelector("#time"),

  render() {
    this.el.textContent = this.seconds + "s";
  },
  tick() {
    this.seconds = this.seconds + 1;
    this.render();
  },
  start() {
    if (this.timerId) return;                     // already running — ignore
    // Arrow callback: `this` still means the stopwatch, borrowed from start().
    // A regular function here would lose `this` and the tick would fail.
    this.timerId = setInterval(() => this.tick(), 1000);
  },
  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  },
  reset() {
    this.stop();
    this.seconds = 0;
    this.render();
  },
};

stopwatch.render();

// Wire the buttons. Each uses an arrow so the CALL is `stopwatch.start()` etc. —
// putting the stopwatch right before the dot, which is what makes `this` correct.
document.querySelector("#start").addEventListener("click", () => stopwatch.start());
document.querySelector("#stop").addEventListener("click", () => stopwatch.stop());
document.querySelector("#reset").addEventListener("click", () => stopwatch.reset());
