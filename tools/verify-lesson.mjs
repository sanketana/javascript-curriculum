#!/usr/bin/env node
// Deterministic gate for a single Advanced-module lesson.
//
//   node tools/verify-lesson.mjs <sessionNumber>     e.g. node tools/verify-lesson.mjs 5
//   node tools/verify-lesson.mjs 1 2 3 4             (checks several)
//   node tools/verify-lesson.mjs --all               (checks every lesson present)
//
// Runs three families of checks and exits non-zero if any FAIL:
//   1. Syntax    — every .js file and every inline <script> parses (node --check)
//   2. Concepts  — no JS feature is used before the session that teaches it
//                  (enforces the toolset-discipline rule from CLAUDE.md)
//   3. Structure — the required files and the eight classwork sections exist
//
// Escape hatch: put `concept-ok` in a comment on a line to allow a deliberate
// early use of a concept on that line.

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ADVANCED = join(ROOT, "advanced");

// --- Concept table: pattern → first session allowed → human label ----------
// A pattern found in a lesson whose session number is LESS than `since` is a leak.
// Patterns are matched against CODE only (.js files + inline <script> bodies),
// never against prose, so naming a concept in teaching text is always fine.
const CONCEPT_RULES = [
  { since: 2,  label: "template literals",   re: /`/ },
  { since: 5,  label: "arrow functions",     re: /=>/ },
  { since: 9,  label: ".forEach()",          re: /\.forEach\s*\(/ },
  { since: 9,  label: ".map()",              re: /\.map\s*\(/ },
  { since: 10, label: ".filter()",           re: /\.filter\s*\(/ },
  { since: 10, label: ".find()",             re: /\.find\s*\(/ },
  { since: 10, label: ".findIndex()",        re: /\.findIndex\s*\(/ },
  { since: 11, label: ".reduce()",           re: /\.reduce\s*\(/ },
  { since: 12, label: ".some()",             re: /\.some\s*\(/ },
  { since: 12, label: ".every()",            re: /\.every\s*\(/ },
  { since: 13, label: "class declaration",   re: /\bclass\s+[A-Za-z_$][\w$]*/ },
  { since: 16, label: "try/catch",           re: /\btry\s*\{/ },
  { since: 16, label: "JSON.parse/stringify",re: /\bJSON\.(parse|stringify)\s*\(/ },
  { since: 18, label: "Promise",             re: /\bnew\s+Promise\b|\bPromise\.(resolve|reject|all|race|allSettled)\b/ },
  { since: 18, label: ".then()",             re: /\.then\s*\(/ },
  { since: 19, label: "async",               re: /\basync\b/ },
  { since: 19, label: "await",               re: /\bawait\b/ },
  { since: 20, label: "fetch()",             re: /\bfetch\s*\(/ },
  { since: 21, label: "axios",               re: /\baxios\b/ },
  { since: 22, label: "import",              re: /\bimport\s+[\w{*]/ },
  { since: 22, label: "export",              re: /\bexport\s+(default|const|function|class|\{)/ },
];

const REQUIRED_FILES = ["classwork.md", "homework.md", "solutions.md"];
const CLASSWORK_SECTIONS = [
  "Lesson Theme",
  "What You'll Build",
  "Tools Used",
  "What You'll Learn",
  "In Class",
  "Reflection",
  "Starter Materials",
  "Notes for the Teacher",
];

// --- helpers ---------------------------------------------------------------
function lessonDir(n) {
  const nn = String(n).padStart(2, "0");
  const match = readdirSync(ADVANCED).find((d) => d.startsWith(`lesson-${nn}-`));
  return match ? join(ADVANCED, match) : null;
}

function allLessonNumbers() {
  return readdirSync(ADVANCED)
    .map((d) => /^lesson-(\d\d)-/.exec(d))
    .filter(Boolean)
    .map((m) => Number(m[1]))
    .sort((a, b) => a - b);
}

// Collect { file, code, isModule } blobs: raw .js files + inline <script> bodies.
function collectCode(dir) {
  const blobs = [];
  const codeDir = join(dir, "code");
  if (!existsSync(codeDir)) return blobs;
  for (const name of readdirSync(codeDir)) {
    const path = join(codeDir, name);
    if (name.endsWith(".js")) {
      const code = readFileSync(path, "utf8");
      blobs.push({ file: `code/${name}`, code, isModule: /\b(import|export)\s/.test(code) });
    } else if (name.endsWith(".html")) {
      const html = readFileSync(path, "utf8");
      const re = /<script(\b[^>]*)>([\s\S]*?)<\/script>/g;
      let m, i = 0;
      while ((m = re.exec(html))) {
        const attrs = m[1] || "";
        if (/\bsrc\s*=/.test(attrs)) continue; // external ref, nothing inline to check
        blobs.push({
          file: `code/${name} <script#${++i}>`,
          code: m[2],
          isModule: /type\s*=\s*["']module["']/.test(attrs),
        });
      }
    }
  }
  return blobs;
}

// Strip line comments and block comments so concept scanning ignores commented
// notes, but KEEP strings (a leaked concept inside a real string still runs).
function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((line) => (/concept-ok/.test(line) ? "" : line.replace(/\/\/.*$/, "")))
    .join("\n");
}

// --- the checks ------------------------------------------------------------
function checkLesson(n, tmp) {
  const dir = lessonDir(n);
  const fails = [];
  if (!dir) return { n, fails: [`lesson-${String(n).padStart(2, "0")}-* folder not found`] };

  // 1. structure
  for (const f of REQUIRED_FILES) {
    if (!existsSync(join(dir, f))) fails.push(`missing ${f}`);
  }
  if (!existsSync(join(dir, "code"))) fails.push("missing code/ folder");
  if (!existsSync(join(dir, "code", "practice.html")))
    fails.push("missing code/practice.html (extra-practice project is required per lesson)");

  const cwPath = join(dir, "classwork.md");
  if (existsSync(cwPath)) {
    const cw = readFileSync(cwPath, "utf8");
    for (const s of CLASSWORK_SECTIONS) {
      if (!cw.includes(s)) fails.push(`classwork.md missing section: "${s}"`);
    }
    if (!/Additional Practice Project/i.test(cw))
      fails.push(`classwork.md missing "Additional Practice Project" section`);
  }
  const solPath = join(dir, "solutions.md");
  if (existsSync(solPath)) {
    const sol = readFileSync(solPath, "utf8").toLowerCase();
    if (!sol.includes("yourself first"))
      fails.push(`solutions.md missing the "try it yourself first" note`);
  }

  // 2. syntax + 3. concepts
  const blobs = collectCode(dir);
  for (const { file, code, isModule } of blobs) {
    const tmpFile = join(tmp, `blob${Math.random().toString(36).slice(2)}.${isModule ? "mjs" : "js"}`);
    writeFileSync(tmpFile, code);
    try {
      execSync(`node --check "${tmpFile}"`, { stdio: "pipe" });
    } catch (e) {
      const msg = (e.stderr?.toString() || e.message).split("\n").slice(0, 3).join(" ").trim();
      fails.push(`syntax error in ${file}: ${msg}`);
    }

    const scan = stripComments(code);
    for (const rule of CONCEPT_RULES) {
      if (n < rule.since && rule.re.test(scan)) {
        fails.push(`concept leak in ${file}: "${rule.label}" is not taught until session ${rule.since}`);
      }
    }
  }

  return { n, fails };
}

// --- main ------------------------------------------------------------------
const args = process.argv.slice(2);
let targets;
if (args.includes("--all") || args.length === 0) {
  targets = allLessonNumbers();
} else {
  targets = args.map(Number).filter((x) => Number.isInteger(x));
}

const tmp = mkdtempSync(join(tmpdir(), "verify-lesson-"));
let anyFail = false;

for (const n of targets) {
  const { fails } = checkLesson(n, tmp);
  if (fails.length === 0) {
    console.log(`✓ Session ${n}: PASS`);
  } else {
    anyFail = true;
    console.log(`✗ Session ${n}: FAIL`);
    for (const f of fails) console.log(`    - ${f}`);
  }
}

process.exit(anyFail ? 1 : 0);
