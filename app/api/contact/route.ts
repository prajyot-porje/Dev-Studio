import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  budgetRange?: string
  projectBrief?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TARGET_EMAIL = 'devstudio017@gmail.com'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload

    const name = body.name?.trim() ?? ''
    const email = body.email?.trim() ?? ''
    const company = body.company?.trim() ?? ''
    const budgetRange = body.budgetRange?.trim() ?? ''
    const projectBrief = body.projectBrief?.trim() ?? ''

    if (!name || !email || !company || !budgetRange || !projectBrief) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const upstream = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        budgetRange,
        projectBrief,
        _subject: `New project inquiry from ${name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    })

    if (!upstream.ok) {
      return NextResponse.json(
        { success: false, message: 'Unable to send inquiry right now.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload.' },
      { status: 400 }
    )
  }
}
