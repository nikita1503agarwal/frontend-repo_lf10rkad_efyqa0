import { Menu, Bell, Mic, Map as MapIcon, Gamepad2, Calendar, Home } from 'lucide-react'

export default function TopNav({ onVoice }) {
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-white/60 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-black/5"><Menu size={20} /></button>
          <span className="font-bold">Saturnalia</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-black/5"><Home size={20} /></button>
          <button className="p-2 rounded hover:bg-black/5"><Calendar size={20} /></button>
          <button className="p-2 rounded hover:bg-black/5"><MapIcon size={20} /></button>
          <button className="p-2 rounded hover:bg-black/5"><Gamepad2 size={20} /></button>
          <button className="p-2 rounded hover:bg-black/5"><Bell size={20} /></button>
          <button onClick={onVoice} className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"><Mic size={18} /></button>
        </div>
      </div>
    </div>
  )
}
