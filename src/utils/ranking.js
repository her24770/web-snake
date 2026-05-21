const API_URL = import.meta.env.VITE_API_URL

async function fetchRanking() {
  if (!API_URL) return []
  try {
    const res = await fetch(API_URL)
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export async function getRanking() {
  return fetchRanking()
}

export async function getTop3() {
  const ranking = await fetchRanking()
  return ranking.slice(0, 3)
}

export async function getFirst() {
  const ranking = await fetchRanking()
  return ranking[0] ?? null
}

export async function isTopScore(score) {
  const ranking = await fetchRanking()
  return ranking.length < 10 || score > (ranking[ranking.length - 1]?.score ?? 0)
}

export async function saveScore(name, score) {
  const current = await fetchRanking()
  const updated = [...current, { name: name.toUpperCase().slice(0, 3), score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry, i) => ({ ...entry, rank: i + 1 }))

  if (!API_URL) return updated

  try {
    await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
  } catch {
    // silent fail
  }

  return updated
}
