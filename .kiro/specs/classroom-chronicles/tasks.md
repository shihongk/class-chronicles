# Implementation Plan: The Classroom Chronicles

## Overview

Build a vanilla JS static app in 4 source files. No framework, no build step. Deploy via GitHub Pages branch deploy from `main`.

## Tasks

- [ ] 1. Scaffold — `index.html` and `style.css`
  - Create `index.html` at repo root: semantic structure (`<header>`, `<main>`, `<nav>`), Chart.js CDN script tag, `<script type="module" src="./src/main.js">`
  - Create `style.css`: CSS custom properties for colours/spacing/typography, base styles for all major components (class card, choice cards, progress bar, proportion bars, radar chart container)
  - All paths must be relative (no leading `/`)

- [x] 2. Data layer — `src/data.js`
  - Export `TheoryBank` object with all 13 required theory keys, each with `label`, `citation` (APA), `summary`, `dimension`
  - Export `ScenarioLibrary` with all 5 bucket keys; populate `readiness_gap`, `participation_low`, and `sen_heavy` with the 3 seed scenarios (verbatim from spec); stub the remaining 2 buckets (`challenge_needed`, `balanced_mixed`) with placeholder scenarios
  - Export `Endings` object with all 6 ending entries (`label`, `narrative`, `radarDescription`)

- [x] 3. Engine — `src/engine.js`
  - Export `deriveProfileBucket(profile)` — 5-rule priority chain
  - Export `selectScenarios(bucketId, library)` — shuffle + take 3, throw on unknown bucket
  - Export `computeAxisScores(choices, scenarios)` — sum scores across 3 choices
  - Export `deriveEnding(scores)` — 6-condition priority chain, default `"reactive_teacher"`
  - Export `generateReflection(state, library, theoryBank)` — 3-paragraph Jay & Johnson output

- [x] 4. Game state + router — `src/main.js` (part 1)
  - Define `state` object with all fields
  - Implement `saveState()` / `loadState()` using `sessionStorage` (wrapped in try/catch)
  - Implement `navigate(phase)` — saves state, wipes `<main>`, calls the correct render function

- [x] 5. Profile Builder UI — `src/main.js` (part 2)
  - Implement `renderProfileBuilder()`: 8 labelled dropdowns with exact option sets, live class card with proportion bars, Randomise / Randomise All buttons, Start button (disabled until all 8 set, highlights missing fields on incomplete attempt)
  - On Start: call `deriveProfileBucket`, `selectScenarios`, store in state, navigate to `"ep0"`

- [x] 6. Episode Player UI — `src/main.js` (part 3)
  - Implement `renderEpisode(index)`: progress bar `<ol>`, scenario context + evidence, 4 choice cards (show consequence + studentReaction on select), Confirm button (disabled until selection), Back button
  - On Confirm: record choice in state, navigate to next episode or `"results"` after ep2

- [x] 7. Results screen UI — `src/main.js` (part 4)
  - Implement `renderResults()`: call `computeAxisScores`, `deriveEnding`, `generateReflection`, store in state
  - Render: ending label + narrative, radar chart via Chart.js (4 axes), editable `<textarea>` pre-filled with reflection, copy button (clipboard API + textarea fallback), theory tags activated, APA references, Restart button
  - Append run to in-memory journal array; render journal list below results

- [ ] 8. Push to GitHub and verify Pages
  - `git add -A && git commit -m "feat: complete app" && git push`
  - Confirm site loads at `https://shihongk.github.io/class-chronicles/`
  - Smoke test: complete one full run through all 3 episodes to Results
