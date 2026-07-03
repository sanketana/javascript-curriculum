// Widget Workshop — Session 7: closures
// A closure is a function that REMEMBERS the variables from where it was born —
// even after the function that created it has already finished running.
//
// Remember last session's countdown? It remembered "remaining" between ticks.
// THIS is why: the tick function was a closure over "remaining".

// 1. A counter factory. makeCounter runs, creates a private "count", and hands
//    back a function that still reaches that count on every call.
const makeCounter = () => {
  let count = 0;               // private — nothing outside can touch it directly
  return () => {
    count = count + 1;
    return count;
  };
};

const next = makeCounter();
console.log(next(), next(), next());   // 1 2 3 — it REMEMBERED between calls

// 2. Each counter gets its OWN private count. They never share.
const a = makeCounter();
const b = makeCounter();
console.log(a(), a(), b());   // 1 2 1 — b's count is untouched by a

// 3. A combo-counter widget. The count is private state, sealed inside the
//    closure. The outside world can only change it through the returned methods.
const makeCombo = () => {
  let combo = 0;
  return {
    hit:   () => { combo = combo + 1; return combo; },
    reset: () => { combo = 0; return combo; },
    value: () => combo,
  };
};

const buildPlayer = (name) => {
  const combo = makeCombo();          // this player's own private counter

  const wrap = document.createElement("div");
  wrap.className = "player";

  const label = document.createElement("h2");
  label.textContent = name;

  const score = document.createElement("p");
  score.className = "score";
  score.textContent = "0";

  const hitBtn = document.createElement("button");
  hitBtn.textContent = "Hit +1";
  hitBtn.addEventListener("click", () => {
    combo.hit();
    score.textContent = combo.value();
  });

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => {
    combo.reset();
    score.textContent = combo.value();
  });

  wrap.append(label, score, hitBtn, resetBtn);
  return wrap;
};

const arena = document.querySelector("#arena");
arena.append(buildPlayer("Player 1"), buildPlayer("Player 2"));
// Click around: each player's combo is completely independent — two closures,
// two private counts.
