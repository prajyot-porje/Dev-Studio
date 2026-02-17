'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { VALUE_DRIVERS } from '@/lib/site-content'
import { ParallaxBackground } from '@/components/visuals/parallax-background'

export function ValueDriversSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="value-drivers" className="section-shell overflow-hidden">
      <ParallaxBackground strength={220} reverse />
      <div className="section-inner relative">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Why It Matters</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Key value drivers that turn technical execution into commercial momentum.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {VALUE_DRIVERS.map((driver, index) => (
            <motion.article
              key={driver.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: reducedMotion ? 0 : index * 0.06 }}
              className="glass-panel rounded-2xl p-5"
            >
              <h3 className="text-xl font-semibold">{driver.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{driver.summary}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
