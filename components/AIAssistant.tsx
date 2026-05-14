'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Bot, Send, Mic, X } from 'lucide-react'

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo, aku AI Assistant ARI ✨',
    },
  ])

  const sendMessage = async () => {
    if (!input) return

    const userMessage = {
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input,
      }),
    })

    if (!res.ok) {
  setMessages((prev) => [
    ...prev,
    {
      role: 'assistant',
      content:
        'AI sedang tidak tersedia. Cek billing OpenAI.',
    },
  ])

  return
}

const data = await res.json()

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: data.message,
      },
    ])
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-[999] w-16 h-16 rounded-full bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.5)] flex items-center justify-center"
      >
        <Bot />
      </motion.button>

      {/* CHAT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 left-8 w-[380px] h-[600px] bg-black/70 backdrop-blur-3xl border border-white/10 rounded-[2rem] z-[999] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)]"
          >
            {/* HEADER */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-xl">
                  ARI AI
                </h2>

                <p className="text-zinc-400 text-sm">
                  Futuristic Assistant
                </p>
              </div>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[420px]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-4 rounded-3xl ${
                    msg.role === 'user'
                      ? 'ml-auto bg-white text-black'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-white/10 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya sesuatu..."
                className="flex-1 bg-white/10 border border-white/10 rounded-full px-5 outline-none"
              />

              <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Mic size={18} />
              </button>

              <button
                onClick={sendMessage}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}