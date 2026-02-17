'use client'

import { Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Material, Mesh, Object3D } from 'three'

type HeroSceneProps = {
  reducedMotion?: boolean
  progress?: number
}

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value))
const smooth = (value: number) => {
  const v = clamp(value)
  return v * v * (3 - 2 * v)
}
const phased = (value: number, start: number, end: number) => smooth((value - start) / (end - start))

function setGroupOpacity(group: Object3D, nextOpacity: number) {
  const opacity = clamp(nextOpacity, 0, 1)

  group.traverse((node) => {
    const mesh = node as Mesh
    if (!mesh.isMesh) return

    const applyOpacity = (material: Material) => {
      const typedMaterial = material as Material & {
        transparent: boolean
        opacity: number
        depthWrite: boolean
      }

      typedMaterial.transparent = opacity < 0.999
      typedMaterial.opacity = opacity
      typedMaterial.depthWrite = opacity > 0.35
    }

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(applyOpacity)
    } else {
      applyOpacity(mesh.material)
    }

    mesh.visible = opacity > 0.012
  })
}

function DeviceMorphScene({ reducedMotion = false, progress = 0 }: HeroSceneProps) {
  const rootRef = useRef<Group>(null)
  const desktopRef = useRef<Group>(null)
  const laptopRef = useRef<Group>(null)
  const mobileRef = useRef<Group>(null)
  const easedProgress = useRef(0)

  useFrame((_state, delta) => {
    if (!rootRef.current || !desktopRef.current || !laptopRef.current || !mobileRef.current) return

    const targetProgress = reducedMotion ? 0 : clamp(progress)
    const smoothing = clamp(delta * 4.6, 0, 1)
    easedProgress.current = easedProgress.current + (targetProgress - easedProgress.current) * smoothing

    const p = clamp(easedProgress.current)
    const desktopExit = phased(p, 0.46, 0.9)
    const laptopEnter = phased(p, 0.26, 0.62)
    const laptopExit = phased(p, 0.74, 0.97)
    const mobileEnter = phased(p, 0.7, 1)

    rootRef.current.position.y = 0.38 - p * 0.54
    rootRef.current.rotation.y = -0.26 + p * 0.5

    desktopRef.current.position.set(0, 0.3 - desktopExit * 0.35 - mobileEnter * 0.05, 0)
    desktopRef.current.rotation.set(0.04 + desktopExit * 0.17, p * 0.1, 0)
    desktopRef.current.scale.setScalar(1 - desktopExit * 0.58)
    setGroupOpacity(desktopRef.current, 1 - desktopExit * 0.95)

    laptopRef.current.position.set(0, 0.07 - laptopExit * 0.2, 0)
    laptopRef.current.rotation.set(0.08 + laptopEnter * 0.08, -0.18 + laptopExit * 0.26, 0)
    laptopRef.current.scale.setScalar(0.72 + laptopEnter * 0.38 - laptopExit * 0.16)
    setGroupOpacity(laptopRef.current, laptopEnter * (1 - laptopExit * 0.95))

    mobileRef.current.position.set(0, -0.44 + mobileEnter * 0.28, 0)
    mobileRef.current.rotation.set(0.15, -0.2 + mobileEnter * 0.18, 0)
    mobileRef.current.scale.setScalar(0.42 + mobileEnter * 0.62)
    setGroupOpacity(mobileRef.current, mobileEnter)
  })

  return (
    <group ref={rootRef}>
      <group ref={desktopRef}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[2.42, 1.42, 0.08]} />
          <meshStandardMaterial color="#84ddff" emissive="#6bf0d2" emissiveIntensity={0.18} metalness={0.75} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0.05]}>
          <boxGeometry args={[2.2, 1.2, 0.02]} />
          <meshStandardMaterial color="#0f1b2e" emissive="#20476d" emissiveIntensity={0.65} metalness={0.15} roughness={0.36} />
        </mesh>
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[0.2, 0.38, 0.12]} />
          <meshStandardMaterial color="#6dc4ec" metalness={0.74} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.95, 0]}>
          <boxGeometry args={[0.94, 0.06, 0.48]} />
          <meshStandardMaterial color="#67aed0" metalness={0.7} roughness={0.34} />
        </mesh>
      </group>

      <group ref={laptopRef}>
        <mesh position={[0, -0.58, 0]}>
          <boxGeometry args={[1.9, 0.08, 1.25]} />
          <meshStandardMaterial color="#76d8ff" emissive="#6aeecf" emissiveIntensity={0.18} metalness={0.75} roughness={0.22} />
        </mesh>
        <group position={[0, -0.07, -0.52]} rotation={[-0.92, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.78, 1.08, 0.07]} />
            <meshStandardMaterial color="#8ee7ff" metalness={0.68} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[1.58, 0.88, 0.02]} />
            <meshStandardMaterial color="#102038" emissive="#274f72" emissiveIntensity={0.5} metalness={0.1} roughness={0.45} />
          </mesh>
        </group>
      </group>

      <group ref={mobileRef}>
        <mesh>
          <boxGeometry args={[0.8, 1.56, 0.12]} />
          <meshStandardMaterial color="#8be6ff" emissive="#66f0c5" emissiveIntensity={0.16} metalness={0.7} roughness={0.24} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[0.66, 1.28, 0.02]} />
          <meshStandardMaterial color="#0f2238" emissive="#2e628d" emissiveIntensity={0.42} metalness={0.08} roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

export function HeroScene({ reducedMotion = false, progress = 0 }: HeroSceneProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(155deg,hsl(var(--surface-elevated)/0.92),hsl(var(--surface)/0.74))]">
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.2, 5.2], fov: 44 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 4, 2]} intensity={1.6} color="#9ae7ff" />
        <pointLight position={[-3, -2, 2]} intensity={1.1} color="#9dffb6" />
        <pointLight position={[0, 3, 5]} intensity={0.9} color="#78bfff" />
        <DeviceMorphScene reducedMotion={reducedMotion} progress={progress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
