# Session 6 — Callbacks

## Lesson Theme

Last session you learned that a function is a value you can pass around. Today that idea gets a name and a job: a **callback** is a function you hand to someone else so they can run it *later* — when a timer goes off, when a button is clicked, when data finally arrives. Callbacks are the beating heart of how JavaScript deals with time, and understanding *why* they exist is half the battle.

## What You'll Build

A **countdown timer** for the Widget Workshop. You write `startCountdown(seconds, onTick, onDone)` — a function that controls *when* things happen, while *you* supply *what* happens each second and at zero, as two callback functions. You'll also run a tiny "pizza" demo in the console that shows, unmistakably, that JavaScript does not sit and wait.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- Passing a function as a **callback** to another function
- `setTimeout` and `setInterval` as functions that *take* callbacks
- Writing a function that accepts **multiple** callbacks (`onTick`, `onDone`)
- Cancelling a repeating timer with `clearInterval`

**Thinking skills**
- *Why* single-threaded JavaScript needs callbacks — the "don't freeze" problem
- Separating **when** (the timer's job) from **what** (your callback's job)
- Predicting the *order* code runs in when a callback is involved

## Concept Explainer: What a Callback Really Is

**The one-line version:** a callback is a function you give to another function, so that function can "call you back" when it's ready — like leaving your phone number instead of standing at the counter waiting.

**Why JavaScript needs this so badly.** JavaScript runs your whole page on a *single thread* — one worker doing one thing at a time. That worker also handles clicks, scrolling, typing, and animation. Now imagine you ask for something slow: a 3-second timer, or (later in this course) data from the internet that takes a moment to arrive. If JavaScript simply *waited* for it, that single worker would be stuck — the page would freeze solid. No clicks, no scrolling, nothing, until the wait was over. Anyone who's used a frozen webpage knows how that feels.

So JavaScript made a different deal. Instead of waiting, it says: *"Give me a function to run when the thing is ready, and I'll get straight back to work."* That function is the callback. The timer, the button, the network — each one holds onto your callback and runs it at the right moment, while the single worker stays free the whole time. This is the pizza demo in `app.js`: you order the pizza (start a 2-second timer with a callback), and instead of standing frozen at the door, you go do your homework. When the pizza arrives, *then* your callback runs.

**Where the name comes from, and a peek ahead.** "Callback" is exactly the phone metaphor — you leave a function to be *called back*. For years this was the *only* way to handle "do X when Y finishes" in JavaScript. It works, but when you need to do several slow things in a row — do A, then B, then C, each waiting on the last — you end up nesting callback inside callback inside callback, and the code drifts off the right edge of the screen. Programmers named this mess "callback hell." It was annoying enough that the language grew two better tools on top of callbacks — **promises** and **async/await** — which you'll meet in Arc E. But they are built *on* this idea, so today's session is the foundation for all of it.

## In Class

**0:00–0:10 — The pizza demo: JavaScript doesn't wait**
Open the console and run the top of `app.js`. Ask the student to predict the order of the three lines *before* running:

```js
console.log("Ordering pizza...");
setTimeout(() => { console.log("Pizza delivered!"); }, 2000);
console.log("Meanwhile, doing homework...");
```

Most will guess top-to-bottom. Run it: "Ordering", then "Meanwhile" *immediately*, then "Pizza delivered!" two seconds later. Sit with the surprise — this is the whole reason callbacks exist. Walk the explainer above using this exact demo: JavaScript handed the timer a callback and carried straight on instead of freezing.

**0:10–0:20 — Naming what we already did**
Connect back to Session 5: `setTimeout`'s first argument is a function — an *anonymous* one — handed over to be run later. That handed-over function has a name for its *role*: a **callback**. Show that `addEventListener("click", …)` has been taking a callback all along. Nothing new to memorise; a familiar thing just got its proper name.

**0:20–0:42 — The countdown widget (multiple callbacks)**
Build `startCountdown` together. The design idea comes first, in words: *the timer knows WHEN (every second, and at zero); you know WHAT should happen; so you pass the "what" in as callbacks.*

```js
const startCountdown = (seconds, onTick, onDone) => {
  let remaining = seconds;
  onTick(remaining);
  const timerId = setInterval(() => {
    remaining = remaining - 1;
    if (remaining <= 0) { clearInterval(timerId); onDone(); }
    else { onTick(remaining); }
  }, 1000);
};
```

Then wire the button, passing two different callbacks:

```js
startCountdown(
  5,
  (n) => { display.textContent = n; },          // onTick
  () => { display.textContent = "Lift off!"; }  // onDone
);
```

Click it — the number ticks down, then "Lift off!". Make the separation explicit: `startCountdown` never mentions a display, a number format, or the word "Lift off". It only calls back. You could hand it completely different callbacks (play a sound, change a colour) and it wouldn't need a single change. Point out `clearInterval` too: without it, the countdown would run past zero forever.

**0:42–0:55 — Make it theirs**
The student changes the callbacks: start from 10, show "GO!" at the end, or turn the display red on the last three seconds inside `onTick`. Same widget, new behaviour, all through the callbacks.

**0:55–1:00 — Reflection**

## Reflection

- In the pizza demo, "Meanwhile, doing homework..." printed *before* "Pizza delivered!". Explain why, using the word *callback*.
- `startCountdown` decides *when* and your callbacks decide *what*. Why is splitting those two jobs useful?
- Where else have you already been using callbacks without calling them that?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the countdown widget; open with Live Server (keep the console open too)
- `style.css` — styling for the big display (done for you)
- `app.js` — the pizza demo, then the countdown built on two callbacks
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Reaction Timer (for fast finishers)

*Optional. Reach for this when a student finishes the countdown with time to spare.*

Build a **Reaction Timer** game: click to start, wait for the pad to turn green, then click as fast as you can — it shows your reaction time in milliseconds. Open `code/practice.html` with Live Server (one self-contained file).

The step up is a callback whose timing you *don't* control:

1. **A callback after a random delay.** `setTimeout(() => { …turn green… }, delay)` where `delay` is random between 1 and 4 seconds. You cannot predict when your callback runs — that's the point, and it's what makes the game work.
2. **Measuring time around a callback.** The green callback records `Date.now()`; your click reads `Date.now()` again and subtracts. The gap is your reaction time.
3. **A tiny state machine.** The pad tracks `idle → waiting → ready`, so an early click (before the callback fires) is caught as "Too soon!".

**Challenges to push further** (pick any):
- Keep and show the player's *best* time across attempts.
- After five rounds, show the average.
- Add a countdown *before* the wait ("3, 2, 1…") using `startCountdown`-style callbacks.

---

## Notes for the Teacher

**Setup check before the session**
- Keep the browser console open the entire session — the pizza demo lives there and the "order of execution" surprise is the emotional core of the lesson.

**Common student mistakes**
- **Calling instead of passing (the big one).** `setTimeout(sayHi(), 1000)` runs `sayHi` *immediately* and hands its return value to `setTimeout`. It must be `setTimeout(sayHi, 1000)` — the function itself, no parentheses. This is the homework bug hunt and it will come up in class too.
- **Expecting the countdown to "pause" the code.** Students sometimes expect lines after `startCountdown(...)` to wait for it to finish. They don't — the countdown runs on its own via the timer, and the rest of the code carries on. This is the same non-freeze idea from the pizza demo.
- **Forgetting `clearInterval`.** Without it the interval never stops; `remaining` keeps going negative. A good thing to *let* happen once (remove the line, watch it misbehave) so the fix is felt.
- **Confusing `setTimeout` (once) with `setInterval` (repeating).** Name the difference plainly.

**Anticipated questions**
- *"Is a callback different from a higher-order function?"* They're two sides of one coin: a higher-order function is one that *takes* a function; the function it takes, when it'll be run later, is the callback. Keep it that simple.
- *"This nesting looks like it could get messy fast."* Yes — validate the instinct and name it: "callback hell". Tell them the fix (promises, async/await) is coming in Arc E and is built on exactly this. Don't teach it now.

**Pacing note**
If the student is quick, have them pass richer callbacks (colour changes on the final seconds, a message array). If that isn't enough, move them to the **Reaction Timer** extra-practice project (`code/practice.html`), which adds a random-delay callback and timing. If the student is slower, it's fine to land the session at "the countdown ticks and finishes", and leave the custom callbacks for the start of next session.
