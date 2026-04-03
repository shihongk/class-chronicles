// =============================================================================
// src/engine.js — Classroom Chronicles Game Engine
// =============================================================================
// Exports: deriveProfileBucket, selectScenarios, computeAxisScores,
//          deriveEnding, generateReflection
// All game logic lives here — nothing hardcoded in main.js.
// =============================================================================

// ---------------------------------------------------------------------------
// deriveProfileBucket(profile)
// ---------------------------------------------------------------------------
// Determines which scenario bucket best matches the teacher's class profile.
// Priority rules are applied in strict order — first match wins.
//
// @param {Object} profile - Profile object with keys:
//   readinessDistribution {string}, motivationProfile {string}, sen {string}
// @returns {string} bucketId — one of:
//   "readiness_gap" | "participation_low" | "sen_heavy" |
//   "challenge_needed" | "balanced_mixed"
// ---------------------------------------------------------------------------
export function deriveProfileBucket(profile) {
  const { readinessDistribution, motivationProfile, sen } = profile;

  // Rule 1 — Readiness gap: majority of class below expected readiness
  if (
    readinessDistribution === "Mostly low (60%+ below expected readiness)" ||
    readinessDistribution === "Low-skewed mixed (40% low, 40% mid, 20% high)"
  ) {
    return "readiness_gap";
  }

  // Rule 2 — Participation low: class is largely disengaged
  if (
    motivationProfile === "Largely disengaged" ||
    motivationProfile === "Majority low, some pockets of keenness"
  ) {
    return "participation_low";
  }

  // Rule 3 — SEN heavy: significant proportion of students with learning needs
  if (
    sen === "Moderate (~20%)" ||
    sen === "High (~30%)" ||
    sen === "Complex (~35%+)"
  ) {
    return "sen_heavy";
  }

  // Rule 4 — Challenge needed: majority of class at or above expected readiness
  if (
    readinessDistribution === "Mostly high (60%+ at or above expected readiness)" ||
    readinessDistribution === "High-skewed mixed (20% low, 40% mid, 40% high)"
  ) {
    return "challenge_needed";
  }

  // Rule 5 — Default: balanced mixed class
  return "balanced_mixed";
}

// ---------------------------------------------------------------------------
// selectScenarios(bucketId, library)
// ---------------------------------------------------------------------------
// Shuffles the scenarios for the given bucket and returns the first 3
// (or all if fewer than 3). Each returned scenario maps to one episode.
//
// @param {string} bucketId - The bucket key (e.g. "readiness_gap")
// @param {Object} library  - ScenarioLibrary object from data.js
// @returns {Array} Array of up to 3 ScenarioObjects
// @throws {Error} If the bucket does not exist in the library
// ---------------------------------------------------------------------------
export function selectScenarios(bucketId, library) {
  const bucket = library.buckets[bucketId];

  if (!bucket) {
    throw new Error("No scenarios found for bucket: " + bucketId);
  }

  // Shallow-copy the array before shuffling so we don't mutate the library
  const pool = [...bucket.scenarios];

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Return first 3 (or all if fewer than 3)
  return pool.slice(0, 3);
}

// ---------------------------------------------------------------------------
// computeAxisScores(choices, scenarios)
// ---------------------------------------------------------------------------
// Sums the axis scores across all 3 confirmed player choices.
//
// @param {Array} choices   - Array of 3 ChoiceRecord objects:
//   { episodeIndex, scenarioId, choiceId, userReason }
// @param {Array} scenarios - Array of 3 ScenarioObjects selected for this run
// @returns {{ afl: number, support: number, challenge: number, participation: number }}
// ---------------------------------------------------------------------------
export function computeAxisScores(choices, scenarios) {
  const totals = { afl: 0, support: 0, challenge: 0, participation: 0 };

  for (const choice of choices) {
    // Find the matching scenario by scenarioId
    const scenario = scenarios.find(s => s.id === choice.scenarioId);
    if (!scenario) continue;

    // Find the matching episode by episodeIndex
    const episode = scenario.episodes[choice.episodeIndex];
    if (!episode) continue;

    // Find the matching choice by choiceId
    const choiceObj = episode.choices.find(c => c.id === choice.choiceId);
    if (!choiceObj) continue;

    // Accumulate scores
    totals.afl          += choiceObj.scores.afl;
    totals.support      += choiceObj.scores.support;
    totals.challenge    += choiceObj.scores.challenge;
    totals.participation += choiceObj.scores.participation;
  }

  return totals;
}

// ---------------------------------------------------------------------------
// deriveEnding(scores)
// ---------------------------------------------------------------------------
// Maps axis scores to one of six ending IDs using a priority chain.
//
// @param {{ afl: number, support: number, challenge: number, participation: number }} scores
// @returns {string} endingId — one of:
//   "evidence_adaptor" | "scaffold_builder" | "challenge_champion" |
//   "community_weaver" | "balanced_practitioner" | "reactive_teacher"
// ---------------------------------------------------------------------------
export function deriveEnding(scores) {
  const { afl, support, challenge, participation } = scores;
  const values = [afl, support, challenge, participation];
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  // Rule 1 — AfL dominant
  if (afl >= 50 && afl === maxVal) {
    return "evidence_adaptor";
  }

  // Rule 2 — Support dominant
  if (support >= 50 && support === maxVal) {
    return "scaffold_builder";
  }

  // Rule 3 — Challenge dominant
  if (challenge >= 50 && challenge === maxVal) {
    return "challenge_champion";
  }

  // Rule 4 — Participation dominant
  if (participation >= 50 && participation === maxVal) {
    return "community_weaver";
  }

  // Rule 5 — All axes within 20 points of each other
  if (maxVal - minVal <= 20) {
    return "balanced_practitioner";
  }

  // Rule 6 — Default
  return "reactive_teacher";
}

// ---------------------------------------------------------------------------
// generateReflection(state, library, theoryBank)
// ---------------------------------------------------------------------------
// Generates a 3-paragraph reflective journal entry using the Jay & Johnson
// (2002) Descriptive / Comparative / Critical structure.
//
// @param {Object} state - Game state with keys:
//   profile, scenarios (array of 3), choices (array of 3 ChoiceRecords),
//   axisScores, endingId
// @param {Object} library    - ScenarioLibrary (unused directly but available)
// @param {Object} theoryBank - TheoryBank object from data.js
// @returns {string} Three paragraphs joined by "\n\n"
// ---------------------------------------------------------------------------
export function generateReflection(state, library, theoryBank) {
  const { profile, scenarios, choices, axisScores, endingId } = state;

  // ── Resolve choice objects from scenario data ──────────────────────────────
  // For each of the 3 episodes, find the full choice object the player selected.
  const resolvedChoices = choices.map((choice, i) => {
    const scenario = scenarios.find(s => s.id === choice.scenarioId);
    if (!scenario) return null;
    const episode = scenario.episodes[choice.episodeIndex];
    if (!episode) return null;
    return episode.choices.find(c => c.id === choice.choiceId) || null;
  });

  // ── Helper: first sentence of a string ────────────────────────────────────
  const firstSentence = (str) => {
    if (!str) return "";
    const match = str.match(/^[^.!?]*[.!?]/);
    return match ? match[0].trim() : str.trim();
  };

  // ── Helper: safe theory lookup (warns on missing key) ─────────────────────
  const getTheory = (key) => {
    if (!key) return null;
    const theory = theoryBank[key];
    if (!theory) {
      console.warn(`[generateReflection] Missing theoryKey in TheoryBank: "${key}"`);
      return null;
    }
    return theory;
  };

  // ── Axis helpers ───────────────────────────────────────────────────────────
  const axisNames = {
    afl: "Assessment for Learning",
    support: "support and scaffolding",
    challenge: "challenge and high expectations",
    participation: "participation and dialogue"
  };

  const axisEntries = Object.entries(axisScores); // [["afl", n], ...]
  const sortedAxes = [...axisEntries].sort((a, b) => b[1] - a[1]);
  const dominantAxis = sortedAxes[0][0];
  const leastAxis    = sortedAxes[sortedAxes.length - 1][0];

  const dominantAxisName = axisNames[dominantAxis];
  const leastAxisName    = axisNames[leastAxis];

  // ── Ending label ───────────────────────────────────────────────────────────
  // Imported via theoryBank — but Endings live in data.js, not theoryBank.
  // We receive library but Endings is a separate export; the spec says to use
  // "endingId label from Endings". We look it up from library if available,
  // otherwise fall back to a formatted version of the endingId.
  const endingLabel = (() => {
    if (library && library.endings && library.endings[endingId]) {
      return library.endings[endingId].label;
    }
    // Fallback: convert snake_case to Title Case
    return endingId
      .split("_")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  })();

  // ── Episode 1 data ─────────────────────────────────────────────────────────
  const ep1Scenario = scenarios[0];
  const ep1Choice   = resolvedChoices[0];
  const ep1Theory   = ep1Choice ? getTheory(ep1Choice.theoryKey) : null;
  const ep1UserReason = choices[0]?.userReason || "";

  const ep1SituationFirst = ep1Scenario
    ? firstSentence(ep1Scenario.episodes[choices[0].episodeIndex]?.situation)
    : "";

  const ep1ConsequenceFirst = ep1Choice ? firstSentence(ep1Choice.consequence) : "";

  // Reasoning clause for Para 1
  let ep1ReasoningClause;
  if (ep1UserReason && ep1UserReason.trim().length > 0) {
    ep1ReasoningClause = `My reasoning was: ${ep1UserReason.trim()}.`;
  } else if (ep1Theory) {
    ep1ReasoningClause = `This reflected my instinct to prioritise ${ep1Theory.dimension}.`;
  } else {
    ep1ReasoningClause = "";
  }

  // ── Para 1 — Descriptive ───────────────────────────────────────────────────
  const para1 = [
    `In this ${profile.schoolLevel} ${profile.stream} class of ${profile.classSize} students,`,
    `with ${profile.readinessDistribution} readiness and ${profile.motivationProfile} motivation,`,
    `I encountered a situation in which ${ep1SituationFirst}`,
    `I chose to ${ep1Choice ? ep1Choice.label : "act on my instinct"}.`,
    ep1ReasoningClause,
    `The immediate outcome was ${ep1ConsequenceFirst}`
  ].filter(Boolean).join(" ");

  // ── Para 2 — Comparative ───────────────────────────────────────────────────
  // Find an alternative choice from Episode 2 (index 1) that differs from
  // the player's selection, to illustrate a road not taken.
  const ep2Scenario = scenarios[1];
  const ep2EpisodeIndex = choices[1]?.episodeIndex ?? 1;
  const ep2Episode  = ep2Scenario?.episodes[ep2EpisodeIndex];
  const ep2Choice   = resolvedChoices[1];

  const altChoice = ep2Episode
    ? ep2Episode.choices.find(c => c.id !== ep2Choice?.id)
    : null;
  const altTheory = altChoice ? getTheory(altChoice.theoryKey) : null;
  const altTradeoffFirst = altChoice ? firstSentence(altChoice.tradeoff) : "";

  // Named students: first two from the first scenario
  const students = ep1Scenario?.students || [];
  const student1 = students[0];
  const student2 = students[1];

  const student1Clause = student1
    ? `${student1.name}, who ${firstSentence(student1.note)}`
    : "";
  const student2Clause = student2
    ? `${student2.name}, who ${firstSentence(student2.note)}`
    : "";

  const para2 = [
    `Across the three decision points, I most often chose approaches aligned with ${dominantAxisName}.`,
    altChoice
      ? `An alternative approach in Episode 2 would have been "${altChoice.label}", which would have emphasised ${altTheory ? altTheory.dimension : altChoice.theoryKey} — but at the cost of ${altTradeoffFirst}`
      : "",
    `This pattern suggests that I currently prioritise ${dominantAxisName} over ${leastAxisName}.`,
    student1Clause && student2Clause
      ? `The students most visibly affected were ${student1Clause}, and ${student2Clause}.`
      : ""
  ].filter(Boolean).join(" ");

  // ── Para 3 — Critical ──────────────────────────────────────────────────────
  // Choice with the lowest total score contribution
  const choiceScoreTotals = resolvedChoices.map((c) => {
    if (!c) return 0;
    return c.scores.afl + c.scores.support + c.scores.challenge + c.scores.participation;
  });
  const lowestChoiceIndex = choiceScoreTotals.indexOf(Math.min(...choiceScoreTotals));
  const lowestChoice = resolvedChoices[lowestChoiceIndex];
  const lowestTradeoffFirst = lowestChoice ? firstSentence(lowestChoice.tradeoff) : "";

  // Theory for the least-used axis — find the most common theoryKey among
  // choices that scored highest on the least axis, or fall back to any choice.
  const leastAxisTheoryKey = (() => {
    // Collect theoryKeys from all resolved choices
    const keys = resolvedChoices
      .filter(Boolean)
      .map(c => c.theoryKey)
      .filter(Boolean);
    // Return the last one as a simple heuristic (least-used axis representative)
    return keys[keys.length - 1] || null;
  })();
  const leastAxisTheory = leastAxisTheoryKey ? getTheory(leastAxisTheoryKey) : null;

  // SEN student or first low-readiness student from the first scenario
  const senStudent = students.find(s => s.SEN) || students.find(s => s.readiness === "low");
  const senStudentName = senStudent ? senStudent.name : "students with the greatest need";

  const para3 = [
    `On reflection, ${endingLabel} captures a genuine tendency in my emerging practice.`,
    lowestTradeoffFirst
      ? `The tension I found hardest to resolve was ${lowestTradeoffFirst}`
      : "",
    leastAxisTheory
      ? `Going forward, I would consider ${leastAxisTheory.label} because ${firstSentence(leastAxisTheory.summary)}`
      : "",
    `This experience has shifted how I think about ${axisNames[dominantAxis]} — particularly for students like ${senStudentName}.`
  ].filter(Boolean).join(" ");

  // ── Join and return ────────────────────────────────────────────────────────
  return [para1, para2, para3].join("\n\n");
}
