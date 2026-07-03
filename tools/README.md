# tools/ — the autonomous generation harness

This folder + a few root files let the JavaScript Advanced curriculum be
generated **mostly unattended**, with automated gates and reviewers replacing
per-lesson human approval. A human still signs off once per arc.

## The pieces

| Piece | Where | Job |
|-------|-------|-----|
| **Deterministic gate** | `tools/verify-lesson.mjs` | Syntax, concept-leak, and structure checks. Fast, exact, no LLM. |
| **Technical reviewer** | `.claude/agents/curriculum-technical-reviewer.md` | LLM judge: does the code do what the prose says; do solutions solve the homework. |
| **Pedagogy reviewer** | `.claude/agents/curriculum-pedagogy-reviewer.md` | LLM judge: felt-need, 60-min fit, voice, explainer quality. |
| **Orchestrator** | `.claude/commands/generate-lesson.md` | `/generate-lesson` — one turn of the loop: generate → gate → review → fix → commit → halt at arc boundary. |
| **Ledger** | `PROGRESS.md` | What's done, what's next, and the per-arc human checkpoint gate. |
| **Decision log** | `DECISIONS.md` | Judgement calls the loop made without asking. |
| **Spec** | `CLAUDE.md` | The contract everything is generated against. |

## The gate: `verify-lesson.mjs`

```bash
node tools/verify-lesson.mjs 5        # check session 5
node tools/verify-lesson.mjs 1 2 3    # check several
node tools/verify-lesson.mjs --all    # check every lesson present
```

Exits `0` if all pass, `1` if any fail (so it works in a script or a pre-commit
hook). It checks:

1. **Syntax** — every `.js` file and every inline `<script>` parses (`node --check`).
2. **Concepts** — no JS feature is used before the session that teaches it. The
   per-session table lives at the top of the script (`CONCEPT_RULES`); edit it
   there if the curriculum's ordering changes. Only **code** is scanned (`.js` +
   inline scripts), never prose, and comments are ignored. To allow a deliberate
   early use, put `concept-ok` in a comment on that line.
3. **Structure** — the three markdown files, `code/`, a `practice.html`, the eight
   classwork sections, the "Additional Practice Project" section, and the
   "try it yourself first" note in solutions all exist.

## Running the loop

Single step (generates the next `todo` lesson):

```
/generate-lesson
```

Unattended, self-paced (keeps going until it hits an arc checkpoint or a problem):

```
/loop /generate-lesson
```

The loop **stops on its own** at the end of each arc and asks you to review. To
resume, set that arc's `Checkpoint` line in `PROGRESS.md` to
`APPROVED (human, YYYY-MM-DD)` and run `/generate-lesson` (or `/loop`) again.

### Optional: make the gate a pre-commit hook
If you want commits blocked automatically (not just when the loop runs the gate),
add `.git/hooks/pre-commit` (chmod +x):

```sh
#!/bin/sh
# verify every lesson that has staged changes
node tools/verify-lesson.mjs --all || exit 1
```

Kept opt-in to match the repo's zero-build-tooling ethos.
