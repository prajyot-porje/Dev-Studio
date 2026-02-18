import Link from 'next/link'

import { LogoMark } from '@/components/logo-mark'
import { CONTACT_DETAILS, NAV_ITEMS } from '@/lib/site-content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="section-shell border-t border-white/10 pb-10 pt-16 sm:pt-20">
      <div className="section-inner">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="#top" className="inline-flex items-center gap-3">
              <span className="font-heading text-3xl font-semibold tracking-tight">Dev Studio</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Premium technology consultancy focused on engineering digital growth through scalable systems, not one-off
              builds.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link href={`#${item.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80">Contact</h3>
            <ul className="mt-4 space-y-2">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail.label} className="text-sm text-muted-foreground">
                  <span className="text-foreground/80">{detail.label}: </span>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="transition-colors hover:text-foreground"
                      target={detail.href.startsWith('http') ? '_blank' : undefined}
                      rel={detail.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex sm:items-center sm:justify-between">
          <p>(c) {year} Dev Studio. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Build systems, not just websites.</p>
        </div>
      </div>
    </footer>
  )
}