const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.json())

const CSV_FILE = '/data/ranking.csv'
const PORT = 3121

function readRanking() {
  if (!fs.existsSync(CSV_FILE)) return []
  const content = fs.readFileSync(CSV_FILE, 'utf8').trim()
  if (!content) return []
  return content.split('\n').slice(1).map(line => {
    const [rank, name, score] = line.split(',')
    return { rank: Number(rank), name, score: Number(score) }
  })
}

function writeRanking(ranking) {
  fs.mkdirSync(path.dirname(CSV_FILE), { recursive: true })
  const lines = ['rank,name,score', ...ranking.map(e => `${e.rank},${e.name},${e.score}`)]
  fs.writeFileSync(CSV_FILE, lines.join('\n'))
}

app.get('/api', (req, res) => {
  res.json(readRanking())
})

app.put('/api', (req, res) => {
  const ranking = req.body
  if (!Array.isArray(ranking)) return res.status(400).json({ error: 'invalid data' })
  writeRanking(ranking)
  res.json(ranking)
})

app.listen(PORT, () => console.log(`backend on port ${PORT}`))
