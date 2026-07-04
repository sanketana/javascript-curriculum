// Quiz Game Engine — Session 14: many instances, static vs instance, inheritance
// Three ideas that make classes powerful at scale: one blueprint reused for many
// objects, members that belong to the CLASS itself (static), and one class that
// builds on another (inheritance).

// The Question class from Session 13, brought along.
class Question {
  constructor(text, options, answerIndex) {
    this.text = text;
    this.options = options;
    this.answerIndex = answerIndex;
  }
  isCorrect(choiceIndex) {
    return choiceIndex === this.answerIndex;
  }
  correctAnswer() {
    return this.options[this.answerIndex];
  }
}

// INHERITANCE: TrueFalseQuestion "extends" Question — it starts with everything
// Question has. `super(...)` calls Question's constructor to set it up. This
// subclass just presets the options, then gets isCorrect/correctAnswer for free.
class TrueFalseQuestion extends Question {
  constructor(text, isTrue) {
    super(text, ["True", "False"], isTrue ? 0 : 1);
  }
}

const tf = new TrueFalseQuestion("The Sun is a star.", true);
console.log(tf.correctAnswer());      // "True"
console.log(tf.isCorrect(0));         // true  — inherited method, no rewriting
console.log(tf instanceof Question);  // true  — a TrueFalseQuestion IS a Question

// MULTIPLE INSTANCES + STATIC: a Player class.
class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  // INSTANCE method: acts on ONE player — the object before the dot (this).
  addPoints(points) {
    this.score = this.score + points;
  }

  // STATIC method: belongs to the CLASS, not to any single player. It's a helper
  // ABOUT players in general, so you call it on Player itself, not on a player.
  static leader(players) {
    return players.reduce((best, p) => (p.score > best.score ? p : best), players[0]);
  }
}

// Many independent instances from one blueprint.
const players = [new Player("Aria"), new Player("Kento"), new Player("Diego")];

// --- Scoreboard: add points (instance method), highlight the leader (static) ---
const board = document.querySelector("#scoreboard");

const render = () => {
  const leader = Player.leader(players);           // called on the CLASS
  board.innerHTML = players
    .map((p) => `
      <div class="player ${p === leader && p.score > 0 ? "leader" : ""}">
        <span class="crown">${p === leader && p.score > 0 ? "LEADER" : ""}</span>
        <h2>${p.name}</h2>
        <div class="score">${p.score}</div>
        <button data-name="${p.name}" data-points="1">+1</button>
        <button data-name="${p.name}" data-points="3">+3</button>
      </div>
    `)
    .join("");
};

board.addEventListener("click", (event) => {
  if (event.target.dataset.points) {
    const player = players.find((p) => p.name === event.target.dataset.name);
    player.addPoints(Number(event.target.dataset.points));   // instance call
    render();
  }
});

render();
