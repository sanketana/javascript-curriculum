# Session 5 — Arrow Functions & Functions as Values

## Lesson Theme

So far a function has been a *thing you call*. Today it becomes a *thing you pass around*. Once you see that a function is just another value — something you can store in a variable, hand to another function, and run later — event handlers, callbacks, and the whole style of modern JavaScript stop being mysterious. This is the mental shift that Arc B is built on.

## What You'll Build

You start a new project, the **Widget Workshop** — a collection of small reusable interactive widgets you'll grow across Arc B. Today you build a **button factory**: one function, `makeActionButton`, that stamps out buttons, each wired to a different behaviour you hand it. Along the way you convert everyday functions to the shorter arrow style.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- **Arrow functions** and their shapes: `() =>`, `n =>`, `(a, b) =>`, and block bodies
- **Concise vs block body** — when a `return` is automatic and when you must write it
- **Anonymous functions** — functions with no name, written exactly where they're needed
- **Higher-order functions** — functions that take another function as an argument
- Passing a function as a *value* to `addEventListener` and `setTimeout`

**Thinking skills**
- The shift from "a function is something I run" to "a function is a value I can move around"
- Seeing one factory produce many behaviours by being handed different functions
- Reading `(label, action) => …` and knowing `action` is itself a function

## In Class

**0:00–0:07 — A function is a value**
Warm up with a claim that sounds odd: *a function is just a value, like a number or a string.* Show it plainly in the console:

```js
const double = (n) => n * 2;   // we stored a function in a variable
console.log(double);            // logs the function itself, not a result
console.log(double(4));         // NOW we run it → 8
```

`double` holds a function the way a variable holds a number. That's the whole session in one line.

**0:07–0:20 — Arrow function shapes**
Introduce arrows as a shorter spelling of something they already know. Put the two side by side:

```js
function doubleOld(n) { return n * 2; }
const double = (n) => n * 2;   // same behaviour
```

Then walk the shapes in `app.js` — no params `() =>`, one param, several params, and the important fork:

```js
const square = (n) => n * n;        // one expression → the result is auto-returned
const shout = (text) => {           // a { } body is a normal function body...
  const loud = text.toUpperCase();
  return loud + "!";                // ...so YOU must write return
};
```

*Predict-then-run.* Ask what each logs, then check:

```js
const f = (n) => { n * 2 };   // returns... ?   (undefined — braces need a return)
const g = (n) => n * 2;       // returns... ?   (the doubled value)
```

The missing-`return`-in-a-block trap is the single most common arrow-function mistake. Name it now.

**0:20–0:30 — Anonymous functions**
A function doesn't need a name if you're using it once, right where you are. Show it with `setTimeout`:

```js
setTimeout(() => {
  console.log("One second later...");
}, 1000);
```

The first argument *is a function* — unnamed, handed straight to `setTimeout`, which stores it and runs it a second later. Connect it back to the Beginner course: every `addEventListener("click", …)` they've written already took a function; today they're learning to *see* it.

**0:30–0:48 — The button factory (higher-order functions)**
This is the build. A **higher-order function** is simply a function that takes another function as an argument. Write `makeActionButton` together:

```js
const makeActionButton = (label, action) => {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", action);   // action is a function VALUE
  toolbar.appendChild(button);
};
```

Then stamp out several buttons, each handed a *different* anonymous function:

```js
makeActionButton("Say hi",  () => { status.textContent = "Hello from the Widget Workshop!"; });
makeActionButton("Go dark", () => { document.body.style.background = "#0b0e1a"; });
```

Refresh, click — different buttons, different behaviours, one factory. Make the key point explicit: `makeActionButton` doesn't know or care *what* the action does; it just runs whatever function it's given, when the button is clicked. That is exactly how a framework lets you pass behaviour into a component.

**0:48–0:57 — Make it theirs**
The student adds one or two buttons of their own — change the heading text, show a random number, swap a colour. Each is a new anonymous function handed to the same factory.

**0:57–1:00 — Reflection**

## Reflection

- `const double = (n) => n * 2;` — what is stored in `double`, and how is that different from `double(4)`?
- When does an arrow function return a value automatically, and when do you have to write `return` yourself?
- `makeActionButton` was handed a different function for every button. In your own words, why is "a function that takes a function" so useful?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Widget Workshop page; open with Live Server
- `style.css` — styling for the toolbar and buttons (done for you)
- `app.js` — arrow shapes, an anonymous function, then the button factory
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Text Transformer (for fast finishers)

*Optional. Reach for this when a student finishes the button factory with time to spare.*

Build a **Text Transformer**: type some text, click a button, and see it transformed. Open `code/practice.html` with Live Server (one self-contained file).

The step up is storing **functions as data**:

1. **A dispatch table.** `transforms` is an object whose *values are functions* — `"UPPERCASE"` maps to `(s) => s.toUpperCase()`, and so on. An object full of functions is a real pattern you'll meet again (it's how many menus, routers, and command palettes work).
2. **Choosing a function by key.** The buttons are built in a loop, and each click looks its function up with `transforms[name]` — the exact **bracket notation** from Session 1, except now the value you fetch is a *function you then run*. Two ideas from different sessions clicking together.
3. **A tiny higher-order helper.** `apply(transformFn)` takes whichever function was chosen and runs it on the current text.

**Challenges to push further** (pick any):
- Add two transforms of your own (e.g. title-case, remove-spaces).
- Add a "Random" button that picks any transform at random and applies it.
- Chain two transforms: apply reverse, then UPPERCASE, to the *result* of the first.

---

## Notes for the Teacher

**Setup check before the session**
- This is the first session of Arc B and starts a new project (Widget Workshop). Have the Card Explorer closed so the student mentally turns the page.

**Common student mistakes**
- **Braces eat the return.** `(n) => { n * 2 }` returns `undefined`. Either drop the braces (`(n) => n * 2`) or add `return`. Expect this repeatedly today.
- **Calling vs passing.** `addEventListener("click", action)` passes the function; `addEventListener("click", action())` *calls it immediately* and passes the result. The stray `()` is a classic bug — the action fires once on load and never again.
- **Single-param parentheses.** `n => n * 2` is legal, but the moment there are zero or two-plus params, parentheses are required: `() =>`, `(a, b) =>`. Teach them to always use parentheses and they'll never hit this.
- **Confusing "higher-order" with anything fancy.** It only means "a function that takes and/or returns a function." Keep the definition small and concrete.

**Anticipated questions**
- *"Why have arrow functions AND regular functions?"* For now: arrows are shorter and read well when passing functions around. There's a deeper difference to do with `this` — flag that it exists and that Session 8 covers it; do not open it today.
- *"Isn't passing a function the same as calling it?"* No — and this is the crux. Passing hands over the *recipe*; calling *cooks it now*. The button stores the recipe and cooks it on each click.

**Pacing note**
If the student is quick, have them add several buttons and one that changes multiple things at once. If that isn't enough, move them to the **Text Transformer** extra-practice project (`code/practice.html`), which introduces functions-as-data and dispatch-by-key. If the student is slower, it's fine to land the session at "arrow shapes + one working factory button," and add more buttons at the start of next session.
