import { useState, useEffect, useRef } from 'react'
import Board from '../components/game/Board'
import Score from '../components/game/Score'
import ModalStart from '../components/game/ModalStart'
import ModalGameOver from '../components/game/ModalGameOver'
import InstruccionesUnJugador from '../components/game/InstruccionesUnJugador'
import './game.css'

// tamaño del tablero y velocidad del juego (tiempo en milisegundos)
const GRID_SIZE = 15
const SPEED = 150

// declarar movimientos como constantes para evitar errores de typo y facilitar cambios futuros
const DELTA = {
  UP:    { x: 0, y: -1 },
  DOWN:  { x: 0, y:  1 },
  LEFT:  { x: -1, y: 0 },
  RIGHT: { x:  1, y: 0 },
}

// direcciones contrarias para evitar que la serpiente se mueva en la dirección opuesta instantáneamente
const OPPOSITE = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }

//funcion para generar comida en una posición aleatoria que no esté ocupada por la serpiente
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

// estado inicial del juego con la serpiente en el centro, comida aleatoria, puntuación 0 y estado 'idle'
function initState(gridSize) {
  // mitad del campo para iniciar la serpiente
  const snake = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }, 
                  { x: Math.floor(gridSize / 2) - 1, y: Math.floor(gridSize / 2) }, 
                  { x: Math.floor(gridSize / 2) - 2, y: Math.floor(gridSize / 2) }
                ]
  return {
    snake,
    food: randomFood(snake, gridSize),
    score: 0,
    status: 'idle',// iddle, indica espera a que el jugador inicie el juego
    dir: 'RIGHT',
  }
}

// funcion principal que actualiza el estado del juego en cada tick, recibe el estado actual, tamaño del tablero y la siguiente dirección
function gameTick(state, gridSize, nextDir) {
// estructurazicion de estado para facilitar acceso a sus propiedades
  const { snake, food, score } = state
  //evitar direccion contraria
  const direccion = nextDir !== OPPOSITE[state.dir] ? nextDir : state.dir
  // calcular nueva posición de la cabeza de la serpiente
  const delta = DELTA[direccion]
  const newHead = { x: snake[0].x + delta.x, y: snake[0].y + delta.y }
 
  if (
    //colisoines fuera del tablero
    newHead.x < 0 || newHead.x >= gridSize ||
    newHead.y < 0 || newHead.y >= gridSize ||
    //colisiones consigo misma
    snake.some(s => s.x === newHead.x && s.y === newHead.y)
  ) {
    return { ...state, status: 'gameover', direccion }
  }

  //colsiones con la comida
  const ateFood = newHead.x === food.x && newHead.y === food.y
  // si se come la comida, la serpiente crece (no se elimina la cola), si no, se mueve normalmente (se elimina la cola)
  const newSnake = ateFood ? [newHead, ...snake] : [newHead, ...snake.slice(0, -1)]

  return {
    snake: newSnake,
    food: ateFood ? randomFood(newSnake, gridSize) : food,
    score: ateFood ? score + 10 : score,
    status: 'playing',
    dir: direccion
  }
}

function Game() {
  const [state, setState] = useState(() => initState(GRID_SIZE))
  const [highScore, setHighScore] = useState(0)
  const nextDir = useRef('RIGHT')

  //detecta las teclas presionadas para cambiar la dirección de la serpiente, mapea las teclas a direcciones y actualiza nextDir.current
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

  // cada vez que el estado del juego es 'playing', se inicia un intervalo que llama a gameTick cada SPEED milisegundos para actualizar el estado del juego, el intervalo se limpia cuando el componente se desmonta o cuando el estado deja de ser 'playing'
  useEffect(() => {
    if (state.status !== 'playing') return
    const id = setInterval(() => {
      setState(prev => gameTick(prev, GRID_SIZE, nextDir.current))
    }, SPEED)
    return () => clearInterval(id)
  }, [state.status])

  // cada vez que el estado del juego cambia a 'gameover', se verifica si la puntuación actual es mayor que la puntuación más alta registrada, y si es así, se actualiza el estado de highScore con la nueva puntuación más alta
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

      <InstruccionesUnJugador />
    </div>
  )
}

export default Game
