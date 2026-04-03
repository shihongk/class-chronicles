// =============================================================================
// src/data/index.js — Data Layer Entry Point
// =============================================================================

import { TheoryBank } from './theoryBank.js';
import { Endings } from './endings.js';
import { scenario_rg_econ_s3_01, scenario_pl_econ_s3_01, scenario_sen_math_s2_01 } from './scenarios.js';
import { scenario_cn_econ_s4_01, scenario_cn_math_s3_01, scenario_cn_econ_s4_02, scenario_bm_econ_s3_01, scenario_bm_math_s3_01, scenario_bm_econ_s4_01 } from './stubs.js';

export { TheoryBank };
export { Endings };

export const ScenarioLibrary = {
  buckets: {
    readiness_gap:    { scenarios: [scenario_rg_econ_s3_01] },
    participation_low:{ scenarios: [scenario_pl_econ_s3_01] },
    sen_heavy:        { scenarios: [scenario_sen_math_s2_01] },
    challenge_needed: { scenarios: [scenario_cn_econ_s4_01, scenario_cn_math_s3_01, scenario_cn_econ_s4_02] },
    balanced_mixed:   { scenarios: [scenario_bm_econ_s3_01, scenario_bm_math_s3_01, scenario_bm_econ_s4_01] }
  }
};
