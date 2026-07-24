// Rendering. One scrollable narrative feed; everything else is fixed.
// The feed appends log entries (including scene blocks) in order, so the
// newest information is always at the bottom, styled in place.

import { icon } from './icons.js';
import { ITEMS } from './data/items.js';
import { CITY_W, CITY_H } from './world.js';

const $ = (sel) => document.querySelector(sel);

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
  }

  setGame(game) {
    this.g = game;
    this.panel = null;
    this.lastSeq = 0;
    $('#feed').innerHTML = '';
  }

  render() {
    const s = this.g.s;
    this.renderHeader();
    this.renderStats();
    this.renderLocbar();
    this.renderFeed();
    this.renderDock();
    this.renderPanel();
    $('#death').classList.toggle('hidden', s.mode !== 'dead');
    if (s.mode === 'dead') this.renderDeath();
  }

  renderHeader() {
    const g = this.g;
    const wx = g.weather;
    $('#hud-day').innerHTML = `${icon(g.isNight ? 'night' : 'day')}<span>Day ${g.s.day}</span>`;
    $('#hud-time').textContent = g.timeString();
    $('#hud-wx').innerHTML = `${icon(WX_ICON[wx])}<span>${WX_LABEL[wx]}</span>`;
  }

  renderStats() {
    const st = this.g.s.stats;
    const bars = [
      ['energy', 'energy', st.energy],
      ['health', 'health', st.health],
      ['hunger', 'hunger', st.hunger],
      ['warmth', st.warmth < 40 ? 'cold' : 'hot', st.warmth],
    ];
    $('#stats').innerHTML = bars.map(([key, ic, val]) => `
      <div class="stat stat-${key} ${val < 25 ? 'stat-low' : ''}" title="${key}: ${Math.round(val)}">
        ${icon(ic)}
        <div class="bar"><div class="bar-fill" style="width:${Math.max(0, Math.min(100, val))}%"></div></div>
      </div>`).join('');
  }

  renderLocbar() {
    const { title, sub } = this.g.locTitle();
    $('#locbar').innerHTML = `<b>${title}</b><span>${sub}</span>`;
  }

  renderFeed() {
    const feed = $('#feed');
    const fresh = this.g.s.log.filter((l) => (l.seq || 0) > this.lastSeq);
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
      this.lastSeq = l.seq || this.lastSeq;
    }
    while (feed.children.length > 150) feed.removeChild(feed.firstChild);
    if (fresh.length) feed.scrollTop = feed.scrollHeight;
  }

  renderDock() {
    const g = this.g;
    const acts = g.actions();
    const encounter = g.s.mode === 'encounter';
    const banner = $('#danger-banner');
    banner.classList.toggle('hidden', !encounter);
    if (encounter) banner.innerHTML = `${icon('zombie')}<span>The dead are here. Run.</span>`;

    // contextual chips: everything situational (doors, buildings, people, flee)
    const ctxIds = encounter
      ? ['flee']
      : ['enter', 'goroom', 'exit_building', 'pry', 'talk', 'give', 'ask_help', 'sleep_safe', 'leave_talk'];
    const ctx = acts.filter((a) => ctxIds.includes(a.id));
    const ctxEl = $('#ctx');
    ctxEl.classList.toggle('hidden', !ctx.length);
    ctxEl.innerHTML = ctx.map((a, i) => `
      <button class="chip-act ${encounter ? 'chip-flee' : ''}" data-i="${i}" ${a.disabled ? 'disabled' : ''}
        title="${a.reason || a.sub || ''} · ${a.cost ? a.cost.minutes + '′' : ''}">
        ${icon(a.icon)}<span>${a.label}</span>${costBadge(a.cost)}
      </button>`).join('');
    ctxEl.querySelectorAll('button.chip-act').forEach((btn) => {
      btn.addEventListener('click', () => {
        const a = ctx[Number(btn.dataset.i)];
        if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
      });
    });

    // compass row
    const moves = encounter ? [] : acts.filter((a) => a.id === 'move');
    const nav = $('#nav');
    nav.classList.toggle('hidden', !moves.length);
    nav.innerHTML = moves.map((a) => `
      <button class="nav-btn" data-dir="${a.arg}" ${a.disabled ? 'disabled' : ''}
        title="${a.label} — ${a.sub || ''} (${a.cost.energy}⚡ ${a.cost.minutes}′)">
        <span class="nav-arrow">${ARROWS[a.arg] || '·'}</span>
        <span class="nav-dest">${a.sub || ''}</span>
        ${costBadge(a.cost)}
      </button>`).join('');
    nav.querySelectorAll('button.nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const a = moves.find((m) => m.arg === btn.dataset.dir);
        if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
      });
    });

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

    // pack & map
    const invCount = Object.values(g.s.inv).reduce((a, b) => a + b, 0);
    $('#btn-inv').innerHTML = `${icon('backpack')}<span class="badge badge-count">${invCount}</span>`;
    $('#btn-inv').title = `Pack — ${invCount} item${invCount === 1 ? '' : 's'}`;
    $('#btn-map').innerHTML = `${icon('map')}`;
    $('#btn-map').title = 'Map';
    $('#btn-inv').classList.toggle('active', this.panel === 'inv');
    $('#btn-map').classList.toggle('active', this.panel === 'map');
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
        else if (c.zeds) mark = `<span class="mc-zed">${c.zeds}</span>`;
        else if (c.survivor) mark = '<span class="mc-sv">☗</span>';
        else if (c.buildings) mark = '<span class="mc-b">▪</span>';
        html += `<div class="${cls.join(' ')}" title="${c.name}">${mark}</div>`;
      }
    }
    html += '</div><div class="map-legend">◉ you · ▪ buildings · ☗ survivor · dim = heard about, not seen</div>';
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
      <p class="death-days">You survived <b>${g.s.day}</b> day${g.s.day === 1 ? '' : 's'}.</p>
      <button id="btn-restart" class="big">${icon('run')} Try again</button>`;
    $('#btn-restart').addEventListener('click', () => this.cb.onNewGame());
  }

  togglePanel(which) {
    this.panel = this.panel === which ? null : which;
    this.renderDock();
    this.renderPanel();
  }
}
