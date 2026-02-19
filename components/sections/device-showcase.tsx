'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const DeviceModelStack = dynamic(
  () => import('@/components/visuals/device-model-stack').then((module) => module.DeviceModelStack),
  { ssr: false }
)

function supportsWebGL() {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function DeviceShowcaseSection() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglAvailable(supportsWebGL())
  }, [])

  return (
    <section id="delivery-architecture" className="section-shell">
      <div className="section-inner">
        <DeviceModelStack enabled={webglAvailable === true} />
      </div>
    </section>
  )
}
