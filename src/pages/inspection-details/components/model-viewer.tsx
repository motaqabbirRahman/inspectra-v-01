import { useRef, useEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import * as THREE from 'three'

// Dummy rotation data array
const rotationDataArray = [
  { roll: 0, pitch: 0, yaw: 0 },
  { roll: Math.PI / 4, pitch: 0, yaw: 0 },
  { roll: Math.PI / 2, pitch: 0, yaw: 0 },
  { roll: Math.PI, pitch: 0, yaw: 0 },
  { roll: -Math.PI / 2, pitch: 0, yaw: 0 },
  { roll: -Math.PI / 4, pitch: 0, yaw: 0 },
  { roll: 0, pitch: 0, yaw: 0 },
  { roll: Math.PI / 4, pitch: 0, yaw: Math.PI / 4 },
  { roll: Math.PI / 2, pitch: Math.PI / 4, yaw: Math.PI / 2 },
  { roll: Math.PI, pitch: Math.PI / 2, yaw: Math.PI },
  { roll: -Math.PI, pitch: -Math.PI / 2, yaw: -Math.PI },
  { roll: Math.PI / 4, pitch: Math.PI / 4, yaw: 0 },
  { roll: Math.PI / 2, pitch: Math.PI / 4, yaw: Math.PI / 4 },
  { roll: Math.PI, pitch: Math.PI / 4, yaw: Math.PI / 2 },
  { roll: -Math.PI / 4, pitch: Math.PI / 4, yaw: -Math.PI / 4 },
  { roll: -Math.PI / 2, pitch: Math.PI / 4, yaw: -Math.PI / 2 },
  { roll: -Math.PI, pitch: Math.PI / 4, yaw: -Math.PI },
  { roll: -Math.PI / 4, pitch: -Math.PI / 4, yaw: 0 },
  { roll: -Math.PI / 2, pitch: -Math.PI / 4, yaw: Math.PI / 4 },
  { roll: -Math.PI, pitch: -Math.PI / 4, yaw: Math.PI / 2 },
  { roll: -Math.PI / 4, pitch: -Math.PI / 4, yaw: -Math.PI / 4 },
  { roll: 0, pitch: -Math.PI / 2, yaw: 0 },
  { roll: Math.PI / 4, pitch: -Math.PI / 2, yaw: Math.PI / 4 },
  { roll: Math.PI / 2, pitch: -Math.PI / 2, yaw: Math.PI / 2 },
  { roll: Math.PI, pitch: -Math.PI / 2, yaw: Math.PI },
  { roll: -Math.PI / 2, pitch: -Math.PI / 2, yaw: -Math.PI / 2 },
  { roll: -Math.PI, pitch: -Math.PI / 2, yaw: -Math.PI },
  { roll: 0, pitch: Math.PI / 2, yaw: 0 },
  { roll: Math.PI / 4, pitch: Math.PI / 2, yaw: Math.PI / 4 },
  { roll: Math.PI / 2, pitch: Math.PI / 2, yaw: Math.PI / 2 },
  { roll: Math.PI, pitch: Math.PI / 2, yaw: Math.PI },
  { roll: -Math.PI / 2, pitch: Math.PI / 2, yaw: -Math.PI / 2 },
  { roll: -Math.PI, pitch: Math.PI / 2, yaw: -Math.PI },
]

interface SceneProps {
  modelPath: string
  mtlPath: string
}

function Compass() {
  return (
    <group>
      {/* North */}
      <Text
        position={[0, 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color='black'
      >
        N
      </Text>
      {/* East */}
      <Text
        position={[2, 0, 0]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        fontSize={0.5}
        color='black'
      >
        E
      </Text>
      {/* South */}
      <Text
        position={[0, -2, 0]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        fontSize={0.5}
        color='black'
      >
        S
      </Text>
      {/* West */}
      <Text
        position={[-2, 0, 0]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        fontSize={0.5}
        color='black'
      >
        W
      </Text>
    </group>
  )
}

export default function Scene({ modelPath, mtlPath }: SceneProps) {
  const ref = useRef<THREE.Object3D>(null)
  const dataIndex = useRef(0) // To keep track of the current data index

  // Load materials and model
  const materials = useLoader(MTLLoader, mtlPath)
  const obj = useLoader(OBJLoader, modelPath, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  useEffect(() => {
    let startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const data =
        rotationDataArray[dataIndex.current % rotationDataArray.length]

      if (ref.current) {
        // Apply roll, pitch, and yaw to the model
        ref.current.rotation.set(data.pitch, data.yaw, data.roll)
      }

      // Update the index to move to the next data point
      if (elapsed > 2) {
        // Change data every 2 seconds
        dataIndex.current = (dataIndex.current + 1) % rotationDataArray.length
        startTime = Date.now() // Reset the timer
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  //tuna 0, 5, 15
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 30 }}>
      {/* Environment Map for realistic reflections */}
      <Environment preset='sunset' />

      {/* Ambient Light */}
      <ambientLight intensity={0.4} />

      {/* Directional Lights */}
      <directionalLight position={[2, 5, 3]} intensity={1.5} castShadow />
      <directionalLight position={[-2, -5, -3]} intensity={1} castShadow />

      {/* Spotlight for enhanced focus on the object */}
      <spotLight
        position={[5, 10, 5]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />

      {/* Render the model */}
      <primitive
        object={obj}
        ref={ref}
        scale={[0.15, 0.15, 0.15]}
        position={[0, 0, 0]} // Center the model
      />

      <Compass />
      {/* Camera Controls */}
      <OrbitControls
        target={[0, 0, 0]} // Keep the focus on the center of the model
        enableZoom={true} // Allow zooming
        enableRotate={true} // Allow rotation
        enablePan={false} // Disable panning
        minPolarAngle={0} // Allow view from below the model
        maxPolarAngle={Math.PI} // Allow view from above the model
        maxAzimuthAngle={Math.PI} // Allow full 360-degree rotation horizontally
        minAzimuthAngle={-Math.PI} // Allow full 360-degree rotation horizontally
      />

      <axesHelper args={[10]} />
      <gridHelper />
    </Canvas>
  )
}
