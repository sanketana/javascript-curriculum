# Session 5 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — Convert to arrow functions

```js
const triple = (n) => n * 3;
const fullName = (first, last) => first + " " + last;
const isAdult = (age) => age >= 18;
```

Each one is a single expression, so the concise body auto-returns — no `return`, no braces. `isAdult` returns the result of the comparison `age >= 18`, which is already `true` or `false`.

## Task 2 — A higher-order function

```js
const applyTwice = (fn, value) => fn(fn(value));

console.log(applyTwice(triple, 2));   // 18
```

Read the body inside-out: `fn(value)` is `triple(2)` → `6`; then `fn(6)` is `triple(6)` → `18`. `applyTwice` never mentions tripling by name — it just runs whatever function it was handed, twice. Hand it a different function and it does something different:

```js
console.log(applyTwice((n) => n + 10, 5));   // 25  (5 → 15 → 25)
```

## Task 3 — Pass an anonymous function

```js
runLater(() => {
  console.log("Time's up!");
});
```

The function has no name — it exists only to be handed to `runLater`, which stores it and calls it after 500ms. This is the exact shape of every event callback you'll write.

## Task 4 — Bug hunt

The three faults:

```js
const half = n => => n / 2;               // bug 1: two arrows; there should be one
const welcome = (name) => { name + "!" };  // bug 2: a { } body with no return → undefined
const areaOf = w, h => w * h;              // bug 3: two params must be wrapped in ( )
```

Fixed:

```js
const half = (n) => n / 2;
const welcome = (name) => name + "!";        // drop the braces so it auto-returns
const areaOf = (w, h) => w * h;

console.log(half(10), welcome("Sam"), areaOf(3, 4));   // 5 "Sam!" 12
```

Notes:
- **Bug 1** — one arrow per function. The extra `=>` is a syntax error.
- **Bug 2** — a braced body is a normal function body, so it needs an explicit `return`. The cleanest fix here is to remove the braces entirely and let the single expression auto-return.
- **Bug 3** — a single parameter *may* skip parentheses, but two or more *must* have them.

## Stretch — the Surprise button

```js
const messages = ["You found the secret!", "Nice click.", "Level up!", "Keep going."];

makeActionButton("Surprise", () => {
  const i = Math.floor(Math.random() * messages.length);
  status.textContent = messages[i];
});
```

Same factory, one more anonymous action — this one picks a random index and shows that message. `Math.random()` gives a number from 0 up to (not including) 1; multiplying by the length and flooring turns it into a valid index.
