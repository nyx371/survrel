import { Game } from './game.js';
import { UI } from './ui.js';
import { randomSeed } from './rng.js';

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
document.getElementById('btn-new').addEventListener('click', () => {
  if (game.s.mode === 'dead' || confirm('Abandon this run and start a new city?')) {
    ui.cb.onNewGame();
  }
});

ui.render();
