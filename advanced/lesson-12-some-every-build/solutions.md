# Session 12 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — `some`

```js
const hasVesper = tracks.some((t) => t.artist === "Vesper");
console.log(hasVesper);   // true
```

`some` walks the list and returns `true` the moment one track passes (Echoes is by Vesper). It gives back a yes/no answer, not the track itself.

## Task 2 — `every`

```js
const allOverTwoMin = tracks.every((t) => t.seconds > 120);
console.log(allOverTwoMin);   // true
```

`every` returns `true` only if *all* tracks pass. The shortest here is Pulse at 175s, still over 120, so the whole list qualifies.

## Task 3 — combine Arc C

```js
const lumenPlays = tracks
  .filter((t) => t.artist === "Lumen")
  .reduce((sum, t) => sum + t.plays, 0);
console.log(lumenPlays);   // 3800000
```

`filter` narrows to the two Lumen tracks (Sunrise 1,200,000 and Neon 2,600,000), then `reduce` adds their plays: 1,200,000 + 2,600,000 = 3,800,000. Narrow, then boil down — the two halves of Arc C in one chain.

## Task 4 — Bug hunt

`t.seconds` is a number, and every non-zero number is *truthy*, so `some((t) => t.seconds)` is always `true` — it never actually checks the length. The predicate has to be a **comparison** that returns `true`/`false`:

```js
const hasLongTrack = tracks.some((t) => t.seconds > 240);
console.log(hasLongTrack);   // false — the longest is Neon at exactly 240s, and 240 > 240 is false
```

The rule: a `some`/`every`/`filter` test must *ask a yes/no question*. Returning a raw value "works" by truthiness but almost never means what you intended.

## Stretch — playlist health summary

```js
const health = {
  count: tracks.length,
  totalPlays: tracks.reduce((sum, t) => sum + t.plays, 0),
  hasViralHit: tracks.some((t) => t.plays > 1000000),
  allThreeMinPlus: tracks.every((t) => t.seconds >= 180),
};
console.log(health);
// { count: 5, totalPlays: 6710000, hasViralHit: true, allThreeMinPlus: false }
```

Every Arc C tool in one object: `length` for the count, `reduce` for the total, `some` for "is there a viral hit?", `every` for "are they all at least 3 minutes?". (`allThreeMinPlus` is `false` because Pulse is 175s, just under 180.)
