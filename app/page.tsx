import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CTASection } from '@/components/sections/cta'
import { DeviceShowcaseSection } from '@/components/sections/device-showcase'
import { EngagementSection } from '@/components/sections/engagement'
import { HeroSection } from '@/components/sections/hero'
import { OutcomesSection } from '@/components/sections/outcomes'
import { ProcessSection } from '@/components/sections/process'
import { ServicesSection } from '@/components/sections/services'
import { TechnologySection } from '@/components/sections/technology'
import { ValueDriversSection } from '@/components/sections/value-drivers'
import { WorkSection } from '@/components/sections/work'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ServicesSection />
      <DeviceShowcaseSection />
      <ValueDriversSection />
      <ProcessSection />
      <TechnologySection />
      <OutcomesSection />
      <WorkSection />
      <EngagementSection />
      <CTASection />
      <Footer />
    </main>
  )
}
