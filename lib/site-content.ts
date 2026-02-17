export type NavItem = {
  id: string
  label: string
}

export type Offering = {
  title: string
  description: string
}

export type ValueDriver = {
  title: string
  summary: string
}

export type ArchitectureStep = {
  title: string
  detail: string
}

export type TechComponent = {
  title: string
  detail: string
}

export type OutcomeItem = {
  title: string
  summary: string
}

export type CaseStudy = {
  id: number
  title: string
  description: string
  image: string
  metrics: {
    lighthouse: number
    seo: number
    lcp: string
  }
  tags: string[]
}

export type EngagementModel = {
  title: string
  description: string
}

export type ContactDetail = {
  label: string
  value: string
  href?: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'offerings', label: 'Offerings' },
  { id: 'value-drivers', label: 'Value Drivers' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export const OFFERINGS: Offering[] = [
  {
    title: 'Web Platforms',
    description: 'Scalable, secure, and versatile online solutions engineered for measurable growth.',
  },
  {
    title: 'Mobile Applications',
    description: 'Intuitive iOS and Android experiences built for retention, speed, and operational confidence.',
  },
  {
    title: 'Custom Software',
    description: 'Tailored systems that fit your exact business model, workflows, and delivery environment.',
  },
  {
    title: 'AI And Automation',
    description: 'Smart integrations that transform decision-making and remove execution bottlenecks.',
  },
]

export const VALUE_DRIVERS: ValueDriver[] = [
  {
    title: 'Speed',
    summary: 'Rapid execution cycles that create decisive market advantage.',
  },
  {
    title: 'Scale',
    summary: 'Flexible architecture that adapts to growth and demand shifts.',
  },
  {
    title: 'Authority',
    summary: 'Technical excellence that strengthens credibility and trust.',
  },
  {
    title: 'Automation',
    summary: 'Streamlined operations that maximize productivity and consistency.',
  },
  {
    title: 'Revenue Enablement',
    summary: 'Conversion-focused systems that unlock sustainable business performance.',
  },
]

export const ARCHITECTURE_STEPS: ArchitectureStep[] = [
  {
    title: 'Strategy',
    detail: 'Strategy workshops and technical discovery aligned to commercial outcomes.',
  },
  {
    title: 'Architecture',
    detail: 'Enterprise-grade system design with resilient foundations for long-term scale.',
  },
  {
    title: 'Engineering',
    detail: 'Scalable product engineering with clean delivery standards and robust QA.',
  },
  {
    title: 'Optimization',
    detail: 'Continuous performance tuning, observability, and iterative improvement loops.',
  },
]

export const TECH_COMPONENTS: TechComponent[] = [
  {
    title: 'Frontend',
    detail: 'High-fidelity user interfaces and conversion-aware user experience systems.',
  },
  {
    title: 'Backend',
    detail: 'Reliable service architecture, data models, and integration-ready business logic.',
  },
  {
    title: 'Cloud',
    detail: 'Scalable cloud infrastructure tuned for resilience, speed, and maintainability.',
  },
  {
    title: 'AI Layer',
    detail: 'Intelligent assistants and automation pipelines for decision and workflow acceleration.',
  },
]

export const OUTCOMES: OutcomeItem[] = [
  {
    title: 'Premium Identity',
    summary: 'Elevating your brand through differentiated digital experiences.',
  },
  {
    title: 'Operational Efficiency',
    summary: 'Reducing friction with streamlined systems and delivery pipelines.',
  },
  {
    title: 'Scalable Infrastructure',
    summary: 'Built to grow with your team, products, and customer expectations.',
  },
  {
    title: 'Long-Term Value',
    summary: 'Technology decisions designed for sustainability and strategic flexibility.',
  },
  {
    title: 'Business Outcomes',
    summary: 'Transforming digital potential into measurable commercial results.',
  },
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: 'North American Medical Research & Learning Center',
    description: 'Clinical research learning platform engineered for trust, clarity, and speed.',
    image: '/namrl.png',
    metrics: {
      lighthouse: 83,
      seo: 100,
      lcp: '2.8s',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion Design'],
  },
  {
    id: 2,
    title: 'KIYOMI Facilities',
    description: 'Enterprise facility management platform with conversion-focused UX and fast runtime.',
    image: '/kiyomi.png',
    metrics: {
      lighthouse: 97,
      seo: 100,
      lcp: '0.9s',
    },
    tags: ['Next.js', 'TypeScript', 'System Design', 'Performance'],
  },
]

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: 'Project',
    description: 'End-to-end execution for defined outcomes, timelines, and delivery milestones.',
  },
  {
    title: 'Retainer',
    description: 'Ongoing strategic and engineering support for long-term growth programs.',
  },
  {
    title: 'Technology Partnership',
    description: 'Collaborative innovation model for ambitious teams building category leadership.',
  },
]

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: 'Website',
    value: 'devstudio.com',
    href: 'https://devstudio.com',
  },
  {
    label: 'Email',
    value: 'devstudio017@gmail.com',
    href: 'mailto:devstudio017@gmail.com',
  },
  {
    label: 'Phone',
    value: '8799871701',
    href: 'tel:+918799871701',
  },
]
