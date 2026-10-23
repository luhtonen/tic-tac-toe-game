/**
 * DOM rendering and event handling for the tic-tac-toe game.
 * The UI never mutates game state; it reports user actions back
 * through the handlers passed to init().
 */
const UI = (() => {
  let boardEl, statusEl, scoreXEl, scoreOEl, scoreDrawsEl;
  let cells = [];
  let onMove = () => {};
  let onNewRound = () => {};
  let onResetAll = () => {};

  function init(handlers) {
    onMove = handlers.onMove;
    onNewRound = handlers.onNewRound;
    onResetAll = handlers.onResetAll;

    boardEl = document.getElementById('board');
    statusEl = document.getElementById('status');
    scoreXEl = document.getElementById('score-x');
    scoreOEl = document.getElementById('score-o');
    scoreDrawsEl = document.getElementById('score-draws');

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cell';
      cell.dataset.index = String(i);
      cell.setAttribute('aria-label', `Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`);
      cell.addEventListener('click', () => onMove(i));
      boardEl.appendChild(cell);
      cells.push(cell);
    }

    document.getElementById('new-round').addEventListener('click', onNewRound);
    document.getElementById('reset-all').addEventListener('click', onResetAll);
  }

  function render(state) {
    cells.forEach((cell, i) => {
      const value = state.board[i];
      cell.textContent = value ?? '';
      cell.classList.toggle('x', value === 'X');
      cell.classList.toggle('o', value === 'O');
      cell.classList.toggle('winning', state.winningLine?.includes(i) ?? false);
      cell.disabled = value !== null || state.winner !== null;
    });

    if (state.winner === 'draw') {
      statusEl.textContent = "It's a draw!";
    } else if (state.winner) {
      statusEl.textContent = `Player ${state.winner} wins!`;
    } else {
      statusEl.textContent = `Player ${state.currentPlayer}'s turn`;
    }

    scoreXEl.textContent = state.scores.X;
    scoreOEl.textContent = state.scores.O;
    scoreDrawsEl.textContent = state.scores.draws;
  }

  return { init, render };
})();
