import { useRef, useState } from 'react'
import defaultPuzzleImage from './assets/default_puzzle.png'
import './App.css'

// Main App component, renders the games and metrics, and runs search algorithms
export default function App() {
  const [puzzleImage, setPuzzleImage] = useState(defaultPuzzleImage)
  const fileInputRef = useRef(null)

  /* Handle the image upload, image rezising, and imapge update for the 8-puzzle. */
  const handleUploadImage = async(imgFile) => {
  // Upload an image for the puzzle, resize it to 576x576
    if (!imgFile) return null

    const imgURL = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(imgFile)
    })

    const img = await new Promise((resolve, reject) => {
      const image = new Image() 
      image.onload = () => resolve(image)
      image.onerror = reject
      image.src = imgURL
    })

    const canvas = document.createElement('canvas')
    canvas.width = 576
    canvas.height = 576
    const ctx = canvas.getContext('2d')
  
    const size = Math.min(img.width, img.height)
    const sx = (img.width - size) / 2
    const sy = (img.height - size) / 2

    ctx.drawImage(img, sx, sy, size, size, 0, 0, 576, 576)
    const croppedImgUrl = canvas.toDataURL('image/png')
    setPuzzleImage(croppedImgUrl)
    return croppedImgUrl
  }
  
  return (
    <>
      <h1>Game Solver</h1>
      <div className="containers-wrapper">
        <div className="main-container">
           
          <div className="game-container">
            <h2>8-Piece Puzzle</h2>
          <div className="visual-btns-container">

            <div className="btn-group">
              <button className="reset-button">◼</button>
              <button className="solve-button">▶︎</button>
              <button className="upload-img-button" onClick={() => fileInputRef.current?.click()}>🖿</button>
              
              <button className="remove-img-button" onClick={() => setPuzzleImage(defaultPuzzleImage)}>✖</button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(event) => handleUploadImage(event.target.files?.[0])} />
            <img id="puzzleImage" src={puzzleImage} alt="Puzzle" style={{ width: 576, height: 576, objectFit: 'contain' }} />

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
      </div>
      <div className="main-container">
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
      </div>
    </>
  )
}

function handleReset(game) {
  // Reset the game state
}

function handleSolve(game, algorithm, data) {
  // Run the selected search algorithm on the selected game
  if (game === 'puzzle') {
    if (algorithm === 'BFS') {
      BFS(data)
    } else if (algorithm === 'Dijkstra') {
      Dijkstra(data)
    } else if (algorithm === 'A*') {
      AStar(data)
    }
  } else if (game === 'tictactoe') {
    if (algorithm === 'Minimax') {
      Minimax(data)
    } else if (algorithm === 'Alpha-Beta') {
      AlphaBeta(data)
    }
  }
}



function BFS(data) {
  // Implement BFS algorithm to solve the puzzle
}

function Dijkstra(data) {
  // Implement Dijkstra's algorithm to solve the puzzle
}

function AStar(data) {
  // Implement A* algorithm to solve the puzzle
}

function Minimax(data) {
  // Implement Minimax algorithm to solve Tic-Tac-Toe
}

function AlphaBeta(data) {
  // Implement Alpha-Beta pruning algorithm to solve Tic-Tac-Toe
}