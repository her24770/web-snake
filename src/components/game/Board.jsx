import Cell from './Cell'

function Board({ cols, rows, snake, food }) {
  const snakeKeys = new Set(snake.map(s => `${s.x},${s.y}`))
  const headKey = snake.length > 0 ? `${snake[0].x},${snake[0].y}` : null
  const foodKey = `${food.x},${food.y}`

  const cells = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
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
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          aspectRatio: `${cols} / ${rows}`,
        }}
      >
        {cells}
      </div>
    </div>
  )
}

export default Board
