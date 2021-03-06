import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

function Dodecaedro({ z, speed }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/dodecaedro1-transformed.glb');
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1.5),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    ref.current.rotation.set(
      (data.rX += 0.005),
      (data.rY += 0.005),
      (data.rZ += 0.005),
    );
    ref.current.position.set(data.x * width, (data.y += 0.01 * speed), z);
    if (data.y > height / 1.3) {
      data.y = -height / 1.3;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Mesh_0.geometry}
      material={materials['Scene_-_Root']}
      scale={1.5}
      material-emissive="red"
      material-color="yellow"
    />
  );
}

export default function Geometry({ speed = 1, count = 100, target = 10 }) {
  return (
    <Canvas
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 10], fov: 40, near: 0.01, far: 115 }}
    >
      <color attach="background" args={['gradient']} />
      <Environment preset="sunset" />
      {Array.from({ length: count }, (_, i) => (
        <Dodecaedro key={i} z={-i} speed={speed} />
      ))}
      <EffectComposer>
        <DepthOfField
          target={[0, 0, target]}
          bokehScale={2}
          width={700}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  );
}
