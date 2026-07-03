# Session 3 — Destructuring, Spread & Rest, Defaults

## Lesson Theme

You can already build objects and turn them into cards. Today you learn the modern habits for the *other* direction: pulling data cleanly out of objects, and combining objects and arrays without breaking the originals. These four small tools — destructuring, spread, rest, and default parameters — are everywhere in React and Node code. Learn them now and framework tutorials stop looking like a foreign language.

## What You'll Build

No visual change today — this is a "sharpen the tools" session. You refactor the Card Explorer so `cardHTML` **destructures** each character, you merge two lists (heroes and villains) with **spread**, you add characters with sensible **defaults**, and you create an "ascended" version of a character with **object spread** — a stronger copy that leaves the original untouched. Same cards, much cleaner engine underneath.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- **Object destructuring**: `const { name, power } = character;`
- **Array destructuring**: `const [first, second] = list;`
- **Default values while destructuring**: `const { role = "Unknown" } = character;`
- **Spread on arrays**: `[...heroes, ...villains]` to copy and merge
- **Spread on objects**: `{ ...character, power: 9999 }` to copy and override
- **Rest parameters**: `function team(...members)` to collect any number of arguments
- **Default parameters**: `function make(name, power = 5000)`

**Thinking skills**
- The idea of an *immutable update*: make a new copy instead of changing the original (the exact mindset React relies on)
- Seeing that `...` means two related things depending on where it sits — gather, or spread out
- Reducing repetition so intent is easier to read

## In Class

**0:00–0:06 — The repetition we're about to kill**
Open Session 2's `cardHTML`. Point at the top: every line reads `c.name`, `c.anime`, `c.power`, `c.role`. Ask: "what if this card had ten fields?" That `c.` on every line is the small friction we remove first.

**0:06–0:18 — Destructuring: unpacking an object**
Introduce it as *unpacking a box into labelled variables*:

```js
const c = { name: "Goku", anime: "Dragon Ball Z", power: 9001, role: "Fighter" };
const { name, anime, power, role } = c;   // four variables, one line
console.log(name, power);
```

Rewrite `cardHTML` to destructure at the top, then use plain `name`, `power`, etc. in the template. The card output is identical — that's the point; cleaner input, same output.

*Predict-then-run.* Ask what these give, then check:

```js
const { role } = { name: "Yuki" };            // role is... ?  (undefined)
const { role = "Unknown" } = { name: "Yuki" }; // role is... ?  ("Unknown")
```

The second is a **default while destructuring** — a fallback if the key is missing. Then show **array destructuring** by position:

```js
const [champion, runnerUp] = characters;   // first two, by their place in the array
```

Stress the bracket difference: `{ }` unpacks an object *by key name*, `[ ]` unpacks an array *by position*.

**0:18–0:30 — Spread: copy, merge, override**
Introduce `...` on arrays first, because it's the most visual:

```js
const characters = [...heroes, ...villains];   // a new array with all of both
```

Emphasise "a **new** array" — `heroes` and `villains` are untouched. Then the object form, which is the powerful one:

```js
function ascend(c) {
  return { ...c, power: c.power + 3000, role: "Ascended " + c.role };
}
```

Read it aloud: "copy everything from `c`, then override `power` and `role`." Run `characters[0] = ascend(characters[0])` and refresh — Goku's bar is now maxed and his role reads "Ascended Fighter", but nothing else changed. Make the immutability explicit: `ascend` never edited the old Goku; it built a new one. Tell them plainly: *this exact pattern is how React updates state.* Plant it, don't lecture.

**0:30–0:40 — Default parameters**
Different from defaults-in-destructuring, same spirit — a fallback when an *argument* is missing:

```js
function makeCharacter(name, anime, power = 5000, role = "Rookie") {
  return { name, anime, power, role };
}
makeCharacter("Yuki", "Original");   // power → 5000, role → "Rookie"
```

Add Yuki to the array and refresh — a full card appears from just two arguments. The defaults filled the rest.

**0:40–0:50 — Rest parameters: gathering the unknown**
Now the *other* meaning of `...`. In spread it fans values out; as a **rest parameter** it gathers them in:

```js
function announce(title, ...names) {
  console.log(`${title}: ${names.length} fighters`);
  for (const n of names) console.log(`- ${n}`);
}
announce("Tournament", "Goku", "Mikasa", "Frieza", "Muzan");
```

The key idea: `...names` scoops up *however many* arguments follow into a real array you can loop over. Show that it must be the **last** parameter — nothing can come after the gatherer.

**0:50–0:57 — Make it theirs**
The student writes their own `ascend`-style function — maybe `weaken` (subtract power) or `rename` (`{ ...c, name: "..." }`) — and applies it to one character, confirming the original list item is unchanged when they log it.

**0:57–1:00 — Reflection**

## Reflection

- `{ }` and `[ ]` are both used for destructuring. When do you use each?
- `...` did two opposite-sounding jobs today: spread and rest. In one sentence each, what's the difference?
- `ascend` made a stronger character without changing the original. Why might "don't change the original, make a new one" be a safer habit than editing in place?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Card Explorer page; open with Live Server
- `style.css` — unchanged from Session 2 (no visual change today)
- `app.js` — the refactor: destructured `cardHTML`, spread-merged lists, defaults, rest
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Hero Creator (for fast finishers)

*Optional. Reach for this when a student finishes the refactor with time to spare.*

Build a **Hero Creator**: a roster where each hero starts from a set of sensible defaults and only overrides what makes them special. Open `code/practice.html` with Live Server — one self-contained file.

The step up is the single most useful spread pattern in real apps:

1. **The `{ ...defaults, ...custom }` merge.** `makeHero(custom)` starts from `defaultHero` and spreads `custom` *after* it, so any key the caller provides wins and the rest fall back to defaults. `makeHero({ name: "Rook" })` produces a complete hero from one field. This is exactly how components merge "props with defaults" — you're meeting a framework idea early.
2. **Order matters.** Because `custom` comes second, it overrides. Swap the order and defaults would clobber the custom values instead — a great thing to try and see break.
3. **Renaming while destructuring.** `class` is a reserved word in JavaScript, so `heroCard` pulls it out as `const { class: heroClass } = hero;`. You can rename any key as you unpack it.

**Challenges to push further** (pick any):
- Add a hero who overrides `hp` and `weapon` but keeps the default `class`.
- Add a new default field (`level`, `element`) — confirm every existing hero picks it up for free.
- Deliberately swap the spread order in `makeHero` to `{ ...custom, ...defaultHero }`, refresh, and explain why every hero suddenly looks identical.

---

## Notes for the Teacher

**Setup check before the session**
- Session 2's `cardHTML` open in a spare tab — the destructuring refactor is best shown as a direct before/after.

**Common student mistakes**
- **Wrong brackets.** `const [name] = character` on an object gives nonsense (or an error); objects need `{ }`. Arrays need `[ ]`. This is the top error of the day.
- **Destructuring names must match keys.** `const { fullName } = character` is `undefined` if the key is `name`. To rename, it's `const { name: fullName } = character`.
- **Spread is a *shallow* copy.** Fine for this lesson's flat objects. Don't raise nested-object copying unless a sharp student asks — it's a later concern.
- **Rest parameter must be last.** `function f(...items, last)` is a syntax error. Only one rest parameter, only at the end.
- **Confusing the two `...`.** In a function's parameter list, `...` gathers (rest). Everywhere else — array/object literals, function *calls* — it spreads. Same symbol, opposite direction; anchor it to "where it sits."

**Anticipated questions**
- *"Why make a copy instead of just changing the object?"* Give the honest short answer: changing shared objects in place causes bugs that are hard to trace, and the whole React ecosystem is built on "new copy, not edit." They'll feel the payoff later; for now, it's a good habit.
- *"Are default parameters and defaults-in-destructuring the same?"* Same idea (a fallback), two locations: one for missing *arguments*, one for missing *keys*. Show both side by side if it helps.

**Pacing note**
If the student is quick, have them add a second transform (`weaken`, `rename`, `clone`) and chain a couple, always checking the original is intact. If that isn't enough, move them to the **Hero Creator** extra-practice project (`code/practice.html`), which drills the `{ ...defaults, ...custom }` merge and key-renaming. If the student is slower, it's fine to land the session at "destructured `cardHTML` + spread-merged list" and leave rest parameters as a quick demo you run for them rather than one they write.
