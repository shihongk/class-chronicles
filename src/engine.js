// =============================================================================
// src/engine.js — Classroom Chronicles Engine (v2)
// =============================================================================

/**
 * Returns all ScenarioObjects matching the given level and profile.
 * The caller (UI) is responsible for letting the user pick one from the pool.
 *
 * @param {string} level     - "lower_sec" | "upper_sec" | "jc"
 * @param {string} profile   - "mixed_readiness" | "fast_finishers" | "quiet_class" |
 *                             "hidden_thinking" | "diverse_profiles" | "invisible_understanding"
 * @param {Array}  scenarios - flat array of all ScenarioObjects
 * @returns {Array} matching ScenarioObjects (1–3 items)
 * @throws {Error} if no match found
 */
export function getScenarioPool(level, profile, scenarios) {
  const pool = scenarios.filter(s => s.level === level && s.profile === profile);
  if (pool.length === 0) {
    throw new Error(
      `No scenario found for level="${level}" profile="${profile}". ` +
      `Available: ${scenarios.map(s => `${s.level}/${s.profile}`).join(', ')}`
    );
  }
  return pool;
}

/**
 * Returns a single ScenarioObject by its id.
 *
 * @param {string} id        - e.g. "S1"
 * @param {Array}  scenarios - flat array of all ScenarioObjects
 * @returns {Object} matching ScenarioObject
 * @throws {Error} if not found
 */
export function getScenarioById(id, scenarios) {
  const match = scenarios.find(s => s.id === id);
  if (!match) {
    throw new Error(`No scenario found with id="${id}".`);
  }
  return match;
}
