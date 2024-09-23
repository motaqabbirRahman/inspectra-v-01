import { useRef, useEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

const positions = [
  {
    position: new THREE.Vector3(-10, 0, 0),
    rotation: new THREE.Euler(Math.PI / 2, Math.PI, Math.PI / 2), // Roll, pitch, yaw
  }, // Left side view
  {
    position: new THREE.Vector3(0, 0, 10),
    rotation: new THREE.Euler(Math.PI / 2, Math.PI, 0), // Roll, pitch, yaw
  }, // front view
  {
    position: new THREE.Vector3(10, 0, 0),
    rotation: new THREE.Euler(Math.PI / 2, Math.PI, Math.PI / 2), // Roll, pitch, yaw
  }, // Right side view
  {
    position: new THREE.Vector3(0, 0, 10),
    rotation: new THREE.Euler(Math.PI / 2, Math.PI, 0), // Roll, pitch, yaw
  }, // front view
]

interface SceneProps {
  modelPath: string
  mtlPath: string
  isPlaying: boolean
}

export default function Scene({ modelPath, mtlPath, isPlaying }: SceneProps) {
  const ref = useRef<THREE.Object3D | null>(null)
  const startTime = useRef(Date.now())

  const materials = useLoader(MTLLoader, mtlPath)
  const obj = useLoader(OBJLoader, modelPath, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (ref.current) {
        const elapsed = (Date.now() - startTime.current) / 1000
        const index = Math.floor(elapsed / 10) % positions.length
        const target = positions[index]

        if (ref.current) {
          ref.current.position.lerp(target.position, 0.1)
          ref.current.rotation.set(
            THREE.MathUtils.lerp(
              ref.current.rotation.x,
              target.rotation.x,
              0.1
            ),
            THREE.MathUtils.lerp(
              ref.current.rotation.y,
              target.rotation.y,
              0.1
            ),
            THREE.MathUtils.lerp(ref.current.rotation.z, target.rotation.z, 0.1)
          )
        }

        animationFrameId = requestAnimationFrame(animate)
      }
    }

    if (isPlaying) {
      animate()
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, obj])

  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
      <Environment preset='sunset' />
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 5, 3]} intensity={1.5} castShadow />
      <directionalLight position={[-2, -5, -3]} intensity={1} castShadow />
      <spotLight
        position={[5, 10, 5]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />

      <primitive object={obj} ref={ref} scale={[0.15, 0.15, 0.15]} />

      <OrbitControls
        target={[0, 0, 0]}
        enableZoom
        enableRotate
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        maxAzimuthAngle={Math.PI}
        minAzimuthAngle={-Math.PI}
      />

      <axesHelper args={[10]} rotation={[0, 0, Math.PI / 2]} />
      <gridHelper />
    </Canvas>
  )
}
