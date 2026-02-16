'use client'

import { Button } from '@/components/ui/button-premium'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type FormEvent, useEffect, useRef, useState } from 'react'

type Step = 1 | 2 | 3

type FormData = {
  name: string
  email: string
  company: string
  budgetRange: string
  projectBrief: string
}

const BUDGET_OPTIONS = [
  'Below $10k',
  '$10k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k+',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function CTASection() {
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isVisible, setIsVisible] = useState(false)
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
  const ref = useRef<HTMLDivElement>(null)
  const hasInitializedFocus = useRef(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const briefRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.25 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

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
      if (!EMAIL_REGEX.test(formData.email.trim())) nextErrors.email = 'Please enter a valid email.'
    }

    if (currentStep === 2) {
      if (!formData.company.trim()) nextErrors.company = 'Please enter your company.'
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
      return 'absolute inset-0 opacity-0 -translate-x-5 pointer-events-none'
    }

    return 'absolute inset-0 opacity-0 translate-x-5 pointer-events-none'
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-secondary"
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-14 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mb-5">
            Start Your Project
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us what you are building and we will come back with a clear technical path.
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto border border-border rounded-lg bg-card shadow-[0_8px_24px_rgba(17,17,17,0.06)] p-6 sm:p-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          aria-live="polite"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      dot === step ? 'w-8 bg-[#3B82F6]' : 'w-3 bg-border'
                    }`}
                  />
                ))}
              </div>

              <div className="mb-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Step {step} of 3</p>
              </div>

              <div className="relative min-h-[248px]">
                <div className={`w-full transition-all duration-300 ease-out ${getStepPanelClass(1)}`}>
                  <div className="space-y-4 px-1">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name <span className="text-muted-foreground">*</span>
                      </label>
                      <Input
                        id="name"
                        ref={nameRef}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="h-11 bg-background border-border focus-visible:ring-1 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-0"
                      />
                      {errors.name ? <p className="mt-2 text-sm text-[#B91C1C]">{errors.name}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email <span className="text-muted-foreground">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="you@company.com"
                        className="h-11 bg-background border-border focus-visible:ring-1 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-0"
                      />
                      {errors.email ? <p className="mt-2 text-sm text-[#B91C1C]">{errors.email}</p> : null}
                    </div>
                  </div>
                </div>

                <div className={`w-full transition-all duration-300 ease-out ${getStepPanelClass(2)}`}>
                  <div className="space-y-4 px-1">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company <span className="text-muted-foreground">*</span>
                      </label>
                      <Input
                        id="company"
                        ref={companyRef}
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Company name"
                        className="h-11 bg-background border-border focus-visible:ring-1 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-0"
                      />
                      {errors.company ? <p className="mt-2 text-sm text-[#B91C1C]">{errors.company}</p> : null}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Budget range <span className="text-muted-foreground">*</span>
                      </label>
                      <select
                        id="budget"
                        value={formData.budgetRange}
                        onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-0"
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.budgetRange ? <p className="mt-2 text-sm text-[#B91C1C]">{errors.budgetRange}</p> : null}
                    </div>
                  </div>
                </div>

                <div className={`w-full transition-all duration-300 ease-out ${getStepPanelClass(3)}`}>
                  <div className="px-1">
                    <label htmlFor="projectBrief" className="block text-sm font-medium text-foreground mb-2">
                      Project brief <span className="text-muted-foreground">*</span>
                    </label>
                    <Textarea
                      id="projectBrief"
                      ref={briefRef}
                      value={formData.projectBrief}
                      onChange={(e) => handleInputChange('projectBrief', e.target.value)}
                      placeholder="Describe goals, timelines, and key requirements."
                      className="min-h-[170px] bg-background border-border resize-none focus-visible:ring-1 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-0"
                    />
                    {errors.projectBrief ? <p className="mt-2 text-sm text-[#B91C1C]">{errors.projectBrief}</p> : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outlineNeutral"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className={step === 1 ? 'opacity-40 cursor-not-allowed' : ''}
                >
                  Back
                </Button>

                {step < 3 ? (
                  <Button type="button" variant="primaryBlue" onClick={handleNext} disabled={isSubmitting}>
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" variant="primaryBlue" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Project'}
                  </Button>
                )}
              </div>
              {submitError ? <p className="mt-4 text-sm text-[#B91C1C]">{submitError}</p> : null}
            </form>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-foreground mb-3">Thank you. We received your brief.</h3>
              <p className="text-muted-foreground mb-7">
                Our team will review your details and reach out with next steps.
              </p>
              <Button variant="outlineNeutral" onClick={resetForm}>
                Submit another request
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
