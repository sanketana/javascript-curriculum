---
description: Autonomously generate the next unwritten Advanced lesson (or the one named in $ARGUMENTS), gate it, get it reviewed by both curriculum reviewers, fix, commit, and halt at arc boundaries.
---

You are running one turn of the autonomous curriculum-generation loop for the
**JavaScript Advanced** module. Follow these steps exactly. Do not ask the user
anything — this loop must run unattended.

## 0. Read the spec and the ledger
- Read `CLAUDE.md` (the curriculum spec: six-arc spine, toolset discipline,
  lesson template, tone, code style).
- Read `PROGRESS.md` (the ledger) and `DECISIONS.md`.

## 1. Choose the target lesson
- If `$ARGUMENTS` names a session number, that is the target.
- Otherwise the target is the lowest session number whose status in `PROGRESS.md`
  is `todo`.

## 2. Enforce the per-arc checkpoint (HARD STOP)
- Find which arc the target belongs to (see PROGRESS.md).
- If the target is the FIRST session of its arc, check the PREVIOUS arc's
  Checkpoint field. If that checkpoint is not `APPROVED`, **STOP immediately**:
  do not generate anything. Tell the user the previous arc is awaiting their
  sign-off, and that they approve it by setting that arc's Checkpoint to
  `APPROVED` in `PROGRESS.md`. End the turn.
- Otherwise continue.

## 3. Generate the lesson
Create `advanced/lesson-NN-<slug>/` with the full lesson per CLAUDE.md's template:
`classwork.md`, `homework.md`, `solutions.md`, and `code/` (runnable
`index.html`/`style.css`/`app.js` or self-contained pages as fits the session,
`homework.*`, and a `practice.html` extra-practice project). Honour:
- **Toolset discipline** — use only concepts taught in this session or earlier.
- **Felt-need motivation**, **student-facing voice**, **explainer** if this is a
  hard-concept session (6, 7, 8, 11, 13, 17, 18, 19).
- **Project continuity** — build on the running project for the arc.
- If you must make a judgement call the spec doesn't cover, pick the option most
  consistent with CLAUDE.md, append a dated line to `DECISIONS.md`, and continue.
  Never use AskUserQuestion.

## 4. Deterministic gate
Run `node tools/verify-lesson.mjs NN`. If it fails, fix the lesson and re-run
until it passes. Do not proceed while it is red.

## 5. Reviewers (parallel)
Spawn BOTH review agents on the lesson folder, in parallel, run to completion:
- `curriculum-technical-reviewer`
- `curriculum-pedagogy-reviewer`
Pass each the lesson folder path and ask for its verdict.

## 6. Revise until both approve
- If either returns `VERDICT: REVISE`, apply the fixes, re-run the gate (step 4),
  and re-review only if the changes were substantive. Repeat until BOTH return
  `VERDICT: APPROVE`. Cap at 3 revision rounds; if still not clean, stop and
  report the outstanding issues to the user rather than committing.

## 7. Commit and update the ledger
- Mark the session `done` in `PROGRESS.md`.
- Commit the lesson + PROGRESS.md (+ DECISIONS.md if changed) with a message like
  `Add Session NN — <topic>` and the standard Co-Authored-By trailer.

## 8. Arc-boundary halt
- If the target was the LAST session of its arc, set that arc's Checkpoint to
  `PENDING (awaiting human review)` in PROGRESS.md (commit that), then **STOP**
  and tell the user the arc is complete and awaiting their per-arc review before
  the loop will continue. Summarise what to look at.
- Otherwise the loop may continue to the next session (the user, or a `/loop`
  wrapper, will re-invoke this command).

## Notes
- One lesson per invocation. Keep commits one-lesson-each.
- If anything is genuinely blocking and unresolvable, stop and explain — a clean
  halt is always better than a bad commit.
