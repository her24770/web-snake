import { useState, useEffect, useRef } from 'react'
import Board from '../components/game/Board'
import Score from '../components/game/Score'
import ModalStart from '../components/game/ModalStart'
import ModalGameOver from '../components/game/ModalGameOver'
import ModalConfig from '../components/game/ModalConfig'
import InstruccionesUnJugador from '../components/game/InstruccionesUnJugador'
import InstruccionesDosJugadores from '../components/game/InstruccionesDosJugadores'
import { SIZES, SPEEDS, initState, gameTick } from './gameLogic'
import './game.css'

function Game() {
  const [config, setConfig] = useState({ size: 'pequeño', speed: 'normal', players: 1 })
  const { cols, rows } = SIZES[config.size]
  const speed   = SPEEDS[config.speed].ms
  const players = config.players ?? 1

  const [state, setState]       = useState(() => initState(cols, rows, players))
  const [highScore, setHighScore] = useState(0)
  const nextDir  = useRef('RIGHT')
  const nextDir2 = useRef('LEFT')

  useEffect(() => {
    const keyMap1     = { w: 'UP', W: 'UP', s: 'DOWN', S: 'DOWN', a: 'LEFT', A: 'LEFT', d: 'RIGHT', D: 'RIGHT' }
    const keyMapArrows = { ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT' }

    function handleKey(e) {
      if (keyMap1[e.key]) {
        e.preventDefault()
        nextDir.current = keyMap1[e.key]
      }
      if (keyMapArrows[e.key]) {
        e.preventDefault()
        if (players === 2) nextDir2.current = keyMapArrows[e.key]
        else               nextDir.current  = keyMapArrows[e.key]
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [players])

  useEffect(() => {
    if (state.status !== 'playing') return
    const id = setInterval(() => {
      setState(prev => gameTick(prev, cols, rows, nextDir.current, nextDir2.current))
    }, speed)
    return () => clearInterval(id)
  }, [state.status, cols, rows, speed])

  useEffect(() => {
    if (state.status === 'gameover' && players === 1 && state.score > highScore) {
      setHighScore(state.score)
    }
  }, [state.status])

  function startGame() {
    nextDir.current  = 'RIGHT'
    nextDir2.current = 'LEFT'
    setState({ ...initState(cols, rows, players), status: 'playing' })
  }

  function openConfig() {
    setState(prev => ({ ...prev, status: 'config' }))
  }

  function applyConfig(newConfig) {
    setConfig(newConfig)
    const { cols: c, rows: r } = SIZES[newConfig.size]
    setState(initState(c, r, newConfig.players ?? 1))
  }

  return (
    <div className="game-wrapper">
      <Score score={state.score} score2={state.score2} highScore={highScore} players={players} />

      <div className="game-area">
        <Board cols={cols} rows={rows} snake={state.snake} snake2={state.snake2} food={state.food} />

        {state.status === 'idle' && (
          <ModalStart onStart={startGame} onConfig={openConfig} />
        )}

        {state.status === 'config' && (
          <ModalConfig config={config} onApply={applyConfig} />
        )}

        {state.status === 'gameover' && (
          <ModalGameOver
            score={state.score}
            score2={state.score2}
            winner={state.winner}
            players={players}
            onRestart={startGame}
            onConfig={openConfig}
          />
        )}
      </div>

      {players === 2 ? <InstruccionesDosJugadores /> : <InstruccionesUnJugador />}
    </div>
  )
}

export default Game
