// =============================================================================
// src/data/theoryBank.js — Theory Bank
// =============================================================================

export const TheoryBank = {

  AfL_Triangle: {
    label: "Assessment for Learning Triangle",
    citation: "Tan, K. H. K. (2013). A framework for Assessment for Learning: Implications for feedback practices within and beyond the gap. ISRN Education, 2013, 1–6. https://doi.org/10.1155/2013/640171; Assessment Reform Group. (2002). Assessment for learning: 10 principles. University of Cambridge Faculty of Education.",
    summary: "AfL positions assessment as a continuous, three-way process between teacher, learner, and peers — using evidence of learning to close the gap between current and desired performance. Effective AfL requires shared learning goals, evidence gathering, and responsive action.",
    dimension: "afl"
  },

  Hattie_Timperley_Feedback: {
    label: "Hattie & Timperley's Feedback Model",
    citation: "Hattie, J., & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81–112. https://doi.org/10.3102/003465430298487",
    summary: "Feedback is most powerful when it addresses three questions: Where am I going? How am I going? Where to next? The model distinguishes task, process, self-regulation, and self levels — with process and self-regulation feedback having the greatest impact on learning.",
    dimension: "afl"
  },

  Feedback_Conceptions: {
    label: "Conceptions of Feedback: Inspection to Introspection",
    citation: "Goh, J. W. P., & Tan, K. H. K. (2023). From inspection to introspection: Shifting conceptions of feedback in Singapore classrooms. Assessment in Education: Principles, Policy & Practice, 30(2), 145–163. https://doi.org/10.1080/0969594X.2023.2198765",
    summary: "This scale maps teachers' conceptions of feedback from 'inspection' (teacher-directed, corrective) to 'introspection' (learner-activated, reflective). Moving toward introspection means designing feedback that students can act on independently, not just receive.",
    dimension: "afl"
  },

  Tomlinson_Teaching_Up: {
    label: "Teaching Up: High-Ceiling Differentiation",
    citation: "Tomlinson, C. A. (2014). The differentiated classroom: Responding to the needs of all learners (2nd ed.). ASCD.",
    summary: "Teaching Up means designing tasks from the perspective of the most advanced learner and scaffolding down, rather than designing for the middle and extending up. This ensures all students encounter intellectually rich content, with support calibrated to readiness.",
    dimension: "challenge"
  },

  Tomlinson_Respectful_Tasks: {
    label: "Respectful Tasks in Differentiated Instruction",
    citation: "Tomlinson, C. A. (2014). The differentiated classroom: Responding to the needs of all learners (2nd ed.). ASCD.",
    summary: "Respectful tasks are equally engaging, equally important, and equally focused on essential understandings — regardless of readiness level. Differentiation should never mean giving some students busywork while others do the 'real' thinking.",
    dimension: "support"
  },

  Tomlinson_Flex_Grouping: {
    label: "Flexible Grouping",
    citation: "Tomlinson, C. A. (2014). The differentiated classroom: Responding to the needs of all learners (2nd ed.). ASCD.",
    summary: "Flexible grouping means students work in varied configurations — by readiness, interest, or learning profile — that change regularly. No student is permanently assigned to a fixed group, which avoids the stigma of ability tracking and keeps expectations fluid.",
    dimension: "support"
  },

  Vygotsky_ZPD_Bruner: {
    label: "Zone of Proximal Development & Scaffolding",
    citation: "Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes. Harvard University Press; Bruner, J. S. (1966). Toward a theory of instruction. Harvard University Press.",
    summary: "The Zone of Proximal Development describes the gap between what a learner can do independently and what they can achieve with support. Bruner's scaffolding operationalises this: temporary, calibrated support that is gradually withdrawn as competence grows.",
    dimension: "support"
  },

  SDT_Deci_Ryan: {
    label: "Self-Determination Theory",
    citation: "Deci, E. L., & Ryan, R. M. (2000). The 'what' and 'why' of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268. https://doi.org/10.1207/S15327965PLI1104_01",
    summary: "SDT proposes that intrinsic motivation is sustained when three basic psychological needs are met: autonomy (sense of choice), competence (sense of effectiveness), and relatedness (sense of connection). Classroom structures that undermine these needs reduce engagement.",
    dimension: "participation"
  },

  Accountable_Talk: {
    label: "Accountable Talk",
    citation: "Michaels, S., O'Connor, C., & Resnick, L. B. (2008). Deliberative discourse idealized and realized: Accountable talk in the classroom and in civic life. Studies in Philosophy and Education, 27(4), 283–297. https://doi.org/10.1007/s11217-007-9071-1",
    summary: "Accountable Talk structures classroom discussion so students are accountable to the learning community, to accurate knowledge, and to rigorous thinking. It moves beyond IRF patterns by requiring students to build on, challenge, and justify each other's contributions.",
    dimension: "participation"
  },

  Two_Step_MCQ: {
    label: "Two-Step MCQ (Diagnostic Assessment)",
    citation: "Ministry of Education Singapore. (2023). Student learning space: OPAL2.0 pedagogical framework. MOE Singapore.",
    summary: "A Two-Step MCQ asks students to select an answer AND provide a written justification. This separates correct answers from correct reasoning, revealing students who guess correctly and students who reason correctly but select wrongly — giving teachers richer diagnostic data.",
    dimension: "afl"
  },

  IRF_Chains: {
    label: "IRF Chains (Initiation–Response–Feedback)",
    citation: "Ministry of Education Singapore. (2023). Student learning space: OPAL2.0 pedagogical framework. MOE Singapore.",
    summary: "IRF Chains extend the traditional Initiation–Response–Feedback pattern by chaining multiple student responses before teacher feedback, creating space for peer elaboration and reducing teacher dominance. Used deliberately, they shift the locus of talk toward students.",
    dimension: "participation"
  },

  AQS_Feedback: {
    label: "AQS Feedback Protocol (Affirm–Question–Suggest)",
    citation: "Ministry of Education Singapore. (2023). Student learning space: OPAL2.0 pedagogical framework. MOE Singapore.",
    summary: "The AQS protocol structures peer and teacher feedback into three moves: Affirm (name a specific strength), Question (ask about something unclear), Suggest (offer one concrete improvement). This scaffolds feedback conversations and reduces vague or purely evaluative responses.",
    dimension: "afl"
  },

  Jay_Johnson_Reflection: {
    label: "Jay & Johnson's Typology of Reflection",
    citation: "Jay, J. K., & Johnson, K. L. (2002). Capturing complexity: A typology of reflective practice for teacher education. Teaching and Teacher Education, 18(1), 73–85. https://doi.org/10.1016/S0742-051X(01)00051-8",
    summary: "Jay and Johnson propose three dimensions of reflection: Descriptive (what happened?), Comparative (how does this compare to other perspectives or practices?), and Critical (what are the broader implications for equity and learning?). Together they move reflection beyond surface recounting toward transformative professional learning.",
    dimension: "reflection"
  }

};
