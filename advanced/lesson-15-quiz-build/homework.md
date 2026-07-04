# Session 15 — Homework

This is a build day, so your homework *extends the game you built in class* rather than separate console exercises. Open `code/index.html` with Live Server and edit `code/app.js`. Spend about 40 minutes.

Do these in order — all use only Arc D + Arc C tools (no new syntax).

**Task 1 — A percentage method.**
Add a `percentage()` method to the `Player` class that returns the player's score as a percentage of the total questions. (The player can reach it, but it needs to know the total — pass it in: `percentage(total)` returning `Math.round(this.score / total * 100)`.) Show each player's percentage on the results screen.

**Task 2 — A new question type.**
Add a `MultiSelectQuestion`? No — keep it simple: add a `YesNoQuestion extends Question` (options `["Yes", "No"]`), just like `TrueFalseQuestion`. Add one to `buildQuiz` and confirm the game handles it with no other changes. (This is the inheritance payoff — a new type, no engine changes.)

**Task 3 — Three players.**
Add a third player to `buildQuiz`. Because `answer` uses `% this.players.length`, turns should rotate through all three with no other change. Play a game and confirm the scoreboard and winner logic still work.

**Task 4 — Track the toughest question.**
Give `Quiz` a way to record how many players got each question wrong, and after the game log which question was missed most. (Hint: keep a `misses` array the same length as `questions`, bump it in `answer` when the choice is wrong, then use `reduce` or a loop to find the max.)

## Stretch (optional)

Add a "highest scorer of all games this session" using a **static** field on `Player` (e.g. `Player.bestScore`) updated at the end of each game. Static data belongs to the class, so it survives across the fresh players each rematch makes.

Bring your extended `app.js` to the next session. **Arc D is done** — you can now model a problem with classes. Next we start Arc E, the big one: **async and the real world**, beginning with `try/catch` and JSON so your code can handle errors and real data.
