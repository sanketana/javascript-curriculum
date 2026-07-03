// Widget Workshop — Session 5: arrow functions, anonymous functions, HOFs
// The big idea: a function is a VALUE. You can store it, pass it to another
// function, and run it later. That one idea powers every event handler you write
// and every framework you'll ever touch.

// 1. Arrow functions — a shorter way to write a function.
function doubleOld(n) {
  return n * 2;
}
const double = (n) => n * 2;   // exactly the same, arrow style
console.log(doubleOld(4), double(4));   // 8 8

// The shapes you'll see everywhere:
const greet = () => "Hi!";          // no parameters
const square = (n) => n * n;        // one parameter, one expression → auto-returns
const add = (a, b) => a + b;        // several parameters
const shout = (text) => {           // a { block } body needs an explicit return
  const loud = text.toUpperCase();
  return loud + "!";
};
console.log(greet(), square(5), add(2, 3), shout("hi"));   // Hi! 25 5 HI!

// 2. Anonymous functions — a function with no name, written right where it's used.
//    Here one is handed straight to setTimeout to run after a delay.
setTimeout(() => {
  console.log("One second later...");
}, 1000);

// 3. Higher-order function — a function that TAKES another function as an argument.
//    makeActionButton builds a button and runs whatever action it is handed.
const status = document.querySelector("#status");
const toolbar = document.querySelector("#toolbar");

const makeActionButton = (label, action) => {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", action);   // "action" is a function VALUE
  toolbar.appendChild(button);
};

// Each button is built by the SAME factory but handed a DIFFERENT anonymous action.
makeActionButton("Say hi", () => {
  status.textContent = "Hello from the Widget Workshop!";
});

makeActionButton("Go dark", () => {
  document.body.style.background = "#0b0e1a";
  status.textContent = "Dark mode on.";
});

makeActionButton("Go light", () => {
  document.body.style.background = "#1b1f36";
  status.textContent = "Light mode on.";
});

makeActionButton("Tell time", () => {
  status.textContent = "It is now " + new Date().toLocaleTimeString();
});
