# Session 2 — Template Literals

## Lesson Theme

Last session you built cards by gluing strings together with `+`, and you felt how awkward that was. Today you meet the tool that makes it disappear. By the end, your code for building HTML will look almost exactly like the HTML it produces — and your cards will look properly good.

## What You'll Build

You upgrade the **Character Card Explorer**. The clumsy `render` function from Session 1 gets rewritten with template literals, and each card grows up: a round avatar showing the character's initial, a power bar whose length comes from the data, and a live "Showing N characters" count in the header. Same project, real glow-up.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- Writing a **template literal** with backticks (`` ` ``) and `${ }` interpolation
- Dropping any **expression** — not just a variable — inside `${ }`
- Writing clean **multi-line** strings without `\n` or `+`
- Returning a block of HTML from a helper function and interpolating data into text, attributes, and inline styles

**Thinking skills**
- Recognising the payoff of a "felt need" — you asked for something better last session; now you see why it exists
- Reading a template as a picture of its output (the code *shapes* like the result)
- Keeping one job in one small function (`cardHTML` builds a card; `render` places them)

## In Class

**0:00–0:07 — Reopen the wound**
Open Session 1's `app.js` and look at the old `render` again:

```js
html += "<div class='card'>" + "<h2>" + c.name + "</h2>" + "<p>" + c.anime + "</p>" + ...
```

Ask the student to find the bug in this deliberately broken line, out loud:

```js
const line = "Player " + name "scored " + score;   // what's wrong?
```

(A missing `+` after `name`.) The point lands fast: the `+`-and-`"`-soup is not just ugly, it's *error-prone*. Today we delete it.

**0:07–0:20 — Template literals, from the ground up**
In `app.js`, walk the four console demos. The whole idea is two symbols: the backtick that starts and ends the string, and `${ }`, a hole you drop a value into.

```js
console.log("Player " + player + " is on level " + level + ".");   // old
console.log(`Player ${player} is on level ${level}.`);             // new — same result
```

*Predict-then-run.* Before running, ask what each of these prints, then check in the console:

```js
`${player} + ${level}`             // trap: the + is now just text, not maths
`${player.toUpperCase()}`          // an expression, not just a name
`Sum: ${level + 8}`                // maths happens inside the hole
```

Two things to make explicit: (1) the backtick is **not** the normal quote — it's the key above Tab, left of 1; and (2) *anything that produces a value* can go inside `${ }`, including method calls and arithmetic. Then show the multi-line demo — backtick strings keep your line breaks, no `\n` needed.

**0:20–0:35 — Rebuild the card**
This is the heart of the session. Together, write `cardHTML(c)` and put the old and new side by side:

```js
// Session 1 — gluing:
"<h2>" + c.name + "</h2>"

// Session 2 — a template:
`<h2>${c.name}</h2>`
```

Then build the whole multi-line card in `app.js`. Have the student notice: the function body is *shaped like the HTML*. You can read the structure at a glance — the `<div>`, the `<h2>`, the `<p>` — because the code and the output finally match. Emphasise that a value can land in three different places: in **text** (`${c.name}`), and — coming up next block — inside an **attribute** and an **inline style**.

**0:35–0:48 — Make it look good (data-driven styling)**
Now swap the old `render` to call `cardHTML`, and add the two upgrades that use interpolation in new places:

- **The avatar** interpolates a computed value: `const initial = c.name[0];` then `<div class="avatar">${initial}</div>`.
- **The power bar** interpolates into an *inline style*: `style="width: ${barWidth}%"`, where `barWidth` is `Math.min(100, c.power / 100)`. Refresh and watch the bars come out different lengths straight from the data — Levi's is longest, Tanjiro's shortest. This is the moment the data visibly *drives* the design.

Finally, the header count:

```js
summary.textContent = `Showing ${characters.length} characters`;
```

**0:48–0:57 — Make it theirs**
The student adds two characters of their own to the array (their power values will change their bar lengths), and then changes the `power` line in `cardHTML` to show an expression, for example:

```js
<p class="power">Power: ${c.power} ${c.power > 9000 ? "(over 9000!)" : ""}</p>
```

Let them discover that a whole decision can live inside `${ }`.

**0:57–1:00 — Reflection**
Save, refresh, confirm the cards, avatars, bars, and count all render from the data.

## Reflection

- In one sentence, what does `${ }` do?
- The backtick isn't the normal quote. Where is it on your keyboard, and what happens if you use `'` or `"` by mistake?
- You put a value into text, into an attribute, and into an inline style today. Which felt most surprising that it was even possible?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Card Explorer page; open this with Live Server
- `style.css` — updated styling for avatars and power bars (done for you)
- `app.js` — the in-class build: template-literal basics, then the rebuilt card
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Game Store (for fast finishers)

*Optional. Reach for this when a student finishes the main build with time to spare — it fills the rest of the hour with a fresh challenge that uses only today's tools and no new syntax.*

Build a **Game Store**: a grid of game cards, each game an object with `title`, `genre`, `price`, and `rating`. Open `code/practice.html` with Live Server — it's a single self-contained file.

The step up from the main lesson is what you put *inside* `${ }`. So far you've interpolated values and simple expressions. Here you go further:

1. **A conditional badge.** `gameCard` builds a `badge` with a ternary: games rated 8.5 or higher get a `TOP RATED` ribbon, the rest get an empty string. Then `${badge}` drops either the ribbon or nothing into the card. A whole *if/else decision*, living inside a template.
2. **A formatted number.** `${g.rating.toFixed(1)}` calls a method right inside the hole, so `9` shows as `9.0`. The `${ }` doesn't care that it's a method call — it only cares that a value comes out.
3. **Prices in ₹**, straight from the data.

**Challenges to push further** (pick any):
- Add a `SALE` badge and show a discounted price, e.g. `₹${Math.round(g.price * 0.8)}` for 20% off. (What happens if a game is both top-rated *and* on sale — can a card show two badges?)
- Add a `players` field (`"1 player"`, `"1-4 players"`) and show it.
- Make the badge text itself depend on the rating: `LEGENDARY` for 9+, `TOP RATED` for 8.5+, nothing below.

---

## Notes for the Teacher

**Setup check before the session**
- Have Session 1's `app.js` open in a spare tab — the whole lesson hinges on the before/after contrast, so make it visible, don't just describe it.
- Confirm the student knows where the backtick key is *before* you need it. On most keyboards it's top-left, sharing a key with `~`. On some non-US layouts it's elsewhere — locate it now to avoid a five-minute hunt mid-lesson.

**Common student mistakes**
- **Straight quotes instead of backticks.** `"Hello ${name}"` prints the literal text `${name}` — no error, just wrong output. This is *the* signature bug of the session. When output looks wrong rather than crashing, suspect the quote type first.
- **`$(name)` or `{name}` instead of `${name}`.** The dollar sign and the braces are both required, in that order. Missing either one turns the interpolation into plain text.
- **Backticks around HTML but forgetting them inside nested strings.** In `class="card"`, the quotes are ordinary quotes inside the backtick string — that's fine and expected. Some students try to convert those too.
- **Expecting `${ }` to run statements.** It evaluates an *expression* (something with a value). `${ if (x) ... }` fails; `${ x ? a : b }` works. Keep this light unless it comes up.

**Anticipated questions**
- *"Why not always just use `+`?"* You can, and it works — but templates are readable, handle multi-line naturally, and make embedding values into HTML far less error-prone. Point at the two versions of the card as the argument.
- *"Is `innerHTML` the best way to do this?"* For now, yes — it's the clearest. Later in the course we'll talk about its limits (and why frameworks exist), but don't derail into that today.

**Pacing note**
If the student is quick, first let them add several characters and experiment with expressions inside `${ }` (a `role`-based emoji-free badge, a computed rank). If that isn't enough to fill the hour, move them to the **Game Store** extra-practice project above (`code/practice.html`): it reuses today's tools but pushes into conditional and formatted interpolation, keeping a strong student stretched. If the student is slower, skip Game Store entirely — it is never required — and it's fine to end once the rebuilt cards, avatars, and bars render correctly.
