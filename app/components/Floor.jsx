import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveShadow>
      <boxGeometry args={[30,1,20]} />
      <meshPhysicalMaterial clearcoat={1}  />
    </mesh>
  );
}

export default Floor;