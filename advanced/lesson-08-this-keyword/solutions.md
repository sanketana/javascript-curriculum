# Session 8 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — A method that uses `this`

```js
const dog = {
  name: "Rex",
  speak() {
    return `${this.name} says woof`;
  },
};

console.log(dog.speak());   // "Rex says woof"
```

Called as `dog.speak()`, there's `dog` right before the dot, so `this` is `dog` and `this.name` is `"Rex"`.

## Task 2 — Keep `this` through a delay

```js
setTimeout(() => counter.bump(), 100);
// count is now 1
```

The arrow calls `counter.bump()` — object before the dot — so `this` is `counter` when it runs. If you had written `setTimeout(counter.bump, 100)`, `setTimeout` would later call a bare function with no object before the dot: `this` would be `window`, `this.count` would be `undefined`, and it would log `count is now NaN` instead of updating the counter.

## Task 3 — An object that schedules itself

```js
const timer = {
  label: "Timer",
  announce() {
    console.log(`${this.label} fired`);
  },
};

setTimeout(() => timer.announce(), 200);   // "Timer fired"
```

Same idea as Task 2: the arrow preserves the `timer.announce()` call, so `this.label` is `"Timer"`.

## Task 4 — Bug hunt

The regular `function` inside `setTimeout` gets *its own* `this` (decided by `setTimeout`'s call, not by `gadget`), so `this.name` and `this.power` aren't the gadget's. In a normal page script that logs something like `" power undefined"`.

Fix — make the callback an arrow so it borrows `this` from `report()`:

```js
const gadget = {
  name: "Gizmo",
  power: 3,
  report() {
    setTimeout(() => {
      console.log(this.name + " power " + this.power);   // arrow → this is gadget
    }, 100);
  },
};

gadget.report();   // "Gizmo power 3"
```

The arrow doesn't get its own `this`; it uses the one from `report`, where `this` is `gadget`.

## Stretch — a lap method

```js
const stopwatch = {
  seconds: 0,
  timerId: null,
  laps: [],
  el: document.querySelector("#time"),
  render() { this.el.textContent = this.seconds + "s"; },
  tick() { this.seconds = this.seconds + 1; this.render(); },
  start() {
    if (this.timerId) return;
    this.timerId = setInterval(() => this.tick(), 1000);
  },
  stop() { clearInterval(this.timerId); this.timerId = null; },
  reset() { this.stop(); this.seconds = 0; this.render(); },
  lap() {
    this.laps.push(this.seconds);
    console.log("Laps: " + this.laps.join(", "));
  },
};

// wire a "Lap" button:
// document.querySelector("#lap").addEventListener("click", () => stopwatch.lap());
```

`lap` reads `this.seconds` and stores it in `this.laps`. Every method reaches the same object through `this`, and the button handler uses an arrow so the call stays `stopwatch.lap()`.
