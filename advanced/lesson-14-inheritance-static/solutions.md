# Session 14 — Homework Solutions

Try every task yourself first. These are here to check your work, not to replace it.

## Task 1 — Inheritance with `super`

```js
class Dog extends Animal {
  constructor(name) {
    super(name);          // run Animal's constructor to set this.name
  }
  sound() {
    return "woof";        // override just this one method
  }
}

console.log(new Dog("Rex").describe());   // "Rex is a woof animal"
```

`describe()` comes straight from `Animal` — it calls `this.sound()`, which now finds `Dog`'s version. You changed one method and reused everything else.

## Task 2 — Another subclass

```js
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
  sound() {
    return "meow";
  }
}

console.log(new Cat("Milo").describe());   // "Milo is a meow animal"
```

Identical shape to `Dog`, different `sound()`. Both lean on the one inherited `describe()`.

## Task 3 — A static method

Add this inside the `Animal` class:

```js
class Animal {
  constructor(name) { this.name = name; }
  describe() { return `${this.name} is a ${this.sound()} animal`; }
  sound() { return "silent"; }

  static chorus(animals) {
    return animals.map((a) => a.sound()).join(" + ");
  }
}

console.log(Animal.chorus([new Dog("R"), new Cat("M")]));   // "woof + meow"
```

`chorus` is about a *group* of animals, not one, so it's static — called on `Animal`, not on an animal. Inside, `map` (Arc C) collects each sound, and `join(" + ")` links them. Polymorphism again: each `a.sound()` runs the right subclass version.

## Task 4 — Bug hunt

`leader` is static, so it lives on `Team`, not on any team object. `teams[0].leader(teams)` looks for `leader` on an *instance* and finds nothing → crash. Call it on the class:

```js
const top = Team.leader(teams);
console.log(top.name);   // "Blue"
```

The rule: **static → class name before the dot** (`Team.leader(...)`); **instance → object before the dot** (`someTeam.someMethod()`).

## Stretch — a static counter

```js
class Animal {
  constructor(name) {
    this.name = name;
    Animal.count = Animal.count + 1;   // bump the class-wide counter
  }
  // ...
}
Animal.count = 0;

new Dog("R");
new Cat("M");
new Dog("B");
console.log(Animal.count);   // 3
```

`count` belongs to the class, not to any single animal — every constructor call bumps the same shared number. That's the essence of static: one value (or method) that lives on the class itself. (You can also declare `static count = 0;` inside the class body; assigning `Animal.count = 0` after the class works just as well and is easy to read.)
