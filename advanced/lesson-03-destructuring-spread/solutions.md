# Session 3 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — Destructure

```js
const { name, power } = fighter;
console.log(`${name} has ${power} power`);   // Levi has 9500 power
```

One line unpacks two variables. After this, `name` and `power` stand on their own — no `fighter.` needed.

## Task 2 — Object spread, no mutation

```js
function buffPower(character) {
  return { ...character, power: character.power + 1000 };
}

const stronger = buffPower(fighter);
console.log(stronger.power);   // 10500
console.log(fighter.power);    // 9500 — the original is untouched
```

`{ ...character, power: ... }` copies every key, then overrides `power`. Because it builds a brand-new object, the original `fighter` never changes. If you had written `character.power = character.power + 1000` instead, `fighter.power` would have become `10500` too — that's the mutation bug this task is checking for.

## Task 3 — Default parameters

```js
function makeItem(name, price = 100, rarity = "common") {
  return { name, price, rarity };
}

console.log(makeItem("Potion"));
// { name: "Potion", price: 100, rarity: "common" }

console.log(makeItem("Excalibur", 9999, "legendary"));
// { name: "Excalibur", price: 9999, rarity: "legendary" }
```

When you leave an argument out, its default is used. When you pass one, yours wins.

## Task 4 — Bug hunt

The broken lines:

```js
const [a, b] = fighter;            // bug: [ ] destructures by POSITION, for arrays
const merged = [squadA, squadB];   // bug: this makes [ [...], [...] ] — a nested array
```

**Bug 1** — `fighter` is an object, so it must be unpacked by *key* with `{ }`, not by position with `[ ]`. Objects have no "first" or "second".

**Bug 2** — putting two arrays inside `[ ]` nests them: `merged.length` would be `2` (two arrays), and `merged[0]` would be the whole first array. To *merge*, spread each one so their items land side by side.

Corrected:

```js
const { name, power } = fighter;         // objects → { }
const merged = [...squadA, ...squadB];   // spread each array's items in
console.log(merged.length);              // 4
```

## Stretch — rest + spread together

```js
function mergeSquads(...squads) {
  let all = [];
  for (const squad of squads) {
    all = [...all, ...squad];   // grow the combined array, squad by squad
  }
  return all;
}

console.log(mergeSquads(["Goku", "Mikasa"], ["Frieza"]).length);            // 3
console.log(mergeSquads(["A"], ["B", "C"], ["D", "E", "F"]).length);        // 6
```

`...squads` gathers however many arrays you pass into one array of arrays; the loop then spreads each one into `all`. This is both meanings of `...` working together — gather on the way in, spread on the way out.
