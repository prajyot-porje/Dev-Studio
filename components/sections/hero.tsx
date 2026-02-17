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

        <div className="relative mt-10 min-h-[160vh] sm:min-h-[175vh]">
          <div className="sticky top-24 h-[72vh] sm:h-[75vh]">
            <div className="mx-auto grid h-full max-w-6xl place-items-center">
              <div className="relative h-full w-full max-w-5xl">
                {show3D ? (
                  <HeroScene reducedMotion={Boolean(reducedMotion)} progress={journeyProgress} />
                ) : (
                  <div className="shadow-glow relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,hsl(var(--surface-elevated)/0.9),hsl(var(--surface)/0.72))]">
                    <div className="absolute -left-12 top-14 h-52 w-52 rounded-full bg-[hsl(var(--hero-glow)/0.28)] blur-3xl" />
                    <div className="absolute -right-10 bottom-8 h-64 w-64 rounded-full bg-[hsl(var(--hero-glow-alt)/0.24)] blur-3xl" />
                    <div className="absolute inset-0 grid-fade opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-lg border border-white/20 px-5 py-2 text-micro text-xs text-foreground/80">
                        {webglAvailable === false
                          ? 'WebGL Unsupported - Showing Static Composition'
                          : 'Loading 3D Scene'}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-x-3 bottom-3 grid gap-2 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur lg:hidden">
                  {journeySteps.map((step, index) => {
                    const thresholdStart = index * 0.33
                    const thresholdEnd = thresholdStart + 0.33
                    const active = journeyProgress >= thresholdStart && journeyProgress < thresholdEnd
                    return (
                      <div
                        key={step.title}
                        className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                          active ? 'border-[hsl(var(--hero-glow))] bg-[hsl(var(--hero-glow)/0.18)]' : 'border-white/10'
                        }`}
                      >
                        <p className="text-micro text-[10px] text-muted-foreground">Stage {index + 1}</p>
                        <p className="mt-1 text-sm font-semibold">{step.title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute left-[3%] top-[10%] hidden max-w-xs lg:block">
            <article className="glass-panel rounded-2xl p-5">
              <p className="text-micro text-xs text-muted-foreground">Stage 01</p>
              <h3 className="mt-2 text-2xl font-semibold">{journeySteps[0].title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{journeySteps[0].copy}</p>
            </article>
          </div>

          <div className="pointer-events-none absolute right-[3%] top-[42%] hidden max-w-xs lg:block">
            <article className="glass-panel rounded-2xl p-5">
              <p className="text-micro text-xs text-muted-foreground">Stage 02</p>
              <h3 className="mt-2 text-2xl font-semibold">{journeySteps[1].title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{journeySteps[1].copy}</p>
            </article>
          </div>

          <div className="pointer-events-none absolute left-[16%] top-[74%] hidden max-w-xs lg:block">
            <article className="glass-panel rounded-2xl p-5">
              <p className="text-micro text-xs text-muted-foreground">Stage 03</p>
              <h3 className="mt-2 text-2xl font-semibold">{journeySteps[2].title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{journeySteps[2].copy}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
