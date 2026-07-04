# Session 9 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — `forEach` for a side effect

```js
tracks.forEach((t) => {
  console.log(`${t.title} by ${t.artist}`);
});
// Sunrise by Lumen
// Drift by Halcyon
// Neon by Lumen
// Echoes by Vesper
```

`forEach` visits each track and runs your function. You're logging (a side effect), not building a value, so `forEach` is exactly right.

## Task 2 — `map` to values

```js
const titles = tracks.map((t) => t.title);
console.log(titles);   // ["Sunrise", "Drift", "Neon", "Echoes"]
```

`map` collects whatever your function returns into a new array — here, one title per track.

## Task 3 — `map` to new objects

```js
const withMinutes = tracks.map((t) => {
  return { ...t, minutes: (t.seconds / 60).toFixed(1) };
});
console.log(withMinutes);
console.log(tracks[0].minutes);   // undefined — the original is untouched
```

Each new object is a spread copy of the track plus a `minutes` field. Because `map` builds a *new* array of *new* objects, the original `tracks` never gains a `minutes` field — which is why `tracks[0].minutes` is `undefined`.

(Note: `toFixed(1)` returns a *string* like `"3.5"`. That's fine for display. If you wanted a number you'd wrap it: `Number((t.seconds / 60).toFixed(1))`.)

## Task 4 — Bug hunt

The mapping function has a `{ }` block body but never returns, so every item maps to `undefined`:

```js
const labels = tracks.map((t) => {
  `${t.title} — ${t.artist}`;   // computed, then thrown away — no return
});
```

Two correct fixes:

```js
// Fix A — add return
const labels = tracks.map((t) => {
  return `${t.title} — ${t.artist}`;
});

// Fix B — drop the braces so the expression auto-returns
const labels = tracks.map((t) => `${t.title} — ${t.artist}`);

console.log(labels);
// ["Sunrise — Lumen", "Drift — Halcyon", "Neon — Lumen", "Echoes — Vesper"]
```

Same rule you met with arrow functions in Session 5: a braced body needs an explicit `return`. It's easy to miss inside a `map` because the function is tucked into the call.

## Stretch — render to the page

```js
const list = document.querySelector("#list");
list.innerHTML = tracks.map((t) => `<p>${t.title} — ${t.artist}</p>`).join("");
```

The exact pattern from class: map each track to an HTML string, `join("")` into one string, drop it into the page. Once you've seen it, you'll reach for `map(...).join("")` every time you turn data into markup.
