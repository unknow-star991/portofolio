import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',

  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const completion =
      await client.chat.completions.create({
        model: 'openai/gpt-4o-mini',

        messages: [
          {
            role: 'system',

            content: `
Kamu adalah AI assistant pribadi milik Ari.

IDENTITAS ARI:
- Nama: Ari
- Seorang developer modern
- Fokus pada frontend development
- Menyukai desain Apple-style cinematic
- Menggunakan Next.js, React, TailwindCSS, TypeScript
- Suka membuat UI futuristik
- Memiliki portfolio premium modern
- Tertarik AI dan motion design

TUGASMU:
- bantu pengunjung memahami portfolio Ari
- jawab pertanyaan tentang Ari
- jawab tentang skill Ari
- jawab tentang project Ari
- bantu pengunjung menghubungi Ari
- jawab dengan natural seperti manusia

GAYA BERBICARA:
- gunakan bahasa Indonesia
- santai tapi profesional
- modern
- singkat
- jangan terlalu formal
- jangan seperti robot
- jangan gunakan markdown aneh
- jangan gunakan simbol aneh
- jangan mengarang informasi yang tidak diketahui

Kalau ditanya:
"siapa ari?"

jawab seperti:
"Ari adalah developer modern yang fokus membuat website premium dengan desain cinematic dan interaktif."

Kalau ditanya:
"apa skill ari?"

jawab:
- Next.js
- React
- Tailwind
- TypeScript
- UI/UX Design
- AI Integration
- Motion Animation

Jangan pernah mengatakan:
'Saya hanyalah AI'
atau
'Saya tidak tahu'

Sebaliknya, jawab seolah kamu benar-benar assistant portfolio Ari.
            `,
          },

          ...body.messages,
        ],

        temperature: 0.8,

        max_tokens: 500,
      })

    return NextResponse.json({
      content:
        completion.choices[0].message.content,
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}