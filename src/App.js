import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls, Stage } from '@react-three/drei'
import { Model } from './Model'
import { Controls } from './Controls'

export default function Viewer() {
  const ref = useRef()
  return (
    <Canvas shadows camera={{ fov: 50 }} dpr={[1, 2]}>
      <Controls />
      <Suspense fallback={null} >
          <Model />
      </Suspense>
      <OrbitControls ref={ref} />
    </Canvas>
  )
}