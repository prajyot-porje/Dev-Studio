'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { ENGAGEMENT_MODELS } from '@/lib/site-content'

export function EngagementSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="engagement" className="section-shell">
      <div className="section-inner">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Engagement Model</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Flexible collaboration formats for project outcomes and long-term growth.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model, index) => (
            <motion.article
              key={model.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, ease: 'easeOut', delay: reducedMotion ? 0 : index * 0.08 }}
              className="glass-panel rounded-3xl p-6 sm:p-7"
            >
              <p className="text-micro text-xs text-muted-foreground">Option {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{model.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{model.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
