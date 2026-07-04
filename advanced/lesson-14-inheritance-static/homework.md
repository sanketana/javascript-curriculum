# Session 14 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` gives you an `Animal` base class and four tasks in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — Inheritance with `super`.**
Write a `Dog` class that `extends Animal`. Its constructor takes a `name` and passes it up with `super(name)`. Override `sound()` to return `"woof"`. Then `new Dog("Rex").describe()` should give `"Rex is a woof animal"` — note `describe()` is inherited; you only changed `sound()`.

**Task 2 — Another subclass.**
Write a `Cat` class the same way, with `sound()` returning `"meow"`. Confirm `new Cat("Milo").describe()` gives `"Milo is a meow animal"`. Two subclasses, each overriding one method, both reusing the inherited `describe()`.

**Task 3 — A static method.**
Add a static method `Animal.chorus(animals)` that returns every animal's sound joined with `" + "`. Call it on the *class* with a mix of dogs and cats — e.g. `Animal.chorus([new Dog("R"), new Cat("M")])` → `"woof + meow"`.

**Task 4 — Bug hunt.**
`leader` is a **static** method on `Team`, so it lives on the class. The code calls `teams[0].leader(teams)` — on an *instance* — which crashes. Fix the call to run on the class, so it logs `"Blue"` (Blue has 4 wins).

## Stretch (optional)

Give `Animal` a static counter: a static field `count` starting at `0`, incremented inside the constructor (`Animal.count = Animal.count + 1`). After making a few animals, log `Animal.count` to see how many exist. (Static data that belongs to the class as a whole, not to any one animal.)

Bring your finished `homework.js` to the next session — it's the Arc D **build day**, where you assemble `Question`, `TrueFalseQuestion`, `Quiz`, and `Player` into one complete, playable quiz game.
