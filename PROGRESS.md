# Curriculum Generation Progress

This is the ledger the autonomous loop reads (`/generate-lesson`). It is the
single source of truth for _what is done_ and _what may run next_.

## ▶ Resume here (as of 2026-07-05)

Done: **Arcs A–D complete, Sessions 1–15** — all committed and pushed to
`origin/main`. The loop is halted at the **Arc D checkpoint (PENDING)**.

To continue into **Arc E** (Anime Explorer, Sessions 16–21):
1. Reopen: `cd` into this repo, then `claude --continue` (or a fresh session — the
   ledger below is all that's needed).
2. Approve Arc D: change its Checkpoint line to `APPROVED (human, YYYY-MM-DD)`.
3. Run `/loop /generate-lesson` — it picks up at **Session 16 (try/catch + JSON)**
   and halts again after the Session 21 build day.

Note: `/loop` is session-local — reopening does not auto-resume it; re-run the
command above. Arc E makes live Jikan API calls, so do the real end-to-end fetch
test yourself at the checkpoint (the reviewers don't make network calls).

## How the loop uses this file

- **Next lesson** = the lowest session number whose status is `todo`.
- **Arc checkpoint (human gate):** the loop generates every session in an arc
  autonomously, but when it finishes the LAST session of an arc it sets that
  arc's Checkpoint to `PENDING` and STOPS. It will not begin the next arc until
  a human sets the finished arc's Checkpoint to `APPROVED`.
- To approve an arc, review its lessons and change its Checkpoint line to
  `APPROVED (human, YYYY-MM-DD)`.

Status values: `todo` · `done`

---

## Advanced module

### Arc A — Modern JS & Data Shapes · _Character Card Explorer_

**Checkpoint: APPROVED (human, 2026-07-03)**

| S   | Topic                                        | Status |
| --- | -------------------------------------------- | ------ |
| 1   | objects + property shorthand                 | done   |
| 2   | template literals → DOM rendering            | done   |
| 3   | destructuring + spread/rest + default params | done   |
| 4   | build day (interactive Card Explorer)        | done   |

### Arc B — Thinking in Functions · _Widget Workshop_

**Checkpoint: APPROVED**

| S   | Topic                                                | Status |
| --- | ---------------------------------------------------- | ------ |
| 5   | arrow & anonymous functions + higher-order functions | done   |
| 6   | callbacks _(explainer)_                              | done   |
| 7   | closures _(explainer)_                               | done   |
| 8   | `this` _(explainer)_ + mini-build                    | done   |

### Arc C — Data Wrangling · _Leaderboard / Playlist Analyzer_

**Checkpoint: APPROVED**

| S   | Topic                         | Status |
| --- | ----------------------------- | ------ |
| 9   | `forEach` + `map`             | done   |
| 10  | `filter` + `find`/`findIndex` | done   |
| 11  | `reduce` _(explainer)_        | done   |
| 12  | `some`/`every` + build day    | done   |

### Arc D — Objects at Scale: Classes & OOP · _Quiz Game Engine_

**Checkpoint: PENDING**

| S   | Topic                                            | Status |
| --- | ------------------------------------------------ | ------ |
| 13  | ES6 classes _(explainer)_                        | done   |
| 14  | instances, static vs instance, light inheritance | done   |
| 15  | build day                                        | done   |

### Arc E — Async & the Real World · _Anime Explorer (Jikan API)_

**Checkpoint: PENDING**

| S   | Topic                                                   | Status |
| --- | ------------------------------------------------------- | ------ |
| 16  | `try/catch` + JSON                                      | todo   |
| 17  | event loop + `setTimeout` + callback hell _(explainer)_ | todo   |
| 18  | promises _(explainer)_                                  | todo   |
| 19  | async/await _(explainer)_                               | todo   |
| 20  | Fetch API → real HTTP + JSON                            | todo   |
| 21  | Axios + RapidAPI + dates + build day                    | todo   |

### Arc F — Shipping Real Code: Modules + Capstone · _Capstone_

**Checkpoint: PENDING**

| S   | Topic                                       | Status |
| --- | ------------------------------------------- | ------ |
| 22  | ES modules: import/export, named vs default | todo   |
| 23  | capstone build — day 1                      | todo   |
| 24  | capstone build — day 2 + showcase           | todo   |

---

## Beginner module

Not yet started. Syllabus outline approved (see CLAUDE.md); session-by-session
layout still to be produced before generation can begin.
