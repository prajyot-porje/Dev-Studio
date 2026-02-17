'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { TECH_COMPONENTS } from '@/lib/site-content'

export function TechnologySection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="technology" className="section-shell">
      <div className="section-inner">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Core Technology Components</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Multi-layer architecture for resilient digital systems.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {TECH_COMPONENTS.map((component, index) => (
            <motion.article
              key={component.title}
              initial={{ opacity: 0, x: reducedMotion ? 0 : index % 2 === 0 ? -22 : 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass-panel rounded-3xl p-6 sm:p-7"
            >
              <p className="text-micro text-xs text-muted-foreground">{component.title}</p>
              <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{component.title}</h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">{component.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
