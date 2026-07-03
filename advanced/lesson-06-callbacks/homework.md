# Session 6 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — Call a callback twice.**
`runTwice` is given. Call it and pass an **anonymous** function that logs `Ping!`. You should see `Ping!` printed twice. (This is the callback idea in its smallest form.)

**Task 2 — A callback after a delay.**
`download` pretends to fetch a file, then calls `onDone(file)` one second later. Call `download("song.mp3", ...)` and pass a callback that logs `Downloaded song.mp3`. Notice the "Downloading…" line prints first, and your callback runs a second later — JavaScript didn't wait.

**Task 3 — A callback per number.**
`countTo` calls `onEach(i)` for every number from 1 to `n`. Call `countTo(5, ...)` with a callback that logs each number. Same "you supply the *what*" idea, now run five times.

**Task 4 — Bug hunt.**
Two commented lines make the same classic mistake: they *call* the function immediately (with `()`) instead of *passing* it. Write corrected versions that pass the function itself, then uncomment and test. `setTimeout` should print `Hi!` after one second; `runTwice` should print it twice.

## Stretch (optional)

Go back to the Widget Workshop `app.js`. Give `startCountdown` a third callback, `onHalfway`, that runs once when the countdown passes the halfway mark, and pass a callback that logs `Halfway there!`. (Hint: compare `remaining` to `seconds / 2`.)

Bring your finished `homework.js` to the next session — we uncover **closures**, the reason your countdown was able to *remember* its remaining seconds between ticks.
