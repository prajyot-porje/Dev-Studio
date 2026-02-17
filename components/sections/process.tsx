'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { ARCHITECTURE_STEPS } from '@/lib/site-content'

export function ProcessSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="architecture" className="section-shell">
      <div className="section-inner">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Digital Architecture Approach</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Strategy-to-optimization delivery designed for enterprise-grade execution.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {ARCHITECTURE_STEPS.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: reducedMotion ? 0 : index * 0.08 }}
              className="glass-panel rounded-3xl p-6"
            >
              <p className="text-micro text-xs text-muted-foreground">Stage {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
