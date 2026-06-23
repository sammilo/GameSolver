import { useState } from 'react'
import './App.css'

// Main App component, renders the games and metrics, and runs search algorithms
export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Game Solver</h1>
      <div className="main-container">
         
        <div className="game-container">
          <h2>8-Piece Puzzle</h2>
          <div className="visual-btns-container">

            <div className="btn-group">
              <button className="reset-button">◼</button>
              <button className="solve-button">▶︎</button>
              <button className="upload-img-button">🖿</button>
              <button className="remove-img-button">✖</button>
            </div>

            <div className="puzzle-placeholder"></div>

            <div className="dropdown-btn-group">
              <div className="dropdown-container">
                <button className="dropdown-btn">Algo ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option">BFS</div>
                  <div className="dropdown-option">Dijkstra</div>
                  <div className="dropdown-option">A*</div>
                </div>
              </div>
              <div className="dropdown-container">
                <button className="dropdown-btn">Mode ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option">Player Solves</div>
                  <div className="dropdown-option">AI Solves</div>
                </div>
              </div>
            </div>
          </div>

          <div className="metrics-container">
            <h3>Metrics</h3>
            <div className="metrics">
              <p>Time per move:</p>
              <p>Nodes expanded:</p>
            </div>
          </div>
        </div>

        <div className="game-container">
          <h2>Tic-Tac-Toe</h2>

          <div className="visual-btns-container">
            
            <div className="btn-group">
              <button className="reset-button">◼</button>
              <button className="solve-button">▶︎</button>
            </div>

            <div className="tictactoe-placeholder"></div>

            <div className="dropdown-btn-group">
              <div className="dropdown-container">
                <button className="dropdown-btn">Algo ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option">Minimax</div>
                  <div className="dropdown-option">Alpha-Beta</div>
                </div>
              </div>
              <div className="dropdown-container">
                <button className="dropdown-btn">Mode ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option">Player vs AI</div>
                  <div className="dropdown-option">AI vs AI</div>
                </div>
              </div>
            </div>
          </div>

          <div className="metrics-container">
            <h3>Metrics</h3>
            <div className="metrics">
              <p>Time per move:</p>
              <p>Nodes expanded:</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function handleReset(game) {
  // Reset the game state
}

function handleSolve(game, algorithm) {
  // Run the search algorithm to solve the game
}

function handleUploadImage(image) {
  // Upload an image for the puzzle
}

function handleRemoveImage() {
  // Remove the uploaded image
}

function BFS(puzzle) {
  // Implement BFS algorithm to solve the puzzle
}

function Dijkstra(puzzle) {
  // Implement Dijkstra's algorithm to solve the puzzle
}

function AStar(puzzle) {
  // Implement A* algorithm to solve the puzzle
}

function Minimax(tictactoe) {
  // Implement Minimax algorithm to solve Tic-Tac-Toe
}

function AlphaBeta(tictactoe) {
  // Implement Alpha-Beta pruning algorithm to solve Tic-Tac-Toe
}