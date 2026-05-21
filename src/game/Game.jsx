import { useState, useEffect, useRef } from 'react'
import Board from '../components/game/Board'
import Score from '../components/game/Score'
import ModalStart from '../components/game/ModalStart'
import ModalGameOver from '../components/game/ModalGameOver'
import ModalConfig from '../components/game/ModalConfig'
import InstruccionesUnJugador from '../components/game/InstruccionesUnJugador'
import { SIZES, SPEEDS, initState, gameTick } from './gameLogic'
import './game.css'

function Game() {
  const [config, setConfig] = useState({ size: 'pequeño', speed: 'normal' })
  const { cols, rows } = SIZES[config.size]
  const speed = SPEEDS[config.speed].ms

  const [state, setState] = useState(() => initState(cols, rows))
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
      setState(prev => gameTick(prev, cols, rows, nextDir.current))
    }, speed)
    return () => clearInterval(id)
  }, [state.status, cols, rows, speed])

  useEffect(() => {
    if (state.status === 'gameover' && state.score > highScore) {
      setHighScore(state.score)
    }
  }, [state.status])

  function startGame() {
    nextDir.current = 'RIGHT'
    setState({ ...initState(cols, rows), status: 'playing' })
  }

  function openConfig() {
    setState(prev => ({ ...prev, status: 'config' }))
  }

  function applyConfig(newConfig) {
    setConfig(newConfig)
    const { cols: c, rows: r } = SIZES[newConfig.size]
    setState(initState(c, r))
  }

  return (
    <div className="game-wrapper">
      <Score score={state.score} highScore={highScore} />

      <div className="game-area">
        <Board cols={cols} rows={rows} snake={state.snake} food={state.food} />

        {state.status === 'idle' && (
          <ModalStart onStart={startGame} onConfig={openConfig} />
        )}

        {state.status === 'config' && (
          <ModalConfig config={config} onApply={applyConfig} />
        )}

        {state.status === 'gameover' && (
          <ModalGameOver score={state.score} onRestart={startGame} onConfig={openConfig} />
        )}
      </div>

      <InstruccionesUnJugador />
    </div>
  )
}

export default Game
