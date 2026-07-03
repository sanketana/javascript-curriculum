# Autonomous Decision Log

When the generation loop hits a judgement call the spec (`CLAUDE.md`) doesn't
settle, it picks the option most consistent with the spec, records it here with a
date, and keeps going — instead of stopping to ask. Review these at the per-arc
checkpoint; anything you disagree with, change the material and add a correcting
entry.

Format: `- YYYY-MM-DD · Session/scope · decision · rationale`

---

- 2026-07-03 · Arc E · Live API is **Jikan** (jikan.moe, MyAnimeList) · public,
  no API key, teen-relevant; chosen with the user during planning.
- 2026-07-03 · Repo · Two-module layout `advanced/` + `beginner/`; lessons grouped
  by `lesson-NN-<slug>/` with `classwork/homework/solutions` + `code/` · mirrors
  the sister `java-for-robotics` repo.
- 2026-07-03 · Every lesson · Ships an optional self-contained `practice.html`
  extra-practice project (fresh domain, same toolset, harder) · established as a
  repo convention after Session 1 ran short for fast students.
- 2026-07-03 · Session 1 · Uses string concatenation (not template literals) in
  all code, including teacher-facing `console.log`s · template literals are the
  Session 2 payoff; using them in S1 would undercut that felt-need.
- 2026-07-03 · Project names per arc · A: Character Card Explorer · B: Widget
  Workshop · C: Leaderboard/Playlist Analyzer · D: Quiz Game Engine · E: Anime
  Explorer · F: student-choice capstone.
