# Session 7 — Closures

## Lesson Theme

Last session your countdown *remembered* how many seconds were left between ticks, and you took that for granted. Today you find out why it worked. A **closure** is a function that carries its birthplace with it — it remembers the variables that were around when it was created, and keeps them alive and private. This is the idea behind almost every "remember something" pattern in JavaScript, including the way React remembers state.

## What You'll Build

A **combo-counter** widget for the Widget Workshop: two players, each with their own score that goes up when you hit their button and resets on demand. The trick is that each player's count is *private* — sealed inside a closure so nothing outside can reach in and change it except through the buttons. You'll see two counters that look identical but keep completely separate, remembered state.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- Writing a **factory function** that returns another function (or an object of functions)
- How the returned function keeps access to the outer function's variables — a **closure**
- Using a closure for **private state** that can't be reached or corrupted from outside
- Why each call to a factory produces an *independent* closure with its own memory

**Thinking skills**
- The mental model: a function packs a "backpack" of the variables it needs when it's born
- Distinguishing *private* (inside the closure) from *public* (the functions you hand back)
- Recognising closures you've already been using without naming them

## Concept Explainer: What a Closure Really Is

**The backpack picture.** When you create a function, it quietly packs a backpack. Into that backpack go all the variables that were in scope where the function was *written* — not where it's later called, but where it was *born*. Wherever that function travels afterwards — stored in a variable, handed to a button, returned from another function — it carries the backpack with it and can always reach inside. That function-plus-its-backpack is a **closure**.

Look at `makeCounter` in `app.js`. It creates a variable `count`, then returns a little function that adds to `count`. Here's the surprising part: `makeCounter` *finishes running* the moment it returns — normally its local `count` would be swept away. But the returned function packed `count` in its backpack, so `count` stays alive, private, and remembered, for as long as that returned function exists. Call it three times and you get 1, 2, 3 — it remembers between calls. That's exactly why last session's countdown could remember `remaining`: the tick function was a closure holding onto it.

**Why this is a big deal.** Two reasons, and both matter for where you're heading.

First, **privacy**. The `count` inside `makeCounter` cannot be read or changed from outside — there's no `counter.count` to poke at. The only way to affect it is through the function you were handed. For years, before JavaScript had classes or modules, closures were *the* way to hide data and protect it from meddling. In today's build, each player's combo can only move through `hit` and `reset` — you can't cheat by setting it to 999 from the console.

Second, **independence**. Every time you call the factory, it makes a *fresh* backpack. Two counters from the same `makeCounter` don't share anything — each has its own private `count`. You'll see this directly: clicking Player 1's button leaves Player 2 untouched.

**A peek ahead.** This isn't an obscure corner of the language — it's one of its load-bearing walls. When you learn React later, the `useState` hook that lets a component "remember" its data between renders is closures underneath. The event handlers you write every day are closures over the variables around them. Learning to see the backpack is a skill that pays off for the rest of your JavaScript life.

## In Class

**0:00–0:12 — "How did the countdown remember?"**
Reopen last session's countdown. Ask the question directly: *when `startCountdown` finished setting up, how did the tick function still know `remaining`?* Let them sit with it. Then reveal the answer with the smallest possible example, live in the console:

```js
const makeCounter = () => {
  let count = 0;
  return () => { count = count + 1; return count; };
};
const next = makeCounter();
console.log(next(), next(), next());   // 1 2 3
```

`makeCounter` has already finished — yet `count` is still alive and climbing. Introduce the backpack picture from the explainer here.

**0:12–0:22 — Privacy and independence**
Two follow-up demos, both in `app.js`:

```js
const a = makeCounter();
const b = makeCounter();
console.log(a(), a(), b());   // 1 2 1 — separate backpacks
```

Ask: "can I read `count` from outside?" Try `console.log(next.count)` — `undefined`. There is no handle to it. That's the privacy point: the only door into `count` is the function itself.

**0:22–0:45 — The combo-counter widget**
Build `makeCombo` — a factory returning an *object* of functions (`hit`, `reset`, `value`), all sharing one private `combo`. Then `buildPlayer(name)`, which gives each player its very own `makeCombo()` and wires two buttons to it. Add two players to the arena and click around. The payoff to make explicit: Player 1 and Player 2 run the exact same code, yet their scores are completely independent — because each got its own closure. And nothing on the page can change a score except that player's buttons.

**0:45–0:55 — Make it theirs**
The student adds a third button — "Hit +5", or a "Combo!" that doubles the count — implemented by adding a method to `makeCombo`. They feel that the state stays safely inside while they add new public doors to it.

**0:55–1:00 — Reflection**

## Reflection

- In your own words, what is in a function's "backpack", and when is it packed?
- `makeCounter` finishes running immediately, yet `count` survives. How would you explain that to a friend?
- Player 1 and Player 2 use identical code but keep separate scores. Why?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the combo-counter arena; open with Live Server (keep the console open)
- `style.css` — styling for the player cards (done for you)
- `app.js` — the counter demos, then the combo-counter widget
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Guess the Number (for fast finishers)

*Optional. Reach for this when a student finishes the combo counters with time to spare.*

Build a **number guessing game**: the computer picks a secret from 1 to 100, and you guess until you get it, with "too high / too low" hints. Open `code/practice.html` with Live Server (one self-contained file).

The step up is closure privacy doing something you can *feel*:

1. **A truly hidden secret.** `makeGame` picks `secret` and keeps it in the closure. There is genuinely no way to read it from outside — not even from the console. The privacy you learned about is now the thing that makes the game fair.
2. **Two private values at once.** The closure holds both `secret` and a `tries` counter, and remembers both across every guess.
3. **A fresh closure on demand.** "New game" calls `makeGame()` again, producing a brand-new backpack with a brand-new secret — the old one is gone for good.

**Challenges to push further** (pick any):
- Track and show the best (fewest) number of tries across games.
- Give "warmer / colder" hints based on how close the last two guesses were (you'll need the closure to remember the previous guess).
- Limit the player to 7 tries and end the game with the answer if they run out.

---

## Notes for the Teacher

**Setup check before the session**
- Have last session's countdown open. The lesson opens by answering the question that countdown left hanging, so the continuity is the hook.

**Common student mistakes**
- **Declaring the private variable in the wrong place (the key bug).** If `let count = 0` is written *inside* the returned function instead of the outer one, it resets to 0 on every call — 1, 1, 1 instead of 1, 2, 3. This is the homework bug hunt and the single most important thing to get right. The rule: the remembered variable lives in the *outer* (factory) function.
- **Expecting to read private state directly.** `counter.count` is `undefined`. Reinforce that the only access is through the returned function(s) — that's the whole point.
- **Thinking two counters share state.** They don't; each factory call is a fresh closure. If a student is surprised Player 2 didn't move, that surprise *is* the lesson landing.
- **Returning the value instead of the function.** `return count` (a number) gives you a one-time value with no memory. `return () => …` (a function) is what carries the backpack.

**Anticipated questions**
- *"Isn't this just a global variable?"* No — and this is worth a minute. A global is visible and changeable by everyone; a closure variable is visible to *only* the functions born with it. Same "remembering", opposite privacy.
- *"When would I actually use this?"* Any time something needs private memory: a counter, a game's hidden state, a cache, a "has this run yet?" flag. Tell them React's `useState` is closures underneath — they'll meet it later.
- *"Is a closure the same as a callback?"* Different ideas that often travel together: a callback is a function passed to be run later; a closure is a function remembering its birthplace. A callback is *usually* also a closure.

**Pacing note**
If the student is quick, have them add methods to `makeCombo` (a "+5", a "combo multiplier") and confirm privacy holds. If that isn't enough, move them to the **Guess the Number** extra-practice project (`code/practice.html`), where the hidden secret makes closure privacy tangible. If the student is slower, land the session at "makeCounter remembers, and each is independent", and build the widget together at the start of next session.
