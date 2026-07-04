// Quiz Game Engine — Session 15: BUILD DAY
// No new syntax. You assemble everything from Arc D into one finished game:
// Question + TrueFalseQuestion (inheritance), Player (instances + static), and
// a Quiz that runs a two-player, pass-and-play round.

// --- The engine (Sessions 13-14) ---
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

class TrueFalseQuestion extends Question {
  constructor(text, isTrue) {
    super(text, ["True", "False"], isTrue ? 0 : 1);
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  addPoints(points) {
    this.score = this.score + points;
  }
  static leader(players) {
    return players.reduce((best, p) => (p.score > best.score ? p : best), players[0]);
  }
}

class Quiz {
  constructor(questions, players) {
    this.questions = questions;
    this.players = players;
    this.current = 0;   // which question
    this.turn = 0;      // whose turn (alternates each question)
  }
  currentQuestion() {
    return this.questions[this.current];
  }
  currentPlayer() {
    return this.players[this.turn];
  }
  answer(choiceIndex) {
    if (this.currentQuestion().isCorrect(choiceIndex)) {
      this.currentPlayer().addPoints(1);
    }
    this.current = this.current + 1;
    this.turn = (this.turn + 1) % this.players.length;   // pass to the next player
  }
  isOver() {
    return this.current >= this.questions.length;
  }
  winner() {
    return Player.leader(this.players);   // reuse the static helper
  }
}

// --- Build a fresh game (called on start and on "Play again") ---
const buildQuiz = () =>
  new Quiz(
    [
      new Question("Capital of Japan?", ["Seoul", "Tokyo", "Beijing"], 1),
      new TrueFalseQuestion("JavaScript and Java are the same language.", false),
      new Question("Which method transforms every array item?", ["map", "filter", "reduce"], 0),
      new TrueFalseQuestion("Arrays are a kind of object in JavaScript.", true),
      new Question("What does 2 ** 3 equal?", ["6", "8", "9"], 1),
      new TrueFalseQuestion("A class can extend another class.", true),
    ],
    [new Player("Player 1"), new Player("Player 2")]
  );

let quiz = buildQuiz();
const quizEl = document.querySelector("#quiz");

const render = () => {
  if (quiz.isOver()) {
    const top = quiz.winner();
    // A tie if more than one player shares the top score.
    const isTie = quiz.players.filter((p) => p.score === top.score).length > 1;

    quizEl.innerHTML = `
      <div class="result">
        <h2>Game over!</h2>
        <div class="finalscores">
          ${quiz.players
            .map(
              (p) => `
              <div class="fs ${!isTie && p === top ? "win" : ""}">
                <span class="fsname">${p.name}</span>
                <span class="fsscore">${p.score}</span>
              </div>`
            )
            .join("")}
        </div>
        <p class="verdict">${isTie ? "It's a tie!" : `${top.name} wins!`}</p>
        <button id="restart">Play again</button>
      </div>
    `;
    document.querySelector("#restart").addEventListener("click", () => {
      quiz = buildQuiz();
      render();
    });
    return;
  }

  const q = quiz.currentQuestion();
  const player = quiz.currentPlayer();
  quizEl.innerHTML = `
    <span class="turn">${player.name}'s turn</span>
    <p class="progress">Question ${quiz.current + 1} of ${quiz.questions.length}</p>
    <h2>${q.text}</h2>
    <div class="options">
      ${q.options.map((opt, i) => `<button class="option" data-index="${i}">${opt}</button>`).join("")}
    </div>
    <div class="scores">
      ${quiz.players.map((p) => `<span>${p.name}: ${p.score}</span>`).join("")}
    </div>
  `;
};

quizEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("option")) {
    quiz.answer(Number(event.target.dataset.index));
    render();
  }
});

render();
