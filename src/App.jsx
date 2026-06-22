import { useState } from 'react'
import './App.css'

// Main App component, renders the games and metrics, and runs search algorithms
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Game Solver</h1>
      <div className="main-container">
        <div className="game-container">
          <h2>8-Piece Puzzle</h2>
          <div className="visual-btns-container">
            <div className="button-group">
              <button className="reset-button">Reset</button>
              <button className="solve-button">Solve</button>
              <button className="upload-img-button">Upload Image</button>
              <button className="remove-img-button">Remove Image</button>
            </div>
            <div className="puzzle-placeholder">[Puzzle Visualization]</div>
          </div>
          <h3>Metrics</h3>
        </div>
        <div className="game-container">
          <h2>Tic-Tac-Toe</h2>
          <div className="visual-btns-container">
            <div className="button-group">
              <button className="reset-button">Reset</button>
              <button className="solve-button">Solve</button>
            </div>
            <div className="tictactoe-placeholder">[Tic-Tac-Toe Visualization]</div>
          </div>
          <h3>Metrics</h3>
        </div>
      </div>
    </>
  )
}

export default App
