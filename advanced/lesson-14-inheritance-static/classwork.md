# Session 14 — Instances, Static & Inheritance

## Lesson Theme

Yesterday you wrote your first classes. Today you learn the three things that make classes genuinely powerful once a program grows: making **many independent instances** from one blueprint, giving a class **static** members that belong to the class itself rather than to any one object, and letting one class **inherit** from another so you never rewrite shared behaviour. These are the moves that turn "a class" into "an object model".

## What You'll Build

You extend the **Quiz Game Engine** in two directions. First, a `Player` class with a live **scoreboard** — several players, each keeping their own score (many instances), with the current leader highlighted by a **static** helper. Second, a `TrueFalseQuestion` that **inherits** from `Question`, getting all of `Question`'s behaviour for free while presetting its own options.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- Creating and managing **many instances** of one class
- **Instance** members (`this.score`, `addPoints`) vs **static** members (`Player.leader`)
- **Inheritance** with `extends`, and calling the parent constructor with `super(...)`
- Overriding and inheriting methods; `instanceof`

**Thinking skills**
- Deciding whether behaviour belongs to *an object* or to *the class as a whole*
- Spotting shared behaviour that a base class should own once
- Reading `extends` as "is a kind of" ("a TrueFalseQuestion *is a* Question")

## In Class

**0:00–0:10 — Many instances, one blueprint**
Recall Session 13: `new` makes an object. Now lean into *many*. Build the `Player` class with `name`, `score`, and an **instance** method `addPoints`. Make three players in an array and give them different points in the console. Reinforce the core fact: each `new Player(...)` is independent — `players[0].addPoints(2)` never touches `players[1]`. This is what "instance" means: one of many, with its own data.

**0:10–0:24 — Instance vs static**
Pose the question: "where does *find the leader* belong?" Finding the top scorer isn't about *one* player — it's about the group. So it shouldn't be an instance method. Introduce **static**:

```js
class Player {
  addPoints(points) { this.score += points; }        // instance: about ONE player
  static leader(players) {                            // static: about players in general
    return players.reduce((best, p) => (p.score > best.score ? p : best), players[0]);
  }
}
```

The rule: **instance** members are called on an object (`player.addPoints(1)`) and use `this`; **static** members are called on the class (`Player.leader(players)`) and don't belong to any single object. Show both call sites side by side — the difference is *what's before the dot*: an instance, or the class name itself.

**0:24–0:38 — The scoreboard (instances + static, live)**
Wire the DOM: render each player as a card with `+1`/`+3` buttons; a click finds that player (`find` from Arc C) and calls `addPoints` (instance); the render highlights `Player.leader(players)` (static). Click around — scores rise independently, and the crown moves to whoever leads. Every idea from the last twenty minutes, visible at once.

**0:38–0:52 — Inheritance: build on what exists**
Back to questions. A True/False question is *just a Question* with fixed options — so don't rewrite `Question`, **extend** it:

```js
class TrueFalseQuestion extends Question {
  constructor(text, isTrue) {
    super(text, ["True", "False"], isTrue ? 0 : 1);   // call Question's constructor
  }
}
```

Read `extends` aloud as "is a kind of". `super(...)` runs the parent's constructor to set the object up. Then the payoff: `new TrueFalseQuestion(...)` already has `isCorrect` and `correctAnswer` — **inherited**, not rewritten. Show `tf.isCorrect(0)` working and `tf instanceof Question` being `true`. The subclass added almost nothing and got a whole working question. That's the point of inheritance: shared behaviour lives in one place.

**0:52–0:58 — Make it theirs**
The student adds a fourth player, or a second question subclass (say a `YesNoQuestion` with `["Yes", "No"]`), and confirms it inherits `isCorrect` for free.

**0:58–1:00 — Reflection**

## Reflection

- What's the difference between an *instance* member and a *static* member? Give the call site for each (what comes before the dot?).
- `TrueFalseQuestion` has no `isCorrect` method of its own, yet `tf.isCorrect(0)` works. Where does that method come from?
- What does `super(...)` do, and why must a subclass constructor call it?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Quiz Engine scoreboard; open with Live Server (keep the console open)
- `style.css` — styling for the player cards and leader highlight (done for you)
- `app.js` — inheritance (`TrueFalseQuestion`), a `Player` class, and the live scoreboard
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Shape Areas (for fast finishers)

*Optional. Reach for this when a student finishes the scoreboard with time to spare.*

Build a **Shape Areas** calculator: several shapes, each showing its area, plus a grand total. Open `code/practice.html` with Live Server (one self-contained file).

The step up is **polymorphism** — the payoff that makes inheritance worth it:

1. **A base `Shape` and subclasses.** `Circle`, `Rectangle`, and `Triangle` each `extend Shape` and each override `area()` with their own formula. `super("Circle")` sets the shared `name`.
2. **One call, many behaviours.** A single mixed array of shapes is mapped with `s.area()` — the *same* method call — but each shape runs *its own* version. You don't check "what kind of shape is this?"; each object already knows how to compute itself. That's polymorphism, and it's why big programs lean on inheritance.
3. **A static aggregator.** `Shape.totalArea(shapes)` sums every shape's area — a helper about shapes in general, so it lives on the class (and uses `reduce` from Arc C inside).

**Challenges to push further** (pick any):
- Add a `Square` that `extends Rectangle` (a subclass of a subclass) — pass `super(side, side)`.
- Add a `perimeter()` method to each shape and show it too.
- Sort the shapes by area (biggest first) before rendering.

---

## Notes for the Teacher

**Setup check before the session**
- Session 13's `Question` class and the `this` rule are the base for everything today. Have yesterday's `app.js` open.

**Common student mistakes**
- **Calling a static method on an instance (the bug hunt).** `player.leader(players)` throws — `leader` lives on `Player`, not on a player. It's `Player.leader(players)`. Reinforce: static → class name before the dot; instance → object before the dot.
- **Forgetting `super()` in a subclass constructor.** If a subclass has its own constructor, it *must* call `super(...)` before using `this`, or JavaScript throws ("Must call super constructor..."). If a subclass needs no new setup, it can skip the constructor entirely and inherit the parent's.
- **Rewriting inherited methods needlessly.** The whole point is that `TrueFalseQuestion` gets `isCorrect` for free. If a student copies it into the subclass, ask "does it need to be different?" — usually not.
- **Thinking static means constant.** Static means "on the class, not the instance." It can still be a method or a changeable value; it's about *where it lives*, not whether it changes.

**Anticipated questions**
- *"When should something be static?"* When it's about the class/type as a whole rather than one object — factory helpers, utilities, shared counters, "compare these two". If it needs a specific object's data (`this.score`), it's an instance method.
- *"How deep can inheritance go?"* As deep as you like (`Square extends Rectangle extends Shape`), but keep it shallow — deep hierarchies get confusing. This course stays one level deep on purpose.
- *"Is `extends` the only way to share code?"* No — composition (objects holding other objects) is often better, and they'll meet that idea naturally. Today, inheritance is the tool; don't over-warn.

**Pacing note**
If the student is quick, have them add another question subclass or a static `Player.total(players)`. If that isn't enough, move them to the **Shape Areas** extra-practice project (`code/practice.html`), which introduces polymorphism across a shape hierarchy. If the student is slower, land the session at "the scoreboard works with instances + `Player.leader`" and treat inheritance as a demo you walk through, since next session (the build day) revisits all of it in context.
