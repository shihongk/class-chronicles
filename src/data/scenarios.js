// =============================================================================
// src/data/scenarios.js — Seed Scenarios
// =============================================================================

// =============================================================================
// SCENARIO LIBRARY — Seed Scenario 1: readiness_gap
// =============================================================================

export const scenario_rg_econ_s3_01 = {
  id: "rg_econ_s3_01",
  bucket: "readiness_gap",
  subject: "Economics",
  topic: "Market Equilibrium — Price Floors",
  schoolLevel: "Upper Secondary (Sec 3 Express)",
  contextNote: "This is your third lesson with 3E2. You taught price floors last lesson. Today you planned to move on to price ceilings, but you are not sure the class is ready.",
  students: [
    {
      name: "Wei Jie",
      readiness: "low",
      motivation: "compliant",
      SEN: false,
      note: "Copies notes carefully but rarely asks questions; struggles to explain concepts in his own words."
    },
    {
      name: "Nur Atiqah",
      readiness: "mid",
      motivation: "motivated",
      SEN: false,
      note: "Enthusiastic and tries hard; makes careless errors in diagram labelling but engages well in discussion."
    },
    {
      name: "Rajan",
      readiness: "high",
      motivation: "motivated",
      SEN: false,
      note: "Often finishes early and asks deeper questions beyond the syllabus."
    },
    {
      name: "Siti",
      readiness: "low",
      motivation: "disengaged",
      SEN: true,
      note: "Has a reading difficulty (dyslexia); avoids written tasks and goes quiet when feeling overwhelmed."
    }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "You are 20 minutes into the lesson. You just finished explaining price floors using the HDB rental subsidy example. You ask, 'Is everyone okay?' Most students nod. But Wei Jie is staring at his blank worksheet. Nur Atiqah has drawn a diagram but labelled the price floor below equilibrium — the wrong direction. Rajan is done and tapping his pen. Siti has written nothing and is looking at the window.",
      evidence: "A quick scan: 11 of 30 students have a correct diagram. 9 have the floor on the wrong side of equilibrium. 10 have not started.",
      choices: [
        {
          id: "rg_econ_s3_01_e1_a",
          label: "Use a Two-Step MCQ to reveal who understands and why",
          elaboration: "Project a multiple-choice question with 3 plausible diagram options. Ask students to choose AND write one sentence justifying their choice — you will use this to diagnose the gap before proceeding.",
          theoryKey: "Two_Step_MCQ",
          consequence: "You project the question. The class engages — even Siti circles an answer. When you scan responses, you find that 9 students chose the correct diagram but could not justify it, and 6 students chose the same wrong option. This gives you a clear pattern to address. Wei Jie chose correctly but wrote 'I guessed.' Rajan wrote a paragraph.",
          tradeoff: "You now have precise evidence to reteach, but you have spent 5 minutes and have not moved to price ceilings yet.",
          studentReaction: "Nur Atiqah erases her diagram immediately after seeing the MCQ options. Siti looks less panicked than usual — picking an answer feels manageable.",
          scores: { afl: 22, support: 3, challenge: 5, participation: 8 }
        },
        {
          id: "rg_econ_s3_01_e1_b",
          label: "Pause and offer sentence starters to students who are stuck",
          elaboration: "Distribute a half-sheet with sentence starters: 'A price floor is set ___ the equilibrium price because...' and 'This causes a surplus because buyers...' Let students use it to complete their diagram.",
          theoryKey: "Vygotsky_ZPD_Bruner",
          consequence: "Several students immediately use the starters and begin writing. Siti picks up the half-sheet and starts. Wei Jie copies the sentence but leaves the blank unfilled — he does not know the word. Rajan sets his aside without using it. The class is quieter and working, but you are not sure who understands and who is just filling in blanks.",
          tradeoff: "Participation increases and Siti is now on task, but you have not gathered diagnostic evidence about the depth of understanding.",
          studentReaction: "Siti completes the sentence for the first time this topic. Wei Jie looks less anxious but is still uncertain about the concept.",
          scores: { afl: 5, support: 22, challenge: 0, participation: 10 }
        },
        {
          id: "rg_econ_s3_01_e1_c",
          label: "Pose Rajan's implicit question to the whole class: push deeper",
          elaboration: "You say: 'Before we move on — here is a harder question. If a price floor is set below equilibrium, what happens? Is it effective?' You want the class to grapple with a counter-case.",
          theoryKey: "Tomlinson_Teaching_Up",
          consequence: "Rajan and two others engage immediately. Nur Atiqah tries to answer and gets partly right. Wei Jie writes nothing. Siti stares at the board. The discussion is lively at the top of the class but the bottom third are lost — you have widened the gap.",
          tradeoff: "High-readiness students are challenged and engaged, but students like Wei Jie and Siti are further behind and now feel exposed.",
          studentReaction: "Rajan raises his hand three times. Wei Jie slides lower in his chair and stops attempting to write.",
          scores: { afl: 5, support: 0, challenge: 22, participation: 8 }
        },
        {
          id: "rg_econ_s3_01_e1_d",
          label: "Use Think-Pair-Share so all voices surface before whole-class",
          elaboration: "Ask students to sketch their diagram independently for 90 seconds, then explain it to their partner. You circulate and listen before drawing the class together to share.",
          theoryKey: "Accountable_Talk",
          consequence: "The room fills with quiet conversation. You crouch by Siti's desk — she explains the diagram to her partner in Malay before switching to English. Nur Atiqah corrects herself mid-explanation when her partner points at her label. Wei Jie listens more than he talks, but engages. You hear at least 5 different misconceptions surfacing.",
          tradeoff: "You have surfaced many voices, including Siti's, but you have not yet organised the misconceptions into a teachable pattern.",
          studentReaction: "Siti speaks for the first time this lesson. Nur Atiqah self-corrects without any teacher input.",
          scores: { afl: 10, support: 8, challenge: 5, participation: 22 }
        }
      ],
      episodeBridge: "Whatever you chose, you now have a sense of where the class is — but the exit cards from last week have just been returned to your desk."
    },
    {
      type: "assessment_response",
      situation: "You look at the exit cards from the previous lesson, which a colleague returned to you during the break. Of 30 cards: 14 students cannot explain why a price floor causes a surplus — they drew the diagram but wrote 'price goes up' or left the explanation blank. Priya (absent today) wrote a near-perfect explanation. Jun Hao (who is here today) wrote the correct explanation and added: 'Does this mean government intervention is always bad?' Wei Jie wrote only 'I don't know.' Siti left it blank.",
      evidence: "14 cards show diagram-only responses with no causal explanation. 6 have partial explanations. 8 have strong explanations. 2 are blank.",
      choices: [
        {
          id: "rg_econ_s3_01_e2_a",
          label: "Use the exit card data to re-teach the causal link explicitly",
          elaboration: "Project two anonymised exit cards — one strong, one weak. Ask the class to spot the difference using the success criteria. Then reteach the causal chain: price floor → quantity supplied rises, quantity demanded falls → surplus.",
          theoryKey: "AfL_Triangle",
          consequence: "Students immediately see the difference between the two cards. Nur Atiqah says, 'Oh — I was only explaining the price, not the behaviour.' Wei Jie looks relieved — his card was not shown. Siti follows the projected card closely. Jun Hao's extension question gets parked with a visible note on the board: 'We will return to this.'",
          tradeoff: "The reteach is targeted and evidence-based, but you have not yet addressed Jun Hao's deeper thinking or Siti's blank submission.",
          studentReaction: "Nur Atiqah visibly adjusts her understanding. Wei Jie recopies the causal chain into his notes without being asked.",
          scores: { afl: 22, support: 5, challenge: 5, participation: 8 }
        },
        {
          id: "rg_econ_s3_01_e2_b",
          label: "Design a tiered practice task responding to the three exit card bands",
          elaboration: "Create three versions of the same follow-up question: Band 1 (14 students) gets a diagram with labels and fill-in-the-blank causal chain. Band 2 (6 students) gets the diagram unlabelled. Band 3 (8 students) gets a new scenario — a minimum wage — and must apply the logic independently.",
          theoryKey: "Tomlinson_Respectful_Tasks",
          consequence: "Students in Band 1 work steadily. Siti completes the fill-in-the-blank — the first full written response she has done this topic. Wei Jie finishes Band 1 and asks you if he can try Band 2. Jun Hao is on Band 3 and writes a second page unprompted. Nur Atiqah is in Band 2 and working carefully.",
          tradeoff: "Excellent differentiation of product, but distributing three versions took 4 minutes and some students noticed they had different sheets — one student asked loudly, 'Why did I get the easy one?'",
          studentReaction: "Siti completes a written task for the first time. One student in Band 1 is visibly embarrassed by the easier sheet.",
          scores: { afl: 8, support: 20, challenge: 15, participation: 5 }
        },
        {
          id: "rg_econ_s3_01_e2_c",
          label: "Park the exit cards and move to price ceilings — trust the process",
          elaboration: "You decide the exit card patterns are within normal range. You will address misconceptions organically as they emerge in the next topic. You move on and address clarifications as students ask.",
          theoryKey: "AfL_Triangle",
          consequence: "The lesson moves quickly. Rajan engages strongly with price ceilings. But Wei Jie carries his price floor misconception into the new topic and confuses ceiling with floor on the diagram. Siti is completely lost by the second new concept. Nur Atiqah starts confidently but stalls when the new diagram involves a different surplus/shortage logic.",
          tradeoff: "You cover the curriculum as planned, but unresolved misconceptions compound. Three students are now two concepts behind.",
          studentReaction: "Wei Jie erases his diagram three times. Siti stops writing entirely.",
          scores: { afl: 2, support: 2, challenge: 5, participation: 2 }
        },
        {
          id: "rg_econ_s3_01_e2_d",
          label: "Return cards and ask students to peer-discuss using AQS protocol",
          elaboration: "Return anonymised exit cards to pairs. Ask each pair to use Affirm–Question–Suggest: find what was done well, ask one question about what is unclear, and suggest one improvement. You circulate.",
          theoryKey: "AQS_Feedback",
          consequence: "Pairs engage actively. Nur Atiqah affirms her partner and then asks, 'But why does quantity supplied go up?' — which leads to a peer explanation that she says is clearer than your earlier one. Wei Jie receives feedback that his diagram is correct but his explanation is missing — he looks surprised. Siti has no card to return (it was blank), so you sit with her briefly while pairs work.",
          tradeoff: "Feedback conversation is rich and student-owned, but Siti is excluded from the peer activity by default and needs individual teacher time simultaneously.",
          studentReaction: "Nur Atiqah constructs understanding through dialogue. Siti receives one-on-one time while peers are occupied.",
          scores: { afl: 10, support: 10, challenge: 5, participation: 20 }
        }
      ],
      episodeBridge: "The lesson is nearing its last 12 minutes. Students have done some work — now comes feedback and closure."
    },
    {
      type: "feedback_closure",
      situation: "You have 12 minutes left. Students have just completed a short written explanation of price floors. Wei Jie has three sentences — the causal chain is there but jumbled. Nur Atiqah's explanation is clear but does not use the term 'surplus.' Rajan has written a paragraph that links to government policy — excellent but off-syllabus. Siti has two words: 'price rises.' You want to close the lesson and prepare them for tomorrow's quiz.",
      evidence: "Quick scan: 8 strong responses, 14 acceptable, 6 minimal, 2 blank. Tomorrow's quiz covers this exact causal explanation.",
      choices: [
        {
          id: "rg_econ_s3_01_e3_a",
          label: "Give comment-only written feedback on 3 selected responses",
          elaboration: "Project three anonymised student responses (strong, mid, weak). Write one comment per response on the board — no grade, no mark. Ask students to identify what each comment means for their own work.",
          theoryKey: "Hattie_Timperley_Feedback",
          consequence: "Students study the three examples carefully. Nur Atiqah immediately writes the word 'surplus' into her explanation. Wei Jie reads the comment on the weak response and says quietly to his neighbour, 'That sounds like mine.' He rewrites his last sentence. Rajan is unmoved — his is clearly stronger than all three.",
          tradeoff: "Process-level feedback prompts self-correction, but Rajan is not stretched and Siti cannot yet access the mid/weak examples to self-assess — she does not know what 'jumbled' means in this context.",
          studentReaction: "Nur Atiqah self-corrects without being told. Wei Jie shows early signs of self-regulation through peer comparison.",
          scores: { afl: 20, support: 5, challenge: 5, participation: 10 }
        },
        {
          id: "rg_econ_s3_01_e3_b",
          label: "Use 3-2-1 Summariser as exit routine with differentiated prompts",
          elaboration: "Ask students to write: 3 things learned, 2 things they can explain to someone, 1 question still remaining. Provide a sentence frame version for students who need it: 'I learned that ___, ___, and ___. I can explain ___ and ___. I still wonder ___.'",
          theoryKey: "Vygotsky_ZPD_Bruner",
          consequence: "Most students complete the 3-2-1. Siti uses the sentence frame and writes 3 things for the first time. Wei Jie writes 2 things and his question is: 'Will this come out in the exam?' Rajan writes 5 things and adds a second question about government failure. You now have a full set of closing evidence for tomorrow's planning.",
          tradeoff: "Excellent inclusive closure and assessment data, but you have not given individual feedback on the written explanations students just produced.",
          studentReaction: "Siti completes the full exit task using the frame. Rajan's question gives you a hook for tomorrow's lesson.",
          scores: { afl: 18, support: 18, challenge: 5, participation: 8 }
        },
        {
          id: "rg_econ_s3_01_e3_c",
          label: "Pose Rajan's policy question to the class as the closing problem",
          elaboration: "You say: 'Rajan has raised a question bigger than today's syllabus — is government intervention always justified? I want everyone to write one sentence arguing for or against, using today's economics.' You frame it as a challenge for all, with no wrong answer.",
          theoryKey: "Tomlinson_Teaching_Up",
          consequence: "The room is energised. Rajan beams. Several mid-readiness students write confidently — the open-ended nature removes fear of being wrong. Wei Jie writes: 'Government should help if prices are too high' — not technically precise but shows reasoning. Siti does not write but watches the board where you are collecting responses. You run over time by 3 minutes.",
          tradeoff: "High-ceiling closure energises the class, but Siti and two others are observers, not participants. Running over time means no explicit quiz preparation.",
          studentReaction: "Rajan's engagement visibly lifts the room's energy. Siti watches but does not write — she is listening.",
          scores: { afl: 8, support: 5, challenge: 22, participation: 12 }
        },
        {
          id: "rg_econ_s3_01_e3_d",
          label: "Structured peer feedback using Affirm-Question-Suggest (AQS)",
          elaboration: "Students exchange written explanations with a partner. Each gives one affirm, one question, one suggestion — guided by the success criteria on the board. You model one AQS cycle first.",
          theoryKey: "AQS_Feedback",
          consequence: "Pairs give feedback earnestly. Nur Atiqah's partner points out her missing 'surplus' immediately. Wei Jie receives 'Your causal chain is there but the order is wrong' — he nods and rewrites. Siti has no partner (odd number) and is paired with you. You give her verbal AQS feedback. Rajan gives his partner three suggestions — helpful, but slightly overwhelming.",
          tradeoff: "Feedback is dialogic and student-owned, and Siti receives teacher attention. But Rajan's feedback style may intimidate his partner, and the AQS quality varies without more scaffolding.",
          studentReaction: "Wei Jie acts on written feedback without prompting. Siti receives your personal feedback and writes two additional sentences.",
          scores: { afl: 10, support: 12, challenge: 8, participation: 20 }
        }
      ],
      episodeBridge: "The bell rings. You collect the written explanations and make a note to review them tonight before tomorrow's quiz."
    }
  ]
};

// =============================================================================
// SCENARIO LIBRARY — Seed Scenario 2: participation_low
// =============================================================================

export const scenario_pl_econ_s3_01 = {
  id: "pl_econ_s3_01",
  bucket: "participation_low",
  subject: "Economics",
  topic: "Demand and Supply — Factors Shifting Demand",
  schoolLevel: "Upper Secondary (Sec 3 Express)",
  contextNote: "You are teaching 3E3 for the second time this week. The class is quiet — not disruptive, just disengaged. Only 3–4 students typically volunteer answers.",
  students: [
    {
      name: "Jun Hao",
      readiness: "high",
      motivation: "motivated",
      SEN: false,
      note: "Always answers first. Other students have stopped trying because they know he will answer."
    },
    {
      name: "Kavitha",
      readiness: "mid",
      motivation: "compliant",
      SEN: false,
      note: "Writes everything down but rarely speaks in class; her written work is thoughtful and detailed."
    },
    {
      name: "Hafiz",
      readiness: "low",
      motivation: "disengaged",
      SEN: true,
      note: "Has ADHD; loses track during extended explanation; responds well to short, structured tasks with clear outcomes."
    },
    {
      name: "Mei Ling",
      readiness: "mid",
      motivation: "compliant",
      SEN: false,
      note: "Participates only when directly called on; gives minimal answers."
    }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "You have just taught the five factors that shift demand — income, prices of related goods, tastes, population, and expectations. You ask the class: 'Can someone give me an example of something that shifts demand?' Jun Hao's hand shoots up immediately. You notice Kavitha has written a full paragraph in her notes but is looking at her desk. Hafiz is doodling on the corner of his worksheet. Mei Ling is watching Jun Hao, waiting for him to answer.",
      evidence: "Only Jun Hao and one other student have volunteered in the last 20 minutes. A quick whiteboard check shows most students can list the five factors but cannot explain the causal mechanism — they write 'income increases → demand increases' without explaining why.",
      choices: [
        {
          id: "pl_econ_s3_01_e1_a",
          label: "Use IRF Chains — hold back from accepting Jun Hao's answer immediately",
          elaboration: "You acknowledge Jun Hao's raised hand but say: 'Hold that thought, Jun Hao — I want to hear from someone who hasn't spoken yet.' You use a structured IRF chain: pose the question, take a response from Kavitha, then ask Hafiz to build on it, then invite Jun Hao to evaluate.",
          theoryKey: "IRF_Chains",
          consequence: "Kavitha looks startled but answers carefully: 'If income goes up, people can afford more.' You ask Hafiz to add one thing. He pauses, then says: 'They want to buy more?' You affirm and ask Jun Hao to evaluate both answers. Jun Hao adds the mechanism: 'Willingness and ability to pay both increase.' The chain produces a richer answer than Jun Hao alone would have given.",
          tradeoff: "The IRF chain surfaces three voices and builds a collaborative answer, but Mei Ling was not included and Hafiz's contribution was minimal — he needed more time to formulate.",
          studentReaction: "Kavitha looks surprised to be called on but answers more fully than expected. Hafiz sits up straighter when addressed directly. Mei Ling watches the exchange with visible interest.",
          scores: { afl: 10, support: 8, challenge: 5, participation: 22 }
        },
        {
          id: "pl_econ_s3_01_e1_b",
          label: "Use Think-Pair-Share with a structured prompt before whole-class discussion",
          elaboration: "Before taking any hands, you say: 'Everyone write one example of a demand shifter and explain the mechanism in one sentence. Then share with your partner.' You give 2 minutes before opening to the class.",
          theoryKey: "Accountable_Talk",
          consequence: "The room fills with quiet writing and then murmured conversation. Kavitha writes two examples and explains both to her partner in detail. Hafiz writes one word ('income') but his partner helps him expand it into a sentence. Mei Ling and her partner produce a joint answer. When you cold-call Mei Ling's pair, she reads from their shared notes — her first contribution this lesson.",
          tradeoff: "Every student has produced something before the whole-class phase, but Hafiz's written output was minimal and the pair work masked how much he understood independently.",
          studentReaction: "Mei Ling reads aloud for the first time this lesson. Kavitha's written work is strong but she still does not volunteer to speak unprompted.",
          scores: { afl: 12, support: 10, challenge: 5, participation: 20 }
        },
        {
          id: "pl_econ_s3_01_e1_c",
          label: "Use a Two-Step MCQ to diagnose mechanism understanding across the class",
          elaboration: "Project a question: 'A rise in consumer income causes demand for smartphones to increase. Which statement best explains why? (A) Prices fall. (B) Willingness and ability to pay increase. (C) Supply increases.' Students choose AND write one sentence justifying their choice.",
          theoryKey: "Two_Step_MCQ",
          consequence: "The class engages with the MCQ — even Hafiz circles an answer quickly. Results: 18 chose B correctly, but only 9 could justify it with the mechanism. 7 chose B and wrote 'because income is higher' — correct answer, wrong reasoning. Jun Hao wrote a full explanation. Kavitha's justification is the clearest in the class. Hafiz circled B but wrote nothing.",
          tradeoff: "You now have precise diagnostic data separating answer from reasoning, but the activity did not increase verbal participation — the class is still quiet.",
          studentReaction: "Kavitha's written justification is excellent — she looks up to see if you noticed. Hafiz completed the task but did not engage with the written component.",
          scores: { afl: 22, support: 5, challenge: 5, participation: 8 }
        },
        {
          id: "pl_econ_s3_01_e1_d",
          label: "Restructure the seating into groups and assign roles for a short discussion task",
          elaboration: "You quickly assign groups of four with roles: Recorder, Reporter, Challenger, Timekeeper. Each group must produce one example of a demand shifter with a full causal explanation. The Reporter will share with the class.",
          theoryKey: "SDT_Deci_Ryan",
          consequence: "Groups form with some shuffling. Kavitha becomes Recorder in her group and writes a detailed explanation. Hafiz is assigned Timekeeper — a role with a clear, bounded task — and stays on track for the full 3 minutes. Mei Ling is Reporter and shares her group's answer with the class, her voice quiet but audible. Jun Hao is Challenger and pushes his group to add the mechanism.",
          tradeoff: "Structured roles give Hafiz a manageable entry point and push Mei Ling to speak, but the role assignment took 4 minutes and some groups needed clarification on what 'Challenger' meant.",
          studentReaction: "Hafiz completes his role without losing focus — the clearest task structure he has had this lesson. Mei Ling speaks to the whole class for the first time.",
          scores: { afl: 8, support: 12, challenge: 8, participation: 20 }
        }
      ],
      episodeBridge: "You have a clearer picture of who can identify demand shifters — but the deeper question is whether students can explain the causal mechanism, not just name the factor. You move to a short written task."
    },
    {
      type: "assessment_response",
      situation: "Students have just completed a short written task: 'Explain, using the concept of willingness and ability to pay, why a fall in consumer income reduces demand for luxury goods.' You circulate and read over shoulders. Jun Hao has written a textbook-quality answer. Kavitha has written a strong response but used 'want' instead of 'willingness to pay' throughout. Hafiz has written: 'Less money so less buying.' Mei Ling has written two sentences that are correct but very thin — she has the idea but has not explained the mechanism.",
      evidence: "Of 30 students: 8 have full mechanism explanations, 12 have partial explanations using everyday language instead of economic terminology, 7 have minimal responses (correct conclusion, no mechanism), 3 are blank.",
      choices: [
        {
          id: "pl_econ_s3_01_e2_a",
          label: "Use Kavitha's response as a model — show the class how to upgrade everyday language to economic language",
          elaboration: "With Kavitha's permission (or anonymised), project her response. Highlight where she used 'want' and show how replacing it with 'willingness to pay' changes the precision. Ask the class to revise their own responses using the economic term.",
          theoryKey: "Hattie_Timperley_Feedback",
          consequence: "Kavitha looks both embarrassed and proud when her work is shown. The class immediately sees the gap between everyday and economic language. Mei Ling adds 'willingness to pay' to her response. Hafiz looks at the projected example and rewrites his sentence: 'Less income means less willingness and ability to pay, so demand falls.' Jun Hao nods — he already used the term correctly.",
          tradeoff: "The modelling is precise and immediately actionable, but using a student's work (even anonymised) carries risk — Kavitha may feel exposed rather than celebrated.",
          studentReaction: "Kavitha revises her work carefully and does not look up. Hafiz produces his best written sentence of the lesson by copying the structure from the model.",
          scores: { afl: 20, support: 8, challenge: 5, participation: 10 }
        },
        {
          id: "pl_econ_s3_01_e2_b",
          label: "Use AQS peer feedback — pairs exchange responses and give structured feedback",
          elaboration: "Ask students to swap responses with a partner. Each partner gives one Affirm, one Question, one Suggest — using the success criteria on the board: (1) names the factor, (2) explains willingness/ability to pay, (3) links to demand change.",
          theoryKey: "AQS_Feedback",
          consequence: "Pairs engage with the task. Kavitha's partner immediately asks: 'Why did you write want instead of willingness to pay?' — Kavitha looks at the board and revises on the spot. Mei Ling receives: 'You got the idea but can you add the mechanism?' and adds two sentences. Hafiz's partner struggles to give feedback on his minimal response — they end up talking about the concept instead, which is productive.",
          tradeoff: "Peer feedback is dialogic and student-owned, but the quality of feedback varies — some pairs affirm everything and suggest nothing, and Hafiz's pair drifted off-task.",
          studentReaction: "Kavitha self-corrects through peer questioning. Mei Ling expands her response after receiving a specific suggestion.",
          scores: { afl: 12, support: 10, challenge: 5, participation: 20 }
        },
        {
          id: "pl_econ_s3_01_e2_c",
          label: "Reteach the mechanism explicitly using a concrete Singapore example",
          elaboration: "You pause the class and say: 'I can see from your responses that many of us have the right idea but are missing the economic language. Let me show you the mechanism using a real example.' You use the 2023 Singapore cost-of-living squeeze and walk through willingness and ability to pay step by step.",
          theoryKey: "Vygotsky_ZPD_Bruner",
          consequence: "The class listens attentively — the Singapore example is immediately recognisable. Hafiz stays focused for the full 4-minute explanation, which is unusual. Kavitha takes detailed notes and underlines 'willingness to pay' three times. Mei Ling writes the mechanism in her own words. Jun Hao looks slightly bored but adds a note about income elasticity in the margin.",
          tradeoff: "The reteach is clear and contextually grounded, but it is teacher-led and does not require students to produce anything — participation remains passive.",
          studentReaction: "Hafiz stays on task for an unusually long stretch. Kavitha's notes are the most detailed they have been all lesson.",
          scores: { afl: 8, support: 18, challenge: 5, participation: 5 }
        },
        {
          id: "pl_econ_s3_01_e2_d",
          label: "Use tiered follow-up tasks based on the three response bands",
          elaboration: "Assign three tasks: Band 1 (minimal/blank) gets a sentence frame: 'A fall in income reduces willingness and ability to pay, so consumers demand ___ of luxury goods.' Band 2 (partial) must rewrite their response using the economic terms. Band 3 (full) must apply the same logic to an inferior good — a counter-intuitive extension.",
          theoryKey: "Tomlinson_Respectful_Tasks",
          consequence: "Hafiz uses the sentence frame and completes it correctly — his first full economic sentence. Kavitha is in Band 2 and rewrites her response with precision. Mei Ling is also in Band 2 and produces a stronger response. Jun Hao is in Band 3 and writes about Giffen goods — well beyond the syllabus but intellectually engaged.",
          tradeoff: "Differentiation is well-matched to need, but students in Band 1 may feel stigmatised, and distributing three tasks takes time.",
          studentReaction: "Hafiz completes the sentence frame with visible satisfaction. Jun Hao is absorbed in the extension task and does not notice the time.",
          scores: { afl: 10, support: 18, challenge: 15, participation: 8 }
        }
      ],
      episodeBridge: "With 10 minutes left, you want to close the lesson in a way that consolidates the mechanism and gives every student a chance to articulate their learning — not just Jun Hao."
    },
    {
      type: "feedback_closure",
      situation: "You have 10 minutes left. The class has been working on demand shifters for the full lesson. Jun Hao is confident and ready to move on. Kavitha has strong written work but has spoken only once. Hafiz has completed more than usual but is starting to fidget. Mei Ling has produced her best written work of the term but has not spoken unprompted. You want to close in a way that surfaces every student's voice — not just the usual volunteers.",
      evidence: "Exit data from the written task: 14 students can now explain the mechanism with economic language, up from 8 at the start. 10 still use everyday language. 6 have minimal responses.",
      choices: [
        {
          id: "pl_econ_s3_01_e3_a",
          label: "Use a structured whip-round: every student says one word that completes the sentence",
          elaboration: "You project: 'A rise in income increases demand because it raises consumers' ___ and ___ to pay.' You go around the room — every student must say one word or phrase to fill a blank. No opting out, but students can say 'pass' once.",
          theoryKey: "IRF_Chains",
          consequence: "The whip-round moves quickly. Most students say 'willingness' or 'ability.' Hafiz says 'willingness' clearly when his turn comes — he has been listening. Mei Ling says 'ability to pay' without hesitation. Kavitha adds 'so they demand more' unprompted, extending the sentence. Jun Hao is last and summarises the full mechanism. Every student has spoken.",
          tradeoff: "Every student has contributed verbally, but the format is highly constrained — students are completing a sentence, not constructing an explanation. Deeper understanding is not fully tested.",
          studentReaction: "Hafiz speaks clearly and on-topic for the first time this lesson. Mei Ling does not hesitate when her turn comes.",
          scores: { afl: 12, support: 8, challenge: 5, participation: 22 }
        },
        {
          id: "pl_econ_s3_01_e3_b",
          label: "3-2-1 exit card with a participation twist: students must include one thing a classmate said",
          elaboration: "Ask students to write: 3 things they learned, 2 things they can explain, 1 thing a classmate said that helped them understand. The third prompt requires students to have been listening to peers — it rewards participation and signals that peer contributions matter.",
          theoryKey: "Accountable_Talk",
          consequence: "Most students complete the 3-2-1. Kavitha writes that Hafiz's simple sentence ('less money so less buying') actually helped her understand the intuition before the formal language. Hafiz writes that Mei Ling's answer in the pair task was clearer than the textbook. Mei Ling writes that Jun Hao's explanation of the mechanism was the clearest she heard. Jun Hao writes that Kavitha's revision showed him what precision looks like.",
          tradeoff: "The exit card produces rich evidence and validates peer contributions, but it requires students to have been listening carefully — students who were disengaged may not have a genuine peer contribution to cite.",
          studentReaction: "Kavitha cites Hafiz's contribution — he looks surprised and pleased. The exit cards reveal a web of peer learning that was invisible during the lesson.",
          scores: { afl: 18, support: 10, challenge: 5, participation: 18 }
        },
        {
          id: "pl_econ_s3_01_e3_c",
          label: "Pose a challenge question and use cold-calling with think time",
          elaboration: "You say: 'Here is a harder question — and I am going to give everyone 60 seconds to think before I call on someone.' The question: 'If income rises but the good is an inferior good, what happens to demand? Why?' You then cold-call Kavitha.",
          theoryKey: "Tomlinson_Teaching_Up",
          consequence: "The 60-second think time is unusual — the class is visibly processing. Kavitha is called on and gives a hesitant but correct answer: 'Demand falls — because if you earn more, you switch to better goods.' Jun Hao adds the term 'inferior good' unprompted. Hafiz looks confused but writes down Kavitha's answer. Mei Ling has written a full answer in her notes but was not called on.",
          tradeoff: "Cold-calling with think time surfaces Kavitha's voice and challenges the class, but Hafiz is lost on the extension concept and Mei Ling's strong written answer goes unrecognised.",
          studentReaction: "Kavitha answers correctly when given time to think — a significant moment for her confidence. Hafiz copies the answer but does not understand it.",
          scores: { afl: 10, support: 5, challenge: 20, participation: 15 }
        },
        {
          id: "pl_econ_s3_01_e3_d",
          label: "Peer teach: pair a high-readiness student with a lower-readiness student for a 3-minute explanation task",
          elaboration: "Pair Jun Hao with Hafiz, Kavitha with Mei Ling. The higher-readiness student must explain the demand mechanism to their partner in their own words. The partner must ask at least one question. You circulate and listen.",
          theoryKey: "Vygotsky_ZPD_Bruner",
          consequence: "Jun Hao explains to Hafiz using a bubble tea analogy — Hafiz laughs and says 'Oh, like if I get more allowance I buy more?' Jun Hao confirms and extends. Kavitha explains to Mei Ling carefully and methodically — Mei Ling asks: 'But what if you already have enough money?' which leads to a discussion about saturation. Both pairs are animated.",
          tradeoff: "Peer teaching consolidates understanding for the explainer and provides accessible explanation for the listener, but Jun Hao does most of the talking and Hafiz's question is surface-level.",
          studentReaction: "Hafiz engages with Jun Hao's analogy and produces his clearest verbal explanation of the lesson. Mei Ling's question surprises Kavitha — it is more sophisticated than expected.",
          scores: { afl: 8, support: 18, challenge: 8, participation: 18 }
        }
      ],
      episodeBridge: "The bell rings. You collect the exit cards and note that today's lesson produced more written evidence than usual — but verbal participation is still dominated by a few students. You make a note to restructure tomorrow's lesson opening."
    }
  ]
};

// =============================================================================
// SCENARIO LIBRARY — Seed Scenario 3: sen_heavy
// =============================================================================

export const scenario_sen_math_s2_01 = {
  id: "sen_math_s2_01",
  bucket: "sen_heavy",
  subject: "Mathematics",
  topic: "Linear Equations — Solving with Variables on Both Sides",
  schoolLevel: "Lower Secondary (Sec 2 Normal Academic)",
  contextNote: "You are teaching 2NA3. Seven students have MOE learning support plans. The class has been reluctant to show working — they tend to guess and write only the final answer.",
  students: [
    {
      name: "Dinesh",
      readiness: "mid",
      motivation: "motivated",
      SEN: true,
      note: "Has dyslexia; reads slowly but understands when content is verbal or visual. Gets frustrated when asked to write long working."
    },
    {
      name: "Izzatul",
      readiness: "low",
      motivation: "compliant",
      SEN: true,
      note: "Has processing difficulty; needs extra time and concrete manipulatives. Tries hard but shuts down when pace is too fast."
    },
    {
      name: "Ivan",
      readiness: "high",
      motivation: "motivated",
      SEN: false,
      note: "Quick and accurate; bored during revision; benefits from peer-teaching roles."
    },
    {
      name: "Reyna",
      readiness: "low",
      motivation: "disengaged",
      SEN: false,
      note: "Not identified as SEN but struggles significantly; has low confidence after repeated failures in Primary school maths."
    }
  ],
  episodes: [
    {
      type: "cfu",
      situation: "You have just introduced the idea of moving variables to one side: '3x + 5 = x + 13.' You worked through one example on the board, narrating each step. You ask students to try the next question independently: '5x − 2 = 2x + 7.' Dinesh is staring at the board, not writing. Izzatul has written '5x − 2 = 2x + 7' and stopped. Ivan has solved it and is drawing in the margin. Reyna has written only the answer '3' — no working shown.",
      evidence: "After 3 minutes: 6 students have correct working shown, 9 have correct answers with no working, 10 have started but stalled at the step of moving the variable term, 5 have not started.",
      choices: [
        {
          id: "sen_math_s2_01_e1_a",
          label: "Use a colour-coded step card to make the variable-moving step visible",
          elaboration: "Distribute a laminated step card with each algebraic step in a different colour: Step 1 (blue) — collect variable terms on one side; Step 2 (green) — collect constants on the other; Step 3 (orange) — divide. Ask students to colour-code their working to match.",
          theoryKey: "Vygotsky_ZPD_Bruner",
          consequence: "Dinesh immediately picks up the card and begins colour-coding — the visual structure bypasses his reading difficulty. Izzatul uses the card to identify which step she is on and continues. Reyna looks at the card and rewrites her answer with working, matching the colours. Ivan uses it briefly and sets it aside — he does not need it but does not resist.",
          tradeoff: "The scaffold is highly effective for SEN students and reduces the cognitive load of tracking steps, but it may become a crutch if not gradually withdrawn.",
          studentReaction: "Dinesh works through the problem without asking for help — the first time this topic. Izzatul completes Step 1 correctly and pauses at Step 2, looking at the card.",
          scores: { afl: 8, support: 22, challenge: 3, participation: 8 }
        },
        {
          id: "sen_math_s2_01_e1_b",
          label: "Use a Two-Step MCQ to diagnose where students are stalling",
          elaboration: "Project a question: 'In the equation 5x − 2 = 2x + 7, what is the correct first step? (A) Divide both sides by 5. (B) Subtract 2x from both sides. (C) Add 2 to both sides.' Students choose AND write one sentence explaining why.",
          theoryKey: "Two_Step_MCQ",
          consequence: "Most students engage with the MCQ. Results reveal that 14 students chose B correctly but 8 chose C — they are treating the constant as the priority. Dinesh circles B but writes nothing — the writing requirement is a barrier. Izzatul circles C, which reveals her misconception. Ivan circles B and writes a full explanation. Reyna circles B but writes 'I think so.'",
          tradeoff: "The MCQ gives you precise diagnostic data about where students are stalling, but the written justification requirement disadvantages Dinesh and may not reflect his actual understanding.",
          studentReaction: "Izzatul's choice of C reveals a specific misconception you can now address directly. Dinesh's blank justification does not mean he does not understand — you make a note to ask him verbally.",
          scores: { afl: 22, support: 5, challenge: 5, participation: 8 }
        },
        {
          id: "sen_math_s2_01_e1_c",
          label: "Ask Ivan to narrate his working aloud while you write it on the board",
          elaboration: "You say: 'Ivan, can you talk me through your steps while I write exactly what you say?' You scribe Ivan's verbal explanation on the board, pausing to ask the class: 'Does everyone agree with this step?' This makes the thinking process visible.",
          theoryKey: "Accountable_Talk",
          consequence: "Ivan narrates clearly and confidently. The class follows along — Dinesh watches the board intently and begins copying the steps. Izzatul follows until Step 2, then loses track when Ivan uses the phrase 'transpose the term.' Reyna watches but does not write. The board now has a worked example in student language.",
          tradeoff: "The narration makes thinking visible and uses student language, but Izzatul was lost at a key step and Reyna did not engage with the writing. Ivan's explanation assumed more prior knowledge than some students have.",
          studentReaction: "Dinesh copies Ivan's steps and attempts the next question independently. Izzatul looks confused at the 'transpose' step and stops writing.",
          scores: { afl: 10, support: 8, challenge: 8, participation: 18 }
        },
        {
          id: "sen_math_s2_01_e1_d",
          label: "Use a balance-scale manipulative to make the equation concrete",
          elaboration: "Draw a large balance scale on the board. Place algebra tiles (or drawn representations) on each side. Physically 'remove' 2x tiles from both sides to show why the variable moves. Ask students to draw their own balance for the equation.",
          theoryKey: "Tomlinson_Respectful_Tasks",
          consequence: "Izzatul immediately engages with the visual — she draws the balance and removes tiles carefully. Dinesh draws quickly and labels each step. Reyna draws the balance but is unsure which tiles to remove first — she raises her hand for the first time this lesson. Ivan draws it in 30 seconds and adds a note: 'This is like a seesaw — both sides must stay equal.'",
          tradeoff: "The concrete representation is highly accessible for SEN students and makes the abstract concept tangible, but it takes longer than symbolic working and may not transfer directly to exam format.",
          studentReaction: "Reyna raises her hand for the first time — she has a question about which tiles to move. Izzatul completes the drawing and looks up with a small smile.",
          scores: { afl: 8, support: 20, challenge: 5, participation: 12 }
        }
      ],
      episodeBridge: "You have a clearer picture of where students are stalling — but the deeper issue is that many students are writing only answers, not working. You need to address this before the class test next week."
    },
    {
      type: "assessment_response",
      situation: "You have collected the class's attempts at three practice questions. Reviewing them quickly: Ivan has full, correct working for all three. Dinesh has correct answers for two questions but minimal working — he crossed out several attempts. Izzatul has working for Question 1 only; Questions 2 and 3 are blank. Reyna has written answers for all three — two are correct — but no working at all. Several other students have similar patterns: correct answers, no working.",
      evidence: "Of 30 students: 7 have full working and correct answers. 11 have correct answers with no or minimal working. 8 have partial working with errors at the variable-collection step. 4 are blank.",
      choices: [
        {
          id: "sen_math_s2_01_e2_a",
          label: "Address the 'answer only' pattern explicitly — explain why working matters",
          elaboration: "Pause the class and say: 'I can see many of you have the right answer — that is great. But I want to show you why the working matters, not just for marks, but for catching your own errors.' Project Reyna's work (anonymised) alongside a worked solution and show where a small error would be invisible without working.",
          theoryKey: "Hattie_Timperley_Feedback",
          consequence: "The class listens carefully — the explanation resonates because it is framed around catching errors, not following rules. Reyna looks at her own paper and begins adding working. Dinesh adds step labels to his crossed-out attempts. Izzatul watches but does not add to her blank questions — she still does not know how to start Questions 2 and 3. Ivan nods and adds a check step to his working.",
          tradeoff: "The explanation is motivating and reframes working as a tool rather than a requirement, but Izzatul's blank questions remain unaddressed — she needs more than motivation, she needs a starting scaffold.",
          studentReaction: "Reyna adds working to her correct answers without being asked. Izzatul looks at her blank questions and then at you — she needs help starting, not just encouragement.",
          scores: { afl: 18, support: 8, challenge: 5, participation: 10 }
        },
        {
          id: "sen_math_s2_01_e2_b",
          label: "Use flexible grouping: pair students to reconstruct working from answers",
          elaboration: "Pair students strategically: Ivan with Izzatul, Dinesh with Reyna. Task: 'You have the answer. Now reconstruct the working — write every step that must have happened to get there.' This reverses the usual direction and makes working feel like detective work.",
          theoryKey: "Tomlinson_Flex_Grouping",
          consequence: "Ivan guides Izzatul through Question 2 step by step — she writes each step as he explains. Dinesh and Reyna work together; Reyna's intuitive answer-finding helps Dinesh check his steps, and Dinesh's partial working helps Reyna see the structure. Both pairs produce working for at least two questions.",
          tradeoff: "The reverse-engineering task is engaging and produces working, but Ivan is doing most of the cognitive work for Izzatul — she may not be able to replicate it independently.",
          studentReaction: "Izzatul completes Question 2 working with Ivan's support — she writes each step herself. Reyna and Dinesh discover they made the same error on Question 3 and correct it together.",
          scores: { afl: 10, support: 18, challenge: 8, participation: 15 }
        },
        {
          id: "sen_math_s2_01_e2_c",
          label: "Provide a partially completed worked example for students who are blank",
          elaboration: "For students with blank or minimal responses, distribute a half-completed worked example for Question 2: the first two steps are filled in, and students must complete Steps 3 and 4. For students with full working, give an extension: a three-variable equation.",
          theoryKey: "Tomlinson_Respectful_Tasks",
          consequence: "Izzatul receives the half-completed example and immediately continues from Step 3 — she completes the question for the first time. Dinesh uses it to check his own working and finds an error in Step 2. Reyna uses it as a model and rewrites her answer with working. Ivan receives the extension and works on it quietly.",
          tradeoff: "The scaffold is precisely targeted and allows Izzatul to experience success, but students who receive the easier version may feel singled out.",
          studentReaction: "Izzatul completes a full worked solution for the first time this topic. Ivan is absorbed in the extension and does not notice the time.",
          scores: { afl: 10, support: 22, challenge: 12, participation: 5 }
        },
        {
          id: "sen_math_s2_01_e2_d",
          label: "Use AQS peer feedback on the working shown",
          elaboration: "Ask students to exchange papers with a partner. Using the success criteria (Step 1: collect variables; Step 2: collect constants; Step 3: solve), each partner gives one Affirm, one Question, one Suggest about the working shown.",
          theoryKey: "AQS_Feedback",
          consequence: "Pairs engage with the feedback task. Dinesh's partner affirms his correct answer and asks: 'Can you show me how you got from Step 1 to Step 2?' — Dinesh explains verbally and then writes it down. Reyna's partner suggests: 'Add the steps between your answer and the equation.' Reyna adds working. Izzatul's partner is unsure how to give feedback on blank questions — you step in and give Izzatul verbal AQS feedback directly.",
          tradeoff: "Peer feedback is dialogic and produces working, but Izzatul's blank responses make the peer task difficult — she needs teacher support, not peer feedback, at this stage.",
          studentReaction: "Dinesh writes down his verbal explanation after his partner asks — the act of explaining prompts him to record his thinking. Reyna adds working after a specific peer suggestion.",
          scores: { afl: 12, support: 12, challenge: 5, participation: 18 }
        }
      ],
      episodeBridge: "With 8 minutes left, you want to close the lesson in a way that consolidates the step-by-step process and gives every student — including those with SEN — a sense of progress."
    },
    {
      type: "feedback_closure",
      situation: "You have 8 minutes left. The class has worked through three practice questions. Ivan has completed all three with full working and the extension. Dinesh has two questions with working — he is tired but satisfied. Izzatul has completed Question 1 and Question 2 with scaffolding — Question 3 is blank. Reyna has all three answers with working added after feedback. You want to close in a way that every student can access and that builds confidence for next week's test.",
      evidence: "End-of-lesson scan: 12 students now have full working for at least 2 questions, up from 7 at the start. 10 have partial working. 8 still have answer-only responses.",
      choices: [
        {
          id: "sen_math_s2_01_e3_a",
          label: "Use a 'Steps I Can Do' self-assessment checklist",
          elaboration: "Distribute a checklist: (1) I can collect variable terms on one side. (2) I can collect constant terms on the other side. (3) I can solve for x. (4) I can check my answer by substituting back. Students tick what they can do and circle what they need more practice on.",
          theoryKey: "AfL_Triangle",
          consequence: "Students complete the checklist quickly. Dinesh ticks Steps 1–3 and circles Step 4 — he has never tried substitution checking. Izzatul ticks Step 1 and circles Steps 2 and 3. Reyna ticks all four — she is more confident than her earlier work suggested. Ivan ticks all four and adds a fifth: 'I can explain it to someone else.' You now have a clear picture of where each student is.",
          tradeoff: "The checklist is fast, inclusive, and produces actionable data, but self-assessment accuracy varies — Reyna may be over-confident and Izzatul may be under-confident.",
          studentReaction: "Izzatul circles two steps honestly — she is not pretending to understand. Reyna ticks all four with visible confidence, a significant shift from her earlier disengagement.",
          scores: { afl: 22, support: 10, challenge: 5, participation: 8 }
        },
        {
          id: "sen_math_s2_01_e3_b",
          label: "Ask Ivan to teach the class a 'shortcut check' — substitution verification",
          elaboration: "You say: 'Ivan has been doing something extra that I want to share with everyone. Ivan, can you show the class how to check your answer?' Ivan demonstrates substituting x = 3 back into the original equation. You frame it as a 'superpower' that anyone can use.",
          theoryKey: "SDT_Deci_Ryan",
          consequence: "Ivan demonstrates clearly and with obvious pride. The class watches attentively — the 'superpower' framing makes it feel like a bonus skill, not extra work. Dinesh immediately tries it on his Question 1 answer and confirms it is correct — he grins. Izzatul watches but does not try it yet. Reyna tries it and discovers her Question 3 answer is wrong — she corrects it in the last 2 minutes.",
          tradeoff: "Peer teaching elevates Ivan's status and introduces a valuable self-checking skill, but Izzatul does not have time to try it and the lesson ends before she can consolidate.",
          studentReaction: "Dinesh uses the substitution check independently and confirms his answer — a moment of genuine mathematical confidence. Reyna catches her own error using the new technique.",
          scores: { afl: 15, support: 10, challenge: 12, participation: 18 }
        },
        {
          id: "sen_math_s2_01_e3_c",
          label: "Give verbal feedback to Izzatul and Dinesh while the class does a silent review",
          elaboration: "Ask the class to silently review their three questions and add any missing working. While they do this, you crouch by Izzatul's desk and give her verbal feedback on Question 3 — walking her through Step 1 orally. Then move to Dinesh and affirm his progress.",
          theoryKey: "Vygotsky_ZPD_Bruner",
          consequence: "Izzatul listens carefully to your verbal explanation and writes Step 1 of Question 3 — she has never started this question before. Dinesh receives your affirmation and adds Step 4 (substitution check) to his working. The rest of the class reviews quietly — most add missing steps. Ivan uses the time to write a generalisation: 'For any equation ax + b = cx + d, collect x terms first.'",
          tradeoff: "Individual verbal feedback is highly effective for Izzatul and Dinesh, but you cannot reach all students who need support in 8 minutes — the silent review is productive but unsupervised.",
          studentReaction: "Izzatul starts Question 3 for the first time after verbal scaffolding. Dinesh adds a check step unprompted after your affirmation.",
          scores: { afl: 12, support: 22, challenge: 8, participation: 8 }
        },
        {
          id: "sen_math_s2_01_e3_d",
          label: "Use a 3-2-1 exit card with a visual option for SEN students",
          elaboration: "Ask students to complete: 3 steps in solving a variables-on-both-sides equation, 2 things they feel confident about, 1 thing they still find tricky. Provide a visual version for students who need it: a blank 3-step flowchart to fill in instead of writing sentences.",
          theoryKey: "Tomlinson_Respectful_Tasks",
          consequence: "Dinesh uses the flowchart and fills in all three steps clearly — his first complete written summary of the process. Izzatul uses the flowchart and fills in Steps 1 and 2, leaving Step 3 blank — honest and informative. Reyna writes sentences and lists 'showing working' as her confident skill. Ivan writes a paragraph and adds: 'I still find it tricky to explain why we do each step — I just know it works.'",
          tradeoff: "The dual-format exit card is inclusive and produces rich evidence, but preparing two versions takes planning time and some students may choose the flowchart to avoid writing rather than because they need it.",
          studentReaction: "Dinesh completes the flowchart with visible satisfaction — it is the most he has written this lesson. Ivan's honest reflection surprises you — he is more metacognitively aware than his performance suggests.",
          scores: { afl: 18, support: 18, challenge: 5, participation: 8 }
        }
      ],
      episodeBridge: "The bell rings. You collect the exit cards and note that Izzatul has made progress on two questions — more than any previous lesson on this topic. You make a note to check in with her at the start of tomorrow's lesson."
    }
  ]
};
