"use client"
import React, { useRef } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef(new OrbitControls(camera, gl.domElement));

  useFrame(() => {
    controls.current.update();
  });

  return null; // This component doesn't need to render anything
}

export default Controls;
