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

export function initState(cols, rows, players = 1) {
  const midY = Math.floor(rows / 2)
  const snake = [
    { x: 2, y: midY },
    { x: 1, y: midY },
    { x: 0, y: midY },
  ]

  if (players === 2) {
    const snake2 = [
      { x: cols - 3, y: midY },
      { x: cols - 2, y: midY },
      { x: cols - 1, y: midY },
    ]
    return {
      snake,
      snake2,
      food: randomFood([...snake, ...snake2], cols, rows),
      score: 0,
      score2: 0,
      status: 'idle',
      dir: 'RIGHT',
      dir2: 'LEFT',
      players: 2,
    }
  }

  return {
    snake,
    food: randomFood(snake, cols, rows),
    score: 0,
    status: 'idle',
    dir: 'RIGHT',
    players: 1,
  }
}

export function gameTick(state, cols, rows, nextDir, nextDir2) {
  const { snake, food, score, players } = state

  // --- Un jugador ---
  if (players !== 2) {
    const dir = nextDir !== OPPOSITE[state.dir] ? nextDir : state.dir
    const newHead = { x: snake[0].x + DELTA[dir].x, y: snake[0].y + DELTA[dir].y }

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
      ...state,
      snake: newSnake,
      food: ateFood ? randomFood(newSnake, cols, rows) : food,
      score: ateFood ? score + 10 : score,
      status: 'playing',
      dir,
    }
  }

  // --- Dos jugadores ---
  const { snake2, score2 } = state
  const dir  = nextDir  !== OPPOSITE[state.dir]  ? nextDir  : state.dir
  const dir2 = nextDir2 !== OPPOSITE[state.dir2] ? nextDir2 : state.dir2
  const newHead  = { x: snake[0].x  + DELTA[dir].x,  y: snake[0].y  + DELTA[dir].y  }
  const newHead2 = { x: snake2[0].x + DELTA[dir2].x, y: snake2[0].y + DELTA[dir2].y }

  const snakeSet  = new Set(snake.map(s  => `${s.x},${s.y}`))
  const snake2Set = new Set(snake2.map(s => `${s.x},${s.y}`))
  const headCollision = newHead.x === newHead2.x && newHead.y === newHead2.y

  const dead1 =
    newHead.x < 0 || newHead.x >= cols ||
    newHead.y < 0 || newHead.y >= rows ||
    snake.some(s  => s.x === newHead.x  && s.y === newHead.y)  ||
    snake2Set.has(`${newHead.x},${newHead.y}`)

  const dead2 =
    newHead2.x < 0 || newHead2.x >= cols ||
    newHead2.y < 0 || newHead2.y >= rows ||
    snake2.some(s => s.x === newHead2.x && s.y === newHead2.y) ||
    snakeSet.has(`${newHead2.x},${newHead2.y}`)

  if (dead1 || dead2 || headCollision) {
    let winner = 0
    if (dead1 && !dead2 && !headCollision) winner = 2
    if (dead2 && !dead1 && !headCollision) winner = 1
    return { ...state, status: 'gameover', dir, dir2, winner }
  }

  const ateFood1 = newHead.x  === food.x && newHead.y  === food.y
  const ateFood2 = newHead2.x === food.x && newHead2.y === food.y
  const newSnake  = ateFood1 ? [newHead,  ...snake]  : [newHead,  ...snake.slice(0, -1)]
  const newSnake2 = ateFood2 ? [newHead2, ...snake2] : [newHead2, ...snake2.slice(0, -1)]

  return {
    ...state,
    snake: newSnake,
    snake2: newSnake2,
    food: (ateFood1 || ateFood2) ? randomFood([...newSnake, ...newSnake2], cols, rows) : food,
    score:  ateFood1 ? score  + 10 : score,
    score2: ateFood2 ? score2 + 10 : score2,
    status: 'playing',
    dir,
    dir2,
  }
}
