# Design Document: The Classroom Chronicles (v2)

## Overview

A single-page, client-side pedagogical decision game for student teachers in Singapore (QED52B Pedagogical Practices). Runs entirely in the browser — no backend, no build step, no framework. Deployed as a static site on GitHub Pages.

The player selects a school level and class profile, then plays through a 3-episode classroom scenario. Each episode presents a real pedagogical moment with branching choices. Episode 3 delivers a path-specific consequence and structured reflection — no further choices.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Language | Vanilla JS (ES Modules) |
| Styling | CSS custom properties + utility classes |
| Charts | None (removed in v2) |
| Hosting | GitHub Pages — branch deploy from `main`, root folder |

---

## File Structure

```
index.html          — shell HTML, loads src/main.js
style.css           — all styles
src/
  data/
    scenarios.js    — all 6 ScenarioObjects (current source of truth)
    theoryBank.js   — TheoryBank (theory labels + citations)
    index.js        — re-exports
  engine.js         — lookupScenario(level, profile)
  main.js           — state, router, all UI rendering
```

### Planned Migration: scenarios.js → JSON files

Once all 6 scenarios are fully expanded, `scenarios.js` will be split into individual JSON files:

```
src/
  data/
    scenarios/
      s1.json       — S1 scenario data
      s2.json       — S2 scenario data
      s3.json       — S3 scenario data
      s4.json       — S4 scenario data
      s5.json       — S5 scenario data
      s6.json       — S6 scenario data
      index.js      — imports all JSON, exports scenarios array
    theoryBank.js
    index.js        — re-exports from scenarios/index.js + theoryBank
  engine.js
  main.js
```

**Why JSON:** Separates content from code. Scenarios can be edited without touching JS. Scales cleanly as content grows. See `SCALABLE-DESIGN-PROPOSAL.md` for full rationale.

**Migration trigger:** After all 6 scenarios are fully expanded using the `SCENARIO-EXPANSION-FRAMEWORK.md`.

---

## Application Flow

```
Landing → Setup (Level + Profile)
       → [if 1 scenario for combo] → Episode 1 directly
       → [if multiple scenarios]   → Scenario Picker → Episode 1
       → Episode 2 (2 sub-choices, branch from Ep1)
       → Episode 3 (consequence + reflection, no choice)
       → Results (path summary + reflection prompt)
```

Currently 1 scenario per level×profile combo, so the picker is bypassed. The picker activates automatically when multiple scenarios exist for the same combo.

---

## User-Facing Setup

The player makes exactly **2 selections** before gameplay begins.

### Group 1 — Level

| Value | Label |
|---|---|
| `lower_sec` | Lower Secondary |
| `upper_sec` | Upper Secondary |
| `jc` | Junior College |

### Group 2 — Class Profile

| Value | Label | Short description (shown in pill) |
|---|---|---|
| `mixed_readiness` | Mixed Readiness | Wide spread — some ready, some not |
| `fast_finishers` | Fast Finishers | Most finish quickly, reasoning is thin |
| `quiet_class` | Quiet Class | Compliant but silent — hard to read |
| `hidden_thinking` | Hidden Thinking | Correct answers, invisible process |
| `diverse_profiles` | Diverse Learning Profiles | Different reps and access needs in the same room |
| `invisible_understanding` | Invisible Understanding | Fluent but no visible evidence |

### Auto-Derived (not shown to user)

| Level | Subject |
|---|---|
| Lower Sec | Mathematics |
| Upper Sec | Mathematics |
| JC | Economics |

The following are **never** exposed as user controls — they are embedded in scenario content:
- Topic, lesson phase, motivation, participation pattern, readiness spread, assessment visibility, learning support load, class size, SES, gender ratio, ethnicity, seating

---

## Scenario Mapping (locked)

18 scenarios total — 6 per level, one per class profile per level.

| ID | Level | Profile | Subject | Topic |
|---|---|---|---|---|
| S1 | Upper Sec | Mixed Readiness | Math | Completing the Square |
| S2 | Upper Sec | Fast Finishers | Math | Quadratic Factorisation |
| S3 | Lower Sec | Quiet Class | Math | Linear Equations |
| S4 | Lower Sec | Hidden Thinking | Math | Angles in Triangles |
| S5 | JC | Diverse Learning Profiles | Economics | Price Elasticity |
| S6 | JC | Invisible Understanding | Economics | Market Equilibrium |
| S7 | Lower Sec | Mixed Readiness | Math | Fractions |
| S8 | Lower Sec | Fast Finishers | Math | Perimeter & Area |
| S9 | Lower Sec | Quiet Class | Math | Negative Numbers |
| S10 | Lower Sec | Hidden Thinking | Math | Ratio |
| S11 | Upper Sec | Mixed Readiness | Math | Gradient |
| S12 | Upper Sec | Fast Finishers | Math | Trigonometric Identities |
| S13 | JC | Diverse Learning Profiles | Economics | Marginal Utility |
| S14 | JC | Invisible Understanding | Economics | ADAS |
| S15 | Upper Sec | Quiet Class | Math | Volume of Solids |
| S16 | Upper Sec | Hidden Thinking | Math | Quadratics |
| S17 | JC | Diverse Learning Profiles | Economics | ADAS |
| S18 | Upper Sec | Diverse Learning Profiles | Math | Vectors |

The engine returns all scenarios matching `(level, profile)` via `getScenarioPool`. The user then picks one from the scenario picker screen before gameplay begins.

---

## Data Layer

### ScenarioObject

```js
{
  id: string,                  // e.g. "S1"
  level: string,               // "upper_sec" | "lower_sec" | "jc"
  profile: string,             // "mixed_readiness" | "fast_finishers" | ...
  subject: string,             // "Mathematics" | "Economics"
  topic: string,
  contextNote: string,         // brief framing shown before Ep1
  students: [                  // 3–4 named focal students
    { name, role, note }       // role: "fast" | "middle" | "stalled" | "support"
  ],
  ep1: {
    situation: string,
    evidence: string,
    choices: [                 // exactly 3
      {
        id: string,            // "A" | "B" | "C"
        label: string,
        elaboration: string,
        theoryKey: string,
        tradeoff: string
      }
    ]
  },
  ep2: {
    A: { consequence: string, choices: [ Ep2Choice, Ep2Choice ] },
    B: { consequence: string, choices: [ Ep2Choice, Ep2Choice ] },
    C: { consequence: string, choices: [ Ep2Choice, Ep2Choice ] }
  },
  ep3: {
    // keyed by Ep1+Ep2 path, e.g. "A1", "A2", "B1", "B2", "C1", "C2"
    A1: { outcome: string, tradeoff: string, reflection: string },
    A2: { outcome: string, tradeoff: string, reflection: string },
    B1: { outcome: string, tradeoff: string, reflection: string },
    B2: { outcome: string, tradeoff: string, reflection: string },
    C1: { outcome: string, tradeoff: string, reflection: string },
    C2: { outcome: string, tradeoff: string, reflection: string }
  }
}
```

### Ep2Choice

```js
{
  id: string,        // "1" | "2" (relative to parent Ep1 branch)
  label: string,
  elaboration: string,
  theoryKey: string,
  tradeoff: string
}
```

### TheoryBank

```js
{
  [key]: {
    label: string,      // display name
    citation: string,   // APA
    summary: string,    // 1–2 sentences
    dimension: string   // "afl" | "differentiation" | "participation" | "feedback" | "reflection"
  }
}
```

Theory keys used across scenarios:
`AfL_Triangle`, `Two_Step_MCQ`, `Hattie_Timperley_Feedback`, `AQS_Feedback`,
`Tomlinson_Teaching_Up`, `Tomlinson_Respectful_Tasks`, `Tomlinson_Flex_Grouping`,
`Vygotsky_ZPD_Bruner`, `Accountable_Talk`, `IRF_Chains`, `Jay_Johnson_Reflection`

---

## Engine (`src/engine.js`)

Two exported functions:

```js
// Returns all scenarios matching (level, profile) — 1 to 3 items
export function getScenarioPool(level, profile, scenarios)

// Returns a single scenario by id — used after user picks from the pool
export function getScenarioById(id, scenarios)
```

The UI calls `getScenarioPool` after setup to populate the scenario picker screen. Once the user selects a scenario, `getScenarioById` resolves it into state.

No scoring, no axis computation, no bucket derivation.

---

## State (`main.js`)

```js
const state = {
  level: null,          // "lower_sec" | "upper_sec" | "jc"
  profile: null,        // "mixed_readiness" | "fast_finishers" | ...
  scenario: null,       // resolved ScenarioObject
  ep1Choice: null,      // "A" | "B" | "C"
  ep2Choice: null,      // "1" | "2"
  phase: "landing"      // "landing" | "setup" | "ep1" | "ep2" | "ep3" | "results"
}
```

Persisted to `sessionStorage` on every state change.

---

## UI (`main.js`)

Six render functions:

| Function | Phase | Description |
|---|---|---|
| `renderLanding()` | `landing` | Title, tagline, Begin button |
| `renderSetup()` | `setup` | Level pills + Profile pills, Start button |
| `renderScenarioPick()` | `scenario_pick` | Cards showing matching scenarios by topic, user picks one |
| `renderEp1()` | `ep1` | Context, evidence, 3 choice cards |
| `renderEp2()` | `ep2` | Ep1 consequence, 2 sub-choice cards |
| `renderEp3()` | `ep3` | Path outcome, tradeoff, reflection text |
| `renderResults()` | `results` | Path summary, editable reflection textarea, copy button, Restart |

### Setup Screen

- Two pill groups: Level (3 pills) and Class Profile (6 pills)
- Each profile pill shows label + short description
- Start button disabled until both selected
- No class card, no proportion bars, no randomise buttons

### Episode Screens

- Progress indicator: `Setup → Episode 1 → Episode 2 → Episode 3 → Results` (simple step dots)
- Back button on Ep1 returns to Setup; on Ep2 returns to Ep1; on Ep3 returns to Ep2
- Confirm button disabled until a choice is selected
- On Ep1 confirm: store `ep1Choice`, navigate to `ep2`
- On Ep2 confirm: store `ep2Choice`, navigate to `ep3`
- Ep3 has no choices — just a Continue button to Results

### Results Screen

- Shows scenario context recap at top (situation + evidence)
- Full path summary showing Ep1 choice label + elaboration, Ep2 consequence + choice label + elaboration, Ep3 outcome — each with theory tag superscript
- Editable `<textarea>` pre-filled with 3-question reflection prompt (why they chose, satisfaction with outcome, what they'd do differently)
- Copy button (clipboard API + textarea fallback)
- Numbered APA references matching superscripts in path summary
- Restart button (clears state, returns to Landing)

### Reflection Design

The reflection textarea is intentionally concise — 3 questions only:
1. Why did you choose this path? What were you prioritizing?
2. Are you satisfied with the outcome? (references specific result)
3. Forward-looking question (what would you do differently / how would you design X)

The reflection does **not** repeat the choices back to the user. It focuses on their reasoning and satisfaction.

---

## Error Handling

- Incomplete setup: Start button disabled.
- Unknown level/profile combo: `lookupScenario` throws (developer error).
- Clipboard failure: textarea already visible and selectable — no extra fallback needed.
- sessionStorage unavailable: game continues in-memory, no crash.

---

## Scenario Content Status

| ID | Level | Profile | Topic | Expansion Status |
|---|---|---|---|---|
| S1 | Upper Sec | Mixed Readiness | Completing the Square | ✅ Fully expanded |
| S2 | Upper Sec | Fast Finishers | Quadratic Factorisation | ✅ Fully expanded |
| S3 | Lower Sec | Quiet Class | Linear Equations | ⏳ Basic stub |
| S4 | Lower Sec | Hidden Thinking | Angles in Triangles | ⏳ Basic stub |
| S5 | JC | Diverse Learning Profiles | Price Elasticity | ⏳ Basic stub |
| S6 | JC | Invisible Understanding | Market Equilibrium | ⏳ Basic stub |
| S7 | Lower Sec | Mixed Readiness | Fractions | ⏳ Basic stub |
| S8 | Lower Sec | Fast Finishers | Perimeter & Area | ⏳ Basic stub |
| S9 | Lower Sec | Quiet Class | Negative Numbers | ⏳ Basic stub |
| S10 | Lower Sec | Hidden Thinking | Ratio | ⏳ Basic stub |
| S11 | Upper Sec | Mixed Readiness | Gradient | ⏳ Basic stub |
| S12 | Upper Sec | Fast Finishers | Trigonometric Identities | ⏳ Basic stub |
| S13 | JC | Diverse Learning Profiles | Marginal Utility | ⏳ Basic stub |
| S14 | JC | Invisible Understanding | ADAS | ⏳ Basic stub |
| S15 | Upper Sec | Quiet Class | Volume of Solids | ⏳ Basic stub |
| S16 | Upper Sec | Hidden Thinking | Quadratics | ⏳ Basic stub |
| S17 | JC | Diverse Learning Profiles | ADAS | ⏳ Basic stub |
| S18 | Upper Sec | Diverse Learning Profiles | Vectors | ⏳ Basic stub |

Expansion follows `SCENARIO-EXPANSION-FRAMEWORK.md`. Each scenario requires ~2.5–3.5 hours to expand fully.

---

## Scenario Content Conventions

Established during S1 and S2 expansion. All scenarios must follow these:

- **Class size**: stated explicitly in `contextNote` (e.g. "30 students", "24 students")
- **Time remaining**: stated at end of each `ep2.consequence` and `ep3.outcome`
- **Focal students**: always 4 — 1 fast, 2 middle (different patterns), 1 stalled
- **Student names**: Rajan (fast), Nur Atiqah (middle), Wei Jie (middle), Siti (stalled)
- **Class distribution**: stated in `ep1.situation` with approximate numbers
- **Theory keys**: named explicitly in `tradeoff` text, not just in `theoryKey` field
- **Ep3 reflection**: exactly 3 questions — why they chose, satisfaction check, forward question
- **No repetition**: reflection never repeats the choices back to the user

---

## Removed from v1

- 8-parameter profile builder with proportion bars and randomise buttons
- Axis scoring (afl / support / challenge / participation)
- Radar chart (Chart.js dependency removed)
- 6 named endings with long narratives
- In-memory journal / run history
- `deriveProfileBucket`, `selectScenarios`, `computeAxisScores`, `deriveEnding`, `generateReflection`
- `src/data/endings.js`, `src/data/stubs.js`
- Bucket-based scenario library with shuffle

---

## Out of Scope

- User accounts, login, backend
- Multiplayer
- Audio, video
- Animations beyond CSS transitions
- Test suite
- GitHub Actions (branch-based Pages deploy is sufficient)
