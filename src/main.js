// =============================================================================
// src/main.js — Classroom Chronicles: Game State + Router
// =============================================================================
// Sections:
//   1. Imports
//   2. State
//   3. Session storage (saveState / loadState)
//   4. Router (navigate)
//   5. Render stubs (filled in Tasks 5, 6, 7)
//   6. Init
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Imports
// -----------------------------------------------------------------------------
import { TheoryBank, ScenarioLibrary, Endings } from './data/index.js';
import {
  deriveProfileBucket,
  selectScenarios,
  computeAxisScores,
  deriveEnding,
  generateReflection
} from './engine.js';

// -----------------------------------------------------------------------------
// 2. State
// -----------------------------------------------------------------------------
const state = {
  profile: {
    schoolLevel: null,
    classSize: null,
    stream: null,
    ethnicComposition: null,
    readinessDistribution: null,
    motivationProfile: null,
    sen: null,
    sesProfile: null
  },
  bucket: null,
  scenarios: null,              // array of 3 ScenarioObjects after profile submit
  choices: [null, null, null],  // confirmed ChoiceRecord per episode
  axisScores: null,
  endingId: null,
  reflectionText: null,
  phase: "landing"              // "landing" | "profile" | "ep0_choice" | "ep0_consequence" | "ep1_choice" | "ep1_consequence" | "ep2_choice" | "ep2_consequence" | "results"
};

// -----------------------------------------------------------------------------
// 3. Session storage
// -----------------------------------------------------------------------------
function saveState() {
  try {
    sessionStorage.setItem('cc_state', JSON.stringify(state));
  } catch (e) {}
}

function loadState() {
  try {
    const saved = sessionStorage.getItem('cc_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
      return true;
    }
  } catch (e) {}
  return false;
}

// -----------------------------------------------------------------------------
// 4. Router
// -----------------------------------------------------------------------------
function navigate(phase) {
  state.phase = phase;
  saveState();
  const main = document.getElementById('app');
  main.innerHTML = '';

  if (phase === 'landing')             renderLanding();
  else if (phase === 'profile')        renderProfileBuilder();
  else if (phase === 'ep0_choice')     renderEpisodeChoice(0);
  else if (phase === 'ep0_consequence')renderEpisodeConsequence(0);
  else if (phase === 'ep1_choice')     renderEpisodeChoice(1);
  else if (phase === 'ep1_consequence')renderEpisodeConsequence(1);
  else if (phase === 'ep2_choice')     renderEpisodeChoice(2);
  else if (phase === 'ep2_consequence')renderEpisodeConsequence(2);
  else if (phase === 'results')        renderResults();
  // Legacy phase keys — redirect to new equivalents
  else if (phase === 'ep0')            navigate('ep0_choice');
  else if (phase === 'ep1')            navigate('ep1_choice');
  else if (phase === 'ep2')            navigate('ep2_choice');
}

// -----------------------------------------------------------------------------
// 5. Render stubs (Tasks 5, 6, 7 will fill these in)
// -----------------------------------------------------------------------------

// In-memory journal — persists across runs within the same session (not saved to sessionStorage)
const journal = [];
// Profile parameter definitions — must match engine.js option strings exactly
const PROFILE_PARAMS = [
  {
    key: 'schoolLevel',
    label: 'School Level',
    options: [
      'Lower Secondary (Sec 1–2)',
      'Upper Secondary (Sec 3–4 / 3–5 Normal)',
      'Junior College (JC1–JC2)'
    ],
    shortLabels: ['Sec 1–2', 'Sec 3–5', 'JC']
  },
  {
    key: 'classSize',
    label: 'Class Size',
    options: [
      'Small (20–25 students)',
      'Medium (26–32 students)',
      'Large (33–40 students)'
    ],
    shortLabels: ['Small', 'Medium', 'Large']
  },
  {
    key: 'stream',
    label: 'Academic Stream',
    options: [
      'Express / IP',
      'Normal Academic (NA)',
      'Normal Technical (NT)',
      'Mixed'
    ],
    shortLabels: ['Express/IP', 'Normal Acad', 'Normal Tech', 'Mixed']
  },
  {
    key: 'ethnicComposition',
    label: 'Ethnic & Cultural Composition',
    options: [
      'Majority Chinese, some Malay and Indian',
      'Balanced CMIO mix',
      'Majority Malay',
      'High proportion of international students',
      'Diverse with new arrivals'
    ],
    shortLabels: ['Majority Chinese', 'Balanced CMIO', 'Majority Malay', 'Intl students', 'New arrivals']
  },
  {
    key: 'readinessDistribution',
    label: 'Readiness Distribution',
    options: [
      'Mostly low (60%+ below expected readiness)',
      'Low-skewed mixed (40% low, 40% mid, 20% high)',
      'Evenly spread (roughly equal thirds)',
      'High-skewed mixed (20% low, 40% mid, 40% high)',
      'Mostly high (60%+ at or above expected readiness)'
    ],
    shortLabels: ['Mostly low', 'Low-skewed', 'Even spread', 'High-skewed', 'Mostly high'],
    proportions: [
      [60, 30, 10],
      [40, 40, 20],
      [33, 34, 33],
      [20, 40, 40],
      [10, 30, 60]
    ]
  },
  {
    key: 'motivationProfile',
    label: 'Motivation & Engagement',
    options: [
      'Largely disengaged',
      'Majority low, some pockets of keenness',
      'Mixed and volatile',
      'Generally willing but surface-level',
      'Mostly motivated, some outliers'
    ],
    shortLabels: ['Disengaged', 'Mostly low', 'Mixed', 'Willing', 'Motivated'],
    proportions: [
      [70, 20, 10],
      [55, 30, 15],
      [30, 40, 30],
      [10, 60, 30],
      [5, 25, 70]
    ]
  },
  {
    key: 'sen',
    label: 'Special Educational Needs (SEN)',
    options: [
      'None identified',
      'Low incidence (~10%)',
      'Moderate (~20%)',
      'High (~30%)',
      'Complex (~35%+)'
    ],
    shortLabels: ['None', 'Low (~10%)', 'Moderate (~20%)', 'High (~30%)', 'Complex (~35%+)']
  },
  {
    key: 'sesProfile',
    label: 'Socio-Economic Status (SES)',
    options: [
      'Mostly middle-income',
      'Mixed, middle-heavy',
      'Mixed, lower-skewed',
      'Largely lower-income',
      'Wide range'
    ],
    shortLabels: ['Middle-income', 'Middle-heavy', 'Lower-skewed', 'Lower-income', 'Wide range'],
    proportions: [
      [10, 75, 15],
      [25, 55, 20],
      [40, 45, 15],
      [60, 30, 10],
      [30, 30, 40]
    ]
  }
];

function renderLanding() {
  document.getElementById('app').innerHTML = `
    <div class="landing">

      <!-- Hero -->
      <div class="landing__hero">
        <h1 class="landing__title">The Classroom Chronicles</h1>
        <p class="landing__tagline">
          Step into a Singapore classroom. Make real pedagogical decisions.<br>
          Discover your teaching tendencies — and reflect on them.
        </p>
        <div class="landing__story">
          <p>You have been told that good teaching is about knowing your students. But knowing is only the beginning. The real work happens in the moments no textbook prepares you for — when 40% of the class stares blankly at a diagram they should understand, when the student who never speaks suddenly puts down her pen, when one student finishes in three minutes and twelve others have not started.</p>
          <p>The Classroom Chronicles puts you in the room. You will meet Wei Jie, Nur Atiqah, Rajan, Siti, and the rest of a real, messy, beautifully diverse Singapore class. You will read what is happening, decide how to respond, and live with the consequences — all in the space of one lesson.</p>
          <p>There are no perfect answers here. Only trade-offs, theory, and the slow process of understanding what kind of teacher you are becoming.</p>
        </div>
        <button class="btn btn--primary btn--lg" id="btn-begin">Build your class →</button>
      </div>

      <!-- How it works -->
      <div class="landing__steps">
        <div class="landing__step">
          <div class="landing__step-number">1</div>
          <div class="landing__step-body">
            <div class="landing__step-title">Build your class</div>
            <div class="landing__step-desc">Describe your students — their readiness, motivation, and context. The game tailors every scenario to your class.</div>
          </div>
        </div>
        <div class="landing__step">
          <div class="landing__step-number">2</div>
          <div class="landing__step-body">
            <div class="landing__step-title">Play through 3 episodes</div>
            <div class="landing__step-desc">Each episode puts you in a real classroom moment. Choose how you respond — there are no wrong answers, only different emphases.</div>
          </div>
        </div>
        <div class="landing__step">
          <div class="landing__step-number">3</div>
          <div class="landing__step-body">
            <div class="landing__step-title">Get your profile + reflection</div>
            <div class="landing__step-desc">See your Pedagogical Response Profile and a structured reflection entry you can edit and submit for your portfolio.</div>
          </div>
        </div>
      </div>

      <!-- Footer note -->
      <p class="landing__note">Takes about 10–15 minutes. No login required.</p>

    </div>`;

  document.getElementById('btn-begin').addEventListener('click', () => navigate('profile'));
}

function renderProfileBuilder() {
  // Build param groups HTML (pill pickers)
  const fieldsHtml = PROFILE_PARAMS.map(param => {
    const currentVal = state.profile[param.key];
    const pillsHtml = param.options.map((opt, i) => {
      const label = param.shortLabels ? param.shortLabels[i] : opt;
      const selected = currentVal === opt ? ' pill--selected' : '';
      return `<button class="pill${selected}" data-value="${opt}">${label}</button>`;
    }).join('');
    return `
      <div class="param-group" data-key="${param.key}">
        <div class="param-group__label">${param.label}</div>
        <div class="param-group__pills">
          ${pillsHtml}
        </div>
      </div>`;
  }).join('');

  const allSet = PROFILE_PARAMS.every(p => state.profile[p.key]);

  document.getElementById('app').innerHTML = `
    <h1 class="page-title">Build Your Class Profile</h1>
    <p class="page-subtitle">Describe your class so the game can tailor scenarios to your context.</p>
    <div class="profile-builder">
      <div class="profile-builder__fields">
        ${fieldsHtml}
      </div>
      <div class="profile-builder__sidebar">
        <div class="class-card">
          <div class="class-card__title">Your Class</div>
          <div class="class-card__row" id="card-content"></div>
        </div>
        <div class="profile-builder__actions">
          <button class="btn btn--secondary btn--sm" id="btn-randomise">Randomise missing</button>
          <button class="btn btn--secondary btn--sm" id="btn-randomise-all">Randomise all</button>
          <button class="btn btn--primary" id="btn-start"${allSet ? '' : ' disabled'}>Start →</button>
        </div>
      </div>
    </div>`;

  // ── Helpers ──────────────────────────────────────────────────────────────

  function buildProportionBar(label, proportions) {
    const [low, mid, high] = proportions;
    return `
      <div class="proportion-bar">
        <span class="proportion-bar__label">${label}</span>
        <div class="proportion-bar__track">
          <div class="proportion-bar__segment proportion-bar__segment--low"  style="width:${low}%"></div>
          <div class="proportion-bar__segment proportion-bar__segment--mid"  style="width:${mid}%"></div>
          <div class="proportion-bar__segment proportion-bar__segment--high" style="width:${high}%"></div>
        </div>
      </div>`;
  }

  function updateClassCard() {
    const p = state.profile;
    const lines = [];

    if (p.schoolLevel)        lines.push(`<div>${p.schoolLevel}</div>`);
    if (p.stream)             lines.push(`<div>${p.stream}</div>`);
    if (p.classSize)          lines.push(`<div>${p.classSize}</div>`);
    if (p.ethnicComposition)  lines.push(`<div>${p.ethnicComposition}</div>`);

    // Readiness proportion bar
    const readParam = PROFILE_PARAMS.find(x => x.key === 'readinessDistribution');
    if (p.readinessDistribution && readParam.proportions) {
      const idx = readParam.options.indexOf(p.readinessDistribution);
      if (idx !== -1) lines.push(buildProportionBar('Readiness', readParam.proportions[idx]));
    }

    // Motivation proportion bar
    const motParam = PROFILE_PARAMS.find(x => x.key === 'motivationProfile');
    if (p.motivationProfile && motParam.proportions) {
      const idx = motParam.options.indexOf(p.motivationProfile);
      if (idx !== -1) lines.push(buildProportionBar('Motivation', motParam.proportions[idx]));
    }

    // SES proportion bar
    const sesParam = PROFILE_PARAMS.find(x => x.key === 'sesProfile');
    if (p.sesProfile && sesParam.proportions) {
      const idx = sesParam.options.indexOf(p.sesProfile);
      if (idx !== -1) lines.push(buildProportionBar('SES', sesParam.proportions[idx]));
    }

    if (p.sen) lines.push(`<div>SEN: ${p.sen}</div>`);

    // Bucket badge if all 8 set
    const allFilled = PROFILE_PARAMS.every(param => p[param.key]);
    if (allFilled) {
      const bucket = deriveProfileBucket(p);
      const bucketLabel = bucket.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`<div><span class="theory-tag">${bucketLabel}</span></div>`);
    }

    document.getElementById('card-content').innerHTML =
      lines.length ? lines.join('') : '<span class="text-muted">Select options to preview your class.</span>';
  }

  function checkAllSet() {
    const allFilled = PROFILE_PARAMS.every(p => state.profile[p.key]);
    document.getElementById('btn-start').disabled = !allFilled;
  }

  function selectPill(paramGroup, value) {
    paramGroup.querySelectorAll('.pill').forEach(p => p.classList.remove('pill--selected'));
    const target = paramGroup.querySelector(`.pill[data-value="${CSS.escape(value)}"]`);
    if (target) target.classList.add('pill--selected');
  }

  // ── Initial card render ──────────────────────────────────────────────────
  updateClassCard();

  // ── Pill click listeners ─────────────────────────────────────────────────
  PROFILE_PARAMS.forEach(param => {
    const group = document.querySelector(`.param-group[data-key="${param.key}"]`);
    group.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.pill').forEach(p => p.classList.remove('pill--selected'));
        pill.classList.add('pill--selected');
        state.profile[param.key] = pill.dataset.value;
        group.classList.remove('has-error');
        // Remove any error message
        const err = group.querySelector('.field-error');
        if (err) err.remove();
        saveState();
        updateClassCard();
        checkAllSet();
      });
    });
  });

  // ── Randomise missing ────────────────────────────────────────────────────
  document.getElementById('btn-randomise').addEventListener('click', () => {
    PROFILE_PARAMS.forEach(param => {
      if (!state.profile[param.key]) {
        const opts = param.options;
        const picked = opts[Math.floor(Math.random() * opts.length)];
        state.profile[param.key] = picked;
        const group = document.querySelector(`.param-group[data-key="${param.key}"]`);
        selectPill(group, picked);
      }
    });
    saveState();
    updateClassCard();
    checkAllSet();
  });

  // ── Randomise all ────────────────────────────────────────────────────────
  document.getElementById('btn-randomise-all').addEventListener('click', () => {
    PROFILE_PARAMS.forEach(param => {
      const opts = param.options;
      const picked = opts[Math.floor(Math.random() * opts.length)];
      state.profile[param.key] = picked;
      const group = document.querySelector(`.param-group[data-key="${param.key}"]`);
      selectPill(group, picked);
    });
    saveState();
    updateClassCard();
    checkAllSet();
  });

  // ── Start button ─────────────────────────────────────────────────────────
  document.getElementById('btn-start').addEventListener('click', () => {
    let valid = true;
    PROFILE_PARAMS.forEach(param => {
      const group = document.querySelector(`.param-group[data-key="${param.key}"]`);
      if (!state.profile[param.key]) {
        group.classList.add('has-error');
        if (!group.querySelector('.field-error')) {
          const msg = document.createElement('div');
          msg.className = 'field-error';
          msg.textContent = 'Please select an option.';
          group.appendChild(msg);
        }
        valid = false;
      } else {
        group.classList.remove('has-error');
        const err = group.querySelector('.field-error');
        if (err) err.remove();
      }
    });
    if (!valid) return;

    state.bucket = deriveProfileBucket(state.profile);
    state.scenarios = selectScenarios(state.bucket, ScenarioLibrary);
    navigate('ep0_choice');
  });
}

function buildProgressBar(activeStep) {
  const STEPS = ['Profile', 'Diagnose', 'Redesign', 'Reflect', 'Results'];
  return `<ol class="progress-bar">
    ${STEPS.map((label, i) => {
      const cls = i < activeStep ? 'is-complete' : i === activeStep ? 'is-active' : '';
      const dot = i < activeStep ? '✓' : String(i);
      return `<li class="progress-bar__step${cls ? ' ' + cls : ''}">
        <span class="progress-bar__dot">${dot}</span>
        <span class="progress-bar__step-label">${label}</span>
      </li>`;
    }).join('')}
  </ol>`;
}

function renderEpisodeChoice(index) {
  const PHASE_LABELS = ['Diagnose', 'Redesign', 'Reflect'];
  const scenario = state.scenarios[index];
  const episode  = scenario.episodes[index];
  const activeStep = index + 1;

  const progressHtml = buildProgressBar(activeStep);
  const preSelectedId = state.choices[index] ? state.choices[index].choiceId : null;

  const choiceCardsHtml = episode.choices.map(choice => {
    const isSelected = choice.id === preSelectedId;
    return `
      <div class="choice-card${isSelected ? ' is-selected' : ''}" data-choice-id="${choice.id}">
        <div class="choice-card__label">${choice.label}</div>
        <div class="choice-card__elaboration">${choice.elaboration}</div>
      </div>`;
  }).join('');

  const backLabel = index === 0 ? '← Back to Profile' : '← Back';

  document.getElementById('app').innerHTML = `
    <div class="episode">
      ${progressHtml}
      <div class="episode__context">
        <div class="episode__context-label">Episode ${index + 1} — ${PHASE_LABELS[index]}</div>
        <div class="episode__situation">${scenario.contextNote} ${episode.situation}</div>
        <div class="episode__evidence"><strong>Evidence:</strong> ${episode.evidence}</div>
      </div>
      <div class="choice-cards">${choiceCardsHtml}</div>
      <div class="episode__actions mt-6">
        <button class="btn btn--secondary" id="btn-back">${backLabel}</button>
        <button class="btn btn--primary" id="btn-confirm" ${preSelectedId ? '' : 'disabled'}>Confirm choice →</button>
      </div>
    </div>`;

  let selectedChoiceId = preSelectedId;

  document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.choice-card').forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      selectedChoiceId = card.dataset.choiceId;
      document.getElementById('btn-confirm').disabled = false;
    });
  });

  document.getElementById('btn-back').addEventListener('click', () => {
    if (index === 0) navigate('profile');
    else navigate(`ep${index - 1}_consequence`);
  });

  document.getElementById('btn-confirm').addEventListener('click', () => {
    state.choices[index] = {
      episodeIndex: index,
      scenarioId: scenario.id,
      choiceId: selectedChoiceId,
      userReason: ''
    };
    saveState();
    navigate(`ep${index}_consequence`);
  });
}

function renderEpisodeConsequence(index) {
  const PHASE_LABELS = ['Diagnose', 'Redesign', 'Reflect'];
  const scenario = state.scenarios[index];
  const episode  = scenario.episodes[index];
  const choiceRecord = state.choices[index];
  const choice = episode.choices.find(c => c.id === choiceRecord.choiceId);
  const theory = choice && TheoryBank[choice.theoryKey] ? TheoryBank[choice.theoryKey] : null;
  const activeStep = index + 1;

  const progressHtml = buildProgressBar(activeStep);
  const continueLabel = index === 2 ? 'See my results →' : 'Next episode →';

  const theoryHtml = theory
    ? `<div class="theory-tags mt-4">
        <span class="theory-tag theory-tag--${theory.dimension}">${theory.label}</span>
        <span class="text-muted" style="font-size:0.8rem;align-self:center">${theory.summary}</span>
       </div>`
    : '';

  document.getElementById('app').innerHTML = `
    <div class="episode">
      ${progressHtml}
      <div class="episode__context">
        <div class="episode__context-label">Episode ${index + 1} — ${PHASE_LABELS[index]}: What happened</div>
        <div class="episode__situation" style="font-weight:600;margin-bottom:0.5rem">You chose: ${choice.label}</div>
      </div>
      <div class="consequence-block">
        <div class="consequence-block__section">
          <div class="consequence-block__label">What happened in the classroom</div>
          <div class="consequence-block__text">${choice.consequence}</div>
        </div>
        <div class="consequence-block__section">
          <div class="consequence-block__label">Student reactions</div>
          <div class="consequence-block__text" style="font-style:italic">${choice.studentReaction}</div>
        </div>
        <div class="consequence-block__section consequence-block__section--tradeoff">
          <div class="consequence-block__label">The trade-off</div>
          <div class="consequence-block__text">${choice.tradeoff}</div>
        </div>
        ${theoryHtml}
        <div class="consequence-block__bridge mt-6 text-muted">${episode.episodeBridge}</div>
      </div>
      <div class="episode__actions mt-6">
        <button class="btn btn--secondary" id="btn-change">← Change my choice</button>
        <button class="btn btn--primary" id="btn-continue">${continueLabel}</button>
      </div>
    </div>`;

  document.getElementById('btn-change').addEventListener('click', () => {
    state.choices[index] = null;
    saveState();
    navigate(`ep${index}_choice`);
  });

  document.getElementById('btn-continue').addEventListener('click', () => {
    if (index === 2) navigate('results');
    else navigate(`ep${index + 1}_choice`);
  });
}

function renderResults() {
  // ── Step 1: Compute scores and ending if not already done ─────────────────
  if (!state.axisScores) {
    state.axisScores = computeAxisScores(state.choices, state.scenarios);
  }
  if (!state.endingId) {
    state.endingId = deriveEnding(state.axisScores);
  }
  if (!state.reflectionText) {
    state.reflectionText = generateReflection(state, ScenarioLibrary, TheoryBank);
  }
  saveState();

  // ── Step 2: Look up ending data ───────────────────────────────────────────
  const ending = Endings[state.endingId];
  const scores = state.axisScores;

  // ── Step 3: Collect theory tags from all 3 choices (deduplicated by key) ──
  const theoryTagsMap = {};
  for (const choice of state.choices) {
    if (!choice) continue;
    const scenario = state.scenarios.find(s => s.id === choice.scenarioId);
    if (!scenario) continue;
    const episode = scenario.episodes[choice.episodeIndex];
    if (!episode) continue;
    const choiceObj = episode.choices.find(c => c.id === choice.choiceId);
    if (!choiceObj || !choiceObj.theoryKey) continue;
    const key = choiceObj.theoryKey;
    if (!theoryTagsMap[key] && TheoryBank[key]) {
      theoryTagsMap[key] = TheoryBank[key];
    }
  }
  const uniqueTheories = Object.entries(theoryTagsMap); // [[key, theoryObj], ...]

  // ── Step 4: Collect APA references ────────────────────────────────────────
  const citations = uniqueTheories
    .map(([, t]) => t.citation)
    .filter(Boolean);

  // ── Step 5: Push to journal ───────────────────────────────────────────────
  journal.push({
    id: Date.now(),
    endingLabel: ending.label,
    reflectionPreview: state.reflectionText.slice(0, 120) + '...',
    axisScores: { ...state.axisScores }
  });

  // ── Step 6: Build HTML ────────────────────────────────────────────────────
  const theoryTagsHtml = uniqueTheories.map(([, t]) =>
    `<span class="theory-tag theory-tag--${t.dimension}">${t.label}</span>`
  ).join('');

  const citationsHtml = citations.map(c =>
    `<li>${c}</li>`
  ).join('');

  // Preserve line breaks in narrative
  const narrativeHtml = ending.narrative.replace(/\n\n/g, '<br><br>');

  document.getElementById('app').innerHTML = `
    <div class="results">

      <!-- Ending card -->
      <div class="results__ending">
        <div class="results__ending-label">Your Pedagogical Profile</div>
        <div class="results__ending-title">${ending.label}</div>
        <div class="results__ending-narrative" style="white-space:pre-line">${narrativeHtml}</div>
      </div>

      <!-- Radar chart -->
      <div>
        <div class="results__section-title">Axis Breakdown</div>
        <div class="radar-chart-container">
          <canvas id="radar-chart"></canvas>
        </div>
      </div>

      <!-- Theory tags activated -->
      <div>
        <div class="results__section-title">Theories Activated</div>
        <div class="theory-tags">
          ${theoryTagsHtml}
        </div>
      </div>

      <!-- Reflection entry -->
      <div>
        <div class="results__section-title">Reflection Entry</div>
        <p class="text-muted" style="font-size:0.875rem;margin-bottom:0.75rem">
          Auto-generated using Jay &amp; Johnson (2002). Edit before copying.
        </p>
        <textarea id="reflection-textarea" rows="12">${state.reflectionText}</textarea>
        <div class="results__reflection-actions">
          <button class="btn btn--primary" id="btn-copy">Copy to clipboard</button>
          <button class="btn btn--secondary" id="btn-restart">Start again</button>
        </div>
      </div>

      <!-- APA References -->
      <div>
        <div class="results__section-title">References</div>
        <ol style="padding-left:1.5rem;font-size:0.875rem;line-height:1.8;color:var(--colour-text-muted)">
          ${citationsHtml}
        </ol>
      </div>

      <!-- Journal -->
      <div class="journal" id="journal-section">
        <div class="journal__title">Run History</div>
        <div class="journal__list" id="journal-list"></div>
      </div>

    </div>`;

  // ── Step 7: Render radar chart ────────────────────────────────────────────
  const ctx = document.getElementById('radar-chart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Assessment for Learning', 'Support & Scaffolding', 'Challenge', 'Participation'],
      datasets: [{
        label: 'Your Profile',
        data: [scores.afl, scores.support, scores.challenge, scores.participation],
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderColor: 'rgba(37, 99, 235, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(37, 99, 235, 1)',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 70,
          ticks: { stepSize: 10, font: { size: 11 } },
          pointLabels: { font: { size: 12 } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  // ── Step 8: Wire up buttons ───────────────────────────────────────────────

  // Copy button
  document.getElementById('btn-copy').addEventListener('click', async () => {
    const text = document.getElementById('reflection-textarea').value;
    try {
      await navigator.clipboard.writeText(text);
      document.getElementById('btn-copy').textContent = 'Copied!';
      setTimeout(() => { document.getElementById('btn-copy').textContent = 'Copy to clipboard'; }, 2000);
    } catch (e) {
      // Fallback: textarea is already visible and selectable
      document.getElementById('reflection-textarea').select();
    }
  });

  // Restart button
  document.getElementById('btn-restart').addEventListener('click', () => {
    state.profile = {
      schoolLevel: null, classSize: null, stream: null, ethnicComposition: null,
      readinessDistribution: null, motivationProfile: null, sen: null, sesProfile: null
    };
    state.bucket = null;
    state.scenarios = null;
    state.choices = [null, null, null];
    state.axisScores = null;
    state.endingId = null;
    state.reflectionText = null;
    state.phase = 'profile';
    saveState();
    navigate('profile');
  });

  // Reflection textarea sync
  document.getElementById('reflection-textarea').addEventListener('input', (e) => {
    state.reflectionText = e.target.value;
    saveState();
  });

  // ── Step 9: Render journal ────────────────────────────────────────────────
  function renderJournal() {
    const list = document.getElementById('journal-list');
    if (journal.length === 0) {
      list.innerHTML = '<p class="text-muted">No previous runs this session.</p>';
      return;
    }
    list.innerHTML = journal.slice().reverse().map(run => `
      <div class="journal__entry">
        <div>
          <div class="journal__entry-ending">${run.endingLabel}</div>
          <div class="journal__entry-preview">${run.reflectionPreview}</div>
        </div>
      </div>
    `).join('');
  }
  renderJournal();
}

// -----------------------------------------------------------------------------
// 6. Init
// -----------------------------------------------------------------------------
function init() {
  const restored = loadState();
  if (!restored) state.phase = 'landing';
  navigate(state.phase);

  // Header home button — always available
  document.getElementById('btn-home').addEventListener('click', () => {
    // Reset state fully and go to landing
    state.profile = { schoolLevel: null, classSize: null, stream: null, ethnicComposition: null, readinessDistribution: null, motivationProfile: null, sen: null, sesProfile: null };
    state.bucket = null;
    state.scenarios = null;
    state.choices = [null, null, null];
    state.axisScores = null;
    state.endingId = null;
    state.reflectionText = null;
    state.phase = 'landing';
    saveState();
    navigate('landing');
  });
}

init();
