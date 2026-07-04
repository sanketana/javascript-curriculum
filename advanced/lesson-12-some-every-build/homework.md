# Session 12 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has a `tracks` array and four tasks in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — `some`.**
Use `some` to check whether *any* track is by `"Vesper"`, and log the result. You should get `true`. Remember `some` gives back a plain `true`/`false`, not the track.

**Task 2 — `every`.**
Use `every` to check whether *all* tracks are longer than 120 seconds, and log the result. You should get `true`.

**Task 3 — combine Arc C.**
In one expression, compute the total `plays` of only the `"Lumen"` tracks: `filter` to Lumen, then `reduce` the plays. You should get `3800000`. This is the arc's two halves — narrow, then boil down — in a single line.

**Task 4 — Bug hunt.**
`hasLongTrack` should be `true` only if some track runs over 4 minutes (240 seconds), but it's *always* `true`. The predicate returns `t.seconds` — a number, which is always truthy — instead of a comparison. Fix it to test `t.seconds > 240` (the answer is `false`; none of these exceed 240s).

## Stretch (optional)

Add a "playlist health" summary to the console using all your Arc C tools on `tracks`: the number of tracks, the total plays (`reduce`), whether there's a viral hit over 1,000,000 plays (`some`), and whether every track is at least 3 minutes (`every`). Print it as one object.

Bring your finished `homework.js` to the next session. **Arc C is done** — you now own the five-method data toolkit. Next we start Arc D and learn **classes**: a tidy way to build objects that carry both data *and* the methods that act on it.
