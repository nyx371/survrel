import { Game } from './game.js';
import { UI } from './ui.js';
import { randomSeed } from './rng.js';
import { VERSION, LATEST_NOTE } from './version.js';

let game = Game.load() || new Game();
const ui = new UI(game, {
  onAction(id, arg) {
    game.perform(id, arg);
    ui.render();
  },
  onUseItem(id) {
    game.perform('use_item', id);
    ui.render();
  },
  onDropItem(id) {
    game.perform('drop_item', id);
    ui.render();
  },
  onNewGame() {
    game.clearSave();
    game = new Game(randomSeed());
    ui.setGame(game);
    ui.render();
  },
});

document.getElementById('btn-inv').addEventListener('click', () => ui.togglePanel('inv'));
document.getElementById('btn-map').addEventListener('click', () => ui.togglePanel('map'));

// menu ----------------------------------------------------------------------
const menu = document.getElementById('menu');
document.getElementById('menu-version').textContent = `v${VERSION}`;
document.getElementById('menu-note').textContent = LATEST_NOTE;
document.getElementById('btn-menu').addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('hidden');
});
document.addEventListener('click', (e) => {
  if (!menu.classList.contains('hidden') && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});
document.getElementById('btn-new').addEventListener('click', () => {
  menu.classList.add('hidden');
  if (game.s.mode === 'dead' || confirm('Abandon this run and start a new city?')) {
    ui.cb.onNewGame();
  }
});

ui.render();
