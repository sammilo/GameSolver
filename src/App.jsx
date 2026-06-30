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
  const [puzzleMetrics, setPuzzleMetrics] = useState({ moves: 0, visited: 0 })
  const [puzzleImages, setPuzzleImages] = useState(null)
  
  // Use states for tictactoe puzzle
  const [ticTacToeAlgo, setTicTacToeAlgo] = useState("Minimax")
  const [ticTacToeMode, setTicTacToeMode] = useState("PvAI")
  const [ticTacToeData, setTicTacToeData] = useState([[0,0,0],[0,0,0],[0,0,0]])
  
  // Display currently selected algorithm and mode for each game
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
        const result = bfs(data)
        setPuzzleMetrics({ moves: result.moves, visited: result.visitedCount })
        return result
      } else if (algo === 'Dijkstra') {
        dijkstra(data)
      } else {
        aStar(data)
      }
    }
    
    if (mode === "PvsAI" || mode === "AIvsAI") {
      if (algo === 'Minimax') {
        miniMax(mode, data)
      } else {
        alphaBeta(mode, data)
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

/** 8-PUZZLE ALGORITHMS, HELPERS, AND CONSTANTS **/
const GOAL = [[1,2,3],[4,5,6],[7,8,0]]
const GOAL_POSITIONS = {}
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    GOAL_POSITIONS[GOAL[r][c]] = [r, c]
  }
}
const DIRECTIONS = [
    { name: 'left', deltaX: 0, deltaY: -1 },
    { name: 'right', deltaX: 0, deltaY: 1 },
    { name: 'up', deltaX: -1, deltaY: 0 },
    { name: 'down', deltaX: 1, deltaY: 0 }
]

// Structure to store the puzzle state
class PuzzleState {
    constructor(board, x, y, level = 0, parent = null, move = null, cost = 0, heuristic = 0) {
        this.board = board
        this.x = x
        this.y = y
        this.level = level // For BFS
        this.parent = parent
        this.move = move
        this.cost = cost // For Dijkstra and A*, g(n)
        this.heuristic = heuristic // Manhattan distance, h(n)
        this.func = cost + heuristic // A* priority, f(n), where f(n) = g(n) + h(n) 
    }
}

/* BFS Algorithm */
function bfs(data) {
  const startBoard = data.map(row => [...row])
  const queue = []
  const visited = new Set()

  // Identify and save blank tile x(row) and y(col)
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
  queue.push(new PuzzleState(startBoard, blankX, blankY))
  visited.add(JSON.stringify(startBoard))

  // Check curr state valid moves, swap tiles, save new states, add to queue, add to visited if not found, repeat
  while (queue.length > 0) {
    const curr = queue.shift()

    // If goal state was reached, return solution path and moves
    if (JSON.stringify(curr.board) === JSON.stringify(GOAL)) {
      const path = []
      let currNode = curr

      while (currNode.parent) {
        path.push(currNode.move)
        currNode = currNode.parent
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
    for (const move of DIRECTIONS) {
      const newX = curr.x + move.deltaX
      const newY = curr.y + move.deltaY

      if (isMoveValid(newX, newY)) {
        const newBoard = curr.board.map(row => [...row]) // Copy board
        [newBoard[curr.x][curr.y], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[curr.x][curr.y]]

        if (!visited.has(JSON.stringify(newBoard))) {
          visited.add(JSON.stringify(newBoard))
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

/* Dijkstra's Algorithm */
function dijkstra(data) {
  const startBoard = data.map(row => [...row]);
  const priorityQ = [] // Explore tiles with lower cost first 
  const distances = new Map() // Cheapest known cost for each state

  // Identify and save blank tile x(row) and y(col)
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

  priorityQ.push(new PuzzleState(startBoard, blankX, blankY))
  distances.set(JSON.stringify(startBoard), 0)

  while (priorityQ.length > 0) {
    // Order by lowest-cost state
    priorityQ.sort((a,b) => a.cost - b.cost);

    const curr = priorityQ.shift()
    if (curr.cost > distances.get(JSON.stringify(curr.board))) {
      continue;
    }

    // If goal state was reached, return solution length and states visited
    if (JSON.stringify(curr.board) === JSON.stringify(GOAL)) {
      const path = []
      let currNode = curr
      while (currNode.parent) {
        path.push(currNode.move)
        currNode = currNode.parent
      }

      path.reverse()

      return {
        found: true,
        moves: path.length,
        totalCost: curr.cost,
        solution: path,
        visitedCount: distances.size
      }
    }

    // Explore neighbors and generate valid moves
    for (const move of DIRECTIONS) {
      const newX = curr.x + move.deltaX
      const newY = curr.y + move.deltaY

      if (isMoveValid(newX, newY)) {
        const newBoard = curr.board.map(row => [...row]) // Copy board
        [newBoard[curr.x][curr.y], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[curr.x][curr.y]]
        
        const newCost = curr.cost + 1

        // If path is cheaper, update
        if (!distances.has(JSON.stringify(newBoard)) || newCost < distances.get(JSON.stringify(newBoard))) {
          distances.set(JSON.stringify(newBoard), newCost)
          priorityQ.push(new PuzzleState(newBoard, newX, newY, undefined, curr, move.name, newCost))
        }
      }
    }
  }
  // Unsolvable puzzle
  return {
    found: false,
    moves: -1,
    totalCost: -1,
    solution: [],
    visitedCount: distances.size
  }
}

/* A* Algorithm using Manhattan distance heuristic */
function aStar(data) {
  const startBoard = data.map(row => [...row])
  const priorityQ = [];
  const distances = new Map()

  // Identify and save blank tile x(row) and y(col)
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

  const startHeuristic = manhattanDistance(startBoard)
  priorityQ.push(new PuzzleState(startBoard, blankX, blankY, undefined, null, null, 0, startHeuristic))
  distances.set(JSON.stringify(startBoard), 0)

  while (priorityQ.length > 0) {
    // Explore states with lowest f(n) first
    priorityQ.sort((a,b) => a.func - b.func)
    const curr = priorityQ.shift()

    if (curr.cost > distances.get(JSON.stringify(curr.board))) {
      continue;
    }

    // If goal state was reached, return solution length and states visited
    if (JSON.stringify(curr.board) === JSON.stringify(GOAL)) {
      const path = []
      let currNode = curr
      while (currNode.parent) {
        path.push(currNode.move)
        currNode = currNode.parent
      }

      path.reverse()

      return {
        found: true,
        moves: path.length,
        totalCost: curr.cost,
        solution: path,
        visitedCount: distances.size
      }
    }

    // Explore neighbors/ valid moves
    for (const move of DIRECTIONS) {
      const newX = curr.x + move.deltaX
      const newY = curr.y + move.deltaY

      if (isMoveValid(newX, newY)) {
        const newBoard = curr.board.map(row => [...row]) // Copy board
        [newBoard[curr.x][curr.y], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[curr.x][curr.y]]
        
        const newCost = curr.cost + 1

        if (!distances.has(JSON.stringify(newBoard)) || newCost < distances.get(JSON.stringify(newBoard))) {
          distances.set(JSON.stringify(newBoard), newCost)
          const newHeuristic = manhattanDistance(newBoard)

          priorityQ.push(new PuzzleState(newBoard, newX, newY, undefined, curr, move.name, newCost, newHeuristic))
        }
      }
    }
  }
  // Unsolvable puzzle
  return {
    found: false,
    moves: -1,
    totalCost: -1,
    solution: [],
    visitedCount: distances.size
  }
}

// Check if potential moves are valid (do not exceed matrix/board dimension)
function isMoveValid(x, y) {
  return x >= 0 && x < 3 && y >= 0 && y < 3
}

// Calculate Manhattan distance
function manhattanDistance(board) {
  let total = 0;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const value = board[r][c]

      if (!(value === 0)) { // Skip empty tile
        const [goalR, goalC] = GOAL_POSITIONS[value]

        total += Math.abs(r - goalR)
        total += Math.abs(c - goalC)
      }
    }
  }
  return total
}


/** TICTACTOE ALGORITHMS, HELPERS, AND CONSTANTS **/
const WIN_POSITIONS = [
  [[0,0],[0,1],[0,2]], // horizontal top
  [[1,0],[1,1],[1,2]], // horizontal middle
  [[2,0],[2,1],[2,2]], // horizontal bottom
  [[0,0],[1,0],[2,0]], // vertical left
  [[0,1],[1,1],[2,1]], // vertical middle
  [[0,2],[1,2],[2,2]], // vertical right
  [[0,0],[1,1],[2,2]], // diagonal neg slope
  [[2,0],[1,1],[0,2]], // diagonal pos slope
]

/* Minimax Algorithm */
function miniMax(board, depth, isMaximizer) {
  // Implement Minimax algorithm to solve Tic-Tac-Toe
  let score = evaluate(board)

  // Check if maximizer or minimizer won
  if (score === +10 || score === -10) {
    return score
  }

  if (hasMovesLeft(board) === false) {
    return 0
  }

  // Maximizer's move
  if (isMaximizer) {
    let bestScore = -Infinity

    for (let row = 0; i < 3; i++) {
      for (let col = 0; j < 3; j++) {
          if (board[row][col] === null) {
            
          }
      }
    }
  } 
  else {

  }
}

function hasMovesLeft(board) {
  for (let i = 0; i < JSON.stringify(board).length; i++) {
    if (board[i] === null) {
      return true
    }
  }
  return false
}

// Returns true if the same player value is present in any of the 8 win positions
function evaluate(board, player) {
  for (let i = 0; i < WIN_POSITIONS.length; i++) {
    const position = WIN_POSITIONS[i]
    let hasWon = true;

    for (let j = 0; j < position.length; j++) {
      const [row, col] = position[j]

      if (board[row][col] !== player) {
        hasWon = false
        break;
      }
    }
    if (hasWon) {
      if (player === "human") {
        return +10
      }
      else if (player === "ai") {
        return -10
      }
    }
  }
  return 0
}



/* Alpha-Beta Algorithm */
function alphaBeta(data) {
  // Implement Alpha-Beta pruning algorithm to solve Tic-Tac-Toe
}