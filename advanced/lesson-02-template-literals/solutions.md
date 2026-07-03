# Session 2 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it. Your wording may differ — what matters is that you used backticks and `${ }` correctly.

## Task 1 — Rewrite with a template literal

```js
console.log(`Soldier ${hero} recorded ${kills} takedowns.`);
```

Same sentence, no `+`, no easy-to-lose spaces. Notice the spaces now live *inside* the backtick string exactly where you want them.

## Task 2 — A multi-line profile

```js
function profile(name, anime, power) {
  return `Name: ${name}
Anime: ${anime}
Power: ${power}`;
}

console.log(profile("Levi", "Attack on Titan", 9500));
// Name: Levi
// Anime: Attack on Titan
// Power: 9500
```

The line breaks are real newlines you typed inside the backticks — no `\n` needed. (If your lines came out indented, it's because you indented them in the code; a backtick string keeps whatever spacing you type.)

## Task 3 — An expression inside `${ }`

```js
console.log(`${hero.toUpperCase()} scored ${kills * 2}!`);
// MIKASA scored 114!
```

Both holes hold an *expression*: a method call in the first, arithmetic in the second. The `${ }` runs each one and drops the result in.

## Task 4 — Bug hunt

```js
console.log('You bought a ${item}.');   // bug 1
console.log(`It cost $(cost) coins.`);  // bug 2
console.log(`Total: {cost} coins.`);    // bug 3
```

**Bug 1 — wrong quotes.** Single quotes are an ordinary string, so `${item}` is printed literally as text. Only **backticks** enable interpolation.

**Bug 2 — wrong bracket.** `$(cost)` uses round brackets. Interpolation needs **curly braces**: `${cost}`.

**Bug 3 — missing the dollar sign.** `{cost}` on its own is just text. The `$` is what tells JavaScript "a value goes here": `${cost}`.

Fixed:

```js
console.log(`You bought a ${item}.`);   // You bought a Sword.
console.log(`It cost ${cost} coins.`);  // It cost 300 coins.
console.log(`Total: ${cost} coins.`);   // Total: 300 coins.
```

A useful way to remember the shape: **dollar, curly, value, curly** — `${ … }`. Miss any part and you get plain text instead of the value.

## Stretch

Any extra interpolated field is correct as long as it's inside the backtick template, for example:

```js
<p class="tier">${c.name}'s power is ${c.power > 8000 ? "elite" : "solid"}</p>
```

Every card recomputes the decision from its own `power`, so some read "elite" and others "solid" — the data drives the words.
