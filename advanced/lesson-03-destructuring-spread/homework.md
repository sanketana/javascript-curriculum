# Session 3 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — Destructure.**
In one line, pull `name` and `power` out of the `fighter` object into their own variables, then log `Levi has 9500 power`. You should not need to write `fighter.` anywhere in your log.

**Task 2 — Object spread, no mutation.**
Write `buffPower(character)` that returns a **new** object identical to the one passed in, but with `power` increased by 1000. The key test: after calling it, the original `fighter.power` must still be `9500`. If it changed, you edited the original instead of copying it — use `{ ...character, power: ... }`.

**Task 3 — Default parameters.**
Write `makeItem(name, price = 100, rarity = "common")` returning an object with those three keys. Call it once with only a name (defaults fill in) and once with all three.

**Task 4 — Bug hunt.**
Two commented-out lines are broken — one destructures an object with the wrong brackets, and one "merges" two arrays but actually nests them. Work out why each is wrong, write corrected versions, uncomment, and confirm `merged.length` is `4`, not `2`.

## Stretch (optional)

Write `mergeSquads(...squads)` using a **rest parameter** that accepts any number of arrays and returns one combined array (hint: build it up with spread inside a loop). Test it with two squads, then three.

Bring your finished `homework.js` to the next session — it's a **build day**, and you'll use all of this.
