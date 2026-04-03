// =============================================================================
// src/data/stubs.js — Placeholder Stub Scenarios
// =============================================================================

// =============================================================================
// SCENARIO LIBRARY — Stub Scenarios: challenge_needed (3 placeholders)
// =============================================================================

export const scenario_cn_econ_s4_01 = {
  id: "cn_econ_s4_01",
  bucket: "challenge_needed",
  subject: "Economics",
  topic: "Market Failure — Externalities",
  schoolLevel: "Upper Secondary (Sec 4 Express)",
  contextNote: "You are teaching 4E1, a high-readiness class. Most students have already grasped the basic concept of negative externalities and are asking questions beyond the syllabus. The challenge is to stretch their thinking without losing the weaker students.",
  students: [
    { name: "Priya", readiness: "high", motivation: "motivated", SEN: false, note: "Asks probing questions about policy implications; reads economics news independently." },
    { name: "Ethan", readiness: "high", motivation: "motivated", SEN: false, note: "Strong analytical thinker; benefits from open-ended problems with no single correct answer." },
    { name: "Liying", readiness: "mid", motivation: "compliant", SEN: false, note: "Solid understanding of core concepts; needs prompting to go beyond the textbook." },
    { name: "Farhan", readiness: "mid", motivation: "motivated", SEN: false, note: "Engaged and curious; sometimes rushes to conclusions without full analysis." }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "Placeholder: Students have mastered the basic externalities diagram. Most can draw and label it correctly. The challenge is to push them toward policy evaluation and real-world application.",
      evidence: "Placeholder: 25 of 30 students have correct diagrams. Most cannot evaluate the effectiveness of different government interventions.",
      choices: [
        { id: "cn_econ_s4_01_e1_a", label: "Pose a policy evaluation challenge", elaboration: "Placeholder elaboration.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 10, support: 5, challenge: 22, participation: 10 } },
        { id: "cn_econ_s4_01_e1_b", label: "Use a real Singapore case study", elaboration: "Placeholder elaboration.", theoryKey: "Accountable_Talk", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 12, support: 5, challenge: 15, participation: 15 } },
        { id: "cn_econ_s4_01_e1_c", label: "Two-Step MCQ on policy trade-offs", elaboration: "Placeholder elaboration.", theoryKey: "Two_Step_MCQ", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 20, support: 5, challenge: 10, participation: 8 } },
        { id: "cn_econ_s4_01_e1_d", label: "Structured debate on government intervention", elaboration: "Placeholder elaboration.", theoryKey: "SDT_Deci_Ryan", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 8, support: 5, challenge: 18, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "assessment_response",
      situation: "Placeholder: Students have completed a policy evaluation task. Most have identified the correct intervention but have not evaluated its limitations.",
      evidence: "Placeholder: 20 students identified the correct intervention. 10 evaluated its limitations.",
      choices: [
        { id: "cn_econ_s4_01_e2_a", label: "Use exit card data to push deeper analysis", elaboration: "Placeholder elaboration.", theoryKey: "AfL_Triangle", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 20, support: 5, challenge: 15, participation: 8 } },
        { id: "cn_econ_s4_01_e2_b", label: "Assign tiered extension tasks", elaboration: "Placeholder elaboration.", theoryKey: "Tomlinson_Respectful_Tasks", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 8, support: 10, challenge: 20, participation: 5 } },
        { id: "cn_econ_s4_01_e2_c", label: "AQS peer feedback on policy arguments", elaboration: "Placeholder elaboration.", theoryKey: "AQS_Feedback", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 10, support: 8, challenge: 10, participation: 20 } },
        { id: "cn_econ_s4_01_e2_d", label: "Reteach with a counter-intuitive example", elaboration: "Placeholder elaboration.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 18, support: 8, challenge: 12, participation: 8 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "feedback_closure",
      situation: "Placeholder: 10 minutes left. Students have produced policy evaluation arguments. The challenge is to close in a way that stretches the high-readiness students while consolidating for the mid-readiness students.",
      evidence: "Placeholder: 15 strong policy arguments, 12 partial, 3 minimal.",
      choices: [
        { id: "cn_econ_s4_01_e3_a", label: "Pose a synoptic challenge question", elaboration: "Placeholder elaboration.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 8, support: 5, challenge: 22, participation: 12 } },
        { id: "cn_econ_s4_01_e3_b", label: "3-2-1 exit card with extension prompt", elaboration: "Placeholder elaboration.", theoryKey: "Jay_Johnson_Reflection", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 18, support: 10, challenge: 10, participation: 8 } },
        { id: "cn_econ_s4_01_e3_c", label: "Comment-only feedback on selected responses", elaboration: "Placeholder elaboration.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 20, support: 5, challenge: 8, participation: 10 } },
        { id: "cn_econ_s4_01_e3_d", label: "Peer teach the concept to a partner", elaboration: "Placeholder elaboration.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder consequence.", tradeoff: "Placeholder tradeoff.", studentReaction: "Placeholder reaction.", scores: { afl: 8, support: 12, challenge: 10, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    }
  ]
};

export const scenario_cn_math_s3_01 = {
  id: "cn_math_s3_01",
  bucket: "challenge_needed",
  subject: "Mathematics",
  topic: "Quadratic Equations — Completing the Square",
  schoolLevel: "Upper Secondary (Sec 3 Express)",
  contextNote: "Placeholder: High-readiness class that has mastered factorisation. The challenge is to introduce completing the square as a generalisation and push students toward deriving the quadratic formula.",
  students: [
    { name: "Amirah", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Brendan", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Chloe", readiness: "mid", motivation: "compliant", SEN: false, note: "Placeholder note." },
    { name: "Darren", readiness: "mid", motivation: "motivated", SEN: false, note: "Placeholder note." }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "cn_math_s3_01_e1_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 5, challenge: 22, participation: 10 } },
        { id: "cn_math_s3_01_e1_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Two_Step_MCQ", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 5, challenge: 10, participation: 8 } },
        { id: "cn_math_s3_01_e1_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Accountable_Talk", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 5, challenge: 15, participation: 18 } },
        { id: "cn_math_s3_01_e1_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "SDT_Deci_Ryan", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 8, challenge: 12, participation: 18 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "assessment_response",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "cn_math_s3_01_e2_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "AfL_Triangle", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 5, challenge: 12, participation: 8 } },
        { id: "cn_math_s3_01_e2_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Tomlinson_Respectful_Tasks", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 10, challenge: 20, participation: 5 } },
        { id: "cn_math_s3_01_e2_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 10, participation: 10 } },
        { id: "cn_math_s3_01_e2_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 8, challenge: 8, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "feedback_closure",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "cn_math_s3_01_e3_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 5, challenge: 22, participation: 12 } },
        { id: "cn_math_s3_01_e3_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Jay_Johnson_Reflection", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 10, challenge: 10, participation: 8 } },
        { id: "cn_math_s3_01_e3_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 5, challenge: 8, participation: 10 } },
        { id: "cn_math_s3_01_e3_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 12, challenge: 10, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    }
  ]
};

export const scenario_cn_econ_s4_02 = {
  id: "cn_econ_s4_02",
  bucket: "challenge_needed",
  subject: "Economics",
  topic: "International Trade — Comparative Advantage",
  schoolLevel: "Upper Secondary (Sec 4 Express)",
  contextNote: "Placeholder: High-readiness class working on comparative advantage. Students can calculate opportunity cost but struggle to evaluate the real-world limitations of the theory.",
  students: [
    { name: "Shawn", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Natasha", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Kelvin", readiness: "mid", motivation: "compliant", SEN: false, note: "Placeholder note." },
    { name: "Jasmine", readiness: "mid", motivation: "motivated", SEN: false, note: "Placeholder note." }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "cn_econ_s4_02_e1_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 5, challenge: 22, participation: 10 } },
        { id: "cn_econ_s4_02_e1_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Two_Step_MCQ", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 5, challenge: 10, participation: 8 } },
        { id: "cn_econ_s4_02_e1_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Accountable_Talk", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 5, challenge: 15, participation: 18 } },
        { id: "cn_econ_s4_02_e1_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "SDT_Deci_Ryan", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 8, challenge: 12, participation: 18 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "assessment_response",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "cn_econ_s4_02_e2_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "AfL_Triangle", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 5, challenge: 12, participation: 8 } },
        { id: "cn_econ_s4_02_e2_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Tomlinson_Respectful_Tasks", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 10, challenge: 20, participation: 5 } },
        { id: "cn_econ_s4_02_e2_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 10, participation: 10 } },
        { id: "cn_econ_s4_02_e2_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 8, challenge: 8, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "feedback_closure",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "cn_econ_s4_02_e3_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 5, challenge: 22, participation: 12 } },
        { id: "cn_econ_s4_02_e3_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Jay_Johnson_Reflection", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 10, challenge: 10, participation: 8 } },
        { id: "cn_econ_s4_02_e3_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 5, challenge: 8, participation: 10 } },
        { id: "cn_econ_s4_02_e3_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 12, challenge: 10, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    }
  ]
};

// =============================================================================
// SCENARIO LIBRARY — Stub Scenarios: balanced_mixed (3 placeholders)
// =============================================================================

export const scenario_bm_econ_s3_01 = {
  id: "bm_econ_s3_01",
  bucket: "balanced_mixed",
  subject: "Economics",
  topic: "Price Mechanism — Consumer and Producer Surplus",
  schoolLevel: "Upper Secondary (Sec 3 Express)",
  contextNote: "Placeholder: A mixed-ability class with a spread of readiness and motivation. The challenge is to balance challenge for high-readiness students with support for low-readiness students while maintaining participation across the class.",
  students: [
    { name: "Alicia", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Bernard", readiness: "low", motivation: "disengaged", SEN: false, note: "Placeholder note." },
    { name: "Cheryl", readiness: "mid", motivation: "compliant", SEN: true, note: "Placeholder note." },
    { name: "David", readiness: "mid", motivation: "motivated", SEN: false, note: "Placeholder note." }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_econ_s3_01_e1_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Two_Step_MCQ", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 8, challenge: 8, participation: 8 } },
        { id: "bm_econ_s3_01_e1_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 20, challenge: 5, participation: 10 } },
        { id: "bm_econ_s3_01_e1_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 5, support: 5, challenge: 20, participation: 8 } },
        { id: "bm_econ_s3_01_e1_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Accountable_Talk", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 8, challenge: 8, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "assessment_response",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_econ_s3_01_e2_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "AfL_Triangle", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 8, challenge: 8, participation: 8 } },
        { id: "bm_econ_s3_01_e2_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Tomlinson_Respectful_Tasks", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 18, challenge: 12, participation: 5 } },
        { id: "bm_econ_s3_01_e2_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 10, challenge: 8, participation: 18 } },
        { id: "bm_econ_s3_01_e2_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 8, participation: 10 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "feedback_closure",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_econ_s3_01_e3_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 8, participation: 10 } },
        { id: "bm_econ_s3_01_e3_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 15, support: 15, challenge: 8, participation: 8 } },
        { id: "bm_econ_s3_01_e3_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 5, challenge: 20, participation: 12 } },
        { id: "bm_econ_s3_01_e3_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 12, challenge: 8, participation: 18 } }
      ],
      episodeBridge: "Placeholder bridge."
    }
  ]
};

export const scenario_bm_math_s3_01 = {
  id: "bm_math_s3_01",
  bucket: "balanced_mixed",
  subject: "Mathematics",
  topic: "Trigonometry — Sine and Cosine Rules",
  schoolLevel: "Upper Secondary (Sec 3 Express)",
  contextNote: "Placeholder: A balanced mixed-ability class working on the sine and cosine rules. Some students are confident with right-angled triangles but struggle with non-right-angled cases.",
  students: [
    { name: "Eugene", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Fiona", readiness: "low", motivation: "compliant", SEN: true, note: "Placeholder note." },
    { name: "Gerald", readiness: "mid", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Hannah", readiness: "mid", motivation: "disengaged", SEN: false, note: "Placeholder note." }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_math_s3_01_e1_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Two_Step_MCQ", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 8, challenge: 8, participation: 8 } },
        { id: "bm_math_s3_01_e1_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 20, challenge: 5, participation: 10 } },
        { id: "bm_math_s3_01_e1_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 5, support: 5, challenge: 20, participation: 8 } },
        { id: "bm_math_s3_01_e1_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Accountable_Talk", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 8, challenge: 8, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "assessment_response",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_math_s3_01_e2_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "AfL_Triangle", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 8, challenge: 8, participation: 8 } },
        { id: "bm_math_s3_01_e2_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Tomlinson_Respectful_Tasks", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 18, challenge: 12, participation: 5 } },
        { id: "bm_math_s3_01_e2_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 10, challenge: 8, participation: 18 } },
        { id: "bm_math_s3_01_e2_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 8, participation: 10 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "feedback_closure",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_math_s3_01_e3_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 8, participation: 10 } },
        { id: "bm_math_s3_01_e3_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 15, support: 15, challenge: 8, participation: 8 } },
        { id: "bm_math_s3_01_e3_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 5, challenge: 20, participation: 12 } },
        { id: "bm_math_s3_01_e3_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 12, challenge: 8, participation: 18 } }
      ],
      episodeBridge: "Placeholder bridge."
    }
  ]
};

export const scenario_bm_econ_s4_01 = {
  id: "bm_econ_s4_01",
  bucket: "balanced_mixed",
  subject: "Economics",
  topic: "Macroeconomics — Aggregate Demand and Supply",
  schoolLevel: "Upper Secondary (Sec 4 Express)",
  contextNote: "Placeholder: A balanced mixed-ability Sec 4 class working on AD/AS. Students have varying levels of prior knowledge from Sec 3 microeconomics.",
  students: [
    { name: "Isaac", readiness: "high", motivation: "motivated", SEN: false, note: "Placeholder note." },
    { name: "Joanna", readiness: "low", motivation: "compliant", SEN: false, note: "Placeholder note." },
    { name: "Kenneth", readiness: "mid", motivation: "motivated", SEN: true, note: "Placeholder note." },
    { name: "Lydia", readiness: "mid", motivation: "disengaged", SEN: false, note: "Placeholder note." }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_econ_s4_01_e1_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Two_Step_MCQ", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 8, challenge: 8, participation: 8 } },
        { id: "bm_econ_s4_01_e1_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 20, challenge: 5, participation: 10 } },
        { id: "bm_econ_s4_01_e1_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 5, support: 5, challenge: 20, participation: 8 } },
        { id: "bm_econ_s4_01_e1_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Accountable_Talk", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 8, challenge: 8, participation: 20 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "assessment_response",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_econ_s4_01_e2_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "AfL_Triangle", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 20, support: 8, challenge: 8, participation: 8 } },
        { id: "bm_econ_s4_01_e2_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Tomlinson_Respectful_Tasks", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 18, challenge: 12, participation: 5 } },
        { id: "bm_econ_s4_01_e2_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 10, challenge: 8, participation: 18 } },
        { id: "bm_econ_s4_01_e2_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 8, participation: 10 } }
      ],
      episodeBridge: "Placeholder bridge."
    },
    {
      type: "feedback_closure",
      situation: "Placeholder situation.",
      evidence: "Placeholder evidence.",
      choices: [
        { id: "bm_econ_s4_01_e3_a", label: "Placeholder choice A", elaboration: "Placeholder.", theoryKey: "Hattie_Timperley_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 18, support: 8, challenge: 8, participation: 10 } },
        { id: "bm_econ_s4_01_e3_b", label: "Placeholder choice B", elaboration: "Placeholder.", theoryKey: "Vygotsky_ZPD_Bruner", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 15, support: 15, challenge: 8, participation: 8 } },
        { id: "bm_econ_s4_01_e3_c", label: "Placeholder choice C", elaboration: "Placeholder.", theoryKey: "Tomlinson_Teaching_Up", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 8, support: 5, challenge: 20, participation: 12 } },
        { id: "bm_econ_s4_01_e3_d", label: "Placeholder choice D", elaboration: "Placeholder.", theoryKey: "AQS_Feedback", consequence: "Placeholder.", tradeoff: "Placeholder.", studentReaction: "Placeholder.", scores: { afl: 10, support: 12, challenge: 8, participation: 18 } }
      ],
      episodeBridge: "Placeholder bridge."
    }
  ]
};
