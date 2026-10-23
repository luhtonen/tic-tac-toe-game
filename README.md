# Tic-Tac-Toe

A classic two-player tic-tac-toe game for the web browser. No build step, no dependencies — just open it and play.

## Play

Open `index.html` in any modern browser, or serve the folder:

```bash
# any static file server works, e.g.:
python3 -m http.server 8000
# then visit http://localhost:8000
```

Two players share the same seat (hot-seat): take turns clicking cells. The winning line is highlighted, and the scoreboard tracks wins and draws across rounds.

## Features

- **Hot-seat for two players** — no accounts, no setup
- **Running scoreboard** — X wins, O wins, and draws
- **Fair round rotation** — the starting player alternates each round, so neither player always gets the first-move advantage
- **Win highlighting** — the winning line is marked when a round ends
- **Responsive dark UI** — works on desktop and mobile

## Project structure

```
tic-tac-toe-game/
├── index.html        # page structure: scoreboard, status, board, buttons
├── css/
│   └── style.css     # dark theme, responsive board, win/draw highlighting
└── js/
    ├── game.js       # pure game logic (no DOM) — state, moves, win/draw, scoring
    ├── ui.js         # DOM rendering + click handling
    └── main.js       # entry point wiring logic to UI
```

The game logic in `js/game.js` is DOM-free and uses immutable state transitions, which keeps it easy to test and reuse (e.g., for adding an AI opponent).

## License

MIT
