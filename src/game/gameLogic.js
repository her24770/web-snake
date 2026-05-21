export const SIZES = {
  pequeño: { cols: 15, rows: 10, label: 'Pequeño', desc: '10 × 10' },
  mediano: { cols: 20, rows: 15, label: 'Mediano', desc: '15 × 10' },
  grande:  { cols: 25, rows: 15, label: 'Grande',  desc: '20 × 15' },
}

export const SPEEDS = {
  lento:  { ms: 220, label: 'Lento' },
  normal: { ms: 140, label: 'Normal' },
  rapido: { ms: 75,  label: 'Rápido' },
}

const DELTA = {
  UP:    { x: 0, y: -1 },
  DOWN:  { x: 0, y:  1 },
  LEFT:  { x: -1, y: 0 },
  RIGHT: { x:  1, y: 0 },
}

const OPPOSITE = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }

export function randomFood(snake, cols, rows) {
  const occupied = new Set(snake.map(s => `${s.x},${s.y}`))
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    }
  } while (occupied.has(`${pos.x},${pos.y}`))
  return pos
}

export function initState(cols, rows) {
  const snake = [
    { x: Math.floor(cols / 2),     y: Math.floor(rows / 2) },
    { x: Math.floor(cols / 2) - 1, y: Math.floor(rows / 2) },
    { x: Math.floor(cols / 2) - 2, y: Math.floor(rows / 2) },
  ]
  return {
    snake,
    food: randomFood(snake, cols, rows),
    score: 0,
    status: 'idle',
    dir: 'RIGHT',
  }
}

export function gameTick(state, cols, rows, nextDir) {
  const { snake, food, score } = state
  const dir = nextDir !== OPPOSITE[state.dir] ? nextDir : state.dir
  const delta = DELTA[dir]
  const newHead = { x: snake[0].x + delta.x, y: snake[0].y + delta.y }

  if (
    newHead.x < 0 || newHead.x >= cols ||
    newHead.y < 0 || newHead.y >= rows ||
    snake.some(s => s.x === newHead.x && s.y === newHead.y)
  ) {
    return { ...state, status: 'gameover', dir }
  }

  const ateFood = newHead.x === food.x && newHead.y === food.y
  const newSnake = ateFood ? [newHead, ...snake] : [newHead, ...snake.slice(0, -1)]

  return {
    snake: newSnake,
    food: ateFood ? randomFood(newSnake, cols, rows) : food,
    score: ateFood ? score + 10 : score,
    status: 'playing',
    dir,
  }
}
