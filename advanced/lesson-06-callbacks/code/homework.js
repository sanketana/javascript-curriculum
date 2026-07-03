// Session 6 Homework — Callbacks
// Open homework.html with Live Server, then open the console (F12) to check your work.

// --- Task 1: call a callback twice ---
// runTwice is given. Call it and pass an ANONYMOUS function that logs "Ping!".
// You should see "Ping!" printed twice.
const runTwice = (callback) => {
  callback();
  callback();
};
// runTwice(...);


// --- Task 2: a callback that runs after a delay ---
// download() pretends to fetch a file, then calls onDone(file) one second later.
// Call download("song.mp3", ...) and pass a callback that logs "Downloaded song.mp3".
const download = (file, onDone) => {
  console.log("Downloading " + file + "...");
  setTimeout(() => {
    onDone(file);
  }, 1000);
};
// download("song.mp3", ...);


// --- Task 3: a callback run once per number ---
// countTo calls onEach(i) for every number from 1 to n.
// Call countTo(5, ...) with a callback that logs each number.
const countTo = (n, onEach) => {
  for (let i = 1; i <= n; i = i + 1) {
    onEach(i);
  }
};
// countTo(5, ...);


// --- Task 4: Bug hunt ---
// Both lines below are broken in the SAME classic way. They're commented so the
// page loads. Work out the fault, then write corrected versions and uncomment.
const sayHi = () => console.log("Hi!");
//   setTimeout(sayHi(), 1000);       // bug: this runs sayHi NOW, not in 1 second
//   runTwice(sayHi());               // bug: same mistake — passes a result, not the function

// your corrected versions:
// setTimeout(...);
// runTwice(...);
