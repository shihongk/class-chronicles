// =============================================================================
// src/main.js — Classroom Chronicles (v2)
// =============================================================================
// Sections:
//   1. Imports
//   2. State
//   3. Session storage
//   4. Router
//   5. Landing screen
//   6. Setup screen
//   7. Episode 1 screen
//   8. Episode 2 screen
//   9. Episode 3 screen
//  10. Results screen
//  11. Init
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Imports
// -----------------------------------------------------------------------------
import { TheoryBank, scenarios } from './data/index.js';
import { getScenarioPool, getScenarioById } from './engine.js';

// -----------------------------------------------------------------------------
// 2. State
// -----------------------------------------------------------------------------
const state = {
  level:      null,   // "lower_sec" | "upper_sec" | "jc"
  profile:    null,   // "mixed_readiness" | "fast_finishers" | "quiet_class" |
                      // "hidden_thinking" | "diverse_profiles" | "invisible_understanding"
  scenarioId: null,   // selected scenario id e.g. "S1"
  scenario:   null,   // resolved ScenarioObject
  ep1Choice:  null,   // "A" | "B" | "C"
  ep2Choice:  null,   // "1" | "2"
  phase:      'landing' // "landing"|"setup"|"scenario_pick"|"ep1"|"ep2"|"ep3"|"results"
};

// -----------------------------------------------------------------------------
// 3. Session storage
// -----------------------------------------------------------------------------
function saveState() {
  try {
    sessionStorage.setItem('cc_state', JSON.stringify(state));
  } catch (e) { /* continue in-memory */ }
}

function loadState() {
  try {
    const saved = sessionStorage.getItem('cc_state');
    if (!saved) return false;
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
    // Re-resolve scenario object from id (not serialisable by reference)
    if (state.scenarioId) {
      state.scenario = getScenarioById(state.scenarioId, scenarios);
    }
    return true;
  } catch (e) {
    return false;
  }
}

// -----------------------------------------------------------------------------
// 4. Router
// -----------------------------------------------------------------------------
function navigate(phase) {
  state.phase = phase;
  saveState();
  document.getElementById('app').innerHTML = '';

  switch (phase) {
    case 'landing':       renderLanding();       break;
    case 'setup':         renderSetup();         break;
    case 'scenario_pick': renderScenarioPick();  break;
    case 'ep1':           renderEp1();           break;
    case 'ep2':           renderEp2();           break;
    case 'ep3':           renderEp3();           break;
    case 'results':       renderResults();       break;
    default:              renderLanding();
  }
}

// -----------------------------------------------------------------------------
// 5. Landing screen
// -----------------------------------------------------------------------------
function renderLanding() {
  document.getElementById('app').innerHTML = `
    <div class="landing">
      <div class="landing__hero">
        <p class="landing__eyebrow">QED52B Pedagogical Practices</p>
        <h1 class="landing__title">The Classroom Chronicles</h1>
        <p class="landing__tagline">
          Step into a Singapore classroom. Make real pedagogical decisions.<br>
          Discover your teaching tendencies — and reflect on them.
        </p>
        <button class="btn btn--primary btn--lg" id="btn-begin">Begin →</button>
      </div>
      <div class="landing__steps">
        <div class="landing__step">
          <div class="landing__step-number">1</div>
          <div class="landing__step-body">
            <div class="landing__step-title">Choose your class</div>
            <div class="landing__step-desc">Select a school level and class profile. The game tailors every scenario to your context.</div>
          </div>
        </div>
        <div class="landing__step">
          <div class="landing__step-number">2</div>
          <div class="landing__step-body">
            <div class="landing__step-title">Play through episodes</div>
            <div class="landing__step-desc">Each episode puts you in a real classroom moment. Your choices shape what happens next.</div>
          </div>
        </div>
        <div class="landing__step">
          <div class="landing__step-number">3</div>
          <div class="landing__step-body">
            <div class="landing__step-title">Reflect on your path</div>
            <div class="landing__step-desc">See the outcome of your decisions and get a structured reflection prompt for your portfolio.</div>
          </div>
        </div>
      </div>
      <p class="landing__note">Takes about 10–15 minutes. No login required.</p>
    </div>`;

  document.getElementById('btn-begin').addEventListener('click', () => navigate('setup'));
}

// -----------------------------------------------------------------------------
// 6. Setup screen
// -----------------------------------------------------------------------------
const LEVELS = [
  { value: 'lower_sec', label: 'Lower Secondary', desc: 'Sec 1–2' },
  { value: 'upper_sec', label: 'Upper Secondary', desc: 'Sec 3–5' },
  { value: 'jc',        label: 'Junior College',  desc: 'JC1–JC2' }
];

const PROFILES = [
  { value: 'mixed_readiness',        label: 'Mixed Readiness',        desc: 'Wide spread — some ready, some not' },
  { value: 'fast_finishers',         label: 'Fast Finishers',         desc: 'Most finish quickly, reasoning is thin' },
  { value: 'quiet_class',            label: 'Quiet Class',              desc: 'Compliant but silent — hard to read' },
  { value: 'hidden_thinking',        label: 'Hidden Thinking',          desc: 'Correct answers, invisible process' },
  { value: 'diverse_profiles',       label: 'Diverse Learning Profiles',desc: 'Different reps and access needs in the same room' },
  { value: 'invisible_understanding',label: 'Invisible Understanding',  desc: 'Fluent but no visible evidence' }
];

// Valid (level, profile) combinations per design
const VALID_COMBOS = {
  upper_sec: ['mixed_readiness', 'fast_finishers', 'quiet_class', 'hidden_thinking', 'diverse_profiles', 'invisible_understanding'],
  lower_sec: ['mixed_readiness', 'fast_finishers', 'quiet_class', 'hidden_thinking', 'diverse_profiles', 'invisible_understanding'],
  jc:        ['mixed_readiness', 'fast_finishers', 'quiet_class', 'hidden_thinking', 'diverse_profiles', 'invisible_understanding']
};

function renderSetup() {
  const levelHtml = LEVELS.map(l => `
    <button class="pill${state.level === l.value ? ' pill--selected' : ''}"
            data-group="level" data-value="${l.value}">
      <span class="pill__label">${l.label}</span>
      <span class="pill__desc">${l.desc}</span>
    </button>`).join('');

  const profileHtml = PROFILES.map(p => {
    const disabled = state.level && !VALID_COMBOS[state.level].includes(p.value);
    return `
    <button class="pill${state.profile === p.value ? ' pill--selected' : ''}${disabled ? ' pill--disabled' : ''}"
            data-group="profile" data-value="${p.value}"
            ${disabled ? 'disabled' : ''}>
      <span class="pill__label">${p.label}</span>
      <span class="pill__desc">${p.desc}</span>
    </button>`;
  }).join('');

  const canStart = state.level && state.profile;

  document.getElementById('app').innerHTML = `
    <div class="setup">
      <h1 class="page-title">Choose your class</h1>
      <p class="page-subtitle">Your selections determine which scenario you play.</p>

      <div class="setup__group">
        <div class="setup__group-label">School Level</div>
        <div class="setup__pills" id="pills-level">${levelHtml}</div>
      </div>

      <div class="setup__group">
        <div class="setup__group-label">Class Profile</div>
        <div class="setup__pills" id="pills-profile">${profileHtml}</div>
      </div>

      <div class="setup__actions">
        <button class="btn btn--secondary" id="btn-back">← Back</button>
        <button class="btn btn--primary" id="btn-start" ${canStart ? '' : 'disabled'}>Start →</button>
      </div>
    </div>`;

  // Pill click handler
  document.getElementById('app').querySelectorAll('.pill[data-group]').forEach(pill => {
    pill.addEventListener('click', () => {
      const group = pill.dataset.group;
      const value = pill.dataset.value;

      if (group === 'level') {
        state.level = value;
        // Reset profile if it's no longer valid for the new level
        if (state.profile && !VALID_COMBOS[value].includes(state.profile)) {
          state.profile = null;
        }
      } else {
        state.profile = value;
      }
      saveState();
      renderSetup(); // re-render to update pill states and disabled profiles
    });
  });

  document.getElementById('btn-back').addEventListener('click', () => navigate('landing'));

  document.getElementById('btn-start').addEventListener('click', () => {
    const pool = getScenarioPool(state.level, state.profile, scenarios);
    // If only 1 scenario for this combo, go straight to ep1
    // If multiple, show the picker (future use when more scenarios are added)
    if (pool.length === 1) {
      state.scenarioId = pool[0].id;
      state.scenario = pool[0];
      state.ep1Choice = null;
      state.ep2Choice = null;
      saveState();
      console.log(`[main.js] Scenario selected: ${state.scenario.id} (${state.scenario.topic}) — source: ${state.scenario._source || 'scenarios.js'}`);
      navigate('ep1');
    } else {
      state.ep1Choice = null;
      state.ep2Choice = null;
      state.scenarioId = null;
      state.scenario = null;
      saveState();
      navigate('scenario_pick');
    }
  });
}

// -----------------------------------------------------------------------------
// 7. Scenario picker screen
// -----------------------------------------------------------------------------
function renderScenarioPick() {
  const pool = getScenarioPool(state.level, state.profile, scenarios);

  const cards = pool.map(s => `
    <button class="scenario-card" data-id="${s.id}" aria-label="Select scenario: ${s.topic}">
      <div class="scenario-card__id">${s.id}</div>
      <div class="scenario-card__topic">${s.topic}</div>
      <div class="scenario-card__context">${s.contextNote}</div>
    </button>
  `).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen scenario-pick">
      <div class="screen__inner">
        <h2 class="screen__heading">Choose a scenario</h2>
        <p class="screen__sub">All set in a <strong>${state.level.replace('_', ' ')}</strong> class with a <strong>${state.profile.replace(/_/g, ' ')}</strong> profile. Pick the topic you want to explore.</p>
        <div class="scenario-pick__cards">${cards}</div>
        <button class="btn btn--ghost" id="btn-back">← Back</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      state.scenarioId = id;
      state.scenario = getScenarioById(id, scenarios);
      state.ep1Choice = null;
      state.ep2Choice = null;
      saveState();
      navigate('ep1');
    });
  });

  document.getElementById('btn-back').addEventListener('click', () => navigate('setup'));
}

// -----------------------------------------------------------------------------
// 8. Progress bar helper
// -----------------------------------------------------------------------------
function buildProgressBar(activeIndex) {
  const STEPS = ['Setup', 'Episode 1', 'Episode 2', 'Episode 3', 'Results'];
  return `<ol class="progress-bar" aria-label="Progress">
    ${STEPS.map((label, i) => {
      let cls = '';
      if (i < activeIndex)  cls = 'is-complete';
      if (i === activeIndex) cls = 'is-active';
      const dot = i < activeIndex ? '✓' : (i + 1).toString();
      return `<li class="progress-bar__step${cls ? ' ' + cls : ''}">
        <span class="progress-bar__dot" aria-hidden="true">${dot}</span>
        <span class="progress-bar__step-label">${label}</span>
      </li>`;
    }).join('')}
  </ol>`;
}

// -----------------------------------------------------------------------------
// 8. Episode 1 screen
// -----------------------------------------------------------------------------
function renderEp1() {
  const s = state.scenario;
  const progressHtml = buildProgressBar(1);

  const choicesHtml = s.ep1.choices.map(c => {
    const selected = state.ep1Choice === c.id;
    return `
      <div class="choice-card${selected ? ' is-selected' : ''}" data-choice="${c.id}" role="button" tabindex="0"
           aria-pressed="${selected}">
        <div class="choice-card__label">${c.label}</div>
        <div class="choice-card__elaboration">${c.elaboration}</div>
        <div class="choice-card__tradeoff">${c.tradeoff}</div>
      </div>`;
  }).join('');

  document.getElementById('app').innerHTML = `
    <div class="episode">
      ${progressHtml}
      <div class="episode__header">
        <div class="episode__eyebrow">${s.subject} · ${s.topic}</div>
        <h2 class="episode__title">Episode 1 — What do you do first?</h2>
      </div>
      <div class="episode__context">
        <div class="episode__context-label">The situation</div>
        <div class="episode__situation">${s.contextNote}</div>
        <div class="episode__situation mt-4">${s.ep1.situation}</div>
        <div class="episode__evidence"><strong>What you notice:</strong> ${s.ep1.evidence}</div>
      </div>
      <div class="choice-cards">${choicesHtml}</div>
      <div class="episode__actions">
        <button class="btn btn--secondary" id="btn-back">← Back</button>
        <button class="btn btn--primary" id="btn-confirm" ${state.ep1Choice ? '' : 'disabled'}>Confirm →</button>
      </div>
    </div>`;

  // Choice selection
  document.querySelectorAll('.choice-card').forEach(card => {
    const activate = () => {
      document.querySelectorAll('.choice-card').forEach(c => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('is-selected');
      card.setAttribute('aria-pressed', 'true');
      state.ep1Choice = card.dataset.choice;
      document.getElementById('btn-confirm').disabled = false;
      saveState();
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
  });

  document.getElementById('btn-back').addEventListener('click', () => navigate('setup'));
  document.getElementById('btn-confirm').addEventListener('click', () => navigate('ep2'));
}

// -----------------------------------------------------------------------------
// 9. Episode 2 screen
// -----------------------------------------------------------------------------
function renderEp2() {
  const s = state.scenario;
  const branch = s.ep2[state.ep1Choice];
  const progressHtml = buildProgressBar(2);

  const choicesHtml = branch.choices.map(c => {
    const selected = state.ep2Choice === c.id;
    return `
      <div class="choice-card${selected ? ' is-selected' : ''}" data-choice="${c.id}" role="button" tabindex="0"
           aria-pressed="${selected}">
        <div class="choice-card__label">${c.label}</div>
        <div class="choice-card__elaboration">${c.elaboration}</div>
        <div class="choice-card__tradeoff">${c.tradeoff}</div>
      </div>`;
  }).join('');

  document.getElementById('app').innerHTML = `
    <div class="episode">
      ${progressHtml}
      <div class="episode__header">
        <div class="episode__eyebrow">${s.subject} · ${s.topic}</div>
        <h2 class="episode__title">Episode 2 — What happens next?</h2>
      </div>
      <div class="episode__context">
        <div class="episode__context-label">After your first move</div>
        <div class="episode__situation">${branch.consequence}</div>
      </div>
      <div class="choice-cards">${choicesHtml}</div>
      <div class="episode__actions">
        <button class="btn btn--secondary" id="btn-back">← Back</button>
        <button class="btn btn--primary" id="btn-confirm" ${state.ep2Choice ? '' : 'disabled'}>Confirm →</button>
      </div>
    </div>`;

  document.querySelectorAll('.choice-card').forEach(card => {
    const activate = () => {
      document.querySelectorAll('.choice-card').forEach(c => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('is-selected');
      card.setAttribute('aria-pressed', 'true');
      state.ep2Choice = card.dataset.choice;
      document.getElementById('btn-confirm').disabled = false;
      saveState();
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
  });

  document.getElementById('btn-back').addEventListener('click', () => {
    state.ep2Choice = null;
    saveState();
    navigate('ep1');
  });
  document.getElementById('btn-confirm').addEventListener('click', () => navigate('ep3'));
}

// -----------------------------------------------------------------------------
// 10. Episode 3 screen
// -----------------------------------------------------------------------------
function renderEp3() {
  const s = state.scenario;
  const pathKey = state.ep1Choice + state.ep2Choice; // e.g. "A1"
  const path = s.ep3[pathKey];
  const progressHtml = buildProgressBar(3);

  // Collect the two theory keys activated in this run
  const ep1TheoryKey = s.ep1.choices.find(c => c.id === state.ep1Choice)?.theoryKey;
  const ep2TheoryKey = s.ep2[state.ep1Choice].choices.find(c => c.id === state.ep2Choice)?.theoryKey;
  const theories = [ep1TheoryKey, ep2TheoryKey]
    .filter(Boolean)
    .map(k => TheoryBank[k])
    .filter(Boolean);

  const theoryTagsHtml = theories.map(t =>
    `<span class="theory-tag theory-tag--${t.dimension}">${t.label}</span>`
  ).join('');

  // Format reflection with line breaks
  const reflectionHtml = path.reflection
    .split('\n\n')
    .map(para => `<p>${para}</p>`)
    .join('');

  document.getElementById('app').innerHTML = `
    <div class="episode">
      ${progressHtml}
      <div class="episode__header">
        <div class="episode__eyebrow">${s.subject} · ${s.topic}</div>
        <h2 class="episode__title">Episode 3 — What happened</h2>
      </div>
      <div class="consequence-block">
        <div class="consequence-block__section">
          <div class="consequence-block__label">Outcome</div>
          <div class="consequence-block__text">${path.outcome}</div>
        </div>
        <div class="consequence-block__section consequence-block__section--tradeoff">
          <div class="consequence-block__label">The trade-off</div>
          <div class="consequence-block__text">${path.tradeoff}</div>
        </div>
        <div class="consequence-block__section">
          <div class="consequence-block__label">Theories activated</div>
          <div class="theory-tags">${theoryTagsHtml}</div>
        </div>
      </div>
      <div class="episode__actions">
        <button class="btn btn--secondary" id="btn-back">← Back</button>
        <button class="btn btn--primary" id="btn-continue">See reflection →</button>
      </div>
    </div>`;

  document.getElementById('btn-back').addEventListener('click', () => {
    state.ep2Choice = null;
    saveState();
    navigate('ep2');
  });
  document.getElementById('btn-continue').addEventListener('click', () => navigate('results'));
}

// -----------------------------------------------------------------------------
// 11. Results screen
// -----------------------------------------------------------------------------
function renderResults() {
  const s = state.scenario;
  const pathKey = state.ep1Choice + state.ep2Choice;
  const path = s.ep3[pathKey];
  const progressHtml = buildProgressBar(4);

  // Resolve choices and theories
  const ep1Choice = s.ep1.choices.find(c => c.id === state.ep1Choice);
  const ep2Choice = s.ep2[state.ep1Choice].choices.find(c => c.id === state.ep2Choice);
  const ep1Theory = ep1Choice ? TheoryBank[ep1Choice.theoryKey] : null;
  const ep2Theory = ep2Choice ? TheoryBank[ep2Choice.theoryKey] : null;

  // Build deduplicated numbered reference list
  const refMap = {};
  let refIndex = 1;
  const getRef = (theoryKey) => {
    if (!theoryKey) return '';
    if (!refMap[theoryKey]) refMap[theoryKey] = refIndex++;
    return `<sup>${refMap[theoryKey]}</sup>`;
  };

  // Trigger ref numbering in order of appearance
  const ep1Ref = ep1Choice ? getRef(ep1Choice.theoryKey) : '';
  const ep2Ref = ep2Choice ? getRef(ep2Choice.theoryKey) : '';
  // Always include Jay & Johnson as the reflection framework reference
  getRef('Jay_Johnson_Reflection');

  // Build citations in numbered order
  const citationsHtml = Object.entries(refMap).map(([key, num]) => {
    const t = TheoryBank[key];
    return t ? `<li><sup>${num}</sup> ${t.citation}</li>` : '';
  }).join('');

  // Build pre-filled reflection text for the textarea
  const reflectionText =
`[Describe — what happened in your lesson]
In this ${s.subject} lesson on ${s.topic}, I was working with a ${s.profile.replace(/_/g, ' ')} class. When I noticed the gap, I chose to ${ep1Choice ? ep1Choice.label.toLowerCase() : ''}${ep1Ref ? ' [' + ep1Theory?.label + ']' : ''}. This led to ${ep2Choice ? ep2Choice.label.toLowerCase() : ''}${ep2Ref ? ' [' + ep2Theory?.label + ']' : ''}.

${path.outcome}

[Why — explain your reasoning here]
I made these choices because... (edit this section)

[Reflect — what the outcome tells you]
${path.reflection.split('\n\n').slice(1).join('\n\n')}`;

  document.getElementById('app').innerHTML = `
    <div class="results">
      ${progressHtml}

      <!-- Scenario context -->
      <div class="results__context-recap">
        <div class="results__section-title">${s.subject} · ${s.topic}</div>
        <p class="results__context-text">${s.contextNote}</p>
        <p class="results__context-text mt-4">${s.ep1.situation}</p>
        <p class="results__context-evidence"><strong>What you noticed:</strong> ${s.ep1.evidence}</p>
      </div>

      <!-- Path summary -->
      <div class="results__path">
        <div class="results__section-title">Your path</div>

        <div class="results__path-step">
          <div class="results__path-step-label">Episode 1 — What you chose</div>
          <div class="results__path-step-choice">${ep1Choice ? ep1Choice.label : '—'}${ep1Ref}</div>
          <div class="results__path-step-elaboration">${ep1Choice ? ep1Choice.elaboration : ''}</div>
          ${ep1Theory ? `<div class="mt-4"><span class="theory-tag theory-tag--${ep1Theory.dimension}">${ep1Theory.label}</span></div>` : ''}
          <div class="results__path-step-tradeoff">${ep1Choice ? ep1Choice.tradeoff : ''}</div>
        </div>

        <div class="results__path-divider">↓</div>

        <div class="results__path-step">
          <div class="results__path-step-label">Episode 2 — What happened next</div>
          <p class="results__path-step-consequence">${s.ep2[state.ep1Choice].consequence}</p>
          <div class="results__path-step-choice">${ep2Choice ? ep2Choice.label : '—'}${ep2Ref}</div>
          <div class="results__path-step-elaboration">${ep2Choice ? ep2Choice.elaboration : ''}</div>
          ${ep2Theory ? `<div class="mt-4"><span class="theory-tag theory-tag--${ep2Theory.dimension}">${ep2Theory.label}</span></div>` : ''}
          <div class="results__path-step-tradeoff">${ep2Choice ? ep2Choice.tradeoff : ''}</div>
        </div>

        <div class="results__path-divider">↓</div>

        <div class="results__path-step results__path-step--outcome">
          <div class="results__path-step-label">Outcome</div>
          <div class="results__path-step-elaboration">${path.outcome}</div>
          <div class="results__path-step-tradeoff">${path.tradeoff}</div>
        </div>
      </div>

      <!-- Reflection entry -->
      <div>
        <div class="results__section-title">Reflection Entry</div>
        <p class="text-muted" style="font-size:0.875rem;margin-bottom:0.75rem">
          Structured using Jay &amp; Johnson (2002)<sup>${refMap['Jay_Johnson_Reflection'] || ''}</sup>.
          Fill in the <em>Why</em> section, then edit and copy to your portfolio.
        </p>
        <textarea id="reflection-textarea" rows="18">${reflectionText}</textarea>
        <div class="results__reflection-actions">
          <button class="btn btn--primary" id="btn-copy">Copy to clipboard</button>
          <button class="btn btn--secondary" id="btn-restart">Start again</button>
        </div>
      </div>

      <!-- References -->
      <div>
        <div class="results__section-title">References</div>
        <ol class="results__references">
          ${citationsHtml}
        </ol>
      </div>
    </div>`;

  // Copy button
  document.getElementById('btn-copy').addEventListener('click', async () => {
    const text = document.getElementById('reflection-textarea').value;
    const btn = document.getElementById('btn-copy');
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy to clipboard'; }, 2000);
    } catch (e) {
      document.getElementById('reflection-textarea').select();
    }
  });

  // Reflection textarea sync
  document.getElementById('reflection-textarea').addEventListener('input', e => {
    saveState();
  });

  // Restart
  document.getElementById('btn-restart').addEventListener('click', () => {
    Object.assign(state, {
      level: null, profile: null, scenario: null,
      ep1Choice: null, ep2Choice: null, phase: 'landing'
    });
    try { sessionStorage.removeItem('cc_state'); } catch (e) {}
    navigate('landing');
  });
}

// -----------------------------------------------------------------------------
// 12. Init
// -----------------------------------------------------------------------------
function init() {
  // Home button always returns to landing and clears state
  const homeBtn = document.getElementById('btn-home');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      Object.assign(state, {
        level: null, profile: null, scenario: null,
        ep1Choice: null, ep2Choice: null, phase: 'landing'
      });
      try { sessionStorage.removeItem('cc_state'); } catch (e) {}
      navigate('landing');
    });
  }

  // Restore session or start fresh
  const restored = loadState();
  navigate(restored ? state.phase : 'landing');
}

init();
