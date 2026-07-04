# Session 13 — ES6 Classes

## Lesson Theme

You've built objects two ways: as plain literals (Arc A) and, in Session 8, as a single object with methods that use `this`. Both are fine for *one* object. But real programs need *many* similar objects — twenty questions, ten players, a hundred products — each with the same shape and the same behaviour. A **class** is the blueprint that stamps those out: define the shape and the methods once, then create as many objects as you want. This is object-oriented programming, and it's how most real code is organised.

## What You'll Build

The start of the **Quiz Game Engine** — a genuinely playable quiz. You'll write two classes: a `Question` (which knows its text, options, and answer, and can *check* a guess) and a `Quiz` (which holds the questions and *tracks* score and progress). Then you'll wire them to the page so clicking an option advances the quiz and, at the end, shows your score.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- Declaring a `class` with a `constructor` and methods
- Creating objects with `new`, and what `new` actually does
- Fields (`this.text`) and methods (`isCorrect()`) that live on every instance
- `this` inside a class method = the specific instance it was called on

**Thinking skills**
- Bundling *data* and the *behaviour that acts on it* into one unit
- Blueprint (class) vs object (instance) — one cutter, many cookies
- Recognising when repeated object literals are begging to be a class

## Concept Explainer: What a Class Really Is (and why OOP)

**Start with the pain.** Imagine a quiz with twenty questions. As plain objects you'd write `{ text: …, options: […], answerIndex: … }` twenty times — and every time you need to *check an answer*, you'd write the same `choice === question.answerIndex` logic again, scattered wherever you happen to need it. The *data* (a question's text and answer) and the *behaviour* (checking a guess) drift apart, and you repeat both. That scattering is the problem object-oriented programming was invented to solve.

**The core idea of OOP: keep data and behaviour together.** An object should carry both *what it is* (its data) and *what it can do* (its methods). A `Question` isn't just some text and an answer — it's a thing that can *tell you whether a guess is right*. A `Quiz` isn't just a list — it's a thing that *tracks your score as you play*. Bundling the two means the behaviour is defined once, right next to the data it works on, and every question in the world can use it.

**A class is the blueprint; instances are the objects.** The class is the *cookie cutter* — it describes the shape (which fields exist) and the behaviour (which methods exist), but it isn't itself a cookie. Each time you call `new Question(...)`, JavaScript runs the **constructor**, which builds one fresh object (a *cookie*) and fills in its own data. Twenty `new Question(...)` calls give you twenty independent objects that all share the same shape and the same methods, but each hold their own text and answer. You write the blueprint once; you get as many objects as you need.

**What `new` and `this` actually do.** `new Question("Capital?", […], 0)` does three things: it creates a blank object, runs the constructor with `this` pointing at that new object, and hands the finished object back. Inside the constructor, `this.text = text` writes onto *that specific* new object. And inside a method, `this` follows the exact rule you learned in Session 8 — the object *before the dot*. `q1.isCorrect(0)` runs `isCorrect` with `this` as `q1`. Classes aren't a new `this`; they're the same `this`, finally in the home it was built for.

**A little history and perspective.** Bundling data with behaviour into "objects" is one of the oldest big ideas in programming — it goes back to languages called Simula and Smalltalk in the 1960s and 70s, and it shaped Java, Python, C++, and most of what runs the world's software. JavaScript could always *make* objects, but for years you had to do it through an older, fiddlier mechanism (prototypes). The `class` keyword arrived in 2015 (ES2015) as a clean, familiar way to write the same thing — it's often called "syntactic sugar" over prototypes. You don't need the prototype details; you *do* need the idea, because classes are everywhere: every React class component, every model in a backend, every game entity. Today you're learning the shape of a huge fraction of real-world code.

## In Class

**0:00–0:12 — From repeated literals to a blueprint**
Show two question literals written out longhand, and the duplicated "is this right?" check written twice. Name the smell: same shape, same logic, copy-pasted. Then introduce `Question` as the blueprint. Walk the explainer's cookie-cutter picture.

**0:12–0:26 — Writing the `Question` class**
Build it together in `app.js`:

```js
class Question {
  constructor(text, options, answerIndex) {
    this.text = text;
    this.options = options;
    this.answerIndex = answerIndex;
  }
  isCorrect(choiceIndex) {
    return choiceIndex === this.answerIndex;
  }
}
```

Create one with `new`, and poke it in the console: `q1.text`, `q1.isCorrect(0)`, `q1.isCorrect(2)`. Emphasise `new` (runs the constructor, hands back the object) and `this` (the object being built / the one before the dot). Then make an *array* of `new Question(...)` — twenty questions would be twenty lines, each an independent object sharing the one blueprint.

**0:26–0:40 — The `Quiz` class: an object that tracks**
A second class, this time one that *holds state and changes over time*:

```js
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.current = 0;
    this.score = 0;
  }
  currentQuestion() { return this.questions[this.current]; }
  answer(choiceIndex) {
    if (this.currentQuestion().isCorrect(choiceIndex)) this.score = this.score + 1;
    this.current = this.current + 1;
  }
  isOver() { return this.current >= this.questions.length; }
}
```

Notice `Quiz` *uses* `Question`'s method (`this.currentQuestion().isCorrect(...)`) — objects working together. Walk one round in the console: `quiz.answer(1)`, then check `quiz.score` and `quiz.current`.

**0:40–0:54 — Make it playable**
Wire the DOM: `render` shows the current question and its options as buttons; a click calls `quiz.answer(index)` and re-renders; when `quiz.isOver()`, show the score and a "Play again" that makes a fresh `new Quiz(...)`. Play through it. The engine is just the two classes; the DOM is a thin layer on top.

**0:54–0:58 — Make it theirs**
The student adds their own `Question` to the array, or a method to `Quiz` — `percentage()` returning `this.score / this.questions.length * 100`.

**0:58–1:00 — Reflection**

## Reflection

- In your own words: what's the difference between a class and an instance?
- What three things does `new` do when you call `new Question(...)`?
- `Quiz` stores `score` and `current` and changes them as you play. Why is it handy that this data lives *inside* the quiz object rather than in loose variables?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Quiz Game Engine; open with Live Server (keep the console open)
- `style.css` — styling for the quiz card and options (done for you)
- `app.js` — the `Question` and `Quiz` classes, then the playable wiring
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Battle Arena (for fast finishers)

*Optional. Reach for this when a student finishes the quiz with time to spare.*

Build a **Battle Arena**: two fighters trade blows until one is knocked out. Open `code/practice.html` with Live Server (one self-contained file).

The step up is a method that acts on **another instance**:

1. **A `Fighter` class** with `name`, `hp`, and `power`, made twice into two independent fighters (`hero` and `rival`).
2. **`attack(other)` reaches into another object.** `hero.attack(rival)` lowers `rival.hp` by `hero.power`. One instance's method takes another instance as its argument and changes it — this is how game entities, and most interacting objects, actually work.
3. **A method that answers a question about itself** — `isKO()` returns whether this fighter's hp has hit zero, which the render uses to end the battle.

**Challenges to push further** (pick any):
- Add a `heal(amount)` method (capped at `maxHp`).
- Give each fighter a random hit (`power` ± a few) so battles vary.
- Make the two fighters trade blows automatically on a timer until one is KO'd.

---

## Notes for the Teacher

**Setup check before the session**
- Session 8's `this` rule ("the object before the dot") is the foundation here. If the student is shaky on it, spend two minutes refreshing before writing the first method.

**Common student mistakes**
- **Forgetting `this.` in the constructor (the bug hunt).** Writing `name = name` instead of `this.name = name` stores nothing on the object, so methods later read `undefined`. Every field you want to keep must be `this.something = ...`.
- **Forgetting `new`.** Calling `Question(...)` without `new` throws (`Class constructor cannot be invoked without 'new'`). Always `new` to make an instance.
- **Commas or `function` inside a class body.** Methods in a class are *not* separated by commas (unlike object literals), and you don't write the `function` keyword — just `isCorrect(x) { }`. Both are common slips coming from object-literal habits.
- **Thinking all instances share data.** Each `new` makes an independent object with its own fields. Two quizzes have two separate scores — a good thing to demonstrate.

**Anticipated questions**
- *"How is this different from the object with methods we made in Session 8?"* That was *one* object written by hand. A class is a *blueprint* for making *many* such objects without rewriting the shape or the methods. Same `this`, now reusable.
- *"Is a class a kind of function?"* Under the hood, yes-ish — but don't go there. Treat it as a blueprint; the mechanics don't help a 14-year-old today.
- *"Why `class` if objects already existed?"* Cleaner, familiar syntax for the "many objects, shared behaviour" pattern, and it's what every real codebase and framework uses. That's reason enough.

**Pacing note**
If the student is quick, have them add a `Quiz` method (`percentage`, `reset`) or more questions. If that isn't enough, move them to the **Battle Arena** extra-practice project (`code/practice.html`), where methods act on other instances. If the student is slower, land the session at "the `Question` class works and I can check answers in the console" — the `Quiz` wiring can carry into next session, which is all about multiple instances and inheritance anyway.
