# Session 8 — The `this` Keyword

## Lesson Theme

`this` has a reputation as the most confusing word in JavaScript, and it earns it — but only because most people learn the wrong rule for it. Today you learn the *right* rule, which is short and reliable, and you use it to close out Arc B by building a stopwatch whose parts talk to each other through `this`. Get this rule straight and a whole category of "why is this undefined?" bugs disappears.

## What You'll Build

A **stopwatch** widget for the Widget Workshop: Start, Stop, and Reset, counting seconds on screen. It's built as a single object whose methods (`start`, `tick`, `render`, `reset`) all refer to the object's own data through `this` — and whose ticking uses an arrow-function callback so `this` survives inside `setInterval`. It's the perfect small machine for feeling how `this` behaves.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- The one dependable rule: `this` is set by **how a function is called**, not where it's written
- `this` inside an object method = the object **before the dot** at call time
- Why pulling a method off its object (`const f = obj.method`) **loses** `this`
- Why **arrow functions** are ideal for callbacks inside methods — they borrow `this`

**Thinking skills**
- Reading a call site and predicting what `this` will be
- Recognising the "lost `this`" bug on sight
- Choosing arrow vs regular function on purpose, for a reason

## Concept Explainer: What `this` Really Is

**The wrong rule most people carry** is "`this` refers to the object the function belongs to." That *sometimes* gives the right answer, which is exactly why it's so misleading — it fails at the worst moments and leaves you baffled.

**The right rule is about the call, not the code.** `this` is decided fresh *every time a function is called*, based on *how* you called it. The simple version that covers almost everything you'll do: **look for the object immediately before the dot at the moment of the call.** When you write `person.greet()`, there's `person` right before the dot, so inside `greet`, `this` is `person`. Call the same function a different way and `this` changes — the function didn't move, the *call* did.

This immediately explains the classic trap. Take `const loose = person.greet;` and call `loose()`. Same function — but now there's *no object before the dot*, so `this` isn't `person` any more, and `this.firstName` is `undefined`. Nothing about the function changed; only how it was called did. Once you internalise "look before the dot," this stops being spooky and becomes something you can *predict*.

**Where arrow functions come in.** Arrow functions were added to JavaScript in 2015 partly to fix a real, everyday pain: callbacks inside methods kept losing `this`. Regular functions get a *fresh* `this` decided by their own call — so a plain `function` handed to `setInterval` or an event listener gets `this` set to something other than your object, and `this.seconds` breaks. Arrow functions are deliberately different: **they don't get their own `this` at all.** They borrow it from the surrounding code where they were *written*. So inside `stopwatch.start`, writing `setInterval(() => this.tick(), 1000)` keeps `this` pointing at the stopwatch, because the arrow borrowed `this` from `start`, where it was correct. This is *the* reason you'll reach for an arrow function nine times out of ten when writing a callback.

**Why this matters going forward.** `this` is unavoidable the moment you build objects that *do* things — which is all of real-world code, and exactly where Arc D takes you later with classes. Classes are just a tidier way to make objects with methods, and every method inside a class uses `this` by this same rule. Learn to "look before the dot" now, and classes will feel like a formatting change rather than a new mystery.

## In Class

**0:00–0:12 — The right rule, and the trap**
Open the console and build `person` live. Show `person.greet()` works. Then spring the trap:

```js
const person = { firstName: "Aria", greet() { return "Hi, I'm " + this.firstName; } };
person.greet();          // "Hi, I'm Aria"
const loose = person.greet;
loose();                 // "Hi, I'm undefined"  — same function!
```

Let the surprise land, then give the rule from the explainer: *look for the object before the dot at call time.* `person.greet()` has `person` before the dot; `loose()` has nothing. The function never changed — the call did.

**0:12–0:22 — Arrow functions borrow `this`**
Set up the everyday version of the problem — a callback inside a method:

```js
const obj = {
  value: 42,
  showRegular() { setTimeout(function () { console.log(this.value); }, 0); }, // undefined
  showArrow()   { setTimeout(() => console.log(this.value), 0); },            // 42
};
```

Run both. The regular function's `this` is decided by *its own* call (from inside `setTimeout`), so it isn't `obj`. The arrow borrowed `this` from `showArrow`, where it was `obj`. State the takeaway plainly: *for a callback inside a method, use an arrow so `this` carries through.*

**0:22–0:48 — The stopwatch (the mini-build)**
Build the `stopwatch` object in `app.js` together, method by method, narrating `this` each time: `this.seconds`, `this.render()`, `this.timerId`. The centrepiece is `start`:

```js
start() {
  if (this.timerId) return;
  this.timerId = setInterval(() => this.tick(), 1000);   // arrow keeps `this`
},
```

Ask the class to predict what would happen with `setInterval(this.tick, 1000)` instead — then try it and watch it break (`this.seconds` is undefined inside a bare `tick`). Restore the arrow. Wire the three buttons with arrow handlers so each call is `stopwatch.start()` — object before the dot — and run it: a working stopwatch, every part connected through `this`.

**0:48–0:56 — Make it theirs**
Add a "lap" or a "-1 second" button, or make `reset` also flash the display. Each new method uses `this`; each button wires up the same way.

**0:56–1:00 — Reflection**

## Reflection

- State the reliable rule for `this` in your own words. What do you look for?
- `const loose = person.greet; loose()` gave `undefined`. Explain why, without using the word "belongs".
- Inside a method, why is an arrow function usually the right choice for a `setTimeout` or `setInterval` callback?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the stopwatch widget; open with Live Server (keep the console open)
- `style.css` — styling for the display and buttons (done for you)
- `app.js` — the `this` demos, then the stopwatch object
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Traffic Light (for fast finishers)

*Optional. Reach for this when a student finishes the stopwatch with time to spare.*

Build a **traffic light** that cycles green → orange → red on its own, with Start and Stop. Open `code/practice.html` with Live Server (one self-contained file).

The step up is an object that drives *itself* on a loop:

1. **A self-scheduling object.** `cycle()` uses `setTimeout` to change the light, and then — if still running — calls `this.cycle()` again to schedule the next change. The object keeps its own loop going through its own methods.
2. **The arrow is load-bearing.** Every re-schedule depends on `this` still meaning the light. The arrow callback in `cycle()` is what makes that true. Swap it for a regular `function` and the whole thing breaks on the first tick — try it, see it fail, and you'll never forget why arrows matter for callbacks.
3. **Per-state data via `this`.** Each colour has its own duration, looked up with `this.durations[this.current()]`, tying today's `this` back to bracket notation from Session 1.

**Challenges to push further** (pick any):
- Add a pedestrian "WALK / DON'T WALK" label that's the opposite of the cars' light.
- Add a "faster" button that halves all durations.
- Count and show how many full cycles the light has completed.

---

## Notes for the Teacher

**Setup check before the session**
- This closes Arc B and the Widget Workshop. Keep the console open — every `this` idea is best shown as a live "watch it break, watch it work".

**Common student mistakes**
- **Carrying the wrong rule.** "`this` is the object the function belongs to" will actively fight them. Replace it firmly with "look for the object before the dot at call time."
- **A regular function callback inside a method.** `setInterval(function(){ this.x })` — `this` is not the object. This is the homework bug hunt and the stopwatch's key moment. Fix: arrow function.
- **Passing a method as a handler.** `button.addEventListener("click", stopwatch.start)` loses `this` (the click calls it with the button before the dot). Wrapping in an arrow — `() => stopwatch.start()` — keeps the call correct. This is why the lesson wires buttons with arrows.
- **Assuming `this` is fixed once written.** It's re-decided on every call. Same function, different call, different `this`.

**Anticipated questions**
- *"Are there other ways to fix lost `this`?"* Yes — `.bind()`, and in classes there are patterns too. Mention `bind` exists, but keep the arrow as the one tool for now; don't open that door mid-lesson.
- *"Why did the language make `this` so tricky?"* Historical: `this` came from JavaScript's early object model and behaves differently from other languages. Arrow functions (2015) were partly a fix for the callback pain. This honesty helps — it's not them being slow; it genuinely is a rough edge.
- *"Does `this` work in plain functions not on an object?"* It can be `undefined` or the global object depending on mode — flag that it exists but stay on the method/callback story, which is what they'll actually write.

**Pacing note**
If the student is quick, have them add stopwatch methods (lap, countdown mode) and confirm `this` behaves. If that isn't enough, move them to the **Traffic Light** extra-practice project (`code/practice.html`), where the self-scheduling loop makes the arrow-keeps-`this` idea unforgettable. If the student is slower, land the session at "the right rule + the stopwatch ticking", and leave the arrow-vs-regular deep dive as a quick recap next time. Either way, this is the end of Arc B — take a moment to look back at the Widget Workshop the student has built across four sessions.
