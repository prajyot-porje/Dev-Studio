'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { OUTCOMES } from '@/lib/site-content'
import { ParallaxBackground } from '@/components/visuals/parallax-background'

export function OutcomesSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="outcomes" className="section-shell overflow-hidden">
      <ParallaxBackground strength={210} />
      <div className="section-inner relative">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Key Business Outcomes</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Beyond delivery, we design systems that compound long-term value.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {OUTCOMES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: reducedMotion ? 0 : index * 0.05 }}
              className="glass-panel rounded-2xl p-5"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
