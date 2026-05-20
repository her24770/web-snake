import { useState, useEffect, useRef } from 'react'
import Board from '../components/game/Board'
import Score from '../components/game/Score'
import ModalStart from '../components/game/ModalStart'
import ModalGameOver from '../components/game/ModalGameOver'
import './game.css'

const GRID_SIZE = 20
const SPEED = 150

const DELTA = {
  UP:    { x: 0, y: -1 },
  DOWN:  { x: 0, y:  1 },
  LEFT:  { x: -1, y: 0 },
  RIGHT: { x:  1, y: 0 },
}

const OPPOSITE = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }

function randomFood(snake, gridSize) {
  const occupied = new Set(snake.map(s => `${s.x},${s.y}`))
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }
  } while (occupied.has(`${pos.x},${pos.y}`))
  return pos
}

function initState(gridSize) {
  const snake = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }]
  return {
    snake,
    food: randomFood(snake, gridSize),
    score: 0,
    status: 'idle',
    dir: 'RIGHT',
  }
}

function gameTick(state, gridSize, nextDir) {
  const { snake, food, score } = state
  const dir = nextDir !== OPPOSITE[state.dir] ? nextDir : state.dir
  const delta = DELTA[dir]
  const newHead = { x: snake[0].x + delta.x, y: snake[0].y + delta.y }

  if (
    newHead.x < 0 || newHead.x >= gridSize ||
    newHead.y < 0 || newHead.y >= gridSize ||
    snake.some(s => s.x === newHead.x && s.y === newHead.y)
  ) {
    return { ...state, status: 'gameover', dir }
  }

  const ateFood = newHead.x === food.x && newHead.y === food.y
  const newSnake = ateFood ? [newHead, ...snake] : [newHead, ...snake.slice(0, -1)]

  return {
    snake: newSnake,
    food: ateFood ? randomFood(newSnake, gridSize) : food,
    score: ateFood ? score + 10 : score,
    status: 'playing',
    dir,
  }
}

function Game() {
  const [state, setState] = useState(() => initState(GRID_SIZE))
  const [highScore, setHighScore] = useState(0)
  const nextDir = useRef('RIGHT')

  useEffect(() => {
    const keyMap = {
      ArrowUp: 'UP',    w: 'UP',    W: 'UP',
      ArrowDown: 'DOWN', s: 'DOWN', S: 'DOWN',
      ArrowLeft: 'LEFT', a: 'LEFT', A: 'LEFT',
      ArrowRight: 'RIGHT', d: 'RIGHT', D: 'RIGHT',
    }
    function handleKey(e) {
      const dir = keyMap[e.key]
      if (dir) {
        e.preventDefault()
        nextDir.current = dir
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (state.status !== 'playing') return
    const id = setInterval(() => {
      setState(prev => gameTick(prev, GRID_SIZE, nextDir.current))
    }, SPEED)
    return () => clearInterval(id)
  }, [state.status])

  useEffect(() => {
    if (state.status === 'gameover' && state.score > highScore) {
      setHighScore(state.score)
    }
  }, [state.status])

  function startGame() {
    nextDir.current = 'RIGHT'
    setState({ ...initState(GRID_SIZE), status: 'playing' })
  }

  return (
    <div className="game-wrapper">
      <Score score={state.score} highScore={highScore} />

      <div className="game-area">
        <Board gridSize={GRID_SIZE} snake={state.snake} food={state.food} />

        {state.status === 'idle' && (
          <ModalStart onStart={startGame} />
        )}

        {state.status === 'gameover' && (
          <ModalGameOver score={state.score} onRestart={startGame} />
        )}
      </div>

      <div className="game-controls">
        <div className="controls-keys">
          <div className="controls-keys-group">
            <kbd>W</kbd>
          </div>
          <div className="controls-keys-group">
            <kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
          </div>
          <span className="controls-label" style={{ margin: '0 4px' }}>or</span>
          <div className="controls-keys-group">
            <kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd>
          </div>
        </div>
        <p className="controls-label">MOVE</p>
      </div>
    </div>
  )
}

export default Game
