"use client"
import React from 'react'
import { Canvas } from "@react-three/fiber";
import Floor from './Floor';
import LightBulb from './LightBulb';
import Box from './Box';
import Draggable from './Draggable';
import OrbitControls  from './OrbitControls';

const CanvasCom = () => {
  return (
    <>  
    <div className='w-screen h-screen'>
    <Canvas
      shadows
      className='bg-black'
      camera={{
        position: [-6, 7, 7],
      }}
    >
      <ambientLight color={"white"} intensity={0.3} />
      <LightBulb position={[0, 3, 0]} />
      <Box rotateX={3} rotateY={0.2} />
      <Draggable>
            <Box rotateX={3} rotateY={0.2} />
        </Draggable>
      <Floor position={[0, -1, 0]} />
      <OrbitControls></OrbitControls>
    </Canvas>
    </div>
    </>
  )
}

export default CanvasCom;
