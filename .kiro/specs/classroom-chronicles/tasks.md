# Implementation Plan: The Classroom Chronicles

## Overview

Incremental build of a vanilla JS ES module SPA deployed to GitHub Pages. Each task wires into the previous, ending with a fully integrated game. No build step — files are served directly from the repo root.

## Tasks

- [ ] 1. Scaffold project structure and static entry point
  - Create `index.html` at repo root with CDN `<script>` for Chart.js, module `<script type="module">` for `./src/main.js`, and semantic landmark elements (`<header>`, `<main>`, `<nav>`)
  - Create `style.css` at repo root with CSS custom properties (colour tokens, spacing scale, typography) and BEM base classes for all major components
  - Create empty stub files for every module listed in the architecture (`src/engine/`, `src/ui/`, `src/state/`, `src/data/`) so imports resolve without errors
  - All asset paths must be relative (no leading `/`)
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 2. Implement data layer — Scenario Library and Theory Bank
  - [ ] 2.1 Create `src/data/theoryBank.js` exporting a `TheoryBank` object with at least one entry per axis dimension (`afl`, `support`, `challenge`, `participation`, `reflection`), each conforming to the `TheoryEntry` interface
    - _Requirements: 4.2, 7.1_
  - [ ] 2.2 Create `src/data/scenarioLibrary.js` exporting a `ScenarioLibrary` object with all five bucket keys (`readiness_gap`, `participation_low`, `sen_heavy`, `challenge_needed`, `balanced_mixed`), each containing at least 3 `ScenarioObject` entries conforming to the full schema
    - Each scenario must have exactly 3 episodes; each episode must have 3–5 choices; each choice must include `scores: AxisScores`
    - _Requirements: 3.1, 3.2, 3.4, 3.5, 4.1, 4.2, 4.3_
  - [ ]* 2.3 Write property tests for Scenario Library structural invariants (P6, P7)
    - **Property 6: Every required bucket key is present and each bucket has ≥ 3 scenarios**
    - **Property 7: Every scenario and choice satisfies its schema (all required fields non-null, choices array length 3–5)**
    - **Validates: Requirements 3.4, 3.5, 4.1, 4.2, 4.3**
    - File: `tests/property/scenarioEngine.prop.test.js`

- [ ] 3. Implement game state module
  - [ ] 3.1 Implement `src/state/gameState.js` with `getState`, `setState`, `resetState`, `persistToSession`, `restoreFromSession` conforming to the defined state shape
    - `persistToSession` / `restoreFromSession` must be wrapped in try/catch; if sessionStorage is unavailable the game continues in-memory
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [ ]* 3.2 Write unit tests for gameState
    - Test `setState` partial merge, `resetState` returns initial shape, sessionStorage unavailable path (mock `sessionStorage` to throw)
    - File: `tests/unit/gameState.test.js`
  - [ ]* 3.3 Write property test for session storage round-trip (P12)
    - **Property 12: `persistToSession()` then `restoreFromSession()` produces a deeply equal state**
    - **Validates: Requirements 8.5**
    - File: `tests/property/gameState.prop.test.js`

- [ ] 4. Implement engine modules
  - [ ] 4.1 Implement `src/engine/profileEngine.js` — `deriveProfileBucket(profile)` applying the five priority rules in exact order
    - _Requirements: 2.1_
  - [ ]* 4.2 Write unit tests for profileEngine
    - Cover each of the five bucket outcomes with concrete profile fixtures; cover priority ordering (a profile matching rules 1 and 3 must return rule 1's bucket)
    - File: `tests/unit/profileEngine.test.js`
  - [ ]* 4.3 Write property tests for profileEngine (P4)
    - **Property 4: `deriveProfileBucket` returns exactly one of the five valid bucket IDs and matches the first applicable priority rule**
    - **Validates: Requirements 2.1**
    - File: `tests/property/profileEngine.prop.test.js`
  - [ ] 4.4 Implement `src/engine/scenarioEngine.js` — `selectScenarios(bucketId, library)` shuffles the bucket array and returns exactly 3; throws `"No scenarios found for bucket: <bucketId>"` if bucket is absent
    - _Requirements: 2.2, 3.3, 5.3_
  - [ ]* 4.5 Write unit tests for scenarioEngine
    - Test correct count returned, all results belong to bucket, error thrown for unknown bucket
    - File: `tests/unit/scenarioEngine.test.js`
  - [ ]* 4.6 Write property test for scenario bucket membership (P5)
    - **Property 5: Every scenario returned by `selectScenarios` has its `bucket` field equal to the requested bucketId**
    - **Validates: Requirements 2.2, 3.3, 5.3**
    - File: `tests/property/scenarioEngine.prop.test.js`
  - [ ] 4.7 Implement `src/engine/scoringEngine.js` — `computeAxisScores(choices, scenarios)` sums axis scores across 3 choices; `deriveEnding(scores)` applies the six-condition priority table, defaulting to `"reactive_teacher"`
    - _Requirements: 6.1, 6.2, 6.5_
  - [ ]* 4.8 Write unit tests for scoringEngine
    - Test exact sum for known choice fixtures; test each of the six ending conditions with boundary values
    - File: `tests/unit/scoringEngine.test.js`
  - [ ]* 4.9 Write property tests for scoringEngine (P8, P9)
    - **Property 8: `computeAxisScores` returns totals equal to the exact sum of the three selected choice `scores` fields**
    - **Property 9: `deriveEnding` returns the ending ID for the first matching condition in the priority table**
    - **Validates: Requirements 6.1, 6.2, 6.5**
    - File: `tests/property/scoringEngine.prop.test.js`
  - [ ] 4.10 Implement `src/engine/reflectionEngine.js` — `generateReflection(runRecord, library, theoryBank)` returns a non-empty 3-paragraph string (Descriptive / Comparative / Critical) containing `schoolLevel`, `stream`, and the ending label; logs a warning and omits citation if `theoryKey` is missing
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [ ]* 4.11 Write unit tests for reflectionEngine
    - Test output contains schoolLevel, stream, ending label; test missing theoryKey logs warning and does not throw
    - File: `tests/unit/reflectionEngine.test.js`
  - [ ]* 4.12 Write property test for reflection content (P11)
    - **Property 11: `generateReflection` returns a non-empty string containing schoolLevel, stream, and ending label, structured in three paragraphs**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**
    - File: `tests/property/reflectionEngine.prop.test.js`

- [ ] 5. Checkpoint — engine layer complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement UI — Profile Builder
  - [ ] 6.1 Implement `src/ui/profileBuilder.js` rendering 8 labelled `<select>` dropdowns with the exact option sets from Requirements 1.2–1.9; wire each change event to `gameState.setState` and update the live class card
    - Class card must show Readiness Distribution as a 3-bar proportion indicator, Motivation as a red/amber/green proportion bar, and SES as a proportion bar
    - All `<select>` elements must have associated `<label>` elements
    - _Requirements: 1.1–1.13_
  - [ ]* 6.2 Write property tests for Profile Builder option sets and randomise (P1, P2, P3)
    - **Property 1: Options rendered for each parameter exactly equal the specified valid option set**
    - **Property 2: Randomise / Randomise All always produces values from the valid option set**
    - **Property 3: Start control is enabled iff all 8 parameters are non-null**
    - **Validates: Requirements 1.2–1.9, 1.14, 1.15, 1.16, 1.17**
    - File: `tests/property/profileEngine.prop.test.js`
  - [ ] 6.3 Add "Randomise" and "Randomise All" controls; implement randomise logic selecting uniformly from each parameter's valid option set
    - _Requirements: 1.14, 1.15_
  - [ ] 6.4 Implement start-gameplay control: disabled until all 8 parameters are set; on incomplete attempt, highlight missing fields inline (no modal)
    - _Requirements: 1.16, 1.17_

- [ ] 7. Implement UI — Progress Bar
  - Implement `src/ui/progressBar.js` rendering a 5-step indicator (Profile Builder → Episode 1 → Episode 2 → Episode 3 → Results); mark all phases before the current phase as complete
  - _Requirements: 9.1, 9.2_
  - [ ]* 7.1 Write property test for progress indicator (P14)
    - **Property 14: All phases preceding the current phase are rendered as complete**
    - **Validates: Requirements 9.2**
    - File: `tests/property/gameState.prop.test.js`

- [ ] 8. Implement UI — Episode Player
  - [ ] 8.1 Implement `src/ui/episodePlayer.js` rendering the scenario narrative, evidence block, and 4 choice cards for the current episode; display episode number and phase label (Diagnose / Redesign / Reflect)
    - _Requirements: 5.1, 5.2, 5.8_
  - [ ] 8.2 Wire choice selection: on select, record selection in state and display the choice's `consequence` / `studentReaction` feedback; keep the Confirm button disabled until a choice is selected
    - _Requirements: 5.4, 5.7_
  - [ ]* 8.3 Write property test for advance control gating (P10)
    - **Property 10: The advance control is disabled whenever no choice has been confirmed**
    - **Validates: Requirements 5.7**
    - File: `tests/property/episodePlayer.prop.test.js`
  - [ ] 8.4 Wire Confirm button: on confirm, call `gameState.recordChoice`, then advance to next episode or to Results if on Episode 3
    - _Requirements: 5.5, 5.6_
  - [ ] 8.5 Implement Back button: return to previous episode, restore previously confirmed choice from state
    - _Requirements: 9.3, 9.5_
  - [ ]* 8.6 Write property test for navigation choice preservation (P13)
    - **Property 13: Navigating back and forward restores the originally confirmed choice for each episode**
    - **Validates: Requirements 9.3, 9.5**
    - File: `tests/property/gameState.prop.test.js`

- [ ] 9. Checkpoint — UI gameplay loop complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement UI — Results Screen and Journal
  - [ ] 10.1 Implement `src/ui/resultsScreen.js`: render radar chart via Chart.js using `axisScores`, display ending narrative, render editable `<textarea>` pre-filled with `reflectionText`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 7.5_
  - [ ] 10.2 Add copy-to-clipboard button: call `navigator.clipboard.writeText()`; on failure, make the textarea visible and focused
    - _Requirements: 7.6, 7.7_
  - [ ] 10.3 Add Restart button: call `gameState.resetState()` and navigate to Profile Builder
    - _Requirements: 8.4, 9.4_
  - [ ] 10.4 Implement `src/ui/journal.js`: render list of `RunRecord` entries from session, each with a mini radar chart and expandable detail; add per-run export button
    - _Requirements: 6.3, 6.4_
  - [ ]* 10.5 Write unit tests for resultsScreen and journal
    - Test clipboard failure path shows textarea; test Restart clears state; test journal renders correct run count
    - File: `tests/unit/reflectionEngine.test.js`

- [ ] 11. Implement router and wire all modules in main.js
  - Implement `src/main.js` as the entry point: call `restoreFromSession()` on load, read `state.phase` to render the correct screen, export a `navigate(phase)` function used by all UI modules to trigger screen transitions
  - Wire `profileBuilder → profileEngine → scenarioEngine → gameState` on profile submit
  - Wire `episodePlayer → scoringEngine → reflectionEngine → gameState` on Episode 3 confirm
  - _Requirements: 8.1, 8.2, 8.3, 9.1_

- [ ] 12. Implement `package.json` and test runner configuration
  - Create `package.json` with `vitest` as a dev dependency and a `"test"` script running `vitest --run`
  - Create `vitest.config.js` configured for vanilla ES modules (no framework transform)
  - This file is for local test execution only — it is not used by the deployment pipeline
  - _Requirements: (testing infrastructure)_

- [ ] 13. Create GitHub Actions deployment workflow
  - Create `.github/workflows/deploy.yml` with:
    - Trigger: `push` to `main`
    - Permissions: `contents: read`, `pages: write`, `id-token: write`
    - Job: configure GitHub Pages, upload the repo root as the Pages artifact, deploy via `actions/deploy-pages`
    - No build or compile step
  - _Requirements: (deployment — GitHub Pages static hosting)_

- [ ] 14. Final checkpoint — full integration
  - Ensure all tests pass, ask the user if questions arise.
  - Verify the app loads correctly from `index.html` with no console errors
  - Verify all relative import paths resolve correctly (no absolute `/` paths)

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with a minimum of 100 iterations per property
- Unit tests and property tests are complementary — avoid duplicating coverage
- The `package.json` / `vitest` setup is for local development only; GitHub Pages serves files directly with no build step
