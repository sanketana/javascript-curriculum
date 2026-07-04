# Session 11 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — reduce to a total

```js
const totalPlays = tracks.reduce((sum, t) => sum + t.plays, 0);
console.log(totalPlays);   // 6710
```

The accumulator `sum` starts at `0` and each step returns `sum + t.plays`. Trace it: 0 → 1200 → 1630 → 4230 → 5210 → 6710.

## Task 2 — reduce to a winner

```js
const longest = tracks.reduce((best, t) => (t.seconds > best.seconds ? t : best), tracks[0]);
console.log(longest.title);   // "Neon"
```

The accumulator is a *track*. Each step keeps whichever is longer — the current one or the best so far. Starting at `tracks[0]` means "assume the first is longest until proven otherwise". Neon (240s) wins.

## Task 3 — reduce to an object

```js
const byArtist = tracks.reduce((counts, t) => {
  counts[t.artist] = (counts[t.artist] || 0) + 1;
  return counts;                 // don't forget this line
}, {});
console.log(byArtist);   // { Lumen: 2, Halcyon: 2, Vesper: 1 }
```

Starting at `{}`, each step bumps the count for that artist. `counts[t.artist] || 0` handles the first time we see an artist (there's no count yet, so start from `0`). And every step **returns `counts`** so the next step keeps building the same object.

## Task 4 — Bug hunt

The reducer has a `{ }` body and never returns, so the accumulator is never updated — it stays `undefined` the whole way through, and the final value logged is `undefined`. (The `sum + t.plays` you compute each step is thrown away; it never becomes the accumulator.)

```js
const totalPlays = tracks.reduce((sum, t) => {
  sum + t.plays;      // computed, then thrown away — no return
}, 0);
```

Two correct fixes:

```js
// Fix A — add return
const totalPlays = tracks.reduce((sum, t) => {
  return sum + t.plays;
}, 0);

// Fix B — drop the braces so the expression auto-returns
const totalPlays = tracks.reduce((sum, t) => sum + t.plays, 0);

console.log(totalPlays);   // 6710
```

Same rule as `map` in Session 9, and it matters even more here: in `reduce`, the value you return *is* the next accumulator. Forget it and the whole chain breaks.

## Stretch — many stats in one pass

```js
const summary = tracks.reduce(
  (acc, t) => {
    acc.totalPlays = acc.totalPlays + t.plays;
    acc.totalSeconds = acc.totalSeconds + t.seconds;
    return acc;
  },
  { totalPlays: 0, totalSeconds: 0 }
);
console.log(summary);   // { totalPlays: 6710, totalSeconds: 1010 }
```

One walk through the list, two running totals, one accumulator object. The starting value `{ totalPlays: 0, totalSeconds: 0 }` sets the shape of what you're building — choose it deliberately and the rest follows.
