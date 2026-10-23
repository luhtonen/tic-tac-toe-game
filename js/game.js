/**
 * Pure tic-tac-toe game logic. No DOM access here, so it stays
 * easy to test and reuse.
 */
const Game = (() => {
  const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  function createBoard() {
    return Array(9).fill(null);
  }

  function createGame() {
    return {
      board: createBoard(),
      currentPlayer: 'X',
      winner: null, // 'X', 'O', or 'draw'
      winningLine: null,
      scores: { X: 0, O: 0, draws: 0 },
      startingPlayer: 'X',
    };
  }

  function checkWinner(board) {
    for (const line of LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    return null;
  }

  function isBoardFull(board) {
    return board.every((cell) => cell !== null);
  }

  /**
   * Returns a new state with the move applied. Invalid moves
   * (occupied cell or game already over) return the state unchanged.
   */
  function makeMove(state, index) {
    if (state.winner !== null || state.board[index] !== null) {
      return state;
    }

    const board = state.board.slice();
    board[index] = state.currentPlayer;

    const next = {
      ...state,
      board,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    };

    const result = checkWinner(board);
    if (result) {
      next.winner = result.winner;
      next.winningLine = result.line;
      next.scores = {
        ...state.scores,
        [result.winner]: state.scores[result.winner] + 1,
      };
    } else if (isBoardFull(board)) {
      next.winner = 'draw';
      next.scores = { ...state.scores, draws: state.scores.draws + 1 };
    }

    return next;
  }

  /**
   * Clears the board for a new round, alternating who starts
   * so neither player always gets the first-move advantage.
   */
  function nextRound(state) {
    const startingPlayer = state.startingPlayer === 'X' ? 'O' : 'X';
    return {
      ...createGame(),
      scores: state.scores,
      startingPlayer,
      currentPlayer: startingPlayer,
    };
  }

  function resetAll() {
    return createGame();
  }

  return { createGame, makeMove, nextRound, resetAll, checkWinner, isBoardFull };
})();
