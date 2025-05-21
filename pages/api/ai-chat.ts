import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { message } = req.body
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set' })
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    })
    const data = await response.json()
    console.log('OpenAI response:', data)
    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: 'No response from OpenAI' })
    }
    res.status(200).json({ ai: data.choices[0].message.content })
  } catch (err) {
    console.error('OpenAI error:', err)
    res.status(500).json({ error: 'Failed to fetch from OpenAI' })
  }
} 