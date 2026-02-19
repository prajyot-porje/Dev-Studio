import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  budgetRange?: string
  projectBrief?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getEnv(name: string) {
  return process.env[name]?.trim() ?? ''
}

export async function POST(request: Request) {
  let body: ContactPayload

  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload.' },
      { status: 400 }
    )
  }

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

  const emailUser = getEnv('EMAIL_USER')
  const emailPassword = getEnv('EMAIL_PASSWORD')
  const receiverEmail = getEnv('CONTACT_RECEIVER_EMAIL') || emailUser

  if (!emailUser || !emailPassword || !receiverEmail) {
    return NextResponse.json(
      { success: false, message: 'Email service is not configured.' },
      { status: 500 }
    )
  }

  const transport = nodemailer.createTransport({
    host: getEnv('EMAIL_HOST') || 'smtp.gmail.com',
    port: Number(getEnv('EMAIL_PORT') || 465),
    secure: (getEnv('EMAIL_SECURE') || 'true') === 'true',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })

  try {
    await Promise.all([
      transport.sendMail({
        from: `"Dev Studio Contact" <${emailUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `New project inquiry from ${name}`,
        text: [
          'New contact form submission:',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Budget Range: ${budgetRange}`,
          '',
          'Project Brief:',
          projectBrief,
        ].join('\n'),
      }),
      transport.sendMail({
        from: `"Dev Studio" <${emailUser}>`,
        to: email,
        subject: 'We received your inquiry',
        text: [
          `Hi ${name},`,
          '',
          'Thanks for reaching out to Dev Studio.',
          'We received your project brief and our team will follow up shortly.',
          '',
          'Your submitted details:',
          `Company: ${company}`,
          `Budget: ${budgetRange}`,
          `Project Brief: ${projectBrief}`,
          '',
          'Best regards,',
          'Dev Studio Team',
        ].join('\n'),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact mail error:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to send inquiry right now.' },
      { status: 502 }
    )
  }
}
