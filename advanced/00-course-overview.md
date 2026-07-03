# JavaScript Advanced — Course Overview

## What this course is

This is a 24-session course that takes a student who already knows basic JavaScript and turns that knowledge into a genuine foundation for full-stack web development. By the end, students think in objects, functions, and asynchronous data the way modern frameworks — React, Node, Express, Next.js — expect them to before they write a single line of framework code.

This is deliberately *not* a framework course. It is the course that makes a framework course make sense. Students who finish here can open a React tutorial and recognise the closures, the array methods, the destructuring, the promises, and the module imports as things they already understand — not magic.

The course is taught 1:1, in 60-minute live sessions, hands-on. Every session is built around one thing the student actually makes and can see working in the browser.

## Who this course is for

Middle and high school students (roughly ages 12–17) who have completed the **JavaScript Beginner** course or equivalent. They should already be comfortable with variables (`let`/`const`), operators, loops, conditionals, functions, arrays, basic strings, DOM events, and `localStorage`.

They do **not** need any experience with objects beyond the basics, asynchronous code, APIs, classes, or modules. This course starts exactly where a strong beginner course ends.

## What the student will build

The course is organised as **six project arcs** across 24 sessions. Concepts compound inside a single real application per arc, rather than scattering across 24 disconnected exercises. Every session still ships something visible in the browser.

| Arc | Sessions | Project | Focus |
|-----|----------|---------|-------|
| **A — Modern JS & Data Shapes** | 1–4 | Character Card Explorer | Object literals, property shorthand, template literals, destructuring, spread/rest, default parameters |
| **B — Thinking in Functions** | 5–8 | Widget Workshop | Arrow/anonymous functions, higher-order functions, callbacks, closures, `this` |
| **C — Data Wrangling** | 9–12 | Leaderboard / Playlist Analyzer | `forEach`, `map`, `filter`, `find`/`findIndex`, `reduce`, `some`/`every` |
| **D — Objects at Scale** | 13–15 | Quiz Game Engine | ES6 classes, constructors, methods, instances, light inheritance |
| **E — Async & the Real World** | 16–21 | Anime Explorer (Jikan API) | `try/catch`, JSON, the event loop, callbacks → promises → async/await, Fetch, Axios, RapidAPI, dates |
| **F — Shipping Real Code** | 22–24 | Capstone (student's choice) | ES modules, named vs default exports, project structure, final build & showcase |

### The arcs in more depth

**Arc A — Modern JS & Data Shapes (Sessions 1–4)**
Students build a data-driven gallery of game and anime characters. They meet the modern-syntax ergonomics that every framework silently assumes you already know: objects and property shorthand as the shape of all data, template literals for building HTML from data, and destructuring, spread/rest, and default parameters for handling that data cleanly. By the end, "an array of objects rendered to the page" feels natural.

**Arc B — Thinking in Functions (Sessions 5–8)**
Students build a set of small reusable interactive widgets (a countdown timer, a combo counter, a theme switcher). This is where framework instincts are born. Functions become values that get passed around (higher-order functions and callbacks), functions start to *remember* state (closures), and `this` is demystified rather than feared. These four ideas underpin every event handler, hook, and callback they will ever write.

**Arc C — Data Wrangling with Array Methods (Sessions 9–12)**
Students build a leaderboard / playlist analyser that turns arrays of objects into rankings and statistics. This is the single most-used skill in real front-end work. They learn `map` and `forEach`, then `filter`, `find`, and `findIndex`, then the accumulator model behind `reduce`, and finally the boolean checks `some` and `every`. By the end they reach for a chained array method instead of a `for` loop by instinct.

**Arc D — Objects at Scale: Classes & OOP (Sessions 13–15)**
Students build a playable quiz game engine using classes — `Question`, `Quiz`, and `Player`. Object-oriented programming is how most real codebases are organised and how framework internals are structured. Students experience firsthand why an object that *does* things (methods) beats a loose pile of variables once a program grows.

**Arc E — Async & the Real World (Sessions 16–21)**
This is the heart of the course. Students build the **Anime Explorer**, a real application that fetches live data from the public **Jikan API** (the unofficial MyAnimeList API — no API key required). Along the way they meet error handling (`try/catch`), JSON, and the mental model that makes everything else click: the event loop and how JavaScript waits without freezing. They then walk the full historical path — callbacks, then promises, then async/await — and finish with real HTTP using Fetch, Axios, the RapidAPI hub, and date formatting for API timestamps.

**Arc F — Shipping Real Code: Modules + Capstone (Sessions 22–24)**
Students refactor the Anime Explorer into ES modules (`import`/`export`, named vs default), then apply everything to a capstone application of their own choosing that combines classes, a live API, and a clean multi-file structure. The course ends with a short showcase.

## The final project

In the last two sessions, each student builds a complete application from scratch that combines the three pillars of the course: **classes** for structure, a **live API** for real data, and **ES modules** for organisation. It is presented in a short Demo Day session where the student walks through their code, explains their design decisions, and demonstrates the working app to a small audience.

## The eight "hard idea" sessions

Eight sessions introduce a genuinely difficult concept and therefore include a dedicated explainer that teaches the idea with perspective and historical background, not just syntax:

- **Callbacks** (S6) — what a callback is, and why JavaScript leans on them
- **Closures** (S7) — private state, the function that remembers
- **`this`** (S8) — what `this` actually binds to, and why it confuses everyone
- **`reduce`** (S11) — the accumulator model
- **The event loop** (S17) — how JS stays responsive while waiting; the road to "callback hell"
- **Promises** (S18) — a promise as an IOU
- **async/await** (S19) — syntactic sugar over promises
- **Classes / OOP** (S13) — why objects that *do* things beat loose variables

## How we teach — nothing to install

Everything runs in the browser with plain HTML, CSS, and JavaScript. There is no build step, no `npm install`, and no account to create for the core course — the Jikan API needs no key. Students use a code editor (VS Code) and a browser with its developer tools. The one optional account is a free RapidAPI login in Arc E, used only to show the wider API ecosystem.

## Tools

- **Editor**: Visual Studio Code with the Live Server extension
- **Runtime**: any modern browser + its developer console
- **Primary API**: Jikan (https://jikan.moe) — public MyAnimeList data, no key required
- **Also shown**: Fetch (built in), Axios (via CDN), the RapidAPI hub
- **Language**: modern JavaScript (ES2015 and later)

## Prerequisites

- Completed the JavaScript Beginner course or equivalent (variables, operators, loops, conditionals, functions, arrays, strings, DOM events, `localStorage`)
- A laptop (Windows, Mac, or Linux) capable of running VS Code
- No prior experience with objects-in-depth, async, classes, APIs, or modules needed

## What the student will be able to do after this course

1. Read and write modern JavaScript — destructuring, spread, template literals, arrow functions — fluently
2. Transform arrays of data with chained array methods instead of manual loops
3. Explain and use closures, `this`, and higher-order functions with confidence
4. Fetch live data from a real API and handle success, failure, and loading states with async/await
5. Structure a program with classes and split it across ES modules
6. Open a React, Node, or Express codebase and recognise the foundations rather than face magic

## Course details

- **Format**: 1:1 live online sessions
- **Duration**: 24 sessions
- **Session length**: 60 minutes
- **Between-session practice**: 30–45 minutes of guided homework, with worked solutions
