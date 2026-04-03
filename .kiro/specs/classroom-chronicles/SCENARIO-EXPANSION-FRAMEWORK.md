# Scenario Expansion Framework

## Purpose
This framework ensures all 6 scenarios (S1-S6) have consistent depth, realism, and theory-grounding. Use this as a checklist when expanding any scenario from basic structure to full implementation.

---

## Target Metrics (for consistency)

### Length targets per section:
- **contextNote**: 2-3 sentences (~50-80 words)
- **students array**: 4 focal students with specific behavioral notes
- **ep1.situation**: 1 detailed paragraph (~120-150 words)
- **ep1.evidence**: 2-3 sentences summarizing the gap pattern
- **ep1 choice elaboration**: 3-5 sentences (~80-120 words each)
- **ep1 choice tradeoff**: 2-3 sentences (~40-60 words)
- **ep2 consequence**: 1 detailed paragraph (~150-180 words)
- **ep2 choice elaboration**: 3-5 sentences (~80-120 words each)
- **ep2 choice tradeoff**: 2-3 sentences (~40-60 words)
- **ep3 outcome**: 1 detailed paragraph (~180-220 words)
- **ep3 tradeoff**: 2-3 sentences (~50-70 words)
- **ep3 reflection**: 3 concise questions (~60-80 words total)

---

## Phase 1: Context & Setup

### 1.1 contextNote
**Goal**: Set the scene with specific classroom details

**Include**:
- Level and class size (e.g., "Sec 3 Express Math, 30 students")
- What you just taught (specific example with notation)
- Current task students are attempting
- Time elapsed and current classroom state

**Example**:
```
Sec 3 Express Math, 30 students. You demonstrated completing the square with 
x² + 8x + 7 = 0 → (x+4)² = 9, showing the halving step explicitly on the board. 
Students are now 8 minutes into their first practice question: x² + 6x + 5 = 0. 
The room is a mix of focused work, hesitation, and stalling.
```

### 1.2 students array
**Goal**: Create 4 distinct focal students representing the readiness/profile spread

**Structure**: 4 students with roles
- 1 fast/secure student
- 2 middle students (different error patterns or hesitations)
- 1 stalled/struggling student

**Include for each**:
- Specific work state (what's on their page)
- Behavioral indicators (eraser marks, pen hovering, glancing at others)
- Exact error or sticking point

**Example**:
```javascript
students: [
  { name: 'Rajan', role: 'fast', 
    note: 'Finished correctly in 3 minutes. Now on question 2, working independently.' },
  { name: 'Nur Atiqah', role: 'middle', 
    note: 'Has written x² + 6x = -5, then (x + 6)² = ... Stuck. Eraser marks visible.' },
  { name: 'Wei Jie', role: 'middle', 
    note: 'Copied the first line correctly. Pen hovering. Glancing at Rajan\'s work.' },
  { name: 'Siti', role: 'stalled', 
    note: 'Equation copied. Nothing else. Staring at the board, not writing.' }
]
```

---

## Phase 2: Episode 1 (The Diagnostic Moment)

### 2.1 ep1.situation
**Goal**: Paint a vivid picture of the readiness gap as you circulate

**Include**:
- Time marker ("20 minutes into the lesson")
- Specific observations of each focal student's work
- Physical/behavioral details (body language, page state, interactions)
- Class-wide scan with numbers (e.g., "10 progressing, 12 with error, 8 stalled")
- Time remaining

**Structure**:
1. Opening time marker
2. Focal student 1 (fast) - what they've done
3. Focal student 2 (middle) - specific error with evidence
4. Focal student 3 (middle) - different pattern
5. Focal student 4 (stalled) - what's missing
6. Class-wide scan with distribution
7. Time remaining

**Length**: ~120-150 words

### 2.2 ep1.evidence
**Goal**: Summarize the pattern you've identified

**Include**:
- The three-tier structure (progressing / error pattern / stalled)
- The specific misconception if there is one
- What the stalled group is NOT doing

**Length**: 2-3 sentences

### 2.3 ep1 choices (3 choices: A, B, C)

#### For each choice:

**label**: Short, action-oriented (5-8 words)

**elaboration**: Detailed teacher move
- What you will say/do exactly
- Specific questions or prompts you'll use
- What students will do in response
- How you'll use the information gathered

**Include**:
- Exact wording of questions/prompts where relevant
- Specific examples (e.g., MCQ options, scaffold card content)
- Student actions (hold up whiteboards, write in pairs, etc.)
- Your follow-up move

**Length**: 80-120 words (3-5 sentences)

**theoryKey**: Match to TheoryBank entry

**tradeoff**: Honest assessment of costs and benefits
- What you gain (be specific about evidence or access)
- What you lose or who you miss
- Time cost if relevant

**Length**: 40-60 words (2-3 sentences)

---

## Phase 3: Episode 2 (The Response)

### 3.1 ep2 consequence (for each Ep1 branch: A, B, C)
**Goal**: Show differential student responses to your Ep1 choice

**Include**:
- Immediate results with specific numbers where relevant
- Each focal student's response (what they did, said, or wrote)
- Evidence of understanding vs. compliance vs. confusion
- Patterns across the class (how many got what)
- New information that emerged (questions, errors, insights)
- Time remaining

**Structure**:
1. Overall pattern/results
2. Focal student responses (all 4, with specific details)
3. Class-wide pattern
4. Time remaining

**Length**: ~150-180 words

### 3.2 ep2 choices (2 choices per branch: 1, 2)

**label**: Short, action-oriented (5-8 words)

**elaboration**: Your next move based on the Ep1 consequence
- Build logically from what you just learned
- Show how you're using the evidence from Ep1
- Be specific about the teacher move

**Include**:
- Exact structure or protocol (IRF chain, AQS feedback, etc.)
- What students will do
- How you'll monitor or follow up

**Length**: 80-120 words (3-5 sentences)

**theoryKey**: Match to TheoryBank entry

**tradeoff**: Honest assessment with theory connection
- Explicitly name the theory principle at work
- What this move serves well
- What/who it misses or risks
- Quality/control trade-offs

**Length**: 40-60 words (2-3 sentences)

---

## Phase 4: Episode 3 (The Outcome)

### 4.1 ep3 outcome (for each path: A1, A2, B1, B2, C1, C2)
**Goal**: Show honest, differentiated results for all focal students

**Include**:
- What you did (brief, 1-2 sentences)
- Each focal student's response with specific evidence
  - What they wrote, said, or produced
  - Body language or engagement indicators
  - Whether they succeeded, partially succeeded, or struggled
- Class-wide results with numbers
- Who was served well and who was missed

**Structure**:
1. Your action (1-2 sentences)
2. Focal student 1 response (specific evidence)
3. Focal student 2 response (specific evidence)
4. Focal student 3 response (specific evidence)
5. Focal student 4 response (specific evidence)
6. Class-wide results
7. Honest assessment of who was served/missed

**Length**: ~180-220 words

**Key principle**: Be honest about trade-offs. Show that pedagogical choices serve some students well and miss others.

### 4.2 ep3 tradeoff
**Goal**: Summarize who benefited and who didn't, with theory connection

**Include**:
- Explicit theory reference (name the principle)
- Who was served well (middle group, top, bottom)
- Who was missed or under-served
- The fundamental tension this path revealed

**Length**: 50-70 words (2-3 sentences)

### 4.3 ep3 reflection
**Goal**: Prompt user reflection without repeating their choices

**Structure**: Exactly 3 questions
1. **Why question**: "Why did you choose [this path]? What were you prioritizing?"
2. **Satisfaction question**: "Are you satisfied with the outcome? [Specific results]. What does this tell you about [pedagogical principle]?"
3. **Forward question**: "What would you do differently?" or "How would you [design/build/ensure] X?"

**Length**: 60-80 words total

**Tone**: Direct, non-judgmental, focused on learning

---

## Phase 5: Quality Checks

### 5.1 Realism Check
- [ ] Specific student work samples (what's written on the page)
- [ ] Behavioral indicators (body language, hesitation, copying)
- [ ] Realistic time constraints (18 mins remaining, etc.)
- [ ] Honest about who succeeds and who doesn't
- [ ] Classroom numbers add up (30 students, 10+12+8 distribution)

### 5.2 Theory Grounding Check
- [ ] Each choice has a clear theory anchor
- [ ] Theory is explained in context (not just named)
- [ ] Tradeoffs reference theory principles
- [ ] Outcomes show theory in action (what works, what doesn't)

### 5.3 Differentiation Check
- [ ] All 4 focal students have distinct trajectories
- [ ] Fast student (Rajan-type) is challenged or bored appropriately
- [ ] Middle students (Nur/Wei Jie-types) show different patterns
- [ ] Stalled student (Siti-type) shows dependence or access issues
- [ ] Outcomes honestly show who was served and who wasn't

### 5.4 Consistency Check
- [ ] Length targets met for each section
- [ ] 3 Ep1 choices, 2 Ep2 choices per branch, 6 Ep3 outcomes
- [ ] All paths (A1, A2, B1, B2, C1, C2) are complete
- [ ] Reflection format: 3 questions, no repetition of choices
- [ ] Time remaining decreases logically (20→18→16 mins)

### 5.5 Pedagogical Honesty Check
- [ ] No "perfect" outcomes where everyone succeeds
- [ ] Trade-offs are real (efficiency vs. equity, evidence vs. access)
- [ ] Some students are always under-served or missed
- [ ] Peer feedback quality varies (not always effective)
- [ ] Scaffolds can lead to copying, not just understanding

---

## Phase 6: Theory Bank Alignment

### 6.1 Verify Theory Keys
For each scenario, ensure theory keys used are:
- [ ] Defined in TheoryBank
- [ ] Appropriate for the pedagogical move
- [ ] Cited correctly (APA format in TheoryBank)
- [ ] Aligned with course content (QED52B)

### 6.2 Common Theory Keys by Move Type

**Assessment for Learning**:
- `AfL_Triangle` - evidence of where learner is, where going, how to close gap
- `Two_Step_MCQ` - answer + reasoning diagnostic

**Differentiation**:
- `Tomlinson_Respectful_Tasks` - tiered scaffolds, all require thinking
- `Tomlinson_Flex_Grouping` - readiness-based pairing
- `Tomlinson_Teaching_Up` - high challenge for all
- `Vygotsky_ZPD_Bruner` - scaffolding within zone of proximal development

**Feedback**:
- `Hattie_Timperley_Feedback` - task/process/self-regulation levels
- `AQS_Feedback` - Affirm, Question, Suggest structure

**Participation**:
- `Accountable_Talk` - claim, evidence, reasoning stems
- `IRF_Chains` - Initiation, Response, Feedback/Follow-up

**Reflection**:
- `Jay_Johnson_Reflection` - Describe, Compare, Critical analysis

---

## Application Workflow

### When expanding a scenario:

1. **Read the basic scenario structure** (if it exists)
2. **Identify the profile tension** (what makes this class challenging?)
3. **Work through phases 1-4 in order**:
   - Phase 1: Context & Setup
   - Phase 2: Episode 1 (diagnostic moment)
   - Phase 3: Episode 2 (response, 3 branches)
   - Phase 4: Episode 3 (outcomes, 6 paths)
4. **Run Phase 5 quality checks**
5. **Verify Phase 6 theory alignment**
6. **Compare length to S1** (use S1 as the reference standard)

### Estimated time per scenario:
- Phase 1-2: 30-45 minutes
- Phase 3: 45-60 minutes (3 branches)
- Phase 4: 60-90 minutes (6 paths)
- Phase 5-6: 15-30 minutes (checks)
- **Total**: 2.5-3.5 hours per scenario

---

## Reference: S1 as Template

Use the enhanced S1 (Upper Sec / Mixed Readiness / Completing the Square) as the reference template for:
- Length targets
- Level of detail
- Theory grounding depth
- Realism and specificity
- Honest trade-off framing
- Reflection question structure

All scenarios should match S1's depth and structure.

---

## Notes

- **Consistency is key**: All 6 scenarios should feel like they come from the same game
- **Realism over idealism**: Show what actually happens, not what we wish would happen
- **Theory in action**: Don't just name theories, show them working (and sometimes not working)
- **Respect the user**: Don't repeat their choices back to them in reflection
- **Honest pedagogy**: Every choice serves some students and misses others

---

---

## Adding New Scenarios

All 18 original scenarios are fully migrated. To add a new scenario:

1. **Create a spec `.md` file** in `.kiro/specs/classroom-chronicles/` following the existing naming convention (e.g. `S19-Level-Profile-Topic.md`). Use the condensed spec format from existing files — the key fields are:
   - Scenario Profile (level, class profile, topic, core tension)
   - Episode 1 setup + 3 choices (A, B, C) with trade-offs
   - Episode 2 consequences + 2 sub-choices per branch (A1/A2, B1/B2, C1/C2)
   - Episode 3 sample outcome + reflection

2. **Hand the `.md` to Kiro** — Kiro will expand it into a fully detailed `src/data/scenarios/sN.json` using this framework.

3. **Wire it up in `src/data/scenarios/index.js`**:
   - Add `fetch('./src/data/scenarios/sN.json')` to the `Promise.all` array
   - Add `const sN = await sNResponse.json()` and `sN._source = 'json'`
   - Add `sN` to the exported `scenarios` array
   - Update the migration status comment at the top

4. **No `scenarios.js` needed** — that file has been archived as `scenarios.js.bak`. All scenarios live in individual JSON files.

---

## Version History
- v1.0 (2026-04-03): Initial framework based on S1 expansion
- v1.1 (2026-04-03): All 18 scenarios migrated to JSON; scenarios.js archived; new scenario workflow documented
