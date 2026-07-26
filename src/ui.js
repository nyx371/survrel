// Rendering. One scrollable narrative feed; everything else is fixed.
// The feed appends log entries (including scene blocks) in order, so the
// newest information is always at the bottom, styled in place.

import { icon } from './icons.js';
import { ITEMS } from './data/items.js';
import { CITY_W, CITY_H } from './world.js';

const $ = (sel) => document.querySelector(sel);

// Word-by-word reveal: wraps words of newly added blocks in staggered spans.
// Fast (capped ~2s per batch), skippable by tapping the feed.
function revealWords(root, startDelay) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim()) nodes.push(walker.currentNode);
  }
  const spans = [];
  for (const n of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of n.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const s = document.createElement('span');
        s.className = 'tw';
        s.textContent = part;
        frag.appendChild(s);
        spans.push(s);
      }
    }
    n.parentNode.replaceChild(frag, n);
  }
  const step = Math.min(30, Math.max(10, 1800 / Math.max(1, spans.length)));
  spans.forEach((s, i) => { s.style.animationDelay = `${startDelay + i * step}ms`; });
  return startDelay + spans.length * step;
}

const WX_ICON = { clear: 'day', overcast: 'day', rain: 'rain', snap: 'snow' };
const WX_LABEL = { clear: 'clear', overcast: 'overcast', rain: 'rain', snap: 'cold snap' };
const ARROWS = { north: '↑', east: '→', south: '↓', west: '←' };
const STD_ORDER = ['search', 'rest', 'fire', 'sleep'];
const STD_META = {
  search: { icon: 'search', label: 'Search' },
  rest: { icon: 'wait', label: 'Rest' },
  fire: { icon: 'fire', label: 'Light a fire' },
  sleep: { icon: 'sleep', label: 'Sleep' },
};

function costBadge(cost, gain = false) {
  if (gain) return `<span class="badge badge-gain">${icon('energy')}+</span>`;
  if (!cost || !cost.energy) return '';
  return `<span class="badge">${icon('energy')}${cost.energy}</span>`;
}

export class UI {
  constructor(game, callbacks) {
    this.g = game;
    this.cb = callbacks; // { onAction(id, arg), onNewGame(), onUseItem(id), onDropItem(id) }
    this.panel = null; // null | 'inv' | 'map'
    this.lastSeq = 0;
    // 'story' weaves actions into the prose as links; 'buttons' is the dock
    this.uiMode = (typeof localStorage !== 'undefined' && localStorage.getItem('survrel.uimode')) || 'story';
  }

  setUiMode(mode) {
    this.uiMode = mode;
    try { localStorage.setItem('survrel.uimode', mode); } catch (e) { /* ignore */ }
    this.render();
  }

  setGame(game) {
    this.g = game;
    this.panel = null;
    this.lastSeq = 0;
    $('#feed').innerHTML = '';
  }

  render() {
    const s = this.g.s;
    this._twDelay = 0;
    this.renderHeader();
    this.renderStats();
    this.renderLocbar();
    this.renderFeed();
    this.renderDock();
    this.renderPanel();
    this.renderAtmosphere();
    $('#death').classList.toggle('hidden', s.mode !== 'dead');
    if (s.mode === 'dead') this.renderDeath();
    this._booted = true;
    // scroll after the dock has rendered: a grown dock (encounter banner,
    // tactics, exits) shrinks the feed after the fact and would hide the
    // newest lines. The rAF pass catches the post-layout height.
    this.scrollFeed();
  }

  scrollFeed() {
    const feed = $('#feed');
    feed.scrollTop = feed.scrollHeight;
    requestAnimationFrame(() => { feed.scrollTop = feed.scrollHeight; });
  }

  renderHeader() {
    const g = this.g;
    const wx = g.weather;
    $('#hud-day').innerHTML = `${icon(g.isNight ? 'night' : 'day')}<span>Day ${g.s.day}</span>`;
    $('#hud-time').textContent = g.timeString();
    $('#hud-wx').innerHTML = `${icon(WX_ICON[wx])}<span>${WX_LABEL[wx]}</span>`;
    const grit = g.s.grit || { level: 0, xp: 0 };
    const gritEl = $('#hud-grit');
    gritEl.classList.toggle('hidden', grit.level === 0);
    if (grit.level > 0) {
      gritEl.innerHTML = `${icon('knife')}<span>${grit.level}</span>`;
      gritEl.title = `Grit ${grit.level} — this city is teaching you`;
    }
  }

  renderStats() {
    const st = this.g.s.stats;
    const bleeding = !!(this.g.s.conditions && this.g.s.conditions.bleeding);
    const bars = [
      ['energy', 'energy', st.energy, ''],
      ['health', 'health', st.health, bleeding ? 'stat-bleed' : ''],
      ['hunger', 'hunger', st.hunger, ''],
      ['warmth', st.warmth < 40 ? 'cold' : 'hot', st.warmth, ''],
    ];
    $('#stats').innerHTML = bars.map(([key, ic, val, extra]) => `
      <div class="stat stat-${key} ${val < 25 ? 'stat-low' : ''} ${extra}" title="${key}: ${Math.round(val)}${extra ? ' — bleeding' : ''}">
        ${icon(ic)}
        <div class="bar"><div class="bar-fill" style="width:${Math.max(0, Math.min(100, val))}%"></div></div>
        <span class="stat-num">${Math.round(val)}</span>
      </div>`).join('');
  }

  renderLocbar() {
    const { title, sub } = this.g.locTitle();
    const noise = Math.min(4, Math.round(this.g.s.noise || 0));
    const noiseHtml = noise > 0
      ? `<span class="noise" title="noise draws the dead">${icon('radio')}${'●'.repeat(noise)}${'○'.repeat(4 - noise)}</span>`
      : '';
    $('#locbar').innerHTML = `<b>${title}</b><span>${sub}</span>${noiseHtml}`;
  }

  renderFeed() {
    const feed = $('#feed');
    const fresh = this.g.s.log.filter((l) => (l.seq || 0) > this.lastSeq);
    if (fresh.length) feed.classList.remove('tw-done');
    for (const l of fresh) {
      const div = document.createElement('div');
      if (l.kind === 'scene') {
        div.className = 'fb fb-scene';
        div.innerHTML = `<h2>${l.title}</h2><div class="fb-sub">${l.sub}</div>`
          + l.text.split('\n\n').map((p) => `<p>${p}</p>`).join('');
      } else {
        div.className = `fb fb-line log-${l.kind}`;
        div.textContent = l.text;
      }
      feed.appendChild(div);
      // type out new content — but not the restored history on first paint
      if (this._booted) this._twDelay = revealWords(div, this._twDelay);
      this.lastSeq = l.seq || this.lastSeq;
    }
    while (feed.children.length > 150) feed.removeChild(feed.firstChild);
  }

  renderAtmosphere() {
    const g = this.g;
    document.body.dataset.phase = g.dayPhase;
    const st = g.s.stats;
    const veil = $('#veil');
    const danger = g.s.mode === 'encounter' || g.s.mode === 'raider';
    const hurt = st.health < 25 || (g.s.conditions && g.s.conditions.bleeding);
    veil.classList.toggle('veil-danger', danger);
    veil.classList.toggle('veil-hurt', !danger && hurt && g.s.mode !== 'dead');
  }

  renderDock() {
    const g = this.g;
    const acts = g.actions();
    const encounter = g.s.mode === 'encounter';
    const raider = g.s.mode === 'raider';
    const banner = $('#danger-banner');
    banner.classList.toggle('hidden', !encounter && !raider);
    if (encounter) banner.innerHTML = `${icon('zombie')}<span>The dead are here. Run.</span>`;
    else if (raider) banner.innerHTML = `${icon('survivor')}<span>The living. They want something.</span>`;

    if (this.uiMode === 'story') {
      // story mode: actions live inside the feed as prose links
      $('#ctx').classList.add('hidden');
      $('#nav').classList.add('hidden');
      $('#std-acts').innerHTML = '';
      this.renderPrompt(acts);
      this.renderPackMap();
      return;
    }
    const oldPrompt = $('#feed .prompt');
    if (oldPrompt) oldPrompt.remove();

    // contextual chips: escape tactics in an encounter, otherwise the
    // situational stuff (doors, buildings, people)
    const ctxIds = encounter
      ? ['set_verb', 'fight', 'throw_bottle']
      : raider
        ? ['raider_give', 'raider_refuse', 'raider_back']
        : ['enter', 'goroom', 'exit_building', 'pry', 'talk', 'give', 'trade', 'ask_help', 'sleep_safe', 'leave_talk', 'scout', 'listen', 'barricade', 'open_stash'];
    const ctx = acts.filter((a) => ctxIds.includes(a.id));
    const ctxEl = $('#ctx');
    ctxEl.classList.toggle('hidden', !ctx.length);
    ctxEl.innerHTML = ctx.map((a, i) => `
      <button class="chip-act ${encounter || raider ? 'chip-flee' : ''} ${a.selected ? 'selected' : ''}" data-i="${i}" ${a.disabled ? 'disabled' : ''}
        title="${a.reason || a.sub || ''} · ${a.cost ? a.cost.minutes + '′' : ''}">
        ${icon(a.icon)}<span>${a.label}</span>${costBadge(a.cost)}
      </button>`).join('');
    ctxEl.querySelectorAll('button.chip-act').forEach((btn) => {
      btn.addEventListener('click', () => {
        const a = ctx[Number(btn.dataset.i)];
        if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
      });
    });

    // second row: escape exits in an encounter, compass row otherwise
    const nav = $('#nav');
    nav.classList.toggle('nav-flee', encounter);
    if (encounter) {
      const exits = acts.filter((a) => a.id === 'flee');
      nav.classList.toggle('hidden', !exits.length);
      nav.innerHTML = exits.map((a, i) => `
        <button class="nav-btn nav-exit" data-i="${i}"
          title="${a.sub || ''} (${a.cost.energy}⚡ ${a.cost.minutes}′)">
          ${icon(a.icon)}<span class="nav-exit-label">${a.label}</span>
          ${costBadge(a.cost)}
        </button>`).join('');
      nav.querySelectorAll('button.nav-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const a = exits[Number(btn.dataset.i)];
          if (a) this.cb.onAction(a.id, a.arg);
        });
      });
    } else {
      const moves = acts.filter((a) => a.id === 'move');
      nav.classList.toggle('hidden', !moves.length);
      nav.innerHTML = moves.map((a) => `
        <button class="nav-btn" data-dir="${a.arg}" ${a.disabled ? 'disabled' : ''}
          title="${a.label} — ${a.sub || ''}${a.threat ? ` — ${a.threat} of the dead seen` : a.threat === 0 ? ' — looked clear' : ''} (${a.cost.energy}⚡ ${a.cost.minutes}′)">
          <span class="nav-arrow">${ARROWS[a.arg] || '·'}</span>
          <span class="nav-dest">${a.sub || ''}</span>
          ${a.threat ? `<span class="nav-threat">${a.threat}</span>` : a.threat === 0 ? '<span class="nav-clear">·</span>' : ''}
          ${costBadge(a.cost)}
        </button>`).join('');
      nav.querySelectorAll('button.nav-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const a = moves.find((m) => m.arg === btn.dataset.dir);
          if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
        });
      });
    }

    // standard slots: fixed order, fixed positions
    const stdEl = $('#std-acts');
    const slots = STD_ORDER.map((id) => ({ id, act: acts.find((a) => a.id === id) }));
    const anyStd = slots.some((sl) => sl.act);
    stdEl.innerHTML = anyStd ? slots.map(({ id, act }) => {
      const meta = STD_META[id];
      const gain = id === 'rest' || id === 'sleep';
      const disabled = !act || act.disabled;
      const reason = !act ? (id === 'fire' ? 'no matches' : '') : (act.reason || '');
      const sub = act ? (act.sub || '') : reason;
      return `
      <button class="std-btn" data-id="${id}" ${disabled ? 'disabled' : ''}
        title="${meta.label}${sub ? ' — ' + sub : ''}${act && act.cost.minutes ? ' · ' + act.cost.minutes + '′' : ''}">
        ${icon(meta.icon)}
        ${act ? costBadge(act.cost, gain) : ''}
      </button>`;
    }).join('') : '';
    stdEl.querySelectorAll('button.std-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sl = slots.find((x) => x.id === btn.dataset.id);
        if (sl && sl.act && !sl.act.disabled) this.cb.onAction(sl.act.id, sl.act.arg);
      });
    });

    this.renderPackMap();
  }

  renderPackMap() {
    const g = this.g;
    const invCount = Object.values(g.s.inv).reduce((a, b) => a + b, 0);
    $('#btn-inv').innerHTML = `${icon('backpack')}<span class="badge badge-count">${invCount}</span>`;
    $('#btn-inv').title = `Pack — ${invCount} item${invCount === 1 ? '' : 's'}`;
    $('#btn-map').innerHTML = `${icon('map')}`;
    $('#btn-map').title = 'Map';
    $('#btn-inv').classList.toggle('active', this.panel === 'inv');
    $('#btn-map').classList.toggle('active', this.panel === 'map');
  }

  // ---- story mode: actions woven into the prose ---------------------------

  renderPrompt(acts) {
    const g = this.g;
    const feed = $('#feed');
    const old = feed.querySelector('.prompt');
    if (old) old.remove();
    if (g.s.mode === 'dead') return;

    const cost = (a) => {
      if (!a.cost) return '';
      if (a.id === 'rest' || a.id === 'sleep' || a.id === 'sleep_safe') return `<span class="al-cost al-gain">${icon('energy')}+</span>`;
      return a.cost.energy ? `<span class="al-cost">${icon('energy')}${a.cost.energy}</span>` : '';
    };
    const link = (a, label) => a.disabled
      ? `<span class="al-off">${label}${cost(a)} <em>(${a.reason || a.sub || ''})</em></span>`
      : `<a class="al" data-idx="${a.idx}">${label}</a>${cost(a)}`;
    const dim = (t) => `<span class="al-sub">${t}</span>`;
    const lower = (t) => t ? t[0].toLowerCase() + t.slice(1) : t;
    const listJoin = (parts) => parts.length === 1 ? parts[0]
      : parts.slice(0, -1).join(', ') + (parts.length > 2 ? ',' : '') + ' or ' + parts[parts.length - 1];

    const indexed = acts.map((a, idx) => ({ ...a, idx }));
    const by = (id) => indexed.filter((a) => a.id === id);
    const used = new Set();
    const take = (id) => { used.add(id); return by(id); };
    const paras = [];

    if (g.s.mode === 'raider') {
      const parts = [];
      for (const a of take('raider_give')) parts.push(link(a, lower(a.label)));
      for (const a of take('raider_refuse')) parts.push(link(a, 'stand your ground') + ' ' + dim(`(${a.sub})`));
      for (const a of take('raider_back')) parts.push(link(a, 'back away'));
      paras.push(`You could ${listJoin(parts)}.`);
    } else if (g.s.mode === 'encounter') {
      const verbs = take('set_verb').map((a) => a.selected
        ? `<b class="al-sel">${lower(a.label)}</b>${cost(a)}`
        : link(a, lower(a.label)));
      paras.push(`How you run matters — ${listJoin(verbs)}.`);
      const extras = [];
      for (const a of take('fight')) extras.push(`${link(a, 'stand and fight')} ${dim(`(${a.sub})`)}`);
      for (const a of take('throw_bottle')) extras.push(link(a, 'throw a bottle'));
      if (extras.length) paras.push(`Or ${listJoin(extras)}.`);
      const exits = take('flee').map((a) => link(a, lower(a.label)));
      if (exits.length) paras.push(`Get out: ${listJoin(exits)}.`);
    } else if (g.s.mode === 'talk') {
      const parts = [];
      for (const a of take('give')) parts.push(link(a, lower(a.label)));
      for (const a of take('trade')) parts.push(link(a, `${lower(a.label)} ${a.sub}`));
      for (const a of take('ask_help')) parts.push(link(a, 'ask for help'));
      for (const a of take('sleep_safe')) parts.push(link(a, 'sleep here') + ' ' + dim(`(${a.sub})`));
      for (const a of take('leave_talk')) parts.push(link(a, 'step away'));
      paras.push(`You could ${listJoin(parts)}.`);
    } else {
      // explore
      const moves = take('move');
      if (moves.length) {
        const parts = moves.map((a) => {
          const dest = a.sub === 'unexplored' ? dim('(unexplored)') : dim(`(${a.sub})`);
          const threat = a.threat ? ` <span class="al-threat">· ${a.threat} dead</span>` : a.threat === 0 ? ' <span class="al-clearmark">· clear</span>' : '';
          return `${link(a, a.label.toLowerCase())} ${dest}${threat}`;
        });
        paras.push(`Streets lead ${listJoin(parts)}.`);
      }
      const enters = take('enter');
      if (enters.length) {
        paras.push(`You could step inside ${listJoin(enters.map((a) => link(a, a.label.replace(/^Enter /, ''))))}.`);
      }
      const rooms = take('goroom');
      const outs = take('exit_building');
      const prys = take('pry');
      if (rooms.length || outs.length) {
        const parts = rooms.map((a) => link(a, lower(a.label)));
        let sentence = parts.length ? `Doors lead ${listJoin(parts)}` : '';
        if (outs.length) sentence += `${parts.length ? '; the way out is ' : 'The way out is '}${link(outs[0], 'back to the street')}`;
        paras.push(sentence + '.');
        for (const a of prys) paras.push(`A locked door could give — ${link(a, lower(a.label))}.`);
      }
      for (const a of take('open_stash')) paras.push(`The lockbox waits — ${link(a, 'turn the odd key')}.`);
      for (const a of take('talk')) paras.push(`${link(a, lower(a.label))}.`);
      for (const a of take('barricade')) paras.push(`This room could be held — ${link(a, 'barricade it')}${a.sub === 'uses a rope' ? ' ' + dim('(uses a rope)') : ''}.`);
      const utility = [];
      for (const a of take('search')) utility.push(`${link(a, 'search')} ${dim(`(${a.sub})`)}`);
      for (const a of take('scout')) utility.push(link(a, 'scout the block'));
      for (const a of take('listen')) utility.push(link(a, 'listen at the doors'));
      for (const a of take('fire')) utility.push(link(a, 'light a fire'));
      for (const a of take('rest')) utility.push(link(a, 'rest'));
      for (const a of take('sleep')) utility.push(`${link(a, 'sleep')} ${dim(`(${a.sub})`)}`);
      if (utility.length) paras.push(`Otherwise you could ${listJoin(utility)}.`);
    }

    // safety net: anything the templates didn't place still gets a link
    const leftovers = indexed.filter((a) => !used.has(a.id));
    if (leftovers.length) paras.push(`Also: ${listJoin(leftovers.map((a) => link(a, lower(a.label))))}.`);

    const div = document.createElement('div');
    div.className = `prompt ${g.s.mode === 'encounter' || g.s.mode === 'raider' ? 'prompt-danger' : ''}`;
    div.innerHTML = paras.map((p) => `<p>${p}</p>`).join('');
    div.querySelectorAll('a.al').forEach((el) => {
      el.addEventListener('click', () => {
        const a = indexed[Number(el.dataset.idx)];
        if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
      });
    });
    feed.appendChild(div);
    if (this._booted) this._twDelay = revealWords(div, this._twDelay);
  }

  renderPanel() {
    const el = $('#panel');
    if (!this.panel) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    el.classList.remove('hidden');
    if (this.panel === 'inv') this.renderInventory(el);
    else this.renderMap(el);
  }

  renderInventory(el) {
    const inv = this.g.s.inv;
    const ids = Object.keys(inv).sort();
    if (!ids.length) {
      el.innerHTML = '<div class="panel-head">Pack</div><p class="empty">Your pack is empty. The city is not.</p>';
      return;
    }
    el.innerHTML = '<div class="panel-head">Pack</div>' + ids.map((id) => {
      const def = ITEMS[id] || { name: id, icon: 'backpack', kind: 'misc', flavor: '' };
      const useLabel = def.kind === 'food' ? 'Eat' : def.kind === 'drink' ? 'Drink'
        : def.kind === 'med' ? 'Use' : id === 'map_scrap' ? 'Read' : null;
      const passive = def.kind === 'wear' ? 'worn' : def.kind === 'gear' || def.kind === 'tool' ? 'carried' : null;
      return `
      <div class="inv-row">
        <span class="inv-icon">${icon(def.icon)}</span>
        <span class="inv-text"><b>${def.name}</b>${inv[id] > 1 ? ` ×${inv[id]}` : ''}<small>${def.flavor || ''}</small></span>
        <span class="inv-btns">
          ${useLabel ? `<button class="mini" data-use="${id}">${useLabel}</button>` : passive ? `<span class="tag">${passive}</span>` : ''}
          <button class="mini mini-dim" data-drop="${id}">Drop</button>
        </span>
      </div>`;
    }).join('');
    el.querySelectorAll('[data-use]').forEach((b) => b.addEventListener('click', () => this.cb.onUseItem(b.dataset.use)));
    el.querySelectorAll('[data-drop]').forEach((b) => b.addEventListener('click', () => this.cb.onDropItem(b.dataset.drop)));
  }

  renderMap(el) {
    const g = this.g;
    const cells = g.mapData();
    let html = '<div class="panel-head">What you know of the city</div><div class="map-grid" style="grid-template-columns:repeat(' + CITY_W + ',1fr)">';
    for (let y = 0; y < CITY_H; y++) {
      for (let x = 0; x < CITY_W; x++) {
        const c = cells[y * CITY_W + x];
        if (!c) { html += '<div class="mc mc-unknown"></div>'; continue; }
        const cls = ['mc', `mc-${c.type}`];
        if (!c.visited) cls.push('mc-known');
        if (c.here) cls.push('mc-here');
        let mark = '';
        if (c.here) mark = '◉';
        else if (c.raider) mark = '<span class="mc-raider">✕</span>';
        else if (c.zeds) mark = `<span class="mc-zed">${c.zeds}</span>`;
        else if (c.shelter) mark = '<span class="mc-shelter">▣</span>';
        else if (c.survivor) mark = '<span class="mc-sv">☗</span>';
        else if (c.buildings) mark = '<span class="mc-b">▪</span>';
        html += `<div class="${cls.join(' ')}" title="${c.name}">${mark}</div>`;
      }
    }
    html += '</div><div class="map-legend">◉ you · ▪ buildings · ☗ survivor · ▣ your shelter · ✕ raiders · dim = heard about, not seen</div>';
    el.innerHTML = html;
  }

  renderDeath() {
    const g = this.g;
    const causes = {
      cold: 'The cold took you.',
      hunger: 'Hunger took you.',
      zed: 'The dead took you.',
    };
    $('#death-inner').innerHTML = `
      <div class="death-icon">${icon('danger')}</div>
      <h2>${causes[g.s.deathCause] || 'The city took you.'}</h2>
      <p class="death-days">You survived <b>${g.s.day}</b> day${g.s.day === 1 ? '' : 's'}.${g.s.kills ? ` You put ${g.s.kills} of the dead down for good.` : ''}</p>
      <button id="btn-restart" class="big">${icon('run')} Try again</button>`;
    $('#btn-restart').addEventListener('click', () => this.cb.onNewGame());
  }

  togglePanel(which) {
    this.panel = this.panel === which ? null : which;
    this.renderDock();
    this.renderPanel();
  }

  closePanel() {
    if (!this.panel) return;
    this.panel = null;
    this.renderDock();
    this.renderPanel();
  }
}
