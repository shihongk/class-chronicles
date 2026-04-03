# Implementation Plan: The Classroom Chronicles (v2)

## Status Key
- [x] Done
- [-] In progress / partially done
- [ ] Not started

---

## Phase 1: Code Foundation (COMPLETE)

- [x] 1. Clean up old source files
  - Deleted `src/data/stubs.js` and `src/data/endings.js`
  - Stripped all v1 exports from `src/data/index.js`
  - Removed Chart.js `<script>` tag from `index.html`

- [x] 2. Update TheoryBank — `src/data/theoryBank.js`
  - Retained all theory keys used in S1–S6
  - Removed unused keys
  - Confirmed `dimension` values: `"afl"` | `"differentiation"` | `"participation"` | `"feedback"` | `"reflection"`

- [x] 3. Build S1 scenario data — `src/data/scenarios.js`
  - ✅ Fully expanded using SCENARIO-EXPANSION-FRAMEWORK.md
  - All 6 paths (A1, A2, B1, B2, C1, C2) complete with detailed outcomes
  - Condensed 3-question reflections on all paths

- [x] 4. Build S2–S6 scenario data — `src/data/scenarios.js`
  - ✅ S2 (Upper Sec / Fast Finishers / Quadratic Factorisation) — fully expanded
  - ✅ S3 (Lower Sec / Quiet Class / Linear Equations) — migrated to s3.json, fully expanded
  - ⏳ S4 (Lower Sec / Hidden Thinking / Angles in Triangles) — basic stub in scenarios.js, pending migration + expansion
  - ⏳ S5 (JC / Learning Support Needs / Price Elasticity) — basic stub in scenarios.js, pending migration + expansion
  - ⏳ S6 (JC / Invisible Understanding / Market Equilibrium) — basic stub in scenarios.js, pending migration + expansion

- [x] 5. Update data index — `src/data/index.js`
  - Exports `TheoryBank` and `scenarios` array
  - All v1 exports removed

- [x] 6. Rewrite engine — `src/engine.js`
  - Single export: `lookupScenario(level, profile, scenarios)`
  - Throws descriptive error on no match

- [x] 7. Rewrite state + router — `src/main.js`
  - State shape: `{ level, profile, scenario, ep1Choice, ep2Choice, phase }`
  - `saveState()` / `loadState()` for sessionStorage
  - `navigate(phase)` for all 6 phases

- [x] 8. Implement Landing + Setup screens — `src/main.js`
  - `renderLanding()`: title, tagline, 3-step how-it-works ("Play through episodes" — not "3 episodes"), Begin button
  - `renderSetup()`: Level pills (3) + Class Profile pills (6 with short descriptions), Start button disabled until both selected

- [x] 9. Implement Episode 1 screen — `src/main.js`
  - `renderEp1()`: progress bar, context note + situation + evidence panel, 3 choice cards (label + elaboration), Confirm + Back buttons
  - Theory tags NOT shown on episode screens — only on Results

- [x] 10. Implement Episode 2 screen — `src/main.js`
  - `renderEp2()`: Ep1 consequence, 2 sub-choice cards, Confirm + Back buttons
  - Theory tags NOT shown on episode screens

- [x] 11. Implement Episode 3 + Results screens — `src/main.js`
  - `renderEp3()`: path outcome + tradeoff panel, Continue button
  - `renderResults()`: scenario context recap, full path summary with elaborations + theory superscripts, 3-question reflection textarea, numbered APA references, copy button, Restart button

- [x] 12. Progress bar component
  - 5 steps: Setup → Episode 1 → Episode 2 → Episode 3 → Results

- [x] 13. Update `style.css` for v2
  - Removed v1 styles (proportion bars, radar chart, journal)
  - Added profile pill styles with description text
  - Results screen layout with path summary and references

---

## Phase 2: Content — Migrate to JSON, then Expand (IN PROGRESS — S1–S9 done, S10–S18 remaining)

**New approach**: Each scenario is migrated to its own JSON file first, then expanded in place using SCENARIO-EXPANSION-FRAMEWORK.md. `src/data/scenarios/index.js` is updated after each migration. `scenarios.js` stub is removed once migrated.

- [x] 14. Migrate S1 + expand — `src/data/scenarios/s1.json`
  - ✅ Migrated from scenarios.js to s1.json
  - ✅ Fully expanded using SCENARIO-EXPANSION-FRAMEWORK.md

- [x] 15. Migrate S2 + expand — `src/data/scenarios/s2.json`
  - ✅ Migrated from scenarios.js to s2.json
  - ✅ Fully expanded using SCENARIO-EXPANSION-FRAMEWORK.md

- [x] 16. Migrate S3 + expand — `src/data/scenarios/s3.json`
  - ✅ Migrated from scenarios.js to s3.json
  - ✅ Fully expanded using SCENARIO-EXPANSION-FRAMEWORK.md
  - ✅ Wired up in src/data/scenarios/index.js

- [x] 17. Migrate S4 + expand — `src/data/scenarios/s4.json`
  - Reference: `S4-Lower-Sec-Hidden-Thinking.md`
  - ✅ Migrated, expanded, wired up in index.js

- [x] 18. Migrate S5 + expand — `src/data/scenarios/s5.json`
  - Reference: `S5-JC-Diverse-Learning-Profiles-Elasticity.md`
  - ✅ Migrated, expanded, wired up in index.js

- [x] 19. Migrate S6 + expand — `src/data/scenarios/s6.json`
  - Reference: `S6-JC-Invisible-Understanding.md`
  - ✅ Migrated, expanded, wired up in index.js

- [x] 20. Migrate S7 + expand — `src/data/scenarios/s7.json`
  - Reference: `S7-Lower-Sec-Mixed-Readiness-Fractions.md`
  - ✅ Migrated, expanded, wired up in index.js

- [x] 21. Migrate S8 + expand — `src/data/scenarios/s8.json`
  - Reference: `S8-Lower-Sec-Fast-Finishers-Perimeter.md`
  - ✅ Migrated, expanded, wired up in index.js

- [x] 22. Migrate S9 + expand — `src/data/scenarios/s9.json`
  - Reference: `S9-Lower-Sec-Quiet-Class-Negative-Numbers.md`
  - ✅ Migrated, expanded, wired up in index.js

- [x] 23. Migrate S10 + expand — `src/data/scenarios/s10.json`
  - Reference: `S10-Lower-Sec-Hidden-Thinking-Ratio.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 24. Migrate S11 + expand — `src/data/scenarios/s11.json`
  - Reference: `S11-Upper-Sec-Mixed-Readiness-Gradient.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 25. Migrate S12 + expand — `src/data/scenarios/s12.json`
  - Reference: `S12-Upper-Sec-Fast-Finishers-Trig.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 26. Migrate S13 + expand — `src/data/scenarios/s13.json`
  - Reference: `S13-JC-Diverse-Profiles-Marginal-Utility.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 27. Migrate S14 + expand — `src/data/scenarios/s14.json`
  - Reference: `S14-JC-Invisible-Understanding-ADAS.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 28. Migrate S15 + expand — `src/data/scenarios/s15.json`
  - Reference: `S15-Upper-Sec-Quiet-Class-Volume.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 29. Migrate S16 + expand — `src/data/scenarios/s16.json`
  - Reference: `S16-Upper-Sec-Hidden-Thinking-Quadratics.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 30. Migrate S17 + expand — `src/data/scenarios/s17.json`
  - Reference: `S17-JC-Diverse-Profiles-ADAS.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

- [x] 31. Migrate S18 + expand — `src/data/scenarios/s18.json`
  - Reference: `S18-Upper-Sec-Diverse-Profiles-Vectors.md`
  - Migrate stub from scenarios.js, expand fully, wire up in index.js, remove from scenarios.js

All expansions use SCENARIO-EXPANSION-FRAMEWORK.md. Each takes ~2.5–3.5 hours.

---

## Phase 3: Architecture & Engine Updates (PARTIALLY DONE)

- [x] 32. Update profile key: `learning_support` → `diverse_profiles` across all files
  - Updated `src/main.js` (pill label, valid combos, state comment)
  - Updated `src/engine.js` (JSDoc comment)
  - Updated `src/data/scenarios.js` (S5 profile field)
  - Updated `design.md`

- [ ] 33. Update engine to handle multiple scenarios per (level, profile)
  - With 18 scenarios, each (level, profile) pair has 3 matching scenarios
  - Decide: random selection, sequential, or user-visible picker
  - Update `lookupScenario` in `src/engine.js` accordingly
  - **Decision needed from user before implementing**

- [x] 34. ~~Migrate scenarios.js → individual JSON files~~ — superseded by new per-scenario migrate+expand approach in Phase 2. Once all scenarios are migrated, `scenarios.js` can be deleted.

---

## Phase 4: Testing & Deploy

- [ ] 35. Smoke test all 18 scenarios end-to-end
  - For each scenario: select level + profile, play all 6 paths (A1–C2)
  - Verify engine correctly selects from multiple scenarios per (level, profile)
  - Verify reflection textarea populates with 3-question prompt
  - Verify theory superscripts and APA references match
  - Verify copy button, Restart, and sessionStorage restore

- [ ] 36. Push to GitHub and verify Pages
  - `git add -A && git commit -m "feat: v2 complete" && git push`
  - Confirm site loads at `https://shihongk.github.io/class-chronicles/`
  - Smoke test one full run on the live site

---

## Reference Documents

| Document | Purpose |
|---|---|
| `design.md` | Architecture, data schema, UI spec |
| `SCENARIO-EXPANSION-FRAMEWORK.md` | How to expand each scenario consistently |
| `SCALABLE-DESIGN-PROPOSAL.md` | Original JSON migration plan (now superseded) |
| `src/data/scenarios/s*.json` | Source of truth for each scenario (all 18 migrated) |
| `src/data/scenarios.js.bak` | Archived legacy file — no longer used |
| `src/data/theoryBank.js` | Theory definitions and APA citations |
