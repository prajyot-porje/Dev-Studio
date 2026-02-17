'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { OFFERINGS } from '@/lib/site-content'

export function ServicesSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="offerings" className="section-shell">
      <div className="section-inner">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Our Core Offerings</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Engineered capabilities for speed, scale, and measurable progress.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every service is built as part of a connected delivery system designed to move business outcomes, not just
            ship interfaces.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {OFFERINGS.map((offering, index) => (
            <motion.article
              key={offering.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: reducedMotion ? 0 : index * 0.08 }}
              className="glass-panel group relative overflow-hidden rounded-3xl p-6 sm:p-7"
            >
              <div className="absolute -right-16 top-0 h-36 w-36 rounded-full bg-[hsl(var(--hero-glow)/0.16)] blur-3xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-80" />
              <p className="text-micro text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{offering.title}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {offering.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
