'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import {
  Bot,
  Send,
  X,
} from 'lucide-react'

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Halo 👋 Saya AI Assistant Ari. Tanya apa saja tentang portfolio ini.',
    },
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
    }

    const updatedMessages = [
      ...messages,
      userMessage,
    ]

    setMessages(updatedMessages)

    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          messages: updatedMessages,
        }),
      })

      const data = await response.json()

      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content:
            data.content ||
            'Maaf, terjadi kesalahan.',
        },
      ])
    } catch (error) {
      console.error(error)

      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content:
            'AI sedang bermasalah saat ini.',
        },
      ])
    }

    setLoading(false)
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setOpen(!open)}
        className="
        fixed bottom-6 left-6 z-[999]
        w-14 h-14 md:w-16 md:h-16
        rounded-full
        bg-white text-black
        shadow-[0_10px_50px_rgba(255,255,255,0.2)]
        flex items-center justify-center
        "
      >
        {open ? <X /> : <Bot />}
      </motion.button>

      {/* CHATBOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
            fixed z-[998]

            bottom-24 left-4
            md:right-6

            w-[calc(100vw-32px)]
            md:w-[390px]

            h-[70vh]
            md:h-[600px]

            rounded-[32px]
            border border-white/10
            bg-black/60
            backdrop-blur-3xl

            shadow-[0_10px_80px_rgba(0,0,0,0.5)]

            overflow-hidden
            flex flex-col
            "
          >
            {/* HEADER */}
            <div
              className="
              p-5
              border-b border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                  w-10 h-10 rounded-full
                  bg-white text-black
                  flex items-center justify-center
                  "
                >
                  <Bot size={18} />
                </div>

                <div>
                  <h1 className="font-bold">
                    Ari AI Assistant
                  </h1>

                  <p className="text-xs text-zinc-400">
                    Online • Bahasa Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* CHAT */}
            <div
              className="
              flex-1
              overflow-y-auto
              px-4 py-5
              space-y-4
              "
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`
                    max-w-[85%]
                    px-4 py-3
                    rounded-3xl
                    text-sm leading-relaxed

                    ${
                      msg.role === 'user'
                        ? 'bg-white text-black rounded-br-md'
                        : 'bg-white/10 text-white rounded-bl-md border border-white/5'
                    }
                    `}
                  >
                    {msg.content}
                  </motion.div>
                </div>
              ))}

              {loading && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="
                  bg-white/10
                  text-zinc-300
                  px-4 py-3
                  rounded-3xl
                  w-fit
                  text-sm
                  "
                >
                  AI sedang berpikir...
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div
              className="
              p-4
              border-t border-white/10
              bg-white/[0.02]
              "
            >
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage()
                    }
                  }}
                  placeholder="Tanyakan sesuatu..."
                  className="
                  flex-1
                  h-12
                  rounded-2xl
                  bg-white/10
                  border border-white/10
                  px-4
                  text-sm
                  outline-none

                  focus:border-white/20
                  "
                />

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={sendMessage}
                  className="
                  w-12 h-12
                  rounded-2xl
                  bg-white
                  text-black
                  flex items-center justify-center
                  "
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}