import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function MapView() {
  const [stages, setStages] = useState([])

  useEffect(() => {
    async function loadStages() {
      try {
        const res = await fetch(`${API}/api/stages`)
        const data = await res.json()
        setStages(data)
      } catch (e) {
        console.error(e)
      }
    }
    loadStages()
  }, [])

  return (
    <div className="rounded-xl border p-4 bg-white/70">
      <h2 className="text-lg font-semibold mb-3">Campus Map</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stages.map(s => (
          <div key={s.id} className="p-3 rounded-lg border hover:shadow-sm">
            <div className="font-medium">{s.name}</div>
            <div className="text-xs text-gray-600">{s.lat.toFixed(4)}, {s.lng.toFixed(4)}</div>
            <button className="mt-2 text-sm text-indigo-600">See Events</button>
          </div>
        ))}
        {stages.length === 0 && (
          <div className="text-sm text-gray-500">No stages yet. Ask admin to seed data.</div>
        )}
      </div>
    </div>
  )
}
