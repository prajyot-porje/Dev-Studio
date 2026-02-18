'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button-premium'
import { ParallaxBackground } from '@/components/visuals/parallax-background'

const HeroScene = dynamic(
  () => import('@/components/visuals/hero-scene').then((module) => module.HeroScene),
  { ssr: false }
)

function supportsWebGL() {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

const journeySteps = [
  {
    title: 'Web Platforms',
    copy: 'Conversion-focused web foundations designed to perform under scale, speed, and growth pressure.',
  },
  {
    title: 'Mobile Applications',
    copy: 'Reliable mobile journeys that balance usability, product clarity, and long-term engagement.',
  },
  {
    title: 'AI & Automation',
    copy: 'Intelligent automation layers that simplify operations and accelerate decision-making.',
  },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null)
  const [journeyProgress, setJourneyProgress] = useState(0)

  useEffect(() => {
    setWebglAvailable(supportsWebGL())
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const delayed = (latest - 0.08) / 0.84
    const normalized = Math.max(0, Math.min(1, delayed))
    setJourneyProgress(normalized)
  })

  const show3D = webglAvailable === true
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -26])

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[230vh] overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <ParallaxBackground strength={260} className="mask-soft" />

      <div className="section-inner relative">
        <motion.div
          style={reducedMotion ? undefined : { y: headerY }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="eyebrow">Premium Technology Consultancy</span>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.93] sm:text-6xl lg:text-7xl">
            We design premium digital systems that turn ambition into measurable growth.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            Inspired by strategy-first delivery, we build premium web, mobile, and automation experiences that turn
            technical execution into measurable business momentum.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="#contact">
              <Button size="lg" variant="primaryBlue" className="h-12 rounded-lg px-8 text-[0.94rem]">
                Contact Us
              </Button>
            </Link>
            <Link href="#work">
              <Button
                size="lg"
                variant="outlineNeutral"
                className="h-12 rounded-lg border-white/20 bg-background/40 px-8 text-[0.94rem] backdrop-blur"
              >
                Explore Work
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className='flex justify-center text-3xl items-center min-h-[800px] w-full h-full'>Work in progress</div>
      </div>
    </section>
  )
}
