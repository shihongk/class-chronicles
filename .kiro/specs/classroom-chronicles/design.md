# Design Document: The Classroom Chronicles

## Overview

The Classroom Chronicles is a single-page, client-side pedagogical decision game for student teachers in Singapore. It runs entirely in the browser with no backend, no user accounts, and no external storage beyond `sessionStorage` (for in-progress state) and an in-memory journal array (for run history within a session).

The application is structured as a pure JavaScript SPA (no framework required — vanilla JS with ES modules). Styling uses a custom CSS design system built on CSS custom properties. The data layer (Scenario Library, Theory Bank) is fully decoupled from game logic via ES module imports.

### Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Language | Vanilla JS (ES Modules) | Zero build tooling, runs from any static host or `file://` |
| Styling | CSS custom properties + BEM | No dependency, full control, easy theming |
| Charts | Chart.js (CDN) | Lightweight, radar + bar chart support, no build step |
| Data | JS ES module objects | Importable, tree-shakeable, no JSON fetch needed |
| State | In-memory + sessionStorage | Meets req 8.5 without a backend |
| Export | Clipboard API + textarea fallback | Meets req 7.6–7.7 |
| Hosting | GitHub Pages | Free static hosting, deploys from `main` branch root |

### Deployment: GitHub Pages

The app is deployed as a static site from the root of the `main` branch via GitHub Pages.

**Repository structure requirements:**
- `index.html` must be at the repository root (GitHub Pages serves from root by default)
- All asset paths must be relative (no absolute `/` paths) so the app works under a GitHub Pages subpath (e.g. `https://username.github.io/classroom-chronicles/`)
- No build step — source files are served directly

**GitHub Actions workflow** (`.github/workflows/deploy.yml`):
- Trigger: push to `main`
- Action: `actions/deploy-pages` — deploys the repository root as a static site
- No build or compile step required

**`package.json`** is included only for running tests locally (`vitest --run`). It is not used by the deployment pipeline.

**Base path handling:**
- All `import` statements use relative paths (`./src/...`, `../data/...`)
- Chart.js loaded via CDN `<script>` tag in `index.html` — no npm install needed at runtime

### Application Flow

```
Profile Builder → [derive bucket] → Episode 1 (Diagnose) → Episode 2 (Redesign) → Episode 3 (Reflect) → Results → [Journal]
```

The player can navigate back within episodes. The Results screen shows the Pedagogical Response Profile (radar chart), the auto-generated Reflection Entry, and the Journal.

---

## Architecture

### Module Structure

```
src/
  data/
    scenarioLibrary.js   — all scenario content, keyed by bucket
    theoryBank.js        — all theory entries
  engine/
    profileEngine.js     — deriveProfileBucket(profile)
    scenarioEngine.js    — selectScenarios(bucket, library)
    scoringEngine.js     — computeAxisScores(choices), deriveEnding(scores)
    reflectionEngine.js  — generateReflection(runRecord)
  ui/
    profileBuilder.js    — Class Profile Builder screen
    episodePlayer.js     — Episode rendering + decision logic
    resultsScreen.js     — Radar chart, reflection, journal
    progressBar.js       — Phase progress indicator
    journal.js           — Run history view
  state/
    gameState.js         — Single state object + sessionStorage sync
  main.js                — Entry point, router
index.html
style.css
```

### Data Flow

```
Player input → profileBuilder.js
  → profileEngine.deriveProfileBucket()
  → gameState.setBucket()
  → scenarioEngine.selectScenarios()
  → gameState.setScenarios()

Per episode:
  episodePlayer renders scenario + choices
  Player selects → gameState.recordChoice(episodeIndex, choiceId)
  After ep3 → scoringEngine.computeAxisScores()
            → scoringEngine.deriveEnding()
            → reflectionEngine.generateReflection()
            → resultsScreen renders all output
```

### State Shape

```js
{
  profile: {
    schoolLevel: string | null,
    classSize: string | null,
    stream: string | null,
    ethnicComposition: string | null,
    readinessDistribution: string | null,
    motivationProfile: string | null,
    sen: string | null,
    sesProfile: string | null
  },
  bucket: string | null,
  scenarios: [ScenarioObject, ScenarioObject, ScenarioObject] | null,
  choices: [
    { scenarioId, choiceId, userReason } | null,  // ep1
    { scenarioId, choiceId, userReason } | null,  // ep2
    { scenarioId, choiceId, userReason } | null   // ep3
  ],
  axisScores: { afl: number, support: number, challenge: number, participation: number } | null,
  endingId: string | null,
  reflectionText: string | null,
  phase: "profile" | "ep1" | "ep2" | "ep3" | "results"
}
```

---

## Components and Interfaces

### profileEngine.js

```js
/**
 * Derives a Profile_Bucket from a completed Class_Profile.
 * All bucket routing logic lives here and nowhere else.
 * @param {ClassProfile} profile
 * @returns {string} bucketId
 */
export function deriveProfileBucket(profile): string
```

Priority rules (from Requirement 2.1):
1. readinessDistribution in ["Mostly low", "Low-skewed mixed"] → `"readiness_gap"`
2. motivationProfile in ["Largely disengaged", "Majority low, some pockets of keenness"] → `"participation_low"`
3. sen in ["Moderate (~20%)", "High (~30%)", "Complex (~35%+)"] → `"sen_heavy"`
4. readinessDistribution in ["Mostly high", "High-skewed mixed"] → `"challenge_needed"`
5. else → `"balanced_mixed"`

### scenarioEngine.js

```js
/**
 * Selects 3 scenarios from the library for the given bucket.
 * Shuffles the bucket array and takes the first 3.
 * @param {string} bucketId
 * @param {ScenarioLibrary} library
 * @returns {ScenarioObject[]} array of exactly 3 scenarios
 */
export function selectScenarios(bucketId, library): ScenarioObject[]
```

### scoringEngine.js

```js
/**
 * Sums axis scores across all 3 episode choices.
 * @param {ChoiceRecord[]} choices — array of 3 confirmed choice records
 * @param {ScenarioObject[]} scenarios
 * @returns {AxisScores} { afl, support, challenge, participation }
 */
export function computeAxisScores(choices, scenarios): AxisScores

/**
 * Maps axis scores to an ending ID.
 * All ending logic lives here and nowhere else.
 * @param {AxisScores} scores
 * @returns {string} endingId
 */
export function deriveEnding(scores): string
```

Ending derivation logic (from product spec):
- `afl >= 50` AND afl is highest → `"evidence_adaptor"`
- `support >= 50` AND support is highest → `"scaffold_builder"`
- `challenge >= 50` AND challenge is highest → `"challenge_champion"`
- `participation >= 50` AND participation is highest → `"community_weaver"`
- all 4 axes within 20 points of each other → `"balanced_practitioner"`
- no axis >= 35 → `"reactive_teacher"`

### reflectionEngine.js

```js
/**
 * Generates a 3-paragraph Reflection Entry from a completed run.
 * Uses Jay & Johnson (2002) Descriptive / Comparative / Critical structure.
 * @param {RunRecord} runRecord
 * @param {ScenarioLibrary} library
 * @param {TheoryBank} theoryBank
 * @returns {string} formatted reflection text
 */
export function generateReflection(runRecord, library, theoryBank): string
```

### gameState.js

```js
export function getState(): GameState
export function setState(partial: Partial<GameState>): void
export function resetState(): void
export function persistToSession(): void   // writes JSON to sessionStorage
export function restoreFromSession(): boolean  // returns true if restored
```

### UI Components

| Component | Responsibility |
|---|---|
| `profileBuilder.js` | Renders 8 dropdowns, live class card, randomise controls, validation |
| `episodePlayer.js` | Renders scenario narrative, evidence, 4 choice cards, confirm button, back button |
| `resultsScreen.js` | Renders radar chart (Chart.js), ending narrative, reflection editor, export button |
| `progressBar.js` | Renders 5-step phase indicator, marks completed steps |
| `journal.js` | Renders run list, mini radar charts, expandable detail, export per run |

---

## Data Models

### ClassProfile

```ts
interface ClassProfile {
  schoolLevel: string;
  classSize: string;
  stream: string;
  ethnicComposition: string;
  readinessDistribution: string;
  motivationProfile: string;
  sen: string;
  sesProfile: string;
}
```

### ScenarioObject

```ts
interface ScenarioObject {
  id: string;                    // unique, e.g. "rg_econ_s3_01"
  bucket: string;                // Profile_Bucket key
  subject: string;
  topic: string;
  schoolLevel: string;
  contextNote: string;
  students: StudentProfile[];
  episodes: Episode[];           // exactly 3
}

interface StudentProfile {
  name: string;
  readiness: "low" | "mid" | "high";
  motivation: "motivated" | "compliant" | "disengaged";
  SEN: boolean;
  note: string;
}

interface Episode {
  type: "cfu" | "assessment_response" | "feedback_closure";
  situation: string;
  evidence: string;
  choices: Choice[];             // exactly 4
  episodeBridge: string;
}

interface Choice {
  id: string;
  label: string;
  elaboration: string;
  theoryKey: string;             // references TheoryBank key
  consequence: string;
  tradeoff: string;
  studentReaction: string;
  scores: AxisScores;
}
```

### TheoryBank Entry

```ts
interface TheoryEntry {
  key: string;
  label: string;
  citation: string;              // APA format
  summary: string;               // 1–2 sentences
  dimension: "afl" | "support" | "challenge" | "participation" | "reflection";
}
```

### AxisScores

```ts
interface AxisScores {
  afl: number;
  support: number;
  challenge: number;
  participation: number;
}
```

### RunRecord

```ts
interface RunRecord {
  id: string;                    // uuid or timestamp-based
  timestamp: string;             // ISO 8601
  profileSummary: ClassProfile;
  scenarioId: string;            // primary scenario id
  choices: ChoiceRecord[];       // 3 entries
  axisScores: AxisScores;
  endingId: string;
  reflectionText: string;
}

interface ChoiceRecord {
  episodeIndex: number;          // 0, 1, 2
  scenarioId: string;
  choiceId: string;
  userReason: string;            // optional player-typed reason
}
```

### ScenarioLibrary shape

```ts
interface ScenarioLibrary {
  buckets: {
    [bucketId: string]: {
      scenarios: ScenarioObject[];
    }
  }
}
```

### TheoryBank shape

```ts
interface TheoryBank {
  [key: string]: TheoryEntry;
}
```

### Ending shape

```ts
interface Ending {
  id: string;
  label: string;
  narrative: string;             // 2–3 paragraphs, references named students
  radarDescription: string;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

---

### Property 1: Profile parameter option sets are complete and exact

*For any* parameter in the Class Profile Builder, the set of options rendered to the player must exactly equal the specified valid option set for that parameter — no more, no fewer.

**Validates: Requirements 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9**

---

### Property 2: Randomise always produces valid parameter values

*For any* call to the Randomise or Randomise All control, every resulting parameter value must be a member of that parameter's valid option set.

**Validates: Requirements 1.14, 1.15**

---

### Property 3: Start control enabled iff all 8 parameters are set

*For any* Class Profile state, the start-gameplay control must be enabled if and only if all 8 parameters are non-null. For any incomplete profile, the control must be disabled and the missing parameters must be identified.

**Validates: Requirements 1.16, 1.17**

---

### Property 4: Profile bucket derivation follows priority rules exactly

*For any* complete Class Profile, `deriveProfileBucket(profile)` must return exactly one of the five valid bucket IDs, and the returned bucket must be the first matching rule in the specified priority order.

**Validates: Requirements 2.1**

---

### Property 5: Selected scenarios always belong to the derived bucket

*For any* bucket ID, every scenario returned by `selectScenarios(bucketId, library)` must have its `bucket` field equal to `bucketId`.

**Validates: Requirements 2.2, 3.3, 5.3**

---

### Property 6: Scenario Library structural invariants

*For any* Scenario Library, every required bucket key must be present, and every bucket must contain at least 3 scenario objects.

**Validates: Requirements 3.4, 3.5**

---

### Property 7: Every scenario and choice satisfies its schema

*For any* scenario object in the library, all required fields (id, bucket, subject, topic, schoolLevel, contextNote, students, episodes) must be present and non-null. *For any* episode in a scenario, the choices array must contain between 3 and 5 entries. *For any* choice, all required fields (id, label, elaboration, theoryKey, consequence, tradeoff, studentReaction, scores) must be present and non-null.

**Validates: Requirements 4.1, 4.2, 4.3**

---

### Property 8: Axis scores are the exact sum of selected choice scores

*For any* set of 3 confirmed choice records, `computeAxisScores(choices, scenarios)` must return axis totals that equal the sum of the `scores` fields of the three selected Choice objects — one per episode.

**Validates: Requirements 6.1, 6.5**

---

### Property 9: Ending derivation follows the specified mapping

*For any* AxisScores object, `deriveEnding(scores)` must return the ending ID corresponding to the first matching condition in the specified ending priority table.

**Validates: Requirements 6.2**

---

### Property 10: Advance control is disabled until a choice is confirmed

*For any* episode state where no choice has been confirmed, the control that advances to the next episode must be disabled.

**Validates: Requirements 5.7**

---

### Property 11: Reflection entry references profile and ending

*For any* completed RunRecord, `generateReflection(runRecord, library, theoryBank)` must return a non-empty string that contains the player's schoolLevel value, stream value, and the ending label — and the output must be structured in three paragraphs (Descriptive / Comparative / Critical).

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

---

### Property 12: Session storage round-trip preserves game state

*For any* GameState object, calling `persistToSession()` followed by `restoreFromSession()` must produce a state object that is deeply equal to the original.

**Validates: Requirements 8.5**

---

### Property 13: Navigation preserves previously recorded choices

*For any* episode where a choice has been confirmed, navigating back to a previous episode and then returning forward must restore the originally confirmed choice for each episode.

**Validates: Requirements 9.3, 9.5**

---

### Property 14: Completed phases are marked in the progress indicator

*For any* current phase, all phases that precede it in the sequence (Profile Builder → Episode 1 → Episode 2 → Episode 3 → Results) must be rendered as complete in the progress indicator.

**Validates: Requirements 9.2**

---

## Error Handling

### Invalid / Incomplete Profile
- The start control is disabled until all 8 parameters are set (Req 1.16).
- Attempting to start with an incomplete profile highlights the missing fields — no error modal, inline indication only.

### Scenario Library Missing Bucket
- If `selectScenarios` is called with a bucket ID not present in the library, it throws a descriptive error: `"No scenarios found for bucket: <bucketId>"`. This is a developer error, not a player-facing one.

### Clipboard API Failure
- `navigator.clipboard.writeText()` is wrapped in a try/catch. On failure, the reflection textarea is made visible and focused so the player can copy manually (Req 7.7).

### Session Storage Unavailable
- `persistToSession` and `restoreFromSession` are wrapped in try/catch. If sessionStorage is unavailable (e.g. private browsing with storage blocked), the game continues in-memory only — no crash, no message unless the player refreshes and state is lost.

### Ending Derivation Edge Cases
- If no ending condition matches (e.g. all axes are 0), `deriveEnding` falls through to `"reactive_teacher"` as the default.
- If multiple conditions match simultaneously, the first matching condition in the priority list wins.

### Theory Key Not Found
- If a choice's `theoryKey` does not exist in the TheoryBank, the reflection engine logs a warning and omits the citation rather than crashing.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:
- Unit tests cover specific examples, integration points, and edge cases.
- Property-based tests verify universal correctness across all valid inputs.

### Property-Based Testing

**Library**: [fast-check](https://github.com/dubzzz/fast-check) (JavaScript, no build step required, CDN available)

**Configuration**: Each property test must run a minimum of **100 iterations**.

**Tag format** (comment above each test):
```
// Feature: classroom-chronicles, Property <N>: <property_text>
```

Each correctness property defined above must be implemented as a single property-based test:

| Property | Test description | fast-check arbitraries |
|---|---|---|
| P1 | Option sets are complete and exact | `fc.constantFrom(...parameterKeys)` |
| P2 | Randomise produces valid values | `fc.integer()` (seed for randomise) |
| P3 | Start control enabled iff all 8 set | `fc.record(...)` with nullable fields |
| P4 | Bucket derivation follows priority | `fc.record(...)` of valid profile values |
| P5 | Selected scenarios belong to bucket | `fc.constantFrom(...bucketIds)` |
| P6 | Library structural invariants | static check on imported library |
| P7 | Schema invariants for all scenarios/choices | static check on imported library |
| P8 | Axis scores are exact sums | `fc.tuple(fc.integer(), fc.integer(), fc.integer())` for choice indices |
| P9 | Ending derivation follows mapping | `fc.record({afl, support, challenge, participation})` |
| P10 | Advance disabled until confirmed | `fc.boolean()` (confirmed state) |
| P11 | Reflection references profile and ending | `fc.record(...)` of RunRecord fields |
| P12 | Session storage round-trip | `fc.record(...)` of GameState |
| P13 | Navigation preserves choices | `fc.array(fc.integer({min:0, max:3}), {minLength:3, maxLength:3})` |
| P14 | Completed phases marked | `fc.constantFrom("profile","ep1","ep2","ep3","results")` |

### Unit Tests

Unit tests focus on:
- **Specific examples**: e.g. the exact 3 seed scenarios render correctly, the exact ending labels match the spec.
- **Integration points**: e.g. a full run from profile → bucket → scenarios → choices → scores → ending → reflection produces a coherent output.
- **Edge cases**: clipboard failure fallback (Req 7.7), sessionStorage unavailable, episode 3 → results transition (Req 5.6), empty/null profile fields.

Avoid writing unit tests that duplicate what property tests already cover (e.g. don't write 12 separate unit tests for each profile parameter option set — Property 1 covers all of them).

### Test File Structure

```
tests/
  unit/
    profileEngine.test.js
    scoringEngine.test.js
    reflectionEngine.test.js
    scenarioEngine.test.js
    gameState.test.js
  property/
    profileEngine.prop.test.js   — P1, P2, P3, P4
    scenarioEngine.prop.test.js  — P5, P6, P7
    scoringEngine.prop.test.js   — P8, P9
    episodePlayer.prop.test.js   — P10
    reflectionEngine.prop.test.js — P11
    gameState.prop.test.js       — P12, P13, P14
```

### Test Runner

Vitest (compatible with vanilla JS ES modules, no framework required). Run with:
```
vitest --run
```
