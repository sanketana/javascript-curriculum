# Session 1 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (press F12, then click "Console"). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the log lines as you finish each task.

## The tasks

**Task 1 — Your own character.**
Create an object called `myHero` with four keys: `name`, `anime`, `power`, and `role`. Log its name using **dot** notation and its power using **bracket** notation. You should see two lines in the console.

**Task 2 — An array of three villains.**
Make an array called `villains` holding three character objects (same four keys each). Then log a sentence like `There are 3 villains.` using the array's `length`.

**Task 3 — Property shorthand.**
Finish the `makeVillain` function so it returns an object using **shorthand** — no `key: value` repetition. Test it by making one villain and logging it.

**Task 4 — Bug hunt.**
The `listNames` function is meant to print every character's name, but it has **two** bugs. Find and fix them, then uncomment the last line to run it on your `villains` array. It should print three names.

Hints if you get stuck:
- Look carefully at the name of the thing the loop is looping over.
- Think about how you read a property off an object — is `name` a variable here, or the name of a key?

## Stretch (optional)

Add a fifth key of your own to every character — maybe `element`, `weapon`, or `village`. Nothing should break: objects are happy to hold as many keys as you like.

Bring your finished `homework.js` to the next session. We'll start from the console output you produced.
