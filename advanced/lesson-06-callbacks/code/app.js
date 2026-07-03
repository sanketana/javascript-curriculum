// Widget Workshop — Session 6: callbacks
// A callback is a function you hand to another function so it can "call you
// back" later — when a timer fires, when a click happens, when data arrives.
//
// Why does JavaScript lean on this so heavily? It runs on a SINGLE thread — one
// worker. If it stopped and waited for a 2-second timer, the whole page would
// freeze: no clicks, no scrolling, nothing. So instead of waiting, it takes a
// function from you and promises to run it when the moment comes.

// 1. The simplest callback: hand setTimeout a function to run in 2 seconds.
console.log("Ordering pizza...");
setTimeout(() => {
  console.log("Pizza delivered!");   // runs LATER — the page never froze waiting
}, 2000);
console.log("Meanwhile, doing homework...");
// Watch the order in the console: "Ordering", then "Meanwhile" immediately,
// then "Pizza delivered!" two seconds later. JavaScript did not wait.

// 2. A widget built around callbacks: a countdown.
//    startCountdown decides WHEN things happen (every second, and at zero).
//    YOU pass in WHAT should happen — as two callback functions.
const startCountdown = (seconds, onTick, onDone) => {
  let remaining = seconds;
  onTick(remaining);                       // show the starting number at once
  const timerId = setInterval(() => {
    remaining = remaining - 1;
    if (remaining <= 0) {
      clearInterval(timerId);
      onDone();                            // call back when finished
    } else {
      onTick(remaining);                   // call back on every tick
    }
  }, 1000);
};

const display = document.querySelector("#display");
const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", () => {
  startCountdown(
    5,
    (n) => { display.textContent = n; },            // onTick: show the number
    () => { display.textContent = "Lift off!"; }    // onDone: what to do at zero
  );
});
