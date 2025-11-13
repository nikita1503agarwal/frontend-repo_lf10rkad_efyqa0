import { useEffect, useRef, useState } from 'react'
import TopNav from './components/TopNav'
import NowNext from './components/NowNext'
import MapView from './components/MapView'
import GamesHub from './components/GamesHub'

const API = import.meta.env.VITE_BACKEND_URL || ''

function useVoice(onIntent) {
  const recRef = useRef(null)
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setSupported(true)
      recRef.current = new SpeechRecognition()
      recRef.current.lang = 'en-US'
      recRef.current.continuous = false
      recRef.current.interimResults = false
      recRef.current.onresult = (e) => {
        const text = e.results[0][0].transcript.toLowerCase()
        if (text.includes('what') && text.includes('now')) onIntent('now')
        else if (text.includes('map') || text.includes('stage')) onIntent('map')
        else if (text.includes('game')) onIntent('games')
        else onIntent('now')
      }
    }
  }, [onIntent])
  const start = () => {
    if (recRef.current) recRef.current.start()
  }
  return { supported, start }
}

function App() {
  const [tab, setTab] = useState('home')
  const { supported, start } = useVoice((intent) => {
    if (intent === 'now') setTab('home')
    if (intent === 'map') setTab('map')
    if (intent === 'games') setTab('games')
  })

  useEffect(() => {
    // try seeding minimal data for demo
    fetch(`${API}/api/admin/seed`, { method: 'POST' }).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <TopNav onVoice={start} />
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {tab === 'home' && (
          <>
            <NowNext />
          </>
        )}
        {tab === 'map' && <MapView />}
        {tab === 'games' && <GamesHub />}
        <div className="fixed bottom-4 inset-x-0">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur rounded-2xl border shadow flex justify-around p-2">
            <button onClick={() => setTab('home')} className={`px-4 py-2 rounded ${tab==='home'?'bg-indigo-600 text-white':'hover:bg-black/5'}`}>Now</button>
            <button onClick={() => setTab('map')} className={`px-4 py-2 rounded ${tab==='map'?'bg-indigo-600 text-white':'hover:bg-black/5'}`}>Map</button>
            <button onClick={() => setTab('games')} className={`px-4 py-2 rounded ${tab==='games'?'bg-indigo-600 text-white':'hover:bg-black/5'}`}>Games</button>
          </div>
        </div>
        {!supported && (
          <p className="text-xs text-gray-500">Voice not supported in this browser. Use Chrome for best results.</p>
        )}
      </main>
    </div>
  )
}

export default App
