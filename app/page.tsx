import { CTASection } from '@/components/sections/cta'
import { HeroSection } from '@/components/sections/hero'
import { PhilosophySection } from '@/components/sections/philosophy'
import { ProcessSection } from '@/components/sections/process'
import { ServicesSection } from '@/components/sections/services'
import { WorkSection } from '@/components/sections/work'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <PhilosophySection />
      <CTASection />
      <Footer />
    </main>
  )
}
