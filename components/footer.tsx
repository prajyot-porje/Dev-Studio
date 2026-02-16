import { LogoMark } from '@/components/logo-mark'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex gap-4 items-center hover:opacity-80 transition-opacity">
          <LogoMark className="w-12 h-12" />
                    <span className="hidden sm:inline text-xl font-semibold tracking-tight">Dev Studio</span>
        </Link>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Performance-driven digital systems for ambitious businesses.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Performance
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  SEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@devstudio.com"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  hello@devstudio.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-sm text-foreground/60">Pune, India</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#work"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Work
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex items-center justify-between">
          <p className="text-xs text-foreground/50">
            © {currentYear} Dev Studio. All rights reserved.
          </p>
          <p className="text-xs text-foreground/50">
            Crafted with precision and care
          </p>
        </div>
      </div>
    </footer>
  )
}
