const semesterStart = new Date('2026-07-20T00:00:00+08:00');
const semesterEnd = new Date('2026-11-15T23:59:59+08:00');

const units = {
  ACCT2002: {
    code: 'ACCT2002',
    color: 'acct',
    name: 'Cost Analysis for Decision Making',
    coordinator: 'Dr Kenneth Ke',
    contact: 'Kenneth.Ke@cbs.curtin.edu.au',
    pattern: '1h lecture + 2h tutorial weekly',
    reference: 'Chicago 18th Author-Date',
    pass: '50% overall + attempt every assessment',
    summary: 'Management accounting, costing methods, planning, strategy, ethics and decision making.',
    details: [
      'Semester Test covers Modules 1–3 and uses LockDown Browser + Respondus Monitor.',
      'Portfolio covers Modules 4–6 in MyLab. Each part has a 180-minute limit and one attempt; once a question is viewed you cannot go backwards.',
      'Final examination covers Modules 7–10 and is closed book with a non-programmable calculator.',
      'Portfolio Parts A, B and C release progressively on 28 Aug, 4 Sep and 11 Sep; all are due together on 21 Sep.'
    ],
    weeks: {
      1: ['Module 1 · Introduction', 'Tutorial: introduction', 'Pre-read: Datar & Rajan Ch 1'],
      2: ['Module 2 · Strategy', 'Strategy readings + tutorial questions', 'Focus: strategy and management accounting'],
      3: ['Module 3 · Cost terms and purposes', 'Tutorial: 1-3, 13-3, AQ-4 to AQ-7', 'Pre-read: Datar & Rajan Ch 2'],
      4: ['Module 4 · Determining how costs behave', 'Tutorial: 2-3, 2-5, 2-9, 2-14, 2-22, 2-38, 2-45, AQ-8, AQ-9', 'Pre-read: Ch 10'],
      5: ['Tuition free week', 'No scheduled module', 'Use the break for revision'],
      6: ['Module 5 · Job costing', 'Tutorial: 10-5, 10-9, 10-25, 10-32, AQ-10', 'Semester Test · 26 Aug'],
      7: ['Module 6 · Process costing', 'Tutorial: 4-4, 4-12, 4-24, 4-35, 4-36 (ignore part 1), AQ-11', 'Pre-read: Datar & Rajan Ch 18'],
      8: ['Module 7 · Activity-Based Costing & Management', 'Tutorial: 18-3, 18-5, 18-24, 18-25, 18-36, AQ-12', 'Pre-read: Ch 5'],
      9: ['Module 8 · Pricing Decisions & Cost Management', 'Tutorial: 5-2, 5-11, 5-27, 5-29, AQ-13', 'Pre-read: Ch 14'],
      10: ['Module 9 · Master Budget & Responsibility Accounting', 'Tutorial: 14-1, 14-5, 14-19, 14-23, 14-35, 14-36, AQ-14', 'Portfolio due · 21 Sep 23:59'],
      11: ['Tuition free week', 'No scheduled module', 'Portfolio should already be submitted'],
      12: ['Module 10 · Cost-Volume-Profit analysis', 'Tutorial: 6-3, 6-15, 6-23, AQ-15, 6-34, AQ-16', 'Pre-read: Ch 3'],
      13: ['CVP practice', 'Tutorial: 3-2, 3-8, 3-21, 3-25, 3-41, 3-49, AQ-17', 'Consolidate Module 10'],
      14: ['Revision', 'Revision week', 'Prepare for final examination'],
      15: ['Study week', 'No classes', 'Final exam preparation'],
      16: ['Examinations week 1', 'Final exam may be scheduled in exam period', 'Check OASIS timetable'],
      17: ['Examinations week 2', 'Final exam may be scheduled in exam period', 'Check OASIS timetable']
    }
  },
  ECOM1000: {
    code: 'ECOM1000',
    color: 'ecom',
    name: 'Analytics for Decision Making',
    coordinator: 'Dr Jose Loureiro',
    contact: 'ECOM1000@curtin.edu.au',
    pattern: '1.5h lecture + 1.5h computer lab weekly',
    reference: 'APA 7th Edition',
    pass: '50% overall',
    summary: 'Business analytics in Excel, data interpretation, visualisation, modelling and decision making.',
    details: [
      'Assessment 2 applies Modern Portfolio Theory and the Sharpe Ratio to Value vs Growth Investing using historical stock data from 2021–2026.',
      'The individual Excel model optimises a US$250,000 portfolio using Excel functions and Solver.',
      'Assessment 2 includes Individual Excel Model (15%), Peer Evaluation (5%) and Group Investment Report (15%).',
      'Final exam is closed-book, online, 2h 15m and invigilated through Respondus LockDown Browser.'
    ],
    weeks: {
      1: ['Module 1 · Intro to Business Analytics', 'Welcome Lab + MyLab enrolment', 'Brief intro to Excel'],
      2: ['Module 2 · Data Sorting & Filtering', 'Lab 1 problems + MyLab homework', 'Read textbook sections'],
      3: ['Module 3 · Excel Functions to Explore Data', 'Lab 2 problems + homework', 'Build Excel function confidence'],
      4: ['Module 4 · Frequency, Percentile, Mean, Median & Mode', 'Lab 3 problems + homework', 'Quiz · 14 Aug'],
      5: ['Tuition free week', 'Assessment 2 guideline release · 21 Aug 5pm', 'Individual Excel Model brief'],
      6: ['Module 5 · Measuring Association', 'Lab 4 problems + homework', 'Assessment 2 preparation begins'],
      7: ['Assessment 2 preparation recording', 'No live lecture this week', 'Lab 5 problems + MyLab Measuring Association'],
      8: ['Module 6 · Data Visualisation', 'Assessment 2 tutorial Q&A', 'Tutor walks through assessment guidelines'],
      9: ['Module 7 · Pivot Tables & Charts', 'Lab 6 problems + Data Visualisation homework', 'Prepare Excel model'],
      10: ['Module 8 · Forecasting, Regression & Time-Series', 'Lab 7 problems + Pivot Tables homework', 'Excel Model due · 23 Sep 23:59'],
      11: ['Tuition free week', 'Peer marking + group report briefs release · 29 Sep', 'Prepare for group component'],
      12: ['Module 9 · Inferences', 'Lab 8 problems + Forecasting homework', 'CadSoft customer response-time case'],
      13: ['Module 10 · Data Governance & Ethics', 'Lab 9 problems + homework', 'Peer Evaluation + Group Report due · 14 Oct'],
      14: ['Final exam preparation recordings', 'No live lecture', 'Lab 10 group discussion + ethics lesson'],
      15: ['Study week', 'No scheduled class', 'Final exam preparation'],
      16: ['Exam week 1', 'Final exam centrally scheduled', 'Check OASIS timetable'],
      17: ['Exam week 2', 'Final exam centrally scheduled', 'Check OASIS timetable']
    }
  },
  TAXA2000: {
    code: 'TAXA2000',
    color: 'taxa',
    name: 'Introduction to Australian Taxation Law',
    coordinator: 'Mrs Annette Morgan',
    contact: 'annette.morgan@cbs.curtin.edu.au',
    pattern: '1h pre-recorded lecture + 2h tutorial weekly',
    reference: 'Australian Guide to Legal Citation · 4th ed.',
    pass: '50% overall + attempt every assessment',
    summary: 'Australian income tax law, CGT, GST, entities, capital allowances and tax professional obligations.',
    details: [
      'The unit indicates an expected study load of 10 hours per week.',
      'The mid-semester test covers Income, Deductions, Uniform Capital Allowances and Capital Gains Tax.',
      'The final exam covers all topics with greater emphasis on Partnerships, Trusts and Minors, Companies, GST and Tax Professionals.',
      'Both the mid-semester test and final exam are remotely invigilated and are 2 hours in duration.'
    ],
    weeks: {
      1: ['Framework of the Australian Taxation System + Income', 'Tutorial: unit administration + introduction', 'PIAT Topics 0 / 1'],
      2: ['Deductions · Part 1', 'Tutorial: Income', 'PIAT Topic 2'],
      3: ['Deductions · Part 2', 'Tutorial: Deductions Part 1', 'PIAT Topic 2'],
      4: ['Uniform Capital Allowances', 'Tutorial: Deductions Part 2', 'PIAT Topic 3'],
      5: ['Tuition free week', 'No scheduled topic', 'Use for consolidation'],
      6: ['Capital Gains Tax', 'Tutorial: Uniform Capital Allowances', 'Case Study Analysis due · 28 Aug'],
      7: ['No lecture', 'Tutorial: Capital Gains Tax', 'Consolidate CGT before revision'],
      8: ['Partnerships', 'Tutorial: revision', 'PIAT Topic 5'],
      9: ['Trusts and Minors', 'Tutorial: Partnerships', 'PIAT Topic 6'],
      10: ['Companies', 'Tutorial: Trusts and Minors', 'Mid-Semester Test · 25 Sep 12pm'],
      11: ['Tuition free week', 'No scheduled topic', 'Prepare for remaining topics'],
      12: ['Goods and Services Tax', 'Tutorial: Companies', 'PIAT Topic 8'],
      13: ['Tax Professionals', 'Tutorial: GST', 'PIAT Topic 9'],
      14: ['No lecture', 'Tutorial: revision', 'Final exam preparation'],
      15: ['Study week', 'No class', 'Final exam preparation'],
      16: ['Examinations', 'Final Exam · TBA online', 'Check OASIS timetable'],
      17: ['Examinations', 'Final Exam period', 'Check OASIS timetable']
    }
  },
  ECON1000: {
    code: 'ECON1000',
    color: 'econ',
    name: 'Introductory Economics',
    coordinator: 'Dr Jose Loureiro',
    contact: 'Jose.Loureiro@curtin.edu.au',
    pattern: '1.5h lecture + 1.5h tutorial weekly',
    reference: 'Chicago 18th Author-Date',
    pass: '50% overall + attempt and submit every assessment',
    summary: 'Game theory, macroeconomics, economic fluctuations, unemployment, inflation and policy.',
    details: [
      'Game Theory Presentation is an individual graphical + written take-home task based on Learning Modules L1–L2.',
      'MyLabs Exercises cover GDP, Unemployment, and CPI / Inflation interactives. The average of the three is converted to a mark out of 15.',
      'Macroeconomic Review and Analysis (MRA) is worth 50% and covers lecture topics L3–L8.',
      'Part A of the MRA is a timed invigilated eTest; Part B includes short-answer problems and well-labelled hand-drawn diagrams.'
    ],
    weeks: {
      1: ['L0 Introduction + L1 Strategic Interactions I', 'Tutorial: L0', 'Start game theory foundations'],
      2: ['L2 Strategic Interactions II', 'Tutorial: L1', 'Continue game theory'],
      3: ['No lecture · focus on Game Theory', 'Tutorial: L2(a)', 'GTP available · 8 Aug'],
      4: ['L3 Economic Fluctuations', 'Tutorial: L2(b)', 'MyLabs Experiment · 10–16 Aug'],
      5: ['Tuition free week', 'No scheduled lecture/tutorial', 'Use for catch-up'],
      6: ['L4 Aggregate Demand & Fiscal Policy', 'Tutorial: L3', 'MyLabs L3 Exercises available'],
      7: ['L5 Supply Side Model · Labour & Product Markets', 'Tutorial: L4', 'GTP due · 2 Sep 23:59'],
      8: ['L6 Unemployment & Inequality', 'Tutorial: L5', 'MyLabs L5 Exercises available · 7 Sep'],
      9: ['L7 Inflation & the Phillips Curve', 'Tutorial: L6', 'MyLabs L7 Exercises available · 14 Sep'],
      10: ['L8 Monetary Policy', 'Tutorial: L7', 'Consolidate macro topics'],
      11: ['Tuition free week', 'No scheduled class', 'Catch up MyLabs exercises'],
      12: ['MRA final assessment Q&A', 'Tutorial: L8', 'MyLabs L3/L5/L7 due · 5 Oct 9pm'],
      13: ['No lecture · Part A MRA preparation', 'Open Q&A + individual consults', 'Prepare for invigilated eTest'],
      14: ['No lecture/tutorial · finalise Part A', 'MRA Part A · 21 Oct', 'Part B available · 22 Oct 11am'],
      15: ['Study week', 'No classes', 'MRA Part B preparation'],
      16: ['Examinations', 'MRA Part B due · 5 Nov 11pm', 'Complete final assessment'],
      17: ['Examinations', 'No additional scheduled task in outline', 'Semester wrap-up']
    }
  }
};

const assessments = [
  { id: 'ecom-quiz', unit: 'ECOM1000', name: 'Quiz', weight: '15%', due: '2026-08-14T22:00:00+08:00', dueLabel: '14 aug · 10:00pm', note: 'Modules 1–3 · MyLab · 90 min' },
  { id: 'econ-experiment', unit: 'ECON1000', name: 'MyLabs Experiment', weight: '5%', due: '2026-08-16T21:00:00+08:00', dueLabel: '16 aug · 9:00pm', note: 'Strategic interactions · web experiment' },
  { id: 'acct-test', unit: 'ACCT2002', name: 'Semester Test', weight: '30%', due: '2026-08-26T18:00:00+08:00', dueLabel: '26 aug · 6:00pm', note: 'Modules 1–3 · 1h 30m · Respondus' },
  { id: 'taxa-case', unit: 'TAXA2000', name: 'Case Study Analysis', weight: '25%', due: '2026-08-28T23:59:00+08:00', dueLabel: '28 aug · 11:59pm', note: 'Research + set questions · Turnitin' },
  { id: 'econ-gtp', unit: 'ECON1000', name: 'Game Theory Presentation', weight: '30%', due: '2026-09-02T23:59:00+08:00', dueLabel: '2 sep · 11:59pm', note: 'Individual graphical + written analysis' },
  { id: 'acct-portfolio', unit: 'ACCT2002', name: 'Portfolio · Parts A–C', weight: '30%', due: '2026-09-21T23:59:00+08:00', dueLabel: '21 sep · 11:59pm', note: 'MyLab · Modules 4–6 · all parts due together' },
  { id: 'ecom-model', unit: 'ECOM1000', name: 'Assessment 2 · Part 1 · Excel Model', weight: '15%', due: '2026-09-23T23:59:00+08:00', dueLabel: '23 sep · 11:59pm', note: 'Individual MPT / Sharpe Ratio model + Solver' },
  { id: 'taxa-mst', unit: 'TAXA2000', name: 'Invigilated eTest', weight: '25%', due: '2026-09-25T12:00:00+08:00', dueLabel: '25 sep · 12:00pm', note: 'Income · deductions · UCA · CGT · 2h' },
  { id: 'econ-mylabs', unit: 'ECON1000', name: 'MyLabs L3, L5 & L7 Exercises', weight: '15%', due: '2026-10-05T21:00:00+08:00', dueLabel: '5 oct · 9:00pm', note: 'GDP · unemployment · CPI / inflation' },
  { id: 'ecom-report', unit: 'ECOM1000', name: 'Assessment 2 · Parts 2 & 3', weight: '20%', due: '2026-10-14T23:59:00+08:00', dueLabel: '14 oct · 11:59pm', note: 'Peer Evaluation 5% + Group Investment Report 15%' },
  { id: 'econ-mra-a', unit: 'ECON1000', name: 'MRA · Part A', weight: 'part of 50%', due: '2026-10-21T20:00:00+08:00', dueLabel: '21 oct · by 8:00pm', note: '30-minute invigilated eTest · available 8am–8pm' },
  { id: 'acct-final', unit: 'ACCT2002', name: 'Final Examination', weight: '40%', due: '2026-11-02T00:00:00+08:00', dueLabel: 'exam period · 2–13 nov', note: 'Modules 7–10 · closed book · exact date TBA' },
  { id: 'ecom-final', unit: 'ECOM1000', name: 'Final Exam', weight: '50%', due: '2026-11-02T00:00:00+08:00', dueLabel: 'exam period · centrally scheduled', note: 'Closed-book online · 2h 15m · exact date TBA' },
  { id: 'taxa-final', unit: 'TAXA2000', name: 'Invigilated Final Exam', weight: '50%', due: '2026-11-02T00:00:00+08:00', dueLabel: 'exam period · date TBA', note: 'All topics · 2h · remotely invigilated' },
  { id: 'econ-mra-b', unit: 'ECON1000', name: 'MRA · Part B', weight: 'part of 50%', due: '2026-11-05T23:00:00+08:00', dueLabel: '5 nov · 11:00pm', note: 'Final macroeconomic review + analysis' }
].map(item => ({ ...item, dueDate: new Date(item.due) }));

const storedChecks = JSON.parse(localStorage.getItem('unitOutlineChecks') || '{}');
let activeUnit = 'all';
let searchTerm = '';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function awstNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Perth', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return new Date(`${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}+08:00`);
}

function formatToday(date) {
  return new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Perth', day: 'numeric', month: 'short', year: 'numeric' })
    .format(date).toLowerCase();
}

function teachingWeek(date) {
  const ms = date - semesterStart;
  const week = Math.floor(ms / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, Math.min(17, week));
}

function daysUntil(due, now) {
  return Math.ceil((due - now) / (24 * 60 * 60 * 1000));
}

function statusFor(item, now) {
  if (storedChecks[item.id]) return { key: 'done', label: 'checked off' };
  const diff = item.dueDate - now;
  if (diff < 0) return { key: 'done', label: 'past' };
  const hours = diff / 3600000;
  if (hours <= 24) return { key: 'today', label: 'due today' };
  if (hours <= 7 * 24) return { key: 'urgent', label: `${Math.ceil(hours / 24)}d left` };
  return { key: 'future', label: `${Math.ceil(hours / 24)}d left` };
}

function matchesFilters(unitCode, text) {
  const unitOk = activeUnit === 'all' || activeUnit === unitCode;
  const searchOk = !searchTerm || text.toLowerCase().includes(searchTerm);
  return unitOk && searchOk;
}

function unitBadge(unit) {
  return `<span class="unit-badge">${unit.code.toLowerCase()}</span>`;
}

function renderHeader(now) {
  const week = teachingWeek(now);
  const percent = Math.max(0, Math.min(100, ((now - semesterStart) / (semesterEnd - semesterStart)) * 100));
  $('#todayLabel').textContent = formatToday(now);
  $('#weekHeading').textContent = `week ${week} of 17.`;
  $('#semesterProgress').style.width = `${percent}%`;
  $('#semesterPercent').textContent = `${Math.round(percent)}% through semester calendar`;
  const special = week === 5 || week === 11 ? 'tuition free week' : week === 15 ? 'study week' : week >= 16 ? 'exam period' : 'teaching week';
  $('#weekPill').textContent = special;
}

function renderHero(now) {
  const upcoming = assessments.filter(a => a.dueDate >= now && !storedChecks[a.id]).sort((a,b) => a.dueDate - b.dueDate);
  const next = upcoming[0];
  $('#upcomingCount').textContent = upcoming.length;
  $('#loadSummary').textContent = upcoming.length ? `${upcoming.filter(a => daysUntil(a.dueDate, now) <= 30).length} fall within the next 30 days.` : 'nothing left on the tracker.';
  if (!next) {
    $('#nextDeadlineHero').innerHTML = '<h3>all tracked items cleared.</h3><p class="muted">nothing upcoming in the current outline data.</p>';
    return;
  }
  const d = daysUntil(next.dueDate, now);
  $('#nextDeadlineHero').innerHTML = `
    <span class="unit-badge" data-color="${units[next.unit].color}">${next.unit.toLowerCase()}</span>
    <h3>${next.name}</h3>
    <div class="date-big">${next.dueLabel.split(' · ')[0]}.</div>
    <div class="countdown">${d <= 0 ? 'due today' : `${d} day${d === 1 ? '' : 's'} left`}</div>`;
}

function renderDeadlines(now) {
  const list = $('#deadlineList');
  const items = assessments
    .filter(a => a.dueDate >= now && !storedChecks[a.id])
    .sort((a,b) => a.dueDate - b.dueDate)
    .slice(0, 7)
    .filter(a => matchesFilters(a.unit, `${a.unit} ${a.name} ${a.note}`));

  if (!items.length) {
    list.innerHTML = '<p class="muted">no upcoming items match the current filter.</p>';
    return;
  }
  list.innerHTML = items.map(a => {
    const u = units[a.unit];
    const status = statusFor(a, now);
    return `<article class="deadline-item" data-unit="${a.unit}" data-color="${u.color}">
      <div class="deadline-unit">${a.unit}</div>
      <div class="deadline-name"><strong>${a.name}</strong><span>${a.note}</span></div>
      <span class="weight-pill">${a.weight}</span>
      <div class="due-cell"><strong>${a.dueLabel}</strong><span class="status-pill ${status.key}">${status.label}</span></div>
      <button class="check-button ${storedChecks[a.id] ? 'checked' : ''}" data-check="${a.id}" type="button" title="Mark as done">${storedChecks[a.id] ? '✓' : ''}</button>
    </article>`;
  }).join('');
}

function renderWeek(now) {
  const week = teachingWeek(now);
  $('.section-block:nth-of-type(3) h2');
  const weekHeading = $$('.section-block .section-heading h2').find(el => el.textContent.includes('week 7'));
  if (weekHeading) {
    const start = new Date(semesterStart.getTime() + (week - 1) * 7 * 86400000);
    const dateLabel = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Perth', day: 'numeric', month: 'long' }).format(start).toLowerCase();
    weekHeading.textContent = `week ${week} · ${dateLabel}.`;
  }

  const grid = $('#weeklyGrid');
  const visible = Object.values(units).filter(u => matchesFilters(u.code, `${u.code} ${u.name} ${(u.weeks[week] || []).join(' ')}`));
  grid.innerHTML = visible.map(u => {
    const w = u.weeks[week] || ['No outline entry for this week', '', ''];
    return `<article class="week-card" data-unit="${u.code}" data-color="${u.color}">
      ${unitBadge(u)}
      <h3>${w[0]}</h3>
      <p>${w[1]}</p>
      <p class="micro">${w[2]}</p>
    </article>`;
  }).join('') || '<p class="muted">no weekly items match the current filter.</p>';
}

function renderUnits() {
  const grid = $('#unitGrid');
  const visible = Object.values(units).filter(u => matchesFilters(u.code, `${u.code} ${u.name} ${u.summary} ${u.reference}`));
  grid.innerHTML = visible.map(u => `<article class="unit-card" data-unit="${u.code}" data-color="${u.color}" tabindex="0" role="button" aria-label="Open ${u.code} details">
    ${unitBadge(u)}
    <h3>${u.name}</h3>
    <p class="unit-summary">${u.summary}</p>
    <div class="unit-meta"><span>${u.reference}</span><span>${u.pattern}</span></div>
  </article>`).join('') || '<p class="muted">no units match the current filter.</p>';
}

function renderTable(now) {
  const body = $('#assessmentTableBody');
  const visible = assessments.filter(a => matchesFilters(a.unit, `${a.unit} ${a.name} ${a.note} ${a.dueLabel}`));
  body.innerHTML = visible.map(a => {
    const u = units[a.unit];
    const status = statusFor(a, now);
    const checked = !!storedChecks[a.id];
    return `<tr class="${checked ? 'row-done' : ''}" data-unit="${a.unit}">
      <td><button class="check-button ${checked ? 'checked' : ''}" data-check="${a.id}" type="button">${checked ? '✓' : ''}</button></td>
      <td><span class="unit-badge" data-color="${u.color}">${a.unit.toLowerCase()}</span></td>
      <td><strong class="assessment-name">${a.name}</strong><br><span class="muted">${a.note}</span></td>
      <td>${a.weight}</td>
      <td>${a.dueLabel}</td>
      <td><span class="status-pill ${status.key}">${status.label}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="6" class="muted">no assessments match the current filter.</td></tr>';
}

function openUnitModal(code) {
  const u = units[code];
  const unitAssessments = assessments.filter(a => a.unit === code);
  $('#modalContent').innerHTML = `
    <div class="modal-title" data-color="${u.color}">
      ${unitBadge(u)}
      <h2 id="modalTitle">${u.name}</h2>
    </div>
    <div class="detail-grid">
      <div class="detail-box"><span>coordinator</span><strong>${u.coordinator}</strong></div>
      <div class="detail-box"><span>class pattern</span><strong>${u.pattern}</strong></div>
      <div class="detail-box"><span>referencing</span><strong>${u.reference}</strong></div>
    </div>
    <div class="modal-section"><h3>pass requirement</h3><p class="muted">${u.pass}</p></div>
    <div class="modal-section"><h3>assessment map</h3><div class="modal-assessments">
      ${unitAssessments.map(a => `<div class="modal-assessment"><div><strong>${a.name}</strong><br><span>${a.note}</span></div><div><strong>${a.weight}</strong><br><span>${a.dueLabel}</span></div></div>`).join('')}
    </div></div>
    <div class="modal-section"><h3>important outline notes</h3><ul>${u.details.map(d => `<li>${d}</li>`).join('')}</ul></div>
    <div class="modal-section"><h3>contact</h3><p class="muted">${u.contact}</p></div>`;
  $('#unitModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#unitModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function saveChecks() {
  localStorage.setItem('unitOutlineChecks', JSON.stringify(storedChecks));
}

function refresh() {
  const now = awstNow();
  renderHeader(now);
  renderHero(now);
  renderDeadlines(now);
  renderWeek(now);
  renderUnits();
  renderTable(now);
}

document.addEventListener('click', event => {
  const filter = event.target.closest('[data-unit].filter-chip');
  if (filter) {
    activeUnit = filter.dataset.unit;
    $$('.filter-chip').forEach(b => b.classList.toggle('active', b === filter));
    refresh();
    return;
  }

  const check = event.target.closest('[data-check]');
  if (check) {
    const id = check.dataset.check;
    storedChecks[id] = !storedChecks[id];
    if (!storedChecks[id]) delete storedChecks[id];
    saveChecks();
    refresh();
    return;
  }

  const unitCard = event.target.closest('.unit-card');
  if (unitCard) openUnitModal(unitCard.dataset.unit);

  if (event.target === $('#unitModal') || event.target.closest('#closeModal')) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
  if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('unit-card')) {
    event.preventDefault();
    openUnitModal(event.target.dataset.unit);
  }
});

$('#searchInput').addEventListener('input', event => {
  searchTerm = event.target.value.trim().toLowerCase();
  refresh();
});

$('#resetChecks').addEventListener('click', () => {
  Object.keys(storedChecks).forEach(k => delete storedChecks[k]);
  saveChecks();
  refresh();
});

refresh();
