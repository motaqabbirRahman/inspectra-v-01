import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const ModelViewer = ({ modelPath, mtlPath }: { modelPath: string, mtlPath: string }) => {
  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, modelPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const ref = useRef(null);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[8, 8, 8]} />
      <primitive object={obj} ref={ref} scale={[0.1, 0.1, 0.1]} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;

