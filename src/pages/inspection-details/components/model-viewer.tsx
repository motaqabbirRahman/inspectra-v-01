// import { useRef } from 'react'
// import { Canvas, useLoader } from '@react-three/fiber'
// import { OrbitControls, Environment } from '@react-three/drei'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
// import * as THREE from 'three'

// interface SceneProps {
//   modelPath: string
//   mtlPath: string
// }

// export default function Scene({ modelPath, mtlPath }: SceneProps) {
//   const ref = useRef<THREE.Object3D>(null)

//   // Load materials and model
//   const materials = useLoader(MTLLoader, mtlPath)
//   const obj = useLoader(OBJLoader, modelPath, (loader) => {
//     materials.preload()
//     loader.setMaterials(materials)
//   })

//   return (
//     <Canvas shadows camera={{ fov: 20, position: [5, 5, 5] }}>
//       {/* Lighting */}
//       <ambientLight intensity={0.3} />
//       <directionalLight
//         position={[10, 10, 10]}
//         intensity={1}
//         castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//       />

//       {/* Ground Plane */}
//       <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
//         <planeGeometry args={[100, 100]} />
//         <shadowMaterial transparent opacity={0.2} />
//       </mesh>

//       {/* 3D Model */}
//       <primitive ref={ref} object={obj} scale={[0.5, 0.5, 0.5]} castShadow />

//       {/* Camera Controls */}
//       <OrbitControls target={[0, 1, 0]} />

//       {/* Environment for reflections */}
//       <Environment preset='sunset' />
//     </Canvas>
//   )
// }
