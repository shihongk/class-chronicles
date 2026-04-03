// =============================================================================
// src/data/theoryBank.js — Theory Bank (v2)
// =============================================================================
// Keys used across S1–S6:
//   AfL_Triangle, Two_Step_MCQ, Hattie_Timperley_Feedback, AQS_Feedback,
//   Tomlinson_Teaching_Up, Tomlinson_Respectful_Tasks, Tomlinson_Flex_Grouping,
//   Vygotsky_ZPD_Bruner, Accountable_Talk, IRF_Chains, Jay_Johnson_Reflection
//
// Dimensions: "afl" | "differentiation" | "participation" | "feedback" | "reflection"
// =============================================================================

export const TheoryBank = {

  AfL_Triangle: {
    label: "Assessment for Learning",
    citation: "Tan, K. H. K. (2013). A framework for Assessment for Learning: Implications for feedback practices within and beyond the gap. ISRN Education, 2013, 1–6. https://doi.org/10.1155/2013/640171; Assessment Reform Group. (2002). Assessment for learning: 10 principles. University of Cambridge Faculty of Education.",
    summary: "AfL positions assessment as a continuous, three-way process between teacher, learner, and peers — using evidence of learning to close the gap between current and desired performance.",
    dimension: "afl"
  },

  Two_Step_MCQ: {
    label: "Two-Step MCQ",
    citation: "Ministry of Education Singapore. (2023). Student learning space: OPAL2.0 pedagogical framework. MOE Singapore.",
    summary: "A Two-Step MCQ asks students to select an answer AND provide a written justification — separating correct answers from correct reasoning and giving teachers richer diagnostic data.",
    dimension: "afl"
  },

  Hattie_Timperley_Feedback: {
    label: "Hattie & Timperley's Feedback Model",
    citation: "Hattie, J., & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81–112. https://doi.org/10.3102/003465430298487",
    summary: "Feedback is most powerful when it addresses: Where am I going? How am I going? Where to next? Process and self-regulation feedback have the greatest impact on learning.",
    dimension: "feedback"
  },

  AQS_Feedback: {
    label: "AQS Feedback Protocol",
    citation: "Ministry of Education Singapore. (2023). Student learning space: OPAL2.0 pedagogical framework. MOE Singapore.",
    summary: "AQS structures feedback into three moves: Affirm (name a strength), Question (ask about something unclear), Suggest (offer one concrete improvement). Reduces vague or purely evaluative responses.",
    dimension: "feedback"
  },

  Tomlinson_Teaching_Up: {
    label: "Teaching Up",
    citation: "Tomlinson, C. A. (2014). The differentiated classroom: Responding to the needs of all learners (2nd ed.). ASCD.",
    summary: "Design tasks from the perspective of the most advanced learner and scaffold down — so all students encounter intellectually rich content with support calibrated to readiness.",
    dimension: "differentiation"
  },

  Tomlinson_Respectful_Tasks: {
    label: "Respectful Tasks",
    citation: "Tomlinson, C. A. (2014). The differentiated classroom: Responding to the needs of all learners (2nd ed.). ASCD.",
    summary: "Respectful tasks are equally engaging and focused on essential understandings regardless of readiness level. Differentiation should never mean giving some students busywork while others do the real thinking.",
    dimension: "differentiation"
  },

  Tomlinson_Flex_Grouping: {
    label: "Flexible Grouping",
    citation: "Tomlinson, C. A. (2014). The differentiated classroom: Responding to the needs of all learners (2nd ed.). ASCD.",
    summary: "Students work in varied configurations — by readiness, interest, or learning profile — that change regularly. Avoids the stigma of fixed ability tracking and keeps expectations fluid.",
    dimension: "differentiation"
  },

  Vygotsky_ZPD_Bruner: {
    label: "ZPD & Scaffolding",
    citation: "Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes. Harvard University Press; Bruner, J. S. (1966). Toward a theory of instruction. Harvard University Press.",
    summary: "The Zone of Proximal Development is the gap between what a learner can do independently and what they can achieve with support. Scaffolding is temporary, calibrated support that is gradually withdrawn as competence grows.",
    dimension: "differentiation"
  },

  Accountable_Talk: {
    label: "Accountable Talk",
    citation: "Michaels, S., O'Connor, C., & Resnick, L. B. (2008). Deliberative discourse idealized and realized: Accountable talk in the classroom and in civic life. Studies in Philosophy and Education, 27(4), 283–297. https://doi.org/10.1007/s11217-007-9071-1",
    summary: "Accountable Talk structures discussion so students are accountable to the learning community, to accurate knowledge, and to rigorous thinking — moving beyond surface IRF patterns.",
    dimension: "participation"
  },

  IRF_Chains: {
    label: "IRF Chains",
    citation: "Ministry of Education Singapore. (2023). Student learning space: OPAL2.0 pedagogical framework. MOE Singapore.",
    summary: "IRF Chains extend the Initiation–Response–Feedback pattern by chaining multiple student responses before teacher feedback — creating space for peer elaboration and reducing teacher dominance.",
    dimension: "participation"
  },

  Jay_Johnson_Reflection: {
    label: "Jay & Johnson's Typology of Reflection",
    citation: "Jay, J. K., & Johnson, K. L. (2002). Capturing complexity: A typology of reflective practice for teacher education. Teaching and Teacher Education, 18(1), 73–85. https://doi.org/10.1016/S0742-051X(01)00051-8",
    summary: "Three dimensions of reflection: Descriptive (what happened?), Comparative (how does this compare to other practices?), and Critical (what are the broader implications for equity and learning?).",
    dimension: "reflection"
  }

};
