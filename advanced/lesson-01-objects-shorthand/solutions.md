# Session 1 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it — if you read the answer before struggling a little, the idea won't stick. Your characters and villains will differ from these; what matters is the *shape* of the answer.

## Task 1 — Your own character

```js
const myHero = {
  name: "Saitama",
  anime: "One Punch Man",
  power: 10000,
  role: "Hero",
};

console.log(myHero.name);       // "Saitama"
console.log(myHero["power"]);   // 10000
```

Both notations reach the same object. Dot is the everyday choice; bracket is the one to remember for later.

## Task 2 — An array of three villains

```js
const villains = [
  { name: "Frieza",  anime: "Dragon Ball Z",   power: 12000, role: "Emperor" },
  { name: "Muzan",   anime: "Demon Slayer",     power: 15000, role: "Demon King" },
  { name: "Eren",    anime: "Attack on Titan",  power: 9800,  role: "Titan" },
];

console.log("There are " + villains.length + " villains.");   // There are 3 villains.
```

`length` counts the items in the array — here, three whole objects.

## Task 3 — Property shorthand

```js
function makeVillain(name, anime, power, role) {
  return { name, anime, power, role };
}

const boss = makeVillain("Aizen", "Bleach", 13000, "Traitor");
console.log(boss);   // { name: "Aizen", anime: "Bleach", power: 13000, role: "Traitor" }
```

Because each parameter name already matches the key we want, shorthand does the whole job. Writing `{ name: name, anime: anime, ... }` would be correct too — just noisier.

## Task 4 — Bug hunt

The broken version:

```js
function listNames(chars) {
  for (const c of char) {     // bug 1: "char" is not defined — should be "chars"
    console.log(c[name]);     // bug 2: "name" here is treated as a variable, not the key
  }
}
```

**Bug 1** — the loop says `of char`, but the array passed in is called `chars`. `char` doesn't exist, so the browser throws `ReferenceError: char is not defined`.

**Bug 2** — `c[name]` uses bracket notation with `name` *without quotes*, so JavaScript looks for a variable called `name` rather than the key `"name"`. Use dot notation, or put the key in quotes.

Fixed:

```js
function listNames(chars) {
  for (const c of chars) {
    console.log(c.name);      // or c["name"]
  }
}

listNames(villains);          // Frieza, Muzan, Eren
```

This second bug is the exact reason bracket notation needs quotes: `c["name"]` means "the key spelled n-a-m-e," while `c[name]` means "the key whose name is stored in the variable `name`." Two different things that look almost identical.

## Stretch

Adding a key changes nothing structurally:

```js
{ name: "Frieza", anime: "Dragon Ball Z", power: 12000, role: "Emperor", element: "Ice" }
```

Objects hold as many keys as you give them. Nothing in your loops or logs breaks, because they only ask for the keys they need.
