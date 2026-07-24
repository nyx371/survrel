// Rendering. Full re-render per turn — the DOM is tiny and this keeps the
// game logic honest (state in, pixels out).

import { icon } from './icons.js';
import { ITEMS, itemName } from './data/items.js';
import { DISTRICTS, SURVIVOR_ROLES } from './data/text.js';
import { CITY_W, CITY_H } from './world.js';

const $ = (sel) => document.querySelector(sel);

const WX_ICON = { clear: 'day', overcast: 'day', rain: 'rain', snap: 'snow' };
const WX_LABEL = { clear: 'clear', overcast: 'overcast', rain: 'rain', snap: 'cold snap' };

export class UI {
  constructor(game, callbacks) {
    this.g = game;
    this.cb = callbacks; // { onAction(id, arg), onNewGame(), onUseItem(id), onDropItem(id) }
    this.panel = null; // null | 'inv' | 'map'
  }

  setGame(game) {
    this.g = game;
    this.panel = null;
  }

  render() {
    const g = this.g;
    const s = g.s;
    this.renderHeader();
    this.renderStats();
    this.renderScene();
    this.renderActions();
    this.renderFooter();
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

  renderScene() {
    const g = this.g;
    const cell = g.here;
    let title, sub;
    if (g.indoors) {
      title = `${g.building.name} — ${g.room.type}`;
      sub = `${cell.name} · ${DISTRICTS[cell.district].label}`;
    } else {
      title = cell.name;
      sub = DISTRICTS[cell.district].label;
    }
    $('#loc-title').textContent = title;
    $('#loc-sub').textContent = sub;
    $('#desc').innerHTML = (g.currentDesc || []).map((p) => `<p>${p}</p>`).join('');
    const log = g.s.log.slice(-7);
    $('#log').innerHTML = log.map((l) => `<div class="log-line log-${l.kind}">${l.text}</div>`).join('');
    const logEl = $('#log');
    logEl.scrollTop = logEl.scrollHeight;
  }

  renderActions() {
    const g = this.g;
    const allActs = g.actions();
    const encounter = g.s.mode === 'encounter';
    $('#danger-banner').classList.toggle('hidden', !encounter);
    if (encounter) {
      $('#danger-banner').innerHTML = `${icon('zombie')}<span>The dead are here. Run.</span>`;
    }

    // compass row: compact directional movement (explore mode only)
    const ARROWS = { north: '↑', east: '→', south: '↓', west: '←' };
    const moves = encounter ? [] : allActs.filter((a) => a.id === 'move');
    const acts = encounter ? allActs : allActs.filter((a) => a.id !== 'move');
    const nav = $('#nav');
    nav.classList.toggle('hidden', !moves.length);
    nav.innerHTML = moves.map((a) => `
      <button class="nav-btn" data-dir="${a.arg}" ${a.disabled ? 'disabled' : ''}
        title="${a.label} — ${a.sub || ''} (${a.cost.energy}⚡ ${a.cost.minutes}′)">
        <span class="nav-arrow">${ARROWS[a.arg] || '·'}</span>
        <span class="nav-dest">${a.sub || ''}</span>
      </button>`).join('');
    nav.querySelectorAll('button.nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const a = moves.find((m) => m.arg === btn.dataset.dir);
        if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
      });
    });

    $('#actions').innerHTML = acts.map((a, i) => `
      <button class="act ${encounter ? 'act-flee' : ''}" data-i="${i}" ${a.disabled ? 'disabled' : ''}>
        ${icon(a.icon)}
        <span class="act-text">
          <span class="act-label">${a.label}</span>
          ${a.sub || a.reason ? `<span class="act-sub">${a.reason || a.sub}</span>` : ''}
        </span>
        ${a.cost && (a.cost.energy || a.cost.minutes) ? `<span class="act-cost">${a.cost.energy ? `${icon('energy')}${a.cost.energy}` : ''}<em>${a.cost.minutes}′</em></span>` : ''}
      </button>`).join('');
    $('#actions').querySelectorAll('button.act').forEach((btn) => {
      btn.addEventListener('click', () => {
        const a = acts[Number(btn.dataset.i)];
        if (a && !a.disabled) this.cb.onAction(a.id, a.arg);
      });
    });
  }

  renderFooter() {
    const g = this.g;
    const invCount = Object.values(g.s.inv).reduce((a, b) => a + b, 0);
    $('#btn-inv').innerHTML = `${icon('backpack')}<span>${invCount}</span>`;
    $('#btn-map').innerHTML = `${icon('map')}<span>Map</span>`;
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
    this.renderFooter();
    this.renderPanel();
  }
}
