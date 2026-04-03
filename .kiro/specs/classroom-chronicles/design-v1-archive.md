# Design Document: The Classroom Chronicles

## Overview

A single-page, client-side pedagogical decision game for student teachers in Singapore. Runs entirely in the browser — no backend, no build step, no framework. Deployed as a static site on GitHub Pages via branch-based deploy (no Actions workflow needed).

### Tech Stack

| Concern | Choice |
|---|---|
| Language | Vanilla JS (ES Modules) |
| Styling | CSS custom properties + simple utility classes |
| Charts | Chart.js (CDN `<script>` tag) |
| Data | JS ES module (`src/data.js`) |
| State | Plain object in `main.js` |
| Hosting | GitHub Pages — branch deploy from `main`, root folder |

### File Structure

```
index.html       — single HTML file, loads Chart.js CDN + src/main.js
style.css        — all styles
src/
  data.js        — TheoryBank + ScenarioLibrary (all content)
  engine.js      — deriveProfileBucket, selectScenarios, computeAxisScores, deriveEnding, generateReflection
  main.js        — game state, router, all UI rendering
```

That's it. 4 source files.

### Application Flow

```
Profile Builder → Episode 1 (Diagnose) → Episode 2 (Redesign) → Episode 3 (Reflect) → Results
```

---

## Data Layer (`src/data.js`)

### TheoryBank

A plain object keyed by theory ID. Each entry has:

```js
{
  label: string,        // display name
  citation: string,     // APA reference
  summary: string,      // 1–2 sentences
  dimension: string     // "afl" | "support" | "challenge" | "participation" | "reflection"
}
```

Required keys (minimum): `AfL_Triangle`, `Hattie_Timperley_Feedback`, `Feedback_Conceptions`, `Tomlinson_Teaching_Up`, `Tomlinson_Respectful_Tasks`, `Tomlinson_Flex_Grouping`, `Vygotsky_ZPD_Bruner`, `SDT_Deci_Ryan`, `Accountable_Talk`, `Two_Step_MCQ`, `IRF_Chains`, `AQS_Feedback`, `Jay_Johnson_Reflection`.

### ScenarioLibrary

```js
{
  buckets: {
    [bucketId]: {
      scenarios: [ ScenarioObject, ... ]  // at least 3 per bucket
    }
  }
}
```

### ScenarioObject

```js
{
  id: string,
  bucket: string,
  subject: string,
  topic: string,
  schoolLevel: string,
  contextNote: string,
  students: [{ name, readiness, motivation, SEN, note }],
  episodes: [          // exactly 3
    {
      type: "cfu" | "assessment_response" | "feedback_closure",
      situation: string,
      evidence: string,
      choices: [       // exactly 4
        {
          id: string,
          label: string,
          elaboration: string,
          theoryKey: string,
          consequence: string,
          tradeoff: string,
          studentReaction: string,
          scores: { afl, support, challenge, participation }
        }
      ],
      episodeBridge: string
    }
  ]
}
```

To add a new scenario: add one object to `ScenarioLibrary.buckets[bucketId].scenarios`.
To add a new bucket: add one key to `ScenarioLibrary.buckets`.
To add a new theory: add one key to `TheoryBank`.

---

## Engine (`src/engine.js`)

Four exported functions. All logic lives here — nothing hardcoded in `main.js`.

### `deriveProfileBucket(profile)`

Priority rules in order:
1. readinessDistribution in ["Mostly low", "Low-skewed mixed"] → `"readiness_gap"`
2. motivationProfile in ["Largely disengaged", "Majority low, some pockets of keenness"] → `"participation_low"`
3. sen in ["Moderate (~20%)", "High (~30%)", "Complex (~35%+)"] → `"sen_heavy"`
4. readinessDistribution in ["Mostly high", "High-skewed mixed"] → `"challenge_needed"`
5. else → `"balanced_mixed"`

### `selectScenarios(bucketId, library)`

Shuffles the bucket's scenario array, returns the first 3. Throws if bucket not found.

### `computeAxisScores(choices, scenarios)`

Sums `scores` across the 3 confirmed choices. Returns `{ afl, support, challenge, participation }`.

### `deriveEnding(scores)`

Priority order:
1. `afl >= 50` AND afl is highest → `"evidence_adaptor"`
2. `support >= 50` AND support is highest → `"scaffold_builder"`
3. `challenge >= 50` AND challenge is highest → `"challenge_champion"`
4. `participation >= 50` AND participation is highest → `"community_weaver"`
5. all 4 axes within 20 points of each other → `"balanced_practitioner"`
6. default → `"reactive_teacher"`

### `generateReflection(state, library, theoryBank)`

Returns a 3-paragraph string (Descriptive / Comparative / Critical) using the Jay & Johnson (2002) structure. Interpolates profile values, episode choices, named students, and ending label.

---

## State (`main.js`)

One plain object, no separate module:

```js
const state = {
  profile: {},          // 8 keys, filled by Profile Builder
  bucket: null,
  scenarios: null,      // array of 3 ScenarioObjects
  choices: [null, null, null],   // confirmed choice per episode
  axisScores: null,
  endingId: null,
  reflectionText: null,
  phase: "profile"      // "profile" | "ep0" | "ep1" | "ep2" | "results"
}
```

Persisted to `sessionStorage` on every state change so a browser refresh restores progress.

---

## UI (all in `main.js`)

Five render functions, each wipes `<main>` and renders the current phase:

| Function | Renders |
|---|---|
| `renderProfileBuilder()` | 8 dropdowns, live class card, Randomise / Randomise All, Start button |
| `renderEpisode(index)` | Scenario context, 4 choice cards, Confirm + Back buttons, progress bar |
| `renderResults()` | Radar chart (Chart.js), ending narrative, editable reflection textarea, copy button, Restart button |

Progress bar is a simple `<ol>` rendered at the top of every episode screen.

### Class Card (inside Profile Builder)

Updates live on every dropdown change. Shows:
- Readiness Distribution: 3 coloured bars (low/mid/high proportions)
- Motivation: red/amber/green proportion bar
- SES: proportion bar

### Endings

Six endings defined in `src/data.js` alongside scenarios:

```js
const Endings = {
  evidence_adaptor: { label, narrative, radarDescription },
  scaffold_builder: { ... },
  // etc.
}
```

---

## Reflection Entry

Auto-generated from state using the template in the spec. Rendered as an editable `<textarea>`. Copy button uses `navigator.clipboard.writeText()` with a `<textarea>` fallback if clipboard API fails.

---

## Journal

In-memory array of `RunRecord` objects (lost on page close — no persistence beyond session). Shown at the bottom of the Results screen as a collapsible list. Each entry shows: ending label, first 120 chars of reflection, mini radar chart. Export button generates a plain-text block with APA references.

---

## Error Handling

- Incomplete profile: Start button disabled, missing fields highlighted inline.
- Unknown bucket: `selectScenarios` throws a descriptive error (developer error, not player-facing).
- Clipboard failure: fallback textarea shown.
- Missing theoryKey: warning logged, citation omitted — no crash.
- sessionStorage unavailable: game continues in-memory, no crash.

---

## Out of Scope

- User accounts, login, backend, server
- Multiplayer
- Saving to external storage
- Audio, video
- Animations beyond simple CSS transitions
- GitHub Actions workflow (branch-based Pages deploy is sufficient)
- Test suite (Vitest / fast-check)
