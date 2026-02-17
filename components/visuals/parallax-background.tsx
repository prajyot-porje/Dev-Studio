'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type ParallaxBackgroundProps = {
  className?: string
  strength?: number
  reverse?: boolean
}

export function ParallaxBackground({
  className,
  strength = 180,
  reverse = false,
}: ParallaxBackgroundProps) {
  const target = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  })

  const start = reverse ? strength : -strength
  const end = reverse ? -strength : strength
  const yPrimary = useTransform(scrollYProgress, [0, 1], [start, end])
  const ySecondary = useTransform(scrollYProgress, [0, 1], [end * 0.7, start * 0.7])
  const yGrid = useTransform(scrollYProgress, [0, 1], [start * 0.2, end * 0.2])
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const xBand = useTransform(scrollYProgress, [0, 1], [-36, 36])

  return (
    <div ref={target} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <motion.div
        style={reducedMotion ? undefined : { y: yPrimary }}
        className="absolute -left-24 top-[-4rem] h-80 w-80 rounded-full bg-[hsl(var(--hero-glow)/0.28)] blur-3xl"
      />
      <motion.div
        style={reducedMotion ? undefined : { y: ySecondary }}
        className="absolute -right-20 bottom-[-5rem] h-[26rem] w-[26rem] rounded-full bg-[hsl(var(--hero-glow-alt)/0.24)] blur-3xl"
      />
      <motion.div
        style={reducedMotion ? undefined : { x: xBand, rotate }}
        className="absolute left-[8%] top-[48%] h-20 w-[52%] rounded-[2rem] bg-[linear-gradient(90deg,hsl(var(--hero-glow)/0.18),hsl(var(--hero-glow-alt)/0.08),transparent)] blur-xl"
      />
      <motion.div
        style={reducedMotion ? undefined : { y: yGrid }}
        className="grid-fade absolute inset-0 opacity-90"
      />
    </div>
  )
}
