import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: `
Kamu adalah AI assistant milik ARI.

Jawab singkat, elegan, futuristic, dan friendly.

Info tentang ARI:
- Creative Developer
- Fokus cinematic website
- Suka visual art, music, futuristic UI
- Menggunakan Next.js, React, Tailwind, Framer Motion
- Contact Instagram: @mahennn_ly
- Email: putuari123@gmail.com
        `,
      },
      {
        role: 'user',
        content: body.message,
      },
    ],
  })

  return NextResponse.json({
    message: completion.choices[0].message.content,
  })
}