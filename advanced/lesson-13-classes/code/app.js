// Quiz Game Engine — Session 13: ES6 classes
// A class is a BLUEPRINT for making objects that carry both data (fields) and
// the methods that act on that data. Define the shape once, stamp out as many
// objects as you like with `new`.

class Question {
  constructor(text, options, answerIndex) {
    // "this" is the new object being built. The constructor fills in its data.
    this.text = text;
    this.options = options;
    this.answerIndex = answerIndex;
  }

  // A method: behaviour that belongs to every Question, using its own data.
  isCorrect(choiceIndex) {
    return choiceIndex === this.answerIndex;
  }

  correctAnswer() {
    return this.options[this.answerIndex];
  }
}

// `new` runs the constructor and hands back a fresh Question object.
const q1 = new Question("Capital of France?", ["Paris", "Rome", "Berlin"], 0);
console.log(q1.text);              // "Capital of France?"
console.log(q1.isCorrect(0));      // true
console.log(q1.isCorrect(2));      // false
console.log(q1.correctAnswer());   // "Paris"

// Many instances from ONE blueprint — no repeating the shape or the methods.
const questions = [
  new Question("2 + 2 = ?", ["3", "4", "5"], 1),
  new Question("Largest planet?", ["Earth", "Jupiter", "Mars"], 1),
  new Question("Which array method transforms every item?", ["map", "grab", "spin"], 0),
];

// A second class that HOLDS questions and tracks progress and score.
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.current = 0;
    this.score = 0;
  }

  currentQuestion() {
    return this.questions[this.current];
  }

  answer(choiceIndex) {
    if (this.currentQuestion().isCorrect(choiceIndex)) {
      this.score = this.score + 1;
    }
    this.current = this.current + 1;
  }

  isOver() {
    return this.current >= this.questions.length;
  }
}

// --- Play it: render the current question, wire the option buttons ---
let quiz = new Quiz(questions);
const quizEl = document.querySelector("#quiz");

const render = () => {
  if (quiz.isOver()) {
    quizEl.innerHTML = `
      <div class="result">
        <h2>Quiz complete!</h2>
        <p>You scored ${quiz.score} of ${quiz.questions.length}</p>
        <button id="restart">Play again</button>
      </div>
    `;
    document.querySelector("#restart").addEventListener("click", () => {
      quiz = new Quiz(questions);   // a fresh Quiz instance
      render();
    });
    return;
  }

  const q = quiz.currentQuestion();
  quizEl.innerHTML = `
    <p class="progress">Question ${quiz.current + 1} of ${quiz.questions.length}</p>
    <h2>${q.text}</h2>
    <div class="options">
      ${q.options.map((opt, i) => `<button class="option" data-index="${i}">${opt}</button>`).join("")}
    </div>
  `;
};

// One listener on the container handles whichever option is clicked.
quizEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("option")) {
    quiz.answer(Number(event.target.dataset.index));
    render();
  }
});

render();
