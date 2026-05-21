const STORAGE_KEY = 'snake_ranking'

const mockRanking = [
  { rank: 1, name: 'ACE', score: 4820 },
  { rank: 2, name: 'ZER', score: 3210 },
  { rank: 3, name: 'NXS', score: 2780 },
  { rank: 4, name: 'KAI', score: 2340 },
  { rank: 5, name: 'VEX', score: 1980 },
  { rank: 6, name: 'DOT', score: 1650 },
  { rank: 7, name: 'RAX', score: 1420 },
  { rank: 8, name: 'SYN', score: 1100 },
  { rank: 9, name: 'PHX', score: 870 },
  { rank: 10, name: 'ZAP', score: 620 },
]

function loadRanking() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : mockRanking
  } catch {
    return mockRanking
  }
}

export function getRanking() {
  return loadRanking()
}

export function getTop3() {
  return loadRanking().slice(0, 3)
}

export function getFirst() {
  return loadRanking()[0]
}

export function isTopScore(score) {
  const ranking = loadRanking()
  return ranking.length < 10 || score > ranking[ranking.length - 1].score
}

export function saveScore(name, score) {
  const current = loadRanking()
  const updated = [...current, { name: name.toUpperCase().slice(0, 3), score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry, i) => ({ ...entry, rank: i + 1 }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
