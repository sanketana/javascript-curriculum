# Session 1 — Objects, Revisited

## Lesson Theme

Every app you will ever build is really just data with a face on it. Today you learn the shape that data almost always takes on the web — the object — and start building the "brain" of your first project before you give it a face.

## What You'll Build

The **Character Card Explorer**: a page that shows a grid of cards, one per anime or game character. This session you build its data model — an array of character objects — and get the first cards showing on the page. Over the next three sessions this same project grows into something genuinely slick; today you lay its foundation.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- Writing an object literal with keys and values
- Reading values back with dot notation (`character.name`) and bracket notation (`character["name"]`)
- Holding many records in an **array of objects** — the most common data shape on the web
- Reaching a value inside that array: pick the item, then the property (`characters[0].name`)
- **Object property shorthand** — `{ name, power }` instead of `{ name: name, power: power }`

**Thinking skills**
- Separating *data* from *display* — build the brain first, the face later
- Recognising a "felt need": you will build the page the clumsy way on purpose, so that next session's tool feels like a relief
- Reading the console as your instant feedback loop

## In Class

**0:00–0:08 — The hook: how does an app remember 100 characters?**
Start from what the student already knows. In the Beginner course they stored one thing in one variable: `let score = 0`. Ask: how would you store a character that has a name *and* an anime *and* a power *and* a role — all at once? Let them suggest four separate variables (`name1`, `anime1`, `power1`…) and feel how quickly that falls apart for 100 characters. That mess is the problem the object solves.

**0:08–0:20 — Objects revisited: one character, one object**
Open `code/app.js`. Together, build the `goku` object live. Emphasise: an object groups related values under labels called *keys*. Then read values back two ways:

```js
console.log(goku.name);       // dot notation
console.log(goku["power"]);   // bracket notation
```

Both give the same answer. Dot is what you'll use most; bracket matters later when the key lives in a variable — flag it now, don't dwell.

*Predict-then-run:* before running, ask the student what each of these prints. Then run them in the console to check.

```js
goku.role          // ?
goku["anime"]      // ?
goku.powerLevel    // ?  (trap: this key doesn't exist)
```

The third one prints `undefined` — a key you never set. This is worth 30 seconds: `undefined` is JavaScript's way of saying "there's nothing here," not an error.

**0:20–0:32 — An array of objects**
One character is rare; apps hold many. Introduce the `characters` array from `app.js` — an array where every item is an object. Draw it on paper or screen as a stack of index cards. To reach a value you make two moves: pick the card, then read the line.

```js
characters.length      // how many cards
characters[0]          // the whole first card
characters[0].name     // one line on the first card
```

Have the student log the *third* character's role themselves. This "array of objects, reached by index then property" is the shape they will see in every dataset for the rest of the course — name it clearly.

**0:32–0:42 — Property shorthand**
Show `makeCharacter` first in longhand, then in shorthand:

```js
return { name: name, anime: anime, power: power, role: role };  // longhand
return { name, anime, power, role };                            // shorthand — identical
```

The rule is small and exact: *when the variable name already matches the key, you can drop the `: value`.* It reads better and you'll see it everywhere in real code and framework tutorials. Build `tanjiro` with the function and `push` him into the array.

**0:42–0:55 — Give it a face (the clumsy way, on purpose)**
Open `index.html` with Live Server. Walk through the `render` function that glues HTML together with `+`:

```js
html += "<div class='card'>" + "<h2>" + c.name + "</h2>" + ...
```

Run it — real cards appear on the page. Celebrate that. Then be honest about the code: count the quotes and plus signs, notice how easy it is to lose a `"` or forget a space. Plant the seed: *"There is a much nicer way to build HTML from data. That's exactly what we start with next session."* Do **not** teach template literals today — let the annoyance sit.

**0:55–1:00 — Reflection**
The student saves their file, confirms the cards render, and adds one more character of their own to the array.

## Reflection

- In your own words, what is an object good for that a plain variable is not?
- You wrote `characters[0].name`. Explain what each of the two steps (`[0]` and `.name`) does.
- The `render` function was awkward to read. What specifically made it awkward? (Keep your answer — next session you'll see it disappear.)

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Card Explorer page; open this with Live Server
- `style.css` — the card grid styling (already done for you, so the focus stays on JavaScript)
- `app.js` — the in-class build, in the four steps above
- `homework.html` + `homework.js` — for homework; see `homework.md`

---

## Notes for the Teacher

**Setup check before the session**
- Confirm Live Server is installed and the student knows how to "Open with Live Server" (right-click `index.html`). If not, spend two minutes on it now — it recurs every session.
- Confirm the student can open the console (F12 → Console) and knows how to clear it.

**Common student mistakes**
- **Commas vs semicolons inside an object.** Keys are separated by commas, not semicolons. A stray semicolon between keys is the most common syntax error today.
- **`goku.name` vs `goku."name"`.** Dot takes a bare word; bracket takes a string in quotes. Mixing them (`goku."name"`) is a frequent slip.
- **Confusing the array index with the property.** Some students write `characters.name` expecting the first character. Reinforce the two-step: item first, then property.
- **Reading a missing key** returns `undefined` silently — no error. If a card shows `undefined`, the fix is almost always a mis-typed key.

**Anticipated questions**
- *"When would I ever use bracket notation?"* Say: "When the key you want is itself stored in a variable — for example the name of a column a user clicked. We'll hit a real case soon." Don't over-explain today.
- *"Why build the HTML the ugly way if there's a nicer way?"* This is the point. Tell them you want them to feel the problem so the solution lands. Resist demoing template literals early.

**Pacing note**
If the student is quick, let them add three or four of their own characters and re-render — extra reps on object literals are never wasted. If they're slower, it's fine to end at "cards on the page" and leave `push`/`makeCharacter` for a quick recap next session.
