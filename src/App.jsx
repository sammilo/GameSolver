import { useRef, useState } from 'react'
import defaultPuzzleImage from './assets/default_puzzle.png'
import './App.css'

/* Main App component, renders the games and metrics, and runs search algorithms. */ 
export default function App() {
  // Use states and file ref for 8-puzzle
  const fileInputRef = useRef(null)
  const [puzzleImage, setPuzzleImage] = useState(defaultPuzzleImage)
  const [puzzleAlgo, setPuzzleAlgo] = useState("BFS")
  const [puzzleMode, setPuzzleMode] = useState("Player")
  const defaultPuzzleData = [[1,2,3],[4,5,6],[7,8,0]]
  const [puzzleData, setPuzzleData] = useState(defaultPuzzleData)
  const [puzzleImages, setPuzzleImages] = useState(null)
  
  // Use states for tictactoe puzzle
  const [ticTacToeAlgo, setTicTacToeAlgo] = useState("Minimax")
  const [ticTacToeMode, setTicTacToeMode] = useState("PvAI")
  const [ticTacToeData, setTicTacToeData] = useState([[0,0,0],[0,0,0],[0,0,0]])
  const [puzzleMetrics, setPuzzleMetrics] = useState({ moves: 0, visited: 0 })

  const [displaySelections, setDisplaySelections] = useState(null)

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

    // Reize/crop uploaded image so that it's always 576x576 without stretching
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

  const handleSolveClick = (algo, mode, data) => {
    if (mode === "AI") {
      if (algo === 'BFS') {
        const result = BFS(data)
        setPuzzleMetrics({ moves: result.moves, visited: result.visitedCount })
        return result
      } else if (algo === 'Dijkstra') {
        Dijkstra(data)
      } else {
        AStar(data)
      }
    }
    
    if (mode === "PvsAI" || mode === "AIvsAI") {
      if (algo === 'Minimax') {
        Minimax(mode, data)
      } else {
        AlphaBeta(mode, data)
      }
    }
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
              <button className="solve-button" onClick={() => handleSolveClick(puzzleAlgo, puzzleMode, puzzleData)}>▶︎</button>
              <button className="shuffle-button>" style={{fontWeight: 'bolder'}}>↳↰</button>
              <button className="upload-img-button" onClick={() => fileInputRef.current?.click()}>🖿</button>
              <button className="remove-img-button" onClick={() => setPuzzleImage(defaultPuzzleImage)}>✖</button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(event) => handleUploadImage(event.target.files?.[0])} />
            <img id="puzzleImage" src={puzzleImage} alt="Puzzle" style={{ width: 576, height: 576, objectFit: 'contain' }} />

            <div className="dropdown-btn-group">
              <div className="dropdown-container">
                <button className="dropdown-btn">Algo ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option" onClick={() => setPuzzleAlgo("BFS")}>BFS</div>
                  <div className="dropdown-option" onClick={() => setPuzzleAlgo("Dijkstra")}>Dijkstra</div>
                  <div className="dropdown-option" onClick={() => setPuzzleAlgo("A*")}>A*</div>
                </div>
              </div>
              <div className="dropdown-container">
                <button className="dropdown-btn">Mode ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option" onClick={() => setPuzzleMode("Player")}>Player Solves</div>
                  <div className="dropdown-option" onClick={() => setPuzzleMode("AI")}>AI Solves</div>
                </div>
              </div>
            </div>
          </div>

          <p> Algorithm and Mode Selected: {puzzleAlgo} , {puzzleMode}</p>

          <div className="metrics-container">
            <h3>Metrics</h3>
            <div className="metrics">
              <p>Time per move: </p>
              <p>Moves in solution: {puzzleMetrics.moves}</p>
              <p>States visited: {puzzleMetrics.visited}</p>
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
              <button className="solve-button" onClick={() => handleSolveClick(ticTacToeAlgo, ticTacToeMode, ticTacToeData)}>▶︎</button>
            </div>

            <div className="tictactoe-placeholder"></div>

            <div className="dropdown-btn-group">
              <div className="dropdown-container">
                <button className="dropdown-btn">Algo ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option" onClick={() => setTicTacToeAlgo("Minimax")}>Minimax</div>
                  <div className="dropdown-option" onClick={() => setTicTacToeAlgo("AlphaBeta")}>Alpha-Beta</div>
                </div>
              </div>
              <div className="dropdown-container">
                <button className="dropdown-btn">Mode ▼</button>
                <div className="dropdown">
                  <div className="dropdown-option" onClick={() => setTicTacToeMode("PvsAI")}>Player vs. AI</div>
                  <div className="dropdown-option" onClick={() => setTicTacToeMode("AIvsAI")}>AI vs. AI</div>
                </div>
              </div>
            </div>
          </div>

          <p> Algorithm and Mode Selected: {ticTacToeAlgo} , {ticTacToeMode}</p>

          <div className="metrics-container">
            <h3>Metrics</h3>
            <div className="metrics">
              <p>Time per move: </p>
              <p>Nodes expanded: </p>
              <p>Puning efficiency: </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

/** 8-PUZZLE ALGORITHMS AND HELPERS **/
const GOAL = [[1,2,3],[4,5,6],[7,8,0]]
// Structure to store the puzzle state
class PuzzleState {
    constructor(board, x, y, level, parent = null, move = null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.level = level;
        this.parent = parent;
        this.move = move;
    }
}

/* BFS Algorithm */
function BFS(data) {
  const startBoard = data.map(row => [...row])
  const queue = []
  const visited = new Set()
  const directions = [
    { name: 'left', deltaX: 0, deltaY: -1 },
    { name: 'right', deltaX: 0, deltaY: 1 },
    { name: 'up', deltaX: -1, deltaY: 0 },
    { name: 'down', deltaX: 1, deltaY: 0 }
  ]

  // Identify and save empty tile x(row) and y(col)
  let blankX = 0
  let blankY = 0
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (startBoard[r][c] === 0) {
        blankX = r
        blankY = c
      }
    }
  }

  // Add start state to queue and visited
  queue.push(new PuzzleState(startBoard, blankX, blankY, 0))
  visited.add(JSON.stringify(startBoard))

  // Check curr state valid moves, swap tiles, save new states, add to queue, add to visited if not found, repeat
  while (queue.length > 0) {
    const curr = queue.shift()

    // If goal state was reached, return solution path and moves
    if (JSON.stringify(curr.board) === JSON.stringify(GOAL)) {
      const path = []
      let currentNode = curr

      while (currentNode.parent) {
        path.push(currentNode.move)
        currentNode = currentNode.parent
      }

      path.reverse()

      return {
        found: true,
        moves: path.length,
        solution: path,
        visitedCount: visited.size
      }
    }

    // Explore neighbors and generate new valid moves
    for (const move of directions) {
      const newX = curr.x + move.deltaX
      const newY = curr.y + move.deltaY

      if (isMoveValid(newX, newY)) {
        const newBoard = curr.board.map(row => [...row])
        [newBoard[curr.x][curr.y], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[curr.x][curr.y]]
        const boardKey = JSON.stringify(newBoard)

        if (!visited.has(boardKey)) {
          visited.add(boardKey)
          queue.push(new PuzzleState(newBoard, newX, newY, curr.level + 1, curr, move.name))
        }
      }
    }
  }
  // Unsolavable puzzle
  return {
    found: false,
    moves: -1,
    solution: [],
    visitedCount: visited.size
  }
}

// Check if potential moves are valid (do not exceed matrix/board dimension)
function isMoveValid(x, y) {
  return x >= 0 && x < 3 && y >= 0 && y < 3
}

/* Dijkstra's Algorithm */
function Dijkstra(data) {
  // Implement Dijkstra's algorithm to solve the puzzle
}

/* A* Algorithm */
function AStar(data) {
  // Implement A* algorithm to solve the puzzle
}

/** TICTACTOE ALGORITHMS AND HELPERS **/

/* Minimax Algorithm */
function Minimax(data) {
  // Implement Minimax algorithm to solve Tic-Tac-Toe
}

/* Alpha-Beta Algorithm */
function AlphaBeta(data) {
  // Implement Alpha-Beta pruning algorithm to solve Tic-Tac-Toe
}