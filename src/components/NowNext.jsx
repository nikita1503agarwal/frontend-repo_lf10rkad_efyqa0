import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function NowNext() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNow() {
      try {
        const res = await fetch(`${API}/api/events/now`)
        const data = await res.json()
        setEvents(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchNow()
  }, [])

  if (loading) return <div className="animate-pulse">Loading now/next…</div>

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Now / Next</h2>
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">No live events right now.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {events.map(ev => (
            <li key={ev.id} className="rounded-xl border p-4 bg-white/70">
              <div className="font-medium">{ev.title}</div>
              <div className="text-sm text-gray-600">{new Date(ev.start_time).toLocaleTimeString()} — {new Date(ev.end_time).toLocaleTimeString()}</div>
              <div className="text-xs text-indigo-600">Stage: {ev.stage_id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
