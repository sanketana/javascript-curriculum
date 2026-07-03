# Session 5 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — Convert to arrow functions.**
Rewrite `triple`, `fullName`, and `isAdult` as arrow functions stored in a `const` of the same name. Same behaviour, arrow style. Watch which ones can use the auto-return concise body.

**Task 2 — A higher-order function.**
Write `applyTwice(fn, value)` that runs `fn` on `value`, then runs `fn` again on that result, and returns it. Test: `applyTwice(triple, 2)` should give `18` (2 → 6 → 18). Notice you're *passing a function in* — that's the higher-order part.

**Task 3 — Pass an anonymous function.**
`runLater` is given for you; it calls whatever function it receives after half a second. Call it and hand it an **anonymous** arrow function that logs `Time's up!`.

**Task 4 — Bug hunt.**
Three arrow functions are broken in three different ways (an extra `=>`, a block body that returns nothing, and two parameters missing their parentheses). They're commented out so the page loads. Fix each, uncomment, and confirm the final `console.log` prints sensible values.

## Stretch (optional)

Go back to the Widget Workshop `app.js` and add a "Surprise" button whose anonymous action picks a random message from an array and shows it in `#status`. (Hint: `Math.floor(Math.random() * messages.length)` gives a random index.)

Bring your finished `homework.js` to the next session — we look at **callbacks**, which is this same "pass a function" idea, named and taken further.
