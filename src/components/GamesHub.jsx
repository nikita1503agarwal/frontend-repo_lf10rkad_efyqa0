import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function GamesHub() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/leaderboard/trivia`)
        const data = await res.json()
        setLeaderboard(data)
      } catch (e) { console.error(e)}
    }
    load()
  }, [])

  return (
    <div className="rounded-xl border p-4 bg-white/70">
      <h2 className="text-lg font-semibold mb-3">Games Hub</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border">
          <div className="font-medium">Flash Trivia</div>
          <p className="text-sm text-gray-600">Join live rounds and climb the leaderboard.</p>
          <button className="mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">Join</button>
        </div>
        <div className="p-4 rounded-lg border">
          <div className="font-medium">AR Scavenger Hunt</div>
          <p className="text-sm text-gray-600">Scan constellation markers across campus.</p>
          <button className="mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded">Open</button>
        </div>
      </div>
      <div className="mt-4">
        <div className="font-medium mb-2">Trivia Leaderboard (Top)</div>
        <ol className="space-y-1 text-sm">
          {leaderboard.map((row, i) => (
            <li key={row.id || i} className="flex items-center justify-between">
              <span className="text-gray-500">#{i+1}</span>
              <span className="flex-1 mx-2 truncate">{row.user_id}</span>
              <span className="font-semibold">{row.score}</span>
            </li>
          ))}
          {leaderboard.length === 0 && <li className="text-gray-500">No scores yet.</li>}
        </ol>
      </div>
    </div>
  )
}
