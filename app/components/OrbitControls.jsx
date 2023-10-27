
// Controls.js
import React, { useRef } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

function Controls({ target }) {
  const { camera, gl } = useThree();
  const controls = useRef();

  useFrame(() => {
    if (controls.current) {
      controls.current.target.set(target.current.x, target.current.y, target.current.z);
      controls.current.update();
    }
  });

  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
}

export default Controls;


