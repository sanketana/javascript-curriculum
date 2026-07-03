# Session 6 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — Call a callback twice

```js
runTwice(() => {
  console.log("Ping!");
});
// Ping!
// Ping!
```

You handed `runTwice` a function. It didn't care what the function did — it just called it twice. That "hand over a function to be run" move is the whole idea of a callback.

## Task 2 — A callback after a delay

```js
download("song.mp3", (file) => {
  console.log("Downloaded " + file + "!");
});
// Downloading song.mp3...      (immediately)
// Downloaded song.mp3!         (one second later)
```

`download` runs your callback *after* the fake one-second wait, and even passes it the file name. The "Downloading…" line prints first because JavaScript sets the timer and carries straight on — it never froze waiting.

## Task 3 — A callback per number

```js
countTo(5, (i) => {
  console.log(i);
});
// 1
// 2
// 3
// 4
// 5
```

Same pattern, run five times. `countTo` owns the loop (the *when*); your callback owns what happens for each number (the *what*).

## Task 4 — Bug hunt

The fault in both lines is the same: the `()` *calls* the function right now and passes its **return value** (which is `undefined`) instead of the function itself.

```js
setTimeout(sayHi(), 1000);   // runs sayHi immediately, schedules "undefined"
runTwice(sayHi());           // runs sayHi once now, passes undefined to runTwice
```

Fixed — pass the function, no parentheses:

```js
setTimeout(sayHi, 1000);   // Hi!  (after one second)
runTwice(sayHi);           // Hi!  Hi!  (immediately, twice)
```

Remember the difference: `sayHi` is *the recipe*; `sayHi()` is *the cooked meal*. A callback wants the recipe, so it can cook it later.

## Stretch — the halfway callback

```js
const startCountdown = (seconds, onTick, onDone, onHalfway) => {
  let remaining = seconds;
  let announcedHalfway = false;
  onTick(remaining);
  const timerId = setInterval(() => {
    remaining = remaining - 1;
    if (!announcedHalfway && remaining <= seconds / 2) {
      announcedHalfway = true;
      onHalfway();
    }
    if (remaining <= 0) { clearInterval(timerId); onDone(); }
    else { onTick(remaining); }
  }, 1000);
};

startCountdown(
  10,
  (n) => { display.textContent = n; },
  () => { display.textContent = "Lift off!"; },
  () => { console.log("Halfway there!"); }
);
```

The `announcedHalfway` flag makes sure `onHalfway` fires only once, the first time `remaining` drops to or below half. Notice again: the widget gained a whole new hook without any of the *what* being written inside it — it just calls back.
