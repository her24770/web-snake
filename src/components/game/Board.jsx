import Cell from './Cell'

function Board({ gridSize, snake, food }) {
  //conversion a lista de strings para optimizar busqueda
  const snakeKeys = new Set(snake.map(s => `${s.x},${s.y}`))
  const headKey = snake.length > 0 ? `${snake[0].x},${snake[0].y}` : null
  const foodKey = `${food.x},${food.y}`

  const cells = []
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const key = `${x},${y}`
      cells.push(
        <Cell
          key={key}
          isSnake={snakeKeys.has(key)}
          isHead={key === headKey}
          isFood={key === foodKey}
        />
      )
    }
  }

  return (
    <div className="board-wrapper">
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cells}
      </div>
    </div>
  )
}

export default Board
