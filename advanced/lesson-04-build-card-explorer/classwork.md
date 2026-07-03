# Session 4 — Build Day: Character Card Explorer

## Lesson Theme

Everything you learned in Arc A comes together today. No new syntax — this is a *build day*. You turn the static gallery into a real, interactive app: type to search and the grid filters instantly; fill a form and a new character appears. By the end you'll have a small application you'd be happy to show someone.

## What You'll Build

The finished **Character Card Explorer**:
- a **live search box** that filters the cards as you type
- an **"Add character" form** that creates a new card, using Session 3 defaults for any field left blank
- a header count that stays honest as things change ("Showing 4 of 7 characters")
- a friendly empty state when nothing matches

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills (all revisited, not new)**
- Objects and arrays of objects (S1) as the app's data
- Template literals and a `render` loop (S2) to paint the grid
- Destructuring and default parameters (S3) inside `cardHTML` and `makeCharacter`
- Array spread (S3) to add a character *immutably* — a new list, not an edited one
- Event handling (`input`, `submit`) to make the page respond

**Thinking skills**
- **One source of truth**: the `characters` array is the truth; the screen is just a picture of it. Change the data, then `render`.
- Building a feature in small, testable steps instead of all at once
- Filtering without mutating — search shows a *subset*, it never deletes anything

## In Class

This is a guided build in four checkpoints. After each one, the app should visibly do something new before you move on.

**0:00–0:06 — Orient**
Open the starter `app.js`. It's the Session 3 engine you already know: the `characters` array, `makeCharacter` with defaults, `cardHTML` with destructuring, and `render`. Note one change: `characters` is now `let`, because we're going to rebuild it when we add cards. Confirm the plain grid still renders.

**Checkpoint 1 — the render contract (0:06–0:14)**
Establish the rule the whole day depends on: *`render(list)` takes whatever list you give it and paints exactly that.* Add the empty-state branch and the "Showing X of Y" line. Test it by hand: call `render(characters.slice(0, 2))` in the console and watch only two cards appear. The screen obeys the list. That's the mental model for everything next.

**Checkpoint 2 — live search (0:14–0:30)**
Write `filterByText(list, query)` — a plain loop that keeps a character if the query appears in its name or anime (`.toLowerCase()` on both sides so case doesn't matter). Then wire the box:

```js
search.addEventListener("input", function () {
  render(filterByText(characters, search.value));
});
```

Test it live: type "titan", see the grid shrink to the Attack on Titan characters; clear the box, everything returns. Drive home *why nothing was deleted* — `filterByText` returns a new, smaller list; `characters` is untouched. Search is a lens, not a delete. (Flag lightly: next arc, one line — `filter()` — will replace this whole loop. Today we do it the long way so that shortcut means something.)

**Checkpoint 3 — add a character (0:30–0:48)**
Wire the form's `submit`. Three moves, each worth naming:

1. `event.preventDefault()` — stop the browser's default "reload the page on submit". Show what happens *without* it once (the page blinks and resets) so the line earns its place.
2. Read the four inputs. For the optional ones, pass `undefined` when blank so `makeCharacter`'s **defaults** fill in — a real payoff for Session 3.
3. Add immutably: `characters = [...characters, newChar]` — a brand-new array with the newcomer on the end — then `render(characters)` and `form.reset()`.

Test it: add a character with only a name and anime, and watch a full card appear with power 5000 and role "Rookie", straight from the defaults.

**Checkpoint 4 — polish (0:48–0:57)**
Small touches that make it feel finished: reset the search box after an add so the new card is visible, confirm the count updates, and check the empty state by searching for nonsense ("zzz"). Let the student add two or three of their own characters.

**0:57–1:00 — Reflection**

## Reflection

- The screen always matches the `characters` array. Describe the two-step rhythm you used every time something changed.
- Search never deleted anyone, but Add did change the list. What's the difference in what each one did to `characters`?
- Which single line stops the page reloading when you submit the form, and what would happen without it?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the page, now with a search box and an add form
- `style.css` — styling for the controls, cards, and empty state (done for you)
- `app.js` — the assembled build described above
- `practice.html` — the optional extra-practice project (self-contained); see below
- Homework extends `app.js` directly — see `homework.md`

## Additional Practice Project — Watchlist with Remove (for fast finishers)

*Optional. Reach for this when a student finishes the Card Explorer with time to spare.*

Build a **Watchlist**: add movies or shows to a list, and — the new part — **remove** any of them with a button on its card. Open `code/practice.html` with Live Server (one self-contained file).

The step up is handling clicks on items that didn't exist when the page loaded:

1. **A button per card.** Each card renders a `Remove` button carrying `data-index="${index}"`, so the button remembers which item it belongs to.
2. **Event delegation.** Instead of adding a listener to every button (there's a new set after each render), you add *one* listener to the container and check what was clicked: `if (event.target.classList.contains("remove"))`. One handler covers every card, forever — including cards you add later. This is the standard professional pattern for lists.
3. **Immutable remove.** Removing rebuilds the array with a loop that keeps every item *except* the clicked index — the mirror image of the immutable *add* you wrote in class.

**Challenges to push further** (pick any):
- Add a "Mark watched" button that toggles a `watched` flag and greys the card (use object spread to flip it immutably).
- Show a count of how many are still unwatched.
- Prevent adding a duplicate title (a loop check before the spread-add).

---

## Notes for the Teacher

**Setup check before the session**
- This session leans on event handling from the Beginner course. If the student is shaky on `addEventListener`, spend three minutes refreshing it before Checkpoint 2 — the rest of the day assumes it.

**Common student mistakes**
- **Forgetting `event.preventDefault()`.** The page reloads on submit and the new card seems to "not appear". If an add flashes and vanishes, this is almost always why.
- **Pushing into the old array vs. reassigning.** `characters.push(newChar)` would also work here, but we deliberately use `characters = [...characters, newChar]` to keep the immutable habit from Session 3. Either produces a correct app; if a student uses `push`, acknowledge it works and explain why we prefer the copy.
- **Reading `.value` once, too early.** Input values must be read *inside* the event handler (at submit time), not when the page loads. Reading them at the top gives empty strings forever.
- **Case-sensitive search.** Forgetting `.toLowerCase()` on both sides makes "Titan" and "titan" behave differently. Test with mixed case on purpose.
- **`Number("")` is `0`, not blank.** That's why the code checks `powerValue ? Number(powerValue) : undefined` — so a blank power field triggers the default rather than becoming `0`.

**Anticipated questions**
- *"Isn't rebuilding the whole grid on every keystroke wasteful?"* For a handful of cards, no — and it keeps the model dead simple (data changes → repaint). Note honestly that big apps optimise this, and that "repaint from data" is exactly the idea frameworks automate. Don't go further today.
- *"Can we save the characters so they survive a refresh?"* Great instinct — that's `localStorage`, which they may know from Beginner. It's a perfect stretch if there's time, but not required here.

**Pacing note**
This is a full session even for a fast student if they type it themselves rather than pasting. If they still finish early, the **Watchlist** extra-practice project (`code/practice.html`) adds remove-by-button and event delegation — genuinely new muscle, no new syntax. If the student is slower, it's completely fine to land the session at **search working** (Checkpoints 1–2) and carry the add-form into the start of next session; a working live-search app is a real, satisfying stopping point.
