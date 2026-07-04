# Session 15 — Build Day: Quiz Game Engine

## Lesson Theme

Everything from Arc D comes together today. No new syntax — this is a build day. You assemble the classes you've written — `Question`, `TrueFalseQuestion`, `Player` — and a `Quiz` that runs the whole show, into one complete, genuinely fun **two-player quiz game**. By the end you'll have an app that shows why objects-with-methods is how real programs are built.

## What You'll Build

A **pass-and-play quiz** for two players. Players take turns: the current player sees a question (some multiple-choice, some True/False), picks an answer, scores a point if right, and hands over to the other player. After six questions the game shows both scores, crowns the winner (or declares a tie), and offers a rematch.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills (all revisited, not new)**
- Classes, `new`, and methods (Session 13)
- Inheritance with `extends`/`super`, and a static helper (Session 14)
- `map`/`filter`/`reduce` from Arc C to render and to judge the winner
- Event delegation and "render from state" from earlier arcs

**Thinking skills**
- Assembling several small classes into one working system
- Keeping game state in objects and rebuilding the view from it
- Seeing how `Quiz` *coordinates* `Question`s and `Player`s without redoing their work

## In Class

A guided build in four checkpoints. After each, the game does something new before you move on.

**0:00–0:06 — Bring the engine together**
Open `app.js`. Paste in the classes you already wrote across Sessions 13–14: `Question`, `TrueFalseQuestion` (which `extends Question`), and `Player` (with `addPoints` and the static `leader`). Nothing new — just gathering the parts in one place. Confirm in the console that `new TrueFalseQuestion("...", true).isCorrect(0)` still works.

**Checkpoint 1 — the `Quiz` coordinator (0:06–0:22)**
Write the `Quiz` class that runs everything. It holds the questions *and* the players, and tracks two positions — which question, and whose turn:

```js
class Quiz {
  constructor(questions, players) {
    this.questions = questions;
    this.players = players;
    this.current = 0;
    this.turn = 0;
  }
  currentQuestion() { return this.questions[this.current]; }
  currentPlayer()   { return this.players[this.turn]; }
  answer(choiceIndex) {
    if (this.currentQuestion().isCorrect(choiceIndex)) this.currentPlayer().addPoints(1);
    this.current = this.current + 1;
    this.turn = (this.turn + 1) % this.players.length;   // pass to the next player
  }
  isOver() { return this.current >= this.questions.length; }
}
```

The key idea to say out loud: `Quiz` doesn't know *how* a question checks an answer or *how* a player scores — it just asks them (`isCorrect`, `addPoints`). Each object does its own job; `Quiz` coordinates. Test one round in the console by making a quick throwaway instance first — `const quiz = new Quiz([new Question("2+2?", ["3","4"], 1)], [new Player("A"), new Player("B")])` — then call `quiz.answer(1)` and check `quiz.current`, `quiz.turn`, and the players' scores. (The real question set arrives in `buildQuiz()` at Checkpoint 4.)

**Checkpoint 2 — the play screen (0:22–0:36)**
Write `render` for the in-progress state: the current player's turn badge, the question, its options as buttons (`map` + `join`), and a running score line. Wire the option clicks with event delegation → `quiz.answer(index)` → `render()`. Play a few questions — the turn should alternate and scores should climb.

**Checkpoint 3 — the results screen (0:36–0:48)**
Add the `isOver()` branch to `render`. Show both final scores (`map`), and decide the outcome. Use the static helper for the winner, and `filter` to catch a tie:

```js
const top = quiz.winner();                                   // Player.leader(...)
const isTie = quiz.players.filter((p) => p.score === top.score).length > 1;
```

Show `"<name> wins!"` or `"It's a tie!"`, and highlight the winner's card. Play a full game to the end.

**Checkpoint 4 — rematch (0:48–0:54)**
Add "Play again". The trick: a `buildQuiz()` function that returns a *fresh* `Quiz` with *new* `Player` objects (so scores reset to zero). Point the restart button at `quiz = buildQuiz(); render();`. Play, finish, rematch — the loop is complete.

**0:54–1:00 — Reflection**
The student adds one of their own questions (multiple-choice or True/False) to `buildQuiz()` and confirms it just works.

## Reflection

- `Quiz` never checks an answer or adds a score itself — it calls `isCorrect` and `addPoints`. Why is it good that each object handles its own job?
- Adding a `TrueFalseQuestion` needed no change to `Quiz`. Why did inheritance make that free?
- "Play again" builds brand-new `Player` objects instead of reusing the old ones. Why does that reset the scores?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Quiz Game; open with Live Server
- `style.css` — styling for the quiz card, scores, and results (done for you)
- `app.js` — the assembled game described above
- `practice.html` — the optional extra-practice project (self-contained); see below
- Homework extends `app.js` directly — see `homework.md`

## Additional Practice Project — Virtual Pet (for fast finishers)

*Optional. Reach for this when a student finishes the quiz game with time to spare.*

Build a **Virtual Pet**: a pet with hunger, happiness, and energy that you keep balanced with Feed, Play, and Rest buttons. Open `code/practice.html` with Live Server (one self-contained file).

The step up is a class that is *all about its state*:

1. **Several interacting stats.** `feed`, `play`, and `rest` each change *more than one* stat — playing raises happiness but costs energy and builds hunger. Real objects rarely change just one thing.
2. **A helper method the others reuse.** `clamp(value)` keeps every stat between 0 and 100, and all three actions call it. A method calling another method on the same object (`this.clamp(...)`) is a common, tidy pattern.
3. **A derived value.** `mood()` doesn't store anything — it *computes* a word ("Happy", "Starving") from the current stats each time it's asked. Behaviour that reads state and returns a conclusion.

**Challenges to push further** (pick any):
- Make time pass: every few seconds hunger rises and energy drops (a `setInterval` calling a `tick()` method).
- Add a `Dog extends Pet` that also has a `fetch()` method.
- End the game ("Your pet ran away") if hunger hits 100.

---

## Notes for the Teacher

**Setup check before the session**
- The student needs their Session 13–14 classes. If they don't have them handy, the starter `app.js` includes them — but let the student type/paste their own first if possible, for ownership.

**Common student mistakes**
- **Advancing the question but not the turn (or vice-versa).** `answer` must bump *both* `this.current` and `this.turn`. Forgetting the turn means one player answers everything.
- **Turn wrap-around.** `this.turn = (this.turn + 1) % this.players.length` cycles back to 0. Writing `this.turn + 1` without the `%` runs off the end of the players array on the third question.
- **Reusing players on restart.** If "Play again" reuses the same `Player` objects, their scores are still high. Building fresh players (via `buildQuiz`) is what resets the game — the same immutability-flavoured habit from earlier arcs.
- **Reading option index as a string.** `dataset.index` is a string; `answer` compares with `===` to a number. `Number(...)` the dataset value (as the code does).

**Anticipated questions**
- *"Could three or four players work?"* Yes — the `% this.players.length` already handles any number. Add players to `buildQuiz` and it just works. A great thing to demo.
- *"Why is `winner()` on `Quiz` when `leader` is on `Player`?"* `Quiz.winner()` is a convenience that *delegates* to `Player.leader(this.players)`. It's fine — and normal — for one object's method to call another's.

**Pacing note**
This is a full, satisfying session. If the student finishes early, the **Virtual Pet** extra-practice project (`code/practice.html`) is a fresh, stateful class to build. If the student is slower, land the session at **Checkpoints 1–2** (a playable round with turns and scores) — a working two-player quiz without the fancy results screen is still a real game — and add results + rematch at the start of next time. Either way, this closes Arc D: pause and notice that the student has built a real object model — questions that check themselves, players that score themselves, and a quiz that runs the whole thing.
