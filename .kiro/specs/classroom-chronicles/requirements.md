# Requirements Document

## Introduction

"The Classroom Chronicles" is a scenario-based pedagogical decision game for student teachers in Singapore. The player builds a Class Profile (or randomises one), plays through a 3-episode classroom story, makes pedagogical decisions at each episode, and receives a Pedagogical Response Profile plus an auto-generated Reflection Entry at the end.

The game follows three phases: Diagnose → Redesign → Reflect. It is not a quiz — every decision is pedagogically viable. The purpose is to surface the teacher's reasoning tendencies and generate structured reflection output aligned with Singapore Teaching Practice (STP) and QED52B.

## Glossary

- **Game**: The Classroom Chronicles application as a whole.
- **Player**: A student teacher using the Game.
- **Class_Profile**: The set of 8 parameters the Player configures before gameplay begins.
- **Profile_Bucket**: A derived category computed from the Class_Profile that drives scenario selection.
- **Scenario**: A single classroom situation presented to the Player during an Episode.
- **Episode**: One of three sequential gameplay units (Episode 1, 2, 3), each containing a Scenario and a Decision Point.
- **Decision_Point**: A moment within an Episode where the Player selects a pedagogical response from a set of options.
- **Decision_Option**: One selectable pedagogical response at a Decision_Point.
- **Pedagogical_Response_Profile**: The summary output generated after all three Episodes are completed, describing the Player's reasoning tendencies.
- **Reflection_Entry**: A structured written reflection auto-generated at the end of the Game, aligned to STP/QED52B frameworks.
- **Scenario_Library**: The standalone, extensible data structure containing all Scenarios, keyed by Profile_Bucket.
- **Readiness_Distribution**: The Class_Profile parameter describing the spread of academic readiness across the class.
- **Motivation_Profile**: The Class_Profile parameter describing the engagement level of the class.
- **SEN**: Special Educational Needs — the proportion of students with identified learning needs.
- **SES**: Socio-Economic Status — the economic background distribution of the class.
- **DI**: Differentiated Instruction — adapting teaching to meet varied learner needs.
- **STP**: Singapore Teaching Practice framework.
- **EARS**: Easy Approach to Requirements Syntax — the pattern used to write these requirements.

---

## Requirements

### Requirement 1: Class Profile Builder

**User Story:** As a student teacher, I want to configure a Class Profile before gameplay, so that the scenarios I encounter reflect a realistic Singapore classroom context.

#### Acceptance Criteria

1. THE Game SHALL present the Player with 8 configurable parameters: School Level, Class Size, Class Academic Stream, Ethnic & Cultural Composition, Readiness Distribution, Motivation & Engagement Profile, SEN, and SES Profile.
2. THE Game SHALL provide the following options for School Level: "Lower Secondary (Sec 1–2)", "Upper Secondary (Sec 3–4 / 3–5 Normal)", "Junior College (JC1–JC2)".
3. THE Game SHALL provide the following options for Class Size: "Small (20–25)", "Medium (26–32)", "Large (33–40)".
4. THE Game SHALL provide the following options for Class Academic Stream: "Express / IP", "Normal Academic (NA)", "Normal Technical (NT)", "Mixed".
5. THE Game SHALL provide the following options for Ethnic & Cultural Composition: "Majority Chinese, some Malay and Indian", "Balanced CMIO mix", "Majority Malay", "High proportion of international students", "Diverse with new arrivals".
6. THE Game SHALL provide the following options for Readiness Distribution: "Mostly low (60%+ below expected readiness)", "Low-skewed mixed (40% low, 40% mid, 20% high)", "Evenly spread (roughly equal thirds)", "High-skewed mixed (20% low, 40% mid, 40% high)", "Mostly high (60%+ at or above expected readiness)".
7. THE Game SHALL provide the following options for Motivation & Engagement Profile: "Largely disengaged", "Majority low, some pockets of keenness", "Mixed and volatile", "Generally willing but surface-level", "Mostly motivated, some outliers".
8. THE Game SHALL provide the following options for SEN: "None identified", "Low incidence (~10%)", "Moderate (~20%)", "High (~30%)", "Complex (~35%+)".
9. THE Game SHALL provide the following options for SES Profile: "Mostly middle-income", "Mixed, middle-heavy", "Mixed, lower-skewed", "Largely lower-income", "Wide range".
10. WHEN the Player selects or changes any parameter, THE Game SHALL update the live class card display immediately without requiring a page reload.
11. THE Game SHALL display Readiness Distribution as a 3-bar proportion indicator (low / mid / high) on the class card.
12. THE Game SHALL display Motivation & Engagement Profile as a proportion bar with red, amber, and green segments on the class card.
13. THE Game SHALL display SES Profile as a proportion bar on the class card.
14. THE Game SHALL provide a "Randomise" control that selects a random valid option for each unset parameter.
15. THE Game SHALL provide a "Randomise All" control that replaces all current parameter selections with randomly chosen valid options.
16. WHEN all 8 parameters have been selected, THE Game SHALL enable the control that starts gameplay.
17. IF the Player attempts to start gameplay before all 8 parameters are selected, THEN THE Game SHALL indicate which parameters remain unset.

---

### Requirement 2: Profile Bucket Derivation

**User Story:** As a student teacher, I want the game to derive a meaningful class archetype from my profile, so that the scenarios I encounter are contextually appropriate.

#### Acceptance Criteria

1. WHEN all 8 parameters are selected, THE Game SHALL derive exactly one Profile_Bucket from the Class_Profile using the following priority rules in order:
   - IF Readiness Distribution is "Mostly low" OR "Low-skewed mixed", THEN Profile_Bucket = "readiness_gap"
   - ELSE IF Motivation Profile is "Largely disengaged" OR "Majority low, some pockets of keenness", THEN Profile_Bucket = "participation_low"
   - ELSE IF SEN is "Moderate (~20%)" OR "High (~30%)" OR "Complex (~35%+)", THEN Profile_Bucket = "sen_heavy"
   - ELSE IF Readiness Distribution is "Mostly high" OR "High-skewed mixed", THEN Profile_Bucket = "challenge_needed"
   - ELSE Profile_Bucket = "balanced_mixed"
2. THE Game SHALL use the derived Profile_Bucket to select Scenarios from the Scenario_Library for all three Episodes.
3. THE Game SHALL display the derived Profile_Bucket label on the class card before gameplay begins.

---

### Requirement 3: Scenario Library Architecture

**User Story:** As a developer, I want the Scenario Library to be a standalone, extensible data structure, so that scenarios can be added, updated, or removed without changing any game logic.

#### Acceptance Criteria

1. THE Scenario_Library SHALL be implemented as a standalone JavaScript object (or JSON file) that is imported by the game logic, with no scenario content embedded in game logic code.
2. THE Scenario_Library SHALL be keyed at the top level by Profile_Bucket identifier, with each bucket containing an array of Scenario objects.
3. WHEN a Profile_Bucket is selected, THE Game SHALL load Scenarios exclusively from the corresponding bucket array in the Scenario_Library.
4. THE Scenario_Library SHALL support at minimum the five Profile_Buckets: "readiness_gap", "participation_low", "sen_heavy", "challenge_needed", "balanced_mixed".
5. THE Scenario_Library SHALL contain at least 3 Scenario objects per Profile_Bucket to support Episode selection variety.
6. WHEN a developer adds, updates, or removes a Scenario object in the Scenario_Library, THE Game SHALL reflect the change without requiring modification to any game logic file.

---

### Requirement 4: Scenario Schema

**User Story:** As a developer, I want each Scenario to follow a consistent schema, so that the game can render and evaluate all scenarios uniformly.

#### Acceptance Criteria

1. THE Scenario_Library SHALL require each Scenario object to include: a unique identifier, a Profile_Bucket reference, an Episode phase label (diagnose / redesign / reflect), a narrative text describing the classroom situation, and an array of Decision_Options.
2. THE Scenario_Library SHALL require each Decision_Option to include: a unique identifier, display text, a pedagogical tendency tag, and a feedback string shown after selection.
3. THE Scenario_Library SHALL require each Scenario to contain between 3 and 5 Decision_Options.
4. THE Game SHALL render all Scenario fields using only data from the Scenario object, with no hardcoded scenario content in rendering logic.

---

### Requirement 5: Three-Episode Gameplay Loop

**User Story:** As a student teacher, I want to play through three sequential classroom episodes, so that I experience a coherent pedagogical narrative arc.

#### Acceptance Criteria

1. THE Game SHALL present exactly three Episodes in sequence: Episode 1 (Diagnose), Episode 2 (Redesign), Episode 3 (Reflect).
2. WHEN an Episode begins, THE Game SHALL display the Scenario narrative and all Decision_Options for that Episode.
3. THE Game SHALL select one Scenario per Episode from the Scenario_Library bucket matching the Player's Profile_Bucket.
4. WHEN the Player selects a Decision_Option, THE Game SHALL record the selection and display the feedback string for that option.
5. WHEN the Player confirms a Decision_Option selection, THE Game SHALL advance to the next Episode.
6. IF the Player is on Episode 3 and confirms a selection, THEN THE Game SHALL proceed to the Results phase.
7. THE Game SHALL prevent the Player from advancing to the next Episode until a Decision_Option has been selected and confirmed.
8. THE Game SHALL display the current Episode number and phase label (Diagnose / Redesign / Reflect) throughout each Episode.

---

### Requirement 6: Pedagogical Response Profile

**User Story:** As a student teacher, I want to receive a Pedagogical Response Profile after completing all three episodes, so that I can understand my reasoning tendencies.

#### Acceptance Criteria

1. WHEN all three Episodes are completed, THE Game SHALL compute a Pedagogical_Response_Profile from the three recorded Decision_Option selections.
2. THE Game SHALL tally the pedagogical tendency tags from all three selected Decision_Options and identify the dominant tendency.
3. THE Game SHALL display the Pedagogical_Response_Profile as a named tendency profile with a descriptive summary.
4. THE Game SHALL display a breakdown showing which tendency tag was selected in each Episode.
5. THE Pedagogical_Response_Profile SHALL be derived entirely from the Player's selections, with no random or default assignment.

---

### Requirement 7: Auto-Generated Reflection Entry

**User Story:** As a student teacher, I want an auto-generated Reflection Entry at the end of the game, so that I have a structured starting point for my QED52B portfolio reflection.

#### Acceptance Criteria

1. WHEN the Pedagogical_Response_Profile is computed, THE Game SHALL generate a Reflection_Entry aligned to the STP framework.
2. THE Reflection_Entry SHALL reference the Player's Class_Profile parameters by name in the generated text.
3. THE Reflection_Entry SHALL reference the dominant pedagogical tendency identified in the Pedagogical_Response_Profile.
4. THE Reflection_Entry SHALL be structured using the What / So What / Now What reflection format.
5. THE Game SHALL display the Reflection_Entry as editable text so the Player can personalise it before copying or exporting.
6. THE Game SHALL provide a one-click copy-to-clipboard control for the Reflection_Entry text.
7. IF the clipboard write fails, THEN THE Game SHALL display the Reflection_Entry text in a selectable text area so the Player can copy it manually.

---

### Requirement 8: Game State Management

**User Story:** As a student teacher, I want the game to maintain consistent state across all phases, so that my profile and decisions are accurately reflected throughout.

#### Acceptance Criteria

1. THE Game SHALL maintain a single game state object that holds the Class_Profile, Profile_Bucket, all three Episode selections, and the Pedagogical_Response_Profile.
2. WHEN the Player navigates between phases, THE Game SHALL preserve all previously recorded state without data loss.
3. THE Game SHALL initialise with an empty game state and populate it progressively as the Player completes each phase.
4. WHEN the Player completes the game and chooses to restart, THE Game SHALL reset the game state to its initial empty state.
5. IF the Player refreshes the browser during gameplay, THEN THE Game SHALL restore the game state from session storage so progress is not lost.

---

### Requirement 9: Navigation and Phase Transitions

**User Story:** As a student teacher, I want clear navigation between game phases, so that I always know where I am and how to proceed.

#### Acceptance Criteria

1. THE Game SHALL display a phase progress indicator showing the Player's current position across: Profile Builder → Episode 1 → Episode 2 → Episode 3 → Results.
2. WHEN a phase is completed, THE Game SHALL mark it as complete in the progress indicator.
3. THE Game SHALL provide a "Back" control on the Episode screens that returns the Player to the previous Episode without losing the current Episode's selection.
4. THE Game SHALL provide a "Restart" control on the Results screen that returns the Player to the Profile Builder with a cleared state.
5. IF the Player uses the "Back" control to return to a previous Episode, THEN THE Game SHALL restore the previously selected Decision_Option for that Episode.

---

### Requirement 10: Accessibility and Responsiveness

**User Story:** As a student teacher, I want the game to be usable on both desktop and mobile devices, so that I can play it in any context.

#### Acceptance Criteria

1. THE Game SHALL render correctly on viewport widths from 320px to 1920px without horizontal scrolling.
2. THE Game SHALL ensure all interactive controls are reachable and operable via keyboard navigation alone.
3. THE Game SHALL provide visible focus indicators on all interactive controls.
4. THE Game SHALL associate all form controls in the Profile Builder with descriptive labels.
5. WHEN a Decision_Option is selected, THE Game SHALL communicate the selection state to assistive technologies using appropriate ARIA attributes.
6. THE Game SHALL maintain a colour contrast ratio of at least 4.5:1 for all body text against its background.
