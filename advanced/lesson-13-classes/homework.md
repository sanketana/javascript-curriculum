# Session 13 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has four tasks in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — Your first class.**
Write a `Dog` class: a constructor that takes a `name` (store it with `this.name = name`) and a `speak()` method that returns `"<name> says woof"`. Make a dog with `new` and log `dog.speak()`.

**Task 2 — A class with data + behaviour.**
Write a `BankAccount` class with a starting `balance`, a `deposit(amount)` method, and a `withdraw(amount)` method that refuses (and logs `"Not enough"`) when the amount exceeds the balance. Test the sequence in the comments — you should end on `120`. (You wrote this as a *closure* in Session 7; notice how a class expresses the same "private-ish state + methods" idea more explicitly.)

**Task 3 — Many instances.**
Make two separate `BankAccount` objects. Deposit into one and confirm the other's balance is unchanged. Two `new` calls make two independent objects — they don't share data.

**Task 4 — Bug hunt.**
The `Player` class greets with `"Hi undefined"` instead of the name. The constructor writes `name = name`, which just reassigns the parameter to itself and stores nothing on the object. Fix it so the name is saved on the instance, and `p.greet()` returns `"Hi Sam"`.

## Stretch (optional)

Add a `Timer` class with a `constructor(seconds)`, a `tick()` method that decreases the remaining seconds by one (not below zero), and an `isDone()` method. Make one, call `tick()` a few times, and log `isDone()`. (No DOM needed — just the class and the console.)

Bring your finished `homework.js` to the next session. We go deeper into classes: **many instances at once, static vs instance members, and light inheritance** — one class building on another.
