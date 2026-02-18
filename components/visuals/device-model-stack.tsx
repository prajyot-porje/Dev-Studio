'use client'

import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Box3, TOUCH, Vector3 } from 'three'

import { cn } from '@/lib/utils'

type DeviceSpec = {
  id: string
  indexLabel: string
  title: string
  copy: string
  modelPath: string
  fitScale: number
  rotation: [number, number, number]
  initialAzimuth: number
}

const deviceSpecs: DeviceSpec[] = [
  {
    id: 'desktop',
    indexLabel: '01',
    title: 'Web Platform Engineering',
    copy: 'Conversion-focused web foundations built for speed, SEO authority, and long-term scale.',
    modelPath: '/models/pc.glb',
    fitScale: 2.5,
    rotation: [0, -0.26, 0.02],
    initialAzimuth: -0.4,
  },
  {
    id: 'laptop',
    indexLabel: '02',
    title: 'Custom Software Systems',
    copy: 'Tailored product architecture that aligns operations, data workflows, and reliable backend execution.',
    modelPath: '/models/laptop.glb',
    fitScale: 2.35,
    rotation: [0, -0.28, 0],
    initialAzimuth: -1.18,
  },
  {
    id: 'mobile',
    indexLabel: '03',
    title: 'Mobile Application Delivery',
    copy: 'Retention-oriented mobile journeys designed for product clarity, usability, and measurable engagement.',
    modelPath: '/models/mobile.glb',
    fitScale: 2.1,
    rotation: [0, -0.24, 0],
    initialAzimuth: -0.32,
  },
]

type DeviceModelProps = {
  src: string
  fitScale: number
  rotation: [number, number, number]
}

function DeviceModel({ src, fitScale, rotation }: DeviceModelProps) {
  const { scene } = useGLTF(src)

  const { modelScale, modelPosition } = useMemo(() => {
    const bounds = new Box3().setFromObject(scene)
    const size = bounds.getSize(new Vector3())
    const center = bounds.getCenter(new Vector3())
    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const normalizedScale = fitScale / maxAxis

    return {
      modelScale: normalizedScale,
      modelPosition: [
        -center.x * normalizedScale,
        -center.y * normalizedScale,
        -center.z * normalizedScale,
      ] as [number, number, number],
    }
  }, [fitScale, scene])

  return (
    <group rotation={rotation}>
      <group scale={modelScale} position={modelPosition}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

type DeviceCanvasProps = {
  src: string
  fitScale: number
  rotation: [number, number, number]
  initialAzimuth: number
}

function DeviceCanvas({ src, fitScale, rotation, initialAzimuth }: DeviceCanvasProps) {
  const controlsRef = useRef<any>(null)
  const [isCoarsePointer, setIsCoarsePointer] = useState(false)
  const [isTwoFingerGesture, setIsTwoFingerGesture] = useState(false)

  useEffect(() => {
    if (!controlsRef.current) return
    controlsRef.current.setAzimuthalAngle(initialAzimuth)
    controlsRef.current.update()
  }, [initialAzimuth])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(pointer: coarse)')
    const apply = () => setIsCoarsePointer(media.matches)
    apply()
    media.addEventListener('change', apply)

    return () => {
      media.removeEventListener('change', apply)
    }
  }, [])

  const controlsEnabled = !isCoarsePointer || isTwoFingerGesture

  return (
    <div
      className="h-full w-full touch-pan-y"
      onTouchStart={(event) => setIsTwoFingerGesture(event.touches.length >= 2)}
      onTouchMove={(event) => setIsTwoFingerGesture(event.touches.length >= 2)}
      onTouchEnd={(event) => setIsTwoFingerGesture(event.touches.length >= 2)}
      onTouchCancel={() => setIsTwoFingerGesture(false)}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.2], fov: 30 }}
        className="h-full w-full touch-pan-y"
      >
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enabled={controlsEnabled}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.09}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-1.35}
          maxAzimuthAngle={1.35}
          rotateSpeed={0.68}
          touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.ROTATE }}
        />
        <ambientLight intensity={0.78} />
        <directionalLight position={[3.8, 3.1, 2.4]} intensity={1.05} color="#a6e9ff" />
        <directionalLight position={[-2.6, -1.4, 3]} intensity={0.42} color="#bcffcc" />
        <Suspense fallback={null}>
          <DeviceModel src={src} fitScale={fitScale} rotation={rotation} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function DeviceStage({
  item,
  index,
  enabled,
}: {
  item: DeviceSpec
  index: number
  enabled: boolean
}) {
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLElement>(null)
  const visible = useInView(stageRef, {
    amount: 0.22,
    margin: '260px 0px 260px 0px',
  })
  const reverse = index % 2 === 1

  return (
    <motion.article
      ref={stageRef}
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative isolate min-h-[56vh] py-5 sm:min-h-[62vh] sm:py-7 lg:min-h-[66vh] lg:py-8"
    >
      <div
        className={cn(
          'grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14',
          reverse && 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'
        )}
      >
        <div className={cn('relative z-10 max-w-xl space-y-5 px-4 sm:px-0', reverse && 'lg:order-2 lg:ml-auto')}>
          <p className="text-micro text-muted-foreground/90">{item.indexLabel}</p>
          <h3 className="text-balance font-heading text-3xl font-semibold leading-[0.94] sm:text-4xl lg:text-5xl">
            {item.title}
          </h3>
          <p className="max-w-lg text-sm text-muted-foreground sm:text-base lg:text-lg">{item.copy}</p>
        </div>

        <div
          className={cn(
            'relative h-[38vh] min-h-[280px] w-full sm:h-[44vh] sm:min-h-[320px] lg:h-[50vh] lg:min-h-[350px]',
            reverse && 'lg:order-1'
          )}
        >
          {enabled && visible ? (
            <DeviceCanvas
              src={item.modelPath}
              fitScale={item.fitScale}
              rotation={item.rotation}
              initialAzimuth={item.initialAzimuth}
            />
          ) : (
            <div className="h-full w-full bg-transparent" />
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function DeviceModelStack({ enabled }: { enabled: boolean }) {
  return (
    <div className="mt-20 sm:mt-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-micro text-muted-foreground/80">Delivery Architecture</span>
        <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-[0.94] sm:text-5xl lg:text-6xl">
          How Dev Studio Builds Digital Systems
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          From high-performance web platforms to custom software and mobile products, each layer is engineered for
          measurable growth, scale, and operational reliability.
        </p>
      </div>

      {!enabled && (
        <p className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 px-5 py-4 text-center text-sm text-muted-foreground">
          WebGL is unavailable on this device, so interactive 3D previews are temporarily disabled.
        </p>
      )}

      <div className="mt-8">
        {deviceSpecs.map((item, index) => (
          <DeviceStage key={item.id} item={item} index={index} enabled={enabled} />
        ))}
      </div>
    </div>
  )
}

useGLTF.preload('/models/pc.glb')
