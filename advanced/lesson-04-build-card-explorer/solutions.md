# Session 4 — Homework Solutions

Try each task yourself first. These show one correct approach; yours may differ in style and still be right. Every solution keeps the Arc A habit of *not* mutating the original `characters` array.

## Task 1 — Sort by power (loop, no `.sort()`)

```js
function sortByPower(list) {
  const remaining = [...list];   // copy, so we never disturb the original
  const sorted = [];
  while (remaining.length > 0) {
    // find the index of the strongest still remaining
    let bestIndex = 0;
    for (let i = 1; i < remaining.length; i++) {
      if (remaining[i].power > remaining[bestIndex].power) {
        bestIndex = i;
      }
    }
    // move that one across
    sorted.push(remaining[bestIndex]);
    remaining.splice(bestIndex, 1);
  }
  return sorted;
}

document.querySelector("#sort-power").addEventListener("click", function () {
  render(sortByPower(characters));
});
```

This is a selection sort by hand. It works on a *copy*, so `characters` stays in its original order — `render` just shows the sorted view. (Later in the course, `list.slice().sort((a, b) => b.power - a.power)` does the same in one line — but writing the loop once makes that shortcut meaningful.)

## Task 2 — Filter by minimum power

```js
function filterByMinPower(list, min) {
  const result = [];
  for (const c of list) {
    if (c.power >= min) result.push(c);
  }
  return result;
}

const minPower = document.querySelector("#min-power");
minPower.addEventListener("input", function () {
  const min = minPower.value ? Number(minPower.value) : 0;
  render(filterByMinPower(characters, min));
});
```

Combining both filters is just feeding one result into the next:

```js
function currentView() {
  let view = filterByText(characters, search.value);
  const min = minPower.value ? Number(minPower.value) : 0;
  view = filterByMinPower(view, min);
  return view;
}
// call render(currentView()) from BOTH the search and min-power handlers
```

Text filter first, power filter on that result — each step narrows a copy, and `characters` is never touched.

## Task 3 — Power up the whole roster

```js
document.querySelector("#power-up").addEventListener("click", function () {
  const boosted = [];
  for (const c of characters) {
    boosted.push({ ...c, power: c.power + 500 });   // new object per character
  }
  characters = boosted;   // swap in the new roster
  render(characters);
});
```

Every character becomes a fresh object with +500 power; the old objects are discarded rather than edited. Refresh-free, every bar grows at once. (This loop is a `map()` in disguise — Arc C will show you the shortcut.)

## Task 4 — Guard against empty adds

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const anime = animeInput.value.trim();
  if (name === "" || anime === "") {
    return;   // stop early — nothing added
  }
  // ... rest of the add logic
});
```

`.trim()` first, then the check, so a name of only spaces counts as empty. `return` leaves the handler without adding anything.

## Stretch — surviving a refresh with localStorage

```js
function save() {
  localStorage.setItem("characters", JSON.stringify(characters));
}

function load() {
  const saved = localStorage.getItem("characters");
  if (saved) {
    characters = JSON.parse(saved);
  }
}

// call load() once before the first render();
// call save() at the end of every handler that changes characters
```

`JSON.stringify` turns your array of objects into a string the browser can store; `JSON.parse` turns it back. Refresh the page and your roster is still there. Don't worry about the details yet — Arc E covers JSON properly. This is just proof of where all this is heading.
