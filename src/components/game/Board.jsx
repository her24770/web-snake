import Cell from './Cell'

function Board({ cols, rows, snake, snake2, food }) {
  const snakeKeys  = new Set(snake.map(s => `${s.x},${s.y}`))
  const headKey    = snake.length  > 0 ? `${snake[0].x},${snake[0].y}`   : null
  const snake2Keys = snake2 ? new Set(snake2.map(s => `${s.x},${s.y}`)) : null
  const headKey2   = snake2 && snake2.length > 0 ? `${snake2[0].x},${snake2[0].y}` : null
  const foodKey    = `${food.x},${food.y}`

  const cells = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const key = `${x},${y}`
      cells.push(
        <Cell
          key={key}
          isSnake={snakeKeys.has(key)}
          isHead={key === headKey}
          isSnake2={snake2Keys ? snake2Keys.has(key) : false}
          isHead2={key === headKey2}
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
