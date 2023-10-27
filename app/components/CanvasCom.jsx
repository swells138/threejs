"use client"
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import OrbitControls from "./OrbitControls";
import MovingCube from "./MovingCube";
import Draggable from "./Draggable";
import Floor from "./Floor";
import LightBulb from "./LightBulb"

const CanvasCom = () => {
  const positionRef = useRef({ x: 0, y: 0, z: 0 });
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const cameraRef = useRef();

  return (
    <>
      <div className="w-screen h-screen">
        <Canvas
          shadows
          className="bg-black"
          camera={{
            ref: cameraRef,
            fov: 60,
          }}
        >
          <ambientLight color={"white"} intensity={0.4} />
          <LightBulb position={[0, 5, 0]} />
          <LightBulb position={[5, 5, 0]} />
          <LightBulb position={[-5, 5, 0]} />
          <MovingCube positionRef={positionRef} rotationRef={rotationRef} />
          <Floor position={[0, -1, 0]} />
          <OrbitControls target={positionRef}/>
        </Canvas>
      </div>
    </>
  );
};



export default CanvasCom;
