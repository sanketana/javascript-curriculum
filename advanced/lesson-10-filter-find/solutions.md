# Session 10 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — `filter`

```js
const popular = tracks.filter((t) => t.plays >= 1000);
console.log(popular.map((t) => t.title));   // ["Sunrise", "Neon", "Pulse"]
```

`filter` keeps every track whose test returns `true`. Chaining `map` afterwards to pull the titles is the "narrow, then transform" combo from class.

## Task 2 — `find`

```js
const firstHalcyon = tracks.find((t) => t.artist === "Halcyon");
console.log(firstHalcyon.title);   // "Drift"
```

`find` returns the first matching track *object*, so `.title` reads straight off it. (Both "Drift" and "Pulse" are by Halcyon; `find` stops at the first, which is "Drift".)

## Task 3 — `findIndex` and the `-1` check

```js
const echoesIndex = tracks.findIndex((t) => t.title === "Echoes");
console.log(echoesIndex);   // 3

const ghostIndex = tracks.findIndex((t) => t.title === "Ghost");
console.log(ghostIndex);    // -1
if (ghostIndex === -1) {
  console.log("not found");
}
```

`findIndex` gives the position of the first match, or `-1` when there's none. Check `=== -1` explicitly — writing `if (!ghostIndex)` would be wrong, because a real match at index `0` is also falsy.

## Task 4 — Bug hunt

`filter` returns an **array**, so `neon.plays` is `undefined` (an array has no `plays`). The fix is to use `find`, which returns the single track:

```js
const neon = tracks.find((t) => t.title === "Neon");
console.log(neon.plays);   // 2600
```

The rule to keep: **want a list → `filter`; want one → `find`.** They look almost identical, but they hand back different things.

## Stretch — search by title or artist

```js
// in homework.html add: <div id="list"></div> and an <input id="q">
const q = document.querySelector("#q");
const list = document.querySelector("#list");

const renderMatches = () => {
  const query = q.value.toLowerCase();
  const matches = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      t.artist.toLowerCase().includes(query)
  );
  list.innerHTML = matches.map((t) => `<p>${t.title} — ${t.artist}</p>`).join("");
};

q.addEventListener("input", renderMatches);
renderMatches();
```

One `filter` with an `||` checks two fields at once, and `map(...).join("")` renders the result — Sessions 9 and 10 working together as a real search feature.
