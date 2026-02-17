'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/ui/button-premium'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Step = 1 | 2 | 3

type FormData = {
  name: string
  email: string
  company: string
  budgetRange: string
  projectBrief: string
}

const BUDGET_OPTIONS = ['Below $10k', '$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+']

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STEP_TITLES: Record<Step, string> = {
  1: 'Contact Details',
  2: 'Business Context',
  3: 'Project Intent',
}

export function CTASection() {
  const reducedMotion = useReducedMotion()
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budgetRange: '',
    projectBrief: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const hasInitializedFocus = useRef(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const briefRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!hasInitializedFocus.current) {
      hasInitializedFocus.current = true
      return
    }

    if (step === 1) nameRef.current?.focus()
    if (step === 2) companyRef.current?.focus()
    if (step === 3) briefRef.current?.focus()
  }, [step])

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#contact') {
        setStep(1)
        setIsSubmitted(false)
      }
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (currentStep: Step) => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) nextErrors.name = 'Please enter your name.'
      if (!EMAIL_REGEX.test(formData.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    }

    if (currentStep === 2) {
      if (!formData.company.trim()) nextErrors.company = 'Please enter your company name.'
      if (!formData.budgetRange) nextErrors.budgetRange = 'Please select a budget range.'
    }

    if (currentStep === 3) {
      if (!formData.projectBrief.trim()) nextErrors.projectBrief = 'Please add a short project brief.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep(step)) return

    if (step < 3) {
      setDirection('forward')
      setStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setDirection('backward')
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const submit = async () => {
      setIsSubmitting(true)
      setSubmitError(null)

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const data = (await response.json()) as { success?: boolean; message?: string }

        if (!response.ok || !data.success) {
          setSubmitError(data.message ?? 'Something went wrong. Please try again.')
          return
        }

        setIsSubmitted(true)
      } catch {
        setSubmitError('Network error. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }

    event.preventDefault()

    if (!validateStep(3)) return
    void submit()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      budgetRange: '',
      projectBrief: '',
    })
    setErrors({})
    setStep(1)
    setIsSubmitted(false)
    setSubmitError(null)
  }

  const getStepPanelClass = (targetStep: Step) => {
    if (step === targetStep) {
      return 'relative opacity-100 translate-x-0'
    }

    if (direction === 'forward') {
      return 'absolute inset-0 -translate-x-6 opacity-0 pointer-events-none'
    }

    return 'absolute inset-0 translate-x-6 opacity-0 pointer-events-none'
  }

  return (
    <section id="contact" className="section-shell pb-24 sm:pb-32">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Primary Conversion</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Share your project context. This structured brief works as our booking fallback and routes directly to our
            consulting team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.04 }}
          className="glass-panel mx-auto mt-10 max-w-3xl rounded-3xl p-5 sm:p-8"
          aria-live="polite"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-8 flex items-center justify-center gap-2">
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      dot === step ? 'w-10 bg-[hsl(var(--hero-glow))]' : 'w-3 bg-border'
                    }`}
                  />
                ))}
              </div>

              <div className="mb-7 text-center">
                <p className="text-micro text-[11px] text-muted-foreground">Step {step} of 3</p>
                <p className="mt-2 text-lg font-semibold">{STEP_TITLES[step]}</p>
              </div>

              <div className="relative min-h-[272px]">
                <div className={`w-full transition-all duration-300 ease-out ${getStepPanelClass(1)}`}>
                  <div className="space-y-4 px-1">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                        Name <span className="text-muted-foreground">*</span>
                      </label>
                      <Input
                        id="name"
                        ref={nameRef}
                        value={formData.name}
                        onChange={(event) => handleInputChange('name', event.target.value)}
                        placeholder="Your full name"
                        className="h-12 rounded-xl border-white/20 bg-background/80 focus-visible:ring-1 focus-visible:ring-[hsl(var(--hero-glow))] focus-visible:ring-offset-0"
                      />
                      {errors.name ? <p className="mt-2 text-sm text-red-400">{errors.name}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        Email <span className="text-muted-foreground">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(event) => handleInputChange('email', event.target.value)}
                        placeholder="you@company.com"
                        className="h-12 rounded-xl border-white/20 bg-background/80 focus-visible:ring-1 focus-visible:ring-[hsl(var(--hero-glow))] focus-visible:ring-offset-0"
                      />
                      {errors.email ? <p className="mt-2 text-sm text-red-400">{errors.email}</p> : null}
                    </div>
                  </div>
                </div>

                <div className={`w-full transition-all duration-300 ease-out ${getStepPanelClass(2)}`}>
                  <div className="space-y-4 px-1">
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                        Company <span className="text-muted-foreground">*</span>
                      </label>
                      <Input
                        id="company"
                        ref={companyRef}
                        value={formData.company}
                        onChange={(event) => handleInputChange('company', event.target.value)}
                        placeholder="Company name"
                        className="h-12 rounded-xl border-white/20 bg-background/80 focus-visible:ring-1 focus-visible:ring-[hsl(var(--hero-glow))] focus-visible:ring-offset-0"
                      />
                      {errors.company ? <p className="mt-2 text-sm text-red-400">{errors.company}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">
                        Budget range <span className="text-muted-foreground">*</span>
                      </label>
                      <select
                        id="budget"
                        value={formData.budgetRange}
                        onChange={(event) => handleInputChange('budgetRange', event.target.value)}
                        className="flex h-12 w-full rounded-xl border border-white/20 bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--hero-glow))] focus-visible:ring-offset-0"
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.budgetRange ? <p className="mt-2 text-sm text-red-400">{errors.budgetRange}</p> : null}
                    </div>
                  </div>
                </div>

                <div className={`w-full transition-all duration-300 ease-out ${getStepPanelClass(3)}`}>
                  <div className="px-1">
                    <label htmlFor="projectBrief" className="mb-2 block text-sm font-medium text-foreground">
                      Project brief <span className="text-muted-foreground">*</span>
                    </label>
                    <Textarea
                      id="projectBrief"
                      ref={briefRef}
                      value={formData.projectBrief}
                      onChange={(event) => handleInputChange('projectBrief', event.target.value)}
                      placeholder="What are you building, what timeline are you targeting, and what should this system improve?"
                      className="min-h-[184px] resize-none rounded-xl border-white/20 bg-background/80 focus-visible:ring-1 focus-visible:ring-[hsl(var(--hero-glow))] focus-visible:ring-offset-0"
                    />
                    {errors.projectBrief ? <p className="mt-2 text-sm text-red-400">{errors.projectBrief}</p> : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outlineNeutral"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className={step === 1 ? 'cursor-not-allowed opacity-40' : ''}
                >
                  Back
                </Button>

                {step < 3 ? (
                  <Button type="button" variant="primaryBlue" onClick={handleNext} disabled={isSubmitting}>
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" variant="primaryBlue" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Discovery Brief'}
                  </Button>
                )}
              </div>

              {submitError ? <p className="mt-4 text-sm text-red-400">{submitError}</p> : null}
            </form>
          ) : (
            <div className="py-8 text-center">
              <h3 className="text-2xl font-semibold">Thank you. We received your brief.</h3>
              <p className="mt-3 text-muted-foreground">
                Our team will review your context and follow up with the next steps for your discovery call.
              </p>
              <Button variant="outlineNeutral" onClick={resetForm} className="mt-7">
                Submit another request
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
