# Session 15 — Homework Solutions

Try each task yourself first. These show one correct approach; yours may differ in style and still be right. Everything here uses only Arc D + Arc C tools.

## Task 1 — A percentage method

```js
class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  addPoints(points) { this.score = this.score + points; }
  percentage(total) {
    return Math.round((this.score / total) * 100);
  }
  static leader(players) {
    return players.reduce((best, p) => (p.score > best.score ? p : best), players[0]);
  }
}
```

On the results screen, show it next to each score:

```js
<span class="fsscore">${p.score}</span>
<span class="fsname">${p.percentage(quiz.questions.length)}%</span>
```

`percentage` needs the total, which the player doesn't know on its own, so we pass it in. With 6 questions, a score of 3 shows `50%`.

## Task 2 — A new question type

```js
class YesNoQuestion extends Question {
  constructor(text, isYes) {
    super(text, ["Yes", "No"], isYes ? 0 : 1);
  }
}
```

Add one to `buildQuiz`:

```js
new YesNoQuestion("Is map an array method?", true),
```

The game handles it with **zero** changes to `Quiz` or `render` — it's a `Question`, so it already has `isCorrect`, and the render just maps its options like any other. That "no engine changes" is exactly what inheritance buys you.

## Task 3 — Three players

```js
[new Player("Player 1"), new Player("Player 2"), new Player("Player 3")]
```

Turns rotate correctly because `answer` does `this.turn = (this.turn + 1) % this.players.length` — with three players the turn cycles 0 → 1 → 2 → 0. The scoreboard `map`s over all players, and `Player.leader` reduces over all of them, so both already handle three (or more). Nothing else to change.

## Task 4 — Track the toughest question

```js
class Quiz {
  constructor(questions, players) {
    this.questions = questions;
    this.players = players;
    this.current = 0;
    this.turn = 0;
    this.misses = questions.map(() => 0);   // one counter per question, all 0
  }
  // ...
  answer(choiceIndex) {
    if (this.currentQuestion().isCorrect(choiceIndex)) {
      this.currentPlayer().addPoints(1);
    } else {
      this.misses[this.current] = this.misses[this.current] + 1;
    }
    this.current = this.current + 1;
    this.turn = (this.turn + 1) % this.players.length;
  }
  toughest() {
    // index of the most-missed question
    let worst = 0;
    this.misses.forEach((count, i) => {
      if (count > this.misses[worst]) worst = i;
    });
    return this.questions[worst];
  }
}
```

After the game: `console.log("Most missed:", quiz.toughest().text);`. `misses` starts as an array of zeros the same length as `questions` (built with `map`), each `answer` bumps the current question's counter on a wrong pick, and `toughest` walks the counters (a `forEach` with the index) to find the max.

## Stretch — a session-wide best score

```js
class Player {
  // ...
}
Player.bestScore = 0;

// at the end of a game, after computing the winner:
quiz.players.forEach((p) => {
  if (p.score > Player.bestScore) Player.bestScore = p.score;
});
console.log("Best score this session:", Player.bestScore);
```

`Player.bestScore` lives on the *class*, not on any player, so it isn't wiped out when "Play again" builds fresh `Player` objects. It's the right home for "a fact about all players across all games" — exactly what static members are for.
