'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import { CASE_STUDIES } from '@/lib/site-content'

export function WorkSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="work" className="section-shell">
      <div className="section-inner">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <span className="eyebrow">Selected Work</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Proof that design quality and performance can scale together.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Case snapshots focused on conversion, reliability, and search visibility outcomes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: reducedMotion ? 0 : index * 0.1 }}
              className="glass-panel group overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-foreground/85">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-micro text-[11px] text-muted-foreground">Lighthouse</p>
                    <p className="mt-1 text-xl font-semibold text-[hsl(var(--hero-glow))]">{project.metrics.lighthouse}</p>
                  </div>
                  <div>
                    <p className="text-micro text-[11px] text-muted-foreground">LCP</p>
                    <p className="mt-1 text-xl font-semibold text-[hsl(var(--hero-glow-alt))]">{project.metrics.lcp}</p>
                  </div>
                  <div>
                    <p className="text-micro text-[11px] text-muted-foreground">SEO</p>
                    <p className="mt-1 text-xl font-semibold text-[hsl(var(--hero-glow))]">{project.metrics.seo}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
