// Leonida Trophy Guide — GTA VI, PS5, 55 trophies.
// Data: app/data/trophies.json (id, name, description, grade, guide, plus
// kind, missable, hidden, count, sources, roadmap and steps per trophy, and
// top-level meta + roadmap — see NOTES.md). This file reads those fields
// when present and falls back to its own classification tables below, which
// encode the same published list (PowerPyx / GTABase / PSNProfiles,
// 18 Nov 2026) in case the data file is ever the bare starter again.
// Progress lives only in localStorage; the page makes no network request at
// all — the only fetch is the local data file.
//
// Classification (cross-checked 19 Nov 2026):
//   story        — the 12 hidden story trophies (chapters + missions), all
//                  unmissable, all pop automatically (PowerPyx).
//   collectibles — counted pickups / spots / sets / properties.
//   activities   — races, stunts, robberies, side strands, money, combat.
//   online       — none. Every one of the 55 is offline single-player.
//   missable     — exactly one: Positive Mental Attitude (#28). Its first
//                  meditation spot, at home in Chapter 1, is gone after
//                  Chapter 1 (PowerPyx, GTABase).
//   hidden       — 28 trophies (12 story + 16 side) stay hidden on PSN
//                  until earned; their names spoil missions, so spoiler-safe
//                  mode hides them until earned.

const DATA_URL = 'data/trophies.json';
const STORE_KEY = 'gta6-trophy-guide-v1';

// --- classification tables (by trophy id, from the published list) ---
const KIND_BY_ID = {
  1: 'platinum',
  2: 'story', 3: 'story', 4: 'story', 5: 'story', 6: 'story', 7: 'story',
  8: 'story', 9: 'story', 10: 'story', 11: 'story', 12: 'story', 13: 'story',
  14: 'activities', 15: 'activities', 16: 'activities', 17: 'activities',
  18: 'activities', 19: 'activities', 20: 'activities', 21: 'activities',
  22: 'activities', 23: 'activities', 24: 'activities', 25: 'activities',
  26: 'activities', 27: 'activities',
  28: 'collectibles', 29: 'activities', 30: 'collectibles', 31: 'collectibles',
  32: 'activities', 33: 'activities', 34: 'activities', 35: 'collectibles',
  36: 'activities', 37: 'activities', 38: 'activities', 39: 'activities',
  40: 'activities', 41: 'activities', 42: 'collectibles', 43: 'activities',
  44: 'activities', 45: 'activities', 46: 'activities', 47: 'activities',
  48: 'activities', 49: 'activities', 50: 'activities', 51: 'activities',
  52: 'activities', 53: 'activities', 54: 'collectibles', 55: 'collectibles',
};
const MISSABLE_IDS = new Set([28]);
const HIDDEN_IDS = new Set([
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, // story
  22, 23, 24, 25, 26, 27, 33, 34, 38, 44, 45, 47, 48, 49, 50, 51, // side
]);

// Short approach notes, one per trophy, in my own words.
const TIPS = {
  1: 'Nothing to do directly — it pops the moment the other 54 are earned. Finish the roadmap below and it is yours.',
  2: 'Story, unmissable. Finish the opening mission Gone Fishing and it pops.',
  3: 'Story, unmissable. Play through Chapter 1 to the end.',
  4: 'Story, unmissable. Play through Chapter 2 to the end.',
  5: 'Story, unmissable. Play through Chapter 3 to the end.',
  6: 'Story, unmissable. Play through Chapter 4 to the end.',
  7: 'Story, unmissable. Finish the final mission — the gold pops with the credits.',
  8: 'Story, unmissable. Complete the mission Breakfast Run when it appears.',
  9: 'Story, unmissable. Complete The Cartel Heist when it appears.',
  10: 'Story, unmissable. Complete Child\u2019s Play when it appears.',
  11: 'Story, unmissable. Complete Headliners when it appears.',
  12: 'Story, unmissable. Complete VCIA Takedown when it appears.',
  13: 'Story, unmissable. Complete Operation Savage Glory when it appears.',
  14: 'The hardest trophy. After the story, open Progress > Stats > 100% Completion and clear the checklist. Most of it comes free from the other trophies; the thresholds are lenient (about 60% of true completion, per PowerPyx).',
  15: 'Stunts stack naturally: jumps, near misses, drifts and airtime all count. Chase ramps and long drops to finish the 250 faster.',
  16: 'Try all 9 activity types once — races, fishing, bowling, arcade, shooting range, drone races, meditation, darts-style minigames and one more. One try each is enough.',
  17: 'Gold all 42 Shooting Range challenges. Slow down, use Combat Focus to steady aim, and repeat the ones you silver until they turn gold.',
  18: 'Win a Top Fun Drone Race at every one of the 14 locations. Learn each course once, then race it clean — crashing costs more time than careful flying.',
  19: 'Win 20 different races. Any race type counts; repeat wins on the same race do not.',
  20: 'Beat Cal in a fishing challenge. Watch the tension meter — reel in on slack, ease off when it spikes.',
  21: 'Finish any one arcade game. Pick the shortest cabinet and play it through.',
  22: 'Keep taking Andy\u2019s missions whenever he calls. His final mission ends the strand and pops the trophy.',
  23: 'Keep taking Kenton\u2019s missions whenever he calls. His final mission ends the strand and pops the trophy.',
  24: 'Keep taking Billy\u2019s missions whenever he calls. His final mission ends the strand and pops the trophy.',
  25: 'Finish 8 stranger mission strands across Leonida. Strangers show on the map — do their chains as you meet them instead of leaving them for the end.',
  26: 'Keep taking Randy\u2019s missions whenever he calls. His final mission ends the strand and pops the trophy.',
  27: 'Keep taking Tyrone\u2019s missions whenever he calls. His final mission ends the strand and pops the trophy.',
  28: 'THE missable one. Meditate at all 18 spots in 10 locations — and do the FIRST one in Chapter 1: one morning after the mission Down to Earth, Lucia meditates on the balcony at Jason\u2019s house. Talk to her, follow her, choose Accept. That meditation disappears after Chapter 1. After that, the rest can wait until free roam.',
  29: 'Hunt the unique animal for Bret. Follow his clues to the animal\u2019s territory, track it quietly, and take one clean shot.',
  30: 'Complete 3 Collectible Card sets. Cards hide in shops, houses and odd corners — trade duplicates with other players\u2019 stashes where the game allows.',
  31: 'WAiNK It at 100 locations. The photo spots are spread across the whole state — tick them off while exploring for The Goodtime State.',
  32: 'Finish 50 Challenges. Challenges overlap heavily with the other trophies; play broadly and they fall out on their own.',
  33: 'With your partner beside you, reach a 4-star Wanted Level, then break line of sight and hide until it clears. Alleys and water help.',
  34: 'Rob 3 shops back-to-back with your partner without losing your Wanted Level — keep the wanted stars you already have, just do not let them clear between shops.',
  35: 'Discover 100 vehicles. Drive anything new you see, even briefly — discovery counts on first drive, not ownership.',
  36: 'Down 5 enemies in a single use of Combat Focus. Group enemies first (a tight street works), then trigger it and sweep.',
  37: 'At VCIA, leave in an unscheduled way — steal a plane and take off without clearance.',
  38: 'Deal with the Rhino tanks. Steal one if you can, or take one down — either way, expect the army to notice.',
  39: 'Rob a jewelry store without being detected. Go at night, move quietly, and leave before the alarm trips.',
  40: 'Rob 5 Bank Vaults and escape. Plan the getaway vehicle first — the escape is the hard half.',
  41: 'Rob an Armored Truck and escape. Stop the truck, crack it, grab the cash and lose the heat.',
  42: 'Explore all 52 areas of Leonida. The map fills in as you visit — sweep the corners last, after the story opens the whole state.',
  43: 'Rob one Illegal Operation belonging to each of the 9 gangs. Mark each gang off as you go so none is left for the end.',
  44: 'Have a cocktail with a view on Ocean Beach. Find the beachfront bar, order, and enjoy the view.',
  45: 'Smash your way out of a vehicle showroom in classic style. Pick a showroom, pick a fast car, and go through the glass.',
  46: 'Play bowling at the Kolt & Associates alley. One full game, follow-through included.',
  47: 'A partnership moment with mass appeal — spend time with your partner and let the scene play out.',
  48: 'Make 500 choices that change your Criminal Profile. It counts up across normal play — but do not push toward the Irredeemable profile, which is permanent.',
  49: 'Fail an activity, then succeed on the second try. If you ace everything first time, pick one short activity and deliberately fail it once.',
  50: 'Witness something strange. Explore odd spots at night — the state hides a few encounters that only trigger in the right place at the right time.',
  51: 'Knock someone down with a melee drive-by. Slow the car beside a pedestrian, swing, and keep driving.',
  52: 'Launder $250,000 of Marked Bills through your contacts. Bills come from robberies — launder them steadily instead of hoarding.',
  53: 'Spend $100,000 across all shops. Clothes, weapons, food and cars all count; it adds up fast late in the game.',
  54: 'Buy all 8 garage properties. Save the cash — garages are the big post-story purchase.',
  55: 'Register 10 vehicles to the Scooter Bros app. Any 10 distinct vehicles you own or find will do.',
};

// The platinum roadmap, in play order.
const ROADMAP = [
  { title: 'Start the missable first — meditate in Chapter 1', body: 'Positive Mental Attitude is the only trophy that can be missed: its first meditation spot, at home in Chapter 1, disappears after that chapter. Meditate there the moment the game offers it, then keep meditating at every spot you pass.', trophies: '1 missable: #28 Positive Mental Attitude' },
  { title: 'Play the story — 5 chapters, 60–80 hours', body: 'All 12 story trophies pop automatically as you finish chapters and missions. No trophy here can be missed. Keep cheats off — any cheat disables trophies and saving.', trophies: '12 story trophies, incl. the gold finale' },
  { title: 'Strangers and side missions', body: 'Finish the five character strands (Andy, Kenton, Billy, Randy, Tyrone) and 8 stranger strands across the state. Take their calls as they come so nothing is left for a second run.', trophies: '#22–27 + #25 Strangers & Freaks' },
  { title: 'Explore Leonida', body: 'Cover all 52 areas, discover 100 vehicles, meditate at the remaining spots, finish 3 card sets, WAiNK It at 100 locations and buy all 8 garages. Most of this happens naturally while travelling between missions.', trophies: '#28, #30, #31, #35, #42, #54, #55' },
  { title: 'Activities, stunts and robberies', body: '250 stunts, gold in all 42 Shooting Range challenges, 20 race wins, drone races at all 14 spots, fishing, arcade and bowling, plus the bank vaults, armored truck and gang operations. Save the shooting range gold for when your aim is warm.', trophies: '#15–21, #32–41, #43, #46, #51–53' },
  { title: 'Cleanup: 100% completion, then platinum', body: 'After the story, open Progress > Stats > 100% Completion and clear the checklist. A Long Road (gold) pops, and Vice Got a Price! follows immediately — the platinum is yours.', trophies: '#14 A Long Road → #1 Vice Got a Price!' },
];

// Guide pages the detail panel links to (verified 19 Nov 2026; the
// per-trophy sources in trophies.json are shown first in the detail panel).
const SOURCES = [
  { label: 'PowerPyx — GTA 6 Trophy Guide & Roadmap', url: 'https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/' },
  { label: 'Sixth Shore — GTA 6 Trophy and Achievement List', url: 'https://sixshore.com/gta-6/guides/trophies-and-achievements/' },
  { label: 'Planet GTA 6 — All 55 trophies and Xbox achievements', url: 'https://www.planetgta6.com/en/gta-6-trophies/' },
  { label: 'GTA Zone — GTA 6 Trophy List', url: 'https://gta-zone.com/news/gta-6-trophies-achievements/' },
  { label: 'CryptoGames — GTA 6 Trophies and Achievements', url: 'https://cryptogames.gg/gta-6-trophies-achievements-full-list/' },
  { label: 'eGamers — GTA 6 Trophy List', url: 'https://egamers.io/gta-6-trophy-list-all-55-trophies-and-achievements-plus-the-hardest-ones/' },
];

const GRADE_COLORS = { platinum: '#7df9e8', gold: '#ffd23e', silver: '#cfd6e4', bronze: '#e09a5a' };
const GRADE_LABEL = { platinum: 'Platinum', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' };
const KIND_LABEL = { story: 'Story', missable: 'Missable', collectibles: 'Collectibles', activities: 'Activities', online: 'Online', platinum: 'Platinum' };

// --- state ---
const params = new URLSearchParams(location.search);
let trophies = [];
let earned = new Set();
let spoiler = true;
let kindFilter = 'all';
let gradeFilter = 'all';
let earnedFilter = 'all';
let query = '';
let selectedId = null;

const $ = (id) => document.getElementById(id);
const listEl = $('trophyList');
const detailEl = $('detailPanel');

function loadStored() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? 'null');
    if (raw && Array.isArray(raw.earned)) earned = new Set(raw.earned.filter((n) => Number.isInteger(n)));
    if (raw && typeof raw.spoiler === 'boolean') spoiler = raw.spoiler;
  } catch { /* corrupted save: start fresh */ }
}
function saveStored() {
  localStorage.setItem(STORE_KEY, JSON.stringify({ earned: [...earned].sort((a, b) => a - b), spoiler }));
}

// Demo mode (?demo=1) pre-ticks a few trophies in memory only, for screenshots.
function applyDemo() {
  if (params.get('demo') === '1') [2, 3, 8, 15, 28, 35].forEach((id) => earned.add(id));
}

function kindOf(t) {
  // The platinum is its own category, whatever the data file calls it.
  if (t.grade === 'platinum') return 'platinum';
  return t.kind ?? KIND_BY_ID[t.id] ?? 'activities';
}
function isMissable(t) { return t.missable ?? MISSABLE_IDS.has(t.id); }
function isHidden(t) { return t.hidden ?? HIDDEN_IDS.has(t.id); }
function isConcealed(t) { return spoiler && !earned.has(t.id) && (kindOf(t) === 'story' || isHidden(t)); }
function countOf(t) {
  const text = `${t.description} ${t.guide}`;
  const m = text.match(/(\d+)\s*(meditation spots|locations|spots|areas|vehicles|races|challenges|sets|properties|vaults|gangs|strands|stunts|trophies|actions|tasks|animals|operations)/i);
  if (typeof t.count === 'number') {
    const unit = m ? m[2].toLowerCase() : 'items';
    return `${t.count} ${unit}`;
  }
  return m ? `${m[1]} ${m[2].toLowerCase()}` : null;
}

function trophyIcon(t, size) {
  const c = GRADE_COLORS[t.grade] || '#cfd6e4';
  const star = t.grade === 'platinum'
    ? `<path d="M22 4l1.8 3.8 4.2.6-3 3 .7 4.1L22 13.6l-3.7 1.9.7-4.1-3-3 4.2-.6z" fill="${c}"/>` : '';
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M12 6h24v6a12 12 0 0 1-24 0z" fill="${c}"/>
    <path d="M12 8H6a6 6 0 0 0 6 8M36 8h6a6 6 0 0 1-6 8" fill="none" stroke="${c}" stroke-width="3"/>
    <rect x="22" y="24" width="4" height="10" fill="${c}"/>
    <rect x="14" y="34" width="20" height="5" rx="2" fill="${c}"/>${star}</svg>`;
}

function renderRoadmap(dataRoadmap) {
  // Prefer the roadmap stages from trophies.json; fall back to my own.
  const stages = Array.isArray(dataRoadmap) && dataRoadmap.length ? dataRoadmap : null;
  if (stages) {
    $('roadmapSteps').innerHTML = stages.map((s) => {
      const ids = trophies.filter((t) => t.roadmap?.stage === s.stage).map((t) => `#${t.id}`);
      return `<li><div><h3>${s.title}</h3><p>${s.note}</p><p class="trophies">${ids.length ? ids.join(', ') : ''}</p></div></li>`;
    }).join('');
    return;
  }
  $('roadmapSteps').innerHTML = ROADMAP.map((s) =>
    `<li><div><h3>${s.title}</h3><p>${s.body}</p><p class="trophies">${s.trophies}</p></div></li>`).join('');
}

function renderSources() {
  $('sourceList').innerHTML = SOURCES.map((s) =>
    `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('');
}

function visibleTrophies() {
  return trophies.filter((t) => {
    if (kindFilter === 'missable' && !isMissable(t)) return false;
    if (kindFilter === 'online') return false; // no online trophies exist
    if (kindFilter !== 'all' && kindFilter !== 'missable' && kindOf(t) !== kindFilter) return false;
    if (gradeFilter !== 'all' && t.grade !== gradeFilter) return false;
    if (earnedFilter === 'earned' && !earned.has(t.id)) return false;
    if (earnedFilter === 'missing' && earned.has(t.id)) return false;
    if (query) {
      const hay = isConcealed(t) ? `${kindOf(t)} ${t.grade}` : `${t.name} ${t.description} ${t.guide}`;
      if (!hay.toLowerCase().includes(query)) return false;
    }
    return true;
  });
}

function renderList() {
  const shown = visibleTrophies();
  $('emptyState').hidden = !(kindFilter === 'online');
  $('listCount').textContent = kindFilter === 'online'
    ? '0 trophies — the whole list is offline single-player.'
    : `Showing ${shown.length} of 55 trophies · ${shown.filter((t) => earned.has(t.id)).length} earned in this view`;
  $('filterNote').textContent = kindFilter === 'missable'
    ? '⚠ Only one trophy can be missed — Positive Mental Attitude (#28). Meditate at the Chapter 1 home spot before Chapter 1 ends.'
    : kindFilter === 'online'
      ? 'There are no online trophies in GTA VI — nothing to earn in GTA Online for this platinum.'
      : '';
  listEl.innerHTML = shown.map((t) => {
    const done = earned.has(t.id);
    const concealed = isConcealed(t);
    const name = concealed
      ? (kindOf(t) === 'story' ? 'Story trophy — hidden to avoid spoilers' : 'Hidden trophy — earn it to reveal it')
      : t.name;
    const desc = concealed ? 'Name and description hidden while spoiler-safe mode is on.' : t.description;
    const count = countOf(t);
    return `<li class="trophy ${done ? 'earned' : ''} ${selectedId === t.id ? 'selected' : ''}" data-id="${t.id}" tabindex="0" role="button" aria-pressed="${done}">
      <input type="checkbox" ${done ? 'checked' : ''} aria-label="Mark ${concealed ? 'trophy' : t.name} earned" data-check="${t.id}">
      ${trophyIcon(t, 44)}
      <div>
        <h3 class="${concealed ? 'spoiler-name' : ''}">${name}</h3>
        <p class="desc">${desc}</p>
        <div class="tags">
          <span class="tag grade-${t.grade}">${GRADE_LABEL[t.grade]}</span>
          ${['platinum','missable'].includes(kindOf(t)) ? '' : `<span class="tag kind">${KIND_LABEL[kindOf(t)]}</span>`}
          ${isMissable(t) ? '<span class="tag missable">⚠ Missable</span>' : ''}
          ${isHidden(t) && !done ? '<span class="tag hidden">Hidden</span>' : ''}
        </div>
      </div>
      <span class="count">${count ?? ''}</span>
    </li>`;
  }).join('');
}

function renderProgress() {
  const total = trophies.length || 55;
  const done = trophies.filter((t) => earned.has(t.id)).length;
  const pct = Math.round((done / total) * 100);
  $('progressText').textContent = `${done} of ${total} earned`;
  $('progressPct').textContent = `${pct}%`;
  $('progressFill').style.width = `${pct}%`;
  $('progressSub').textContent = done === total
    ? 'Platinum earned — Vice Got a Price! You are a Leonida Legend.'
    : `Platinum progress: ${total - done} to go — next, ${nextSuggested()}.`;
  const byGrade = (g) => trophies.filter((t) => t.grade === g && earned.has(t.id)).length;
  $('statPlat').textContent = `${byGrade('platinum')} / 1`;
  $('statGold').textContent = `${byGrade('gold')} / 2`;
  $('statSilver').textContent = `${byGrade('silver')} / 6`;
  $('statBronze').textContent = `${byGrade('bronze')} / 46`;
}
function nextSuggested() {
  if (!earned.has(28)) return 'meditate at the Chapter 1 home spot before it is gone (#28)';
  const story = trophies.find((t) => kindOf(t) === 'story' && !earned.has(t.id));
  return story ? 'keep playing the story' : 'finish the side strands and collectibles';
}

function renderDetail() {
  const t = trophies.find((x) => x.id === selectedId);
  if (!t) { detailEl.innerHTML = '<p class="detail-hint">Select a trophy on the left to see its full guide and sources here.</p>'; return; }
  const done = earned.has(t.id);
  const concealed = isConcealed(t);
  const tips = TIPS[t.id] ?? t.guide;
  const steps = (t.steps ?? []).map((s) => `<li>${s}</li>`).join('');
  detailEl.innerHTML = `
    ${trophyIcon(t, 56)}
    <h3>${concealed ? 'Hidden trophy' : t.name}</h3>
    <p class="desc">${concealed ? 'This trophy is hidden on PSN until earned. Turn spoiler-safe mode off, or earn it, to reveal its name and description.' : t.description}</p>
    <div class="tags">
      <span class="tag grade-${t.grade}">${GRADE_LABEL[t.grade]}</span>
      ${['platinum','missable'].includes(kindOf(t)) ? '' : `<span class="tag kind">${KIND_LABEL[kindOf(t)]}</span>`}
      ${isMissable(t) ? '<span class="tag missable">⚠ Missable</span>' : ''}
      ${isHidden(t) ? '<span class="tag hidden">Hidden on PSN</span>' : ''}
      <span class="tag">${done ? '✓ Earned' : 'Not earned yet'}</span>
    </div>
    ${isMissable(t) ? '<h4>Missable warning</h4><p class="warn"><strong>Do this early.</strong> During Chapter 1, one morning after the mission Down to Earth, Lucia meditates on the balcony at Jason\u2019s house. Talk to her, follow her and choose Accept — that meditation disappears after Chapter 1. The other 17 spots can wait until free roam.</p>' : ''}
    <h4>Guide</h4>
    <p>${concealed ? 'Guide hidden with the trophy name while spoiler-safe mode is on.' : t.guide}</p>
    <p>${concealed ? '' : tips}</p>
    ${steps ? `<h4>Steps</h4><ol class="guide-steps">${steps}</ol>` : ''}
    <h4>Sources</h4>
    <p>Grade and description: official PS5 trophy list as reported 18 Nov 2026 (PSNProfiles / TrueTrophies / Exophase). Approach and missable status: PowerPyx and GTABase, cross-checked with the guides listed below this panel.</p>
    ${(t.sources ?? []).map((s) => `<p>↗ <a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></p>`).join('')}
    <button type="button" id="detailToggle">${done ? 'Mark as not earned' : 'Mark as earned'}</button>`;
  $('detailToggle').addEventListener('click', () => toggleEarned(t.id));
}

function renderAll() { renderList(); renderProgress(); renderDetail(); }

function toggleEarned(id) {
  if (earned.has(id)) earned.delete(id); else earned.add(id);
  saveStored(); renderAll();
}

// --- events ---
listEl.addEventListener('click', (e) => {
  const check = e.target.closest('[data-check]');
  if (check) { toggleEarned(Number(check.dataset.check)); return; }
  const row = e.target.closest('.trophy');
  if (row) { selectedId = Number(row.dataset.id); renderAll(); }
});
listEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const row = e.target.closest('.trophy');
    if (row) { e.preventDefault(); selectedId = Number(row.dataset.id); renderAll(); }
  }
});
$('kindChips').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-kind]');
  if (!btn) return;
  kindFilter = btn.dataset.kind;
  document.querySelectorAll('#kindChips .chip').forEach((c) => c.classList.toggle('active', c === btn));
  renderAll();
});
$('gradeFilter').addEventListener('change', (e) => { gradeFilter = e.target.value; renderAll(); });
$('earnedFilter').addEventListener('change', (e) => { earnedFilter = e.target.value; renderAll(); });
$('search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderAll(); });
$('spoilerToggle').addEventListener('change', (e) => { spoiler = e.target.checked; saveStored(); renderAll(); });
$('exportBtn').addEventListener('click', () => {
  const payload = { game: 'Grand Theft Auto VI', platform: 'PS5', exportedAt: new Date().toISOString(), earned: [...earned].sort((a, b) => a - b) };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
$('importFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const ids = Array.isArray(data) ? data : data.earned;
    if (!Array.isArray(ids)) throw new Error('no earned list');
    earned = new Set(ids.filter((n) => Number.isInteger(n) && n >= 1 && n <= 55));
    saveStored(); renderAll();
  } catch { alert('That file is not a valid progress export.'); }
  e.target.value = '';
});
$('resetBtn').addEventListener('click', () => {
  if (confirm('Clear all earned trophies?')) { earned.clear(); saveStored(); renderAll(); }
});

// --- screenshot presets (?shot=cover|roadmap|missable|spoiler) ---
function applyShotPreset() {
  const shot = params.get('shot');
  if (params.get('filter')) kindFilter = params.get('filter');
  if (params.get('spoiler') === 'off') spoiler = false;
  if (params.get('spoiler') === 'on') spoiler = true;
  if (params.get('detail')) selectedId = Number(params.get('detail'));
  if (shot === 'cover') { selectedId = 28; document.body.classList.add('shot-compact'); }
  if (shot === 'missable') { kindFilter = 'missable'; selectedId = 28; document.body.classList.add('shot-compact'); }
  if (shot === 'spoiler') { kindFilter = 'story'; spoiler = true; selectedId = 4; document.body.classList.add('shot-compact'); [2, 3, 8].forEach((id) => earned.delete(id)); }
  if (shot === 'roadmap') document.body.classList.add('shot-roadmap');
  if (kindFilter !== 'all') {
    document.querySelectorAll('#kindChips .chip').forEach((c) =>
      c.classList.toggle('active', c.dataset.kind === kindFilter));
  }
}

// --- boot ---
async function boot() {
  loadStored();
  applyDemo();
  $('spoilerToggle').checked = spoiler;
  const res = await fetch(DATA_URL);
  const data = await res.json();
  trophies = data.trophies ?? [];
  renderRoadmap(data.roadmap);
  renderSources();
  applyShotPreset();
  renderAll();
}
boot();
