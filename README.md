# GameSolver

## Overview
8-Piece Puzzle and Tic-Tac-Toe game with AI solvers implementing various search algorithms (BFS, Dijkstra, A*, Minimax, Alpha-Beta).

### 8-Piece Puzzle 
Takes an uploaded or default image, resizes it into a square, and splits it into 9 equal squares (with one square serving as the blank). The squares are then shuffled. 
The user can solve the puzzle manually or have the AI solve it using BFS, Dijkstra, or A* search algorithms.
After solving, several metrics are displayed:
  - Time per algorithm solve
  - Nodes visited/expanded
  - Solution Length

### Tic-Tac-Toe
Allows the user to select a gamemode (Human vs. AI, AI vs. AI), algorithm (Minimax, Alpha-Beta), and start (play first, play second).
After solving, several metrics are displayed:
  - Time per algorithm solve
  - Nodes visited/expanded
  - Pruning efficiency

## Architecture
Backend: JavaScript
Frontend: CSS, HTML, React

## Algorithms and Comparative Analysis

### Structural Comparison
How does the search space of the 8-puzzle compare structurally
to the game tree of Tic-Tac-Toe? What is similar, and what is fundamentally different?
(Hint: consider who controls the next state, and what "solving" means in each case.)

### Algorithm Fit
Why is A* appropriate for the 8-puzzle but not directly applicable to Tic-
Tac-Toe? Conversely, why does Minimax not naturally apply to the 8-puzzle?

### Empirical Comparison: Module A
Report nodes expanded for blind search, Dijkstra,
and A* on the standardized test puzzle. What does this tell you about the value of
heuristic information?

### Empirical Comparison: Module B
Report nodes explored by Minimax vs Alpha-Beta
on the standardized test position. Compute and report the observed pruning rate.

### Trade-Off Analysis
Briefly discuss completeness, optimality, time complexity, and space
complexity for each algorithm. A one-sentence summary per property per algorithm is
sufficient.

### Heuristic Justification
In addition to the reflection prompts, include a 2–3 sentence intuitive argument for why your
A* heuristic is admissible (never overestimates the true cost).

## How to Run
```bash

```

## Credits
All code and graphics created by Samantha Milo. 
Credits to GeeksforGeeks for helping me understand the algorithms and giving me a skeleton for my pseudocode.
Credits to Copilot for assisting with debugging.

## References
Goel, A. (2025a, February 23). 8-Puzzle Problem. GeeksforGeeks. https://www.geeksforgeeks.org/dsa/8-puzzle-problem-using-branch-and-bound/ 
Goel, A. (2025b, July 23). Finding optimal move in Tic-Tac-Toe using Minimax Algorithm in Game Theory . GeeksforGeeks. https://www.geeksforgeeks.org/dsa/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/ 

## License
Copyright [2026] [Samantha Milo]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
