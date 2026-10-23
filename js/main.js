/**
 * Entry point: owns the current game state and wires the
 * game logic to the UI.
 */
(() => {
  let state = Game.createGame();

  function render() {
    UI.render(state);
  }

  document.addEventListener('DOMContentLoaded', () => {
    UI.init({
      onMove: (index) => {
        state = Game.makeMove(state, index);
        render();
      },
      onNewRound: () => {
        state = Game.nextRound(state);
        render();
      },
      onResetAll: () => {
        state = Game.resetAll();
        render();
      },
    });
    render();
  });
})();
