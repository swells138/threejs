import React from "react";

function Box(props) {
  return (
    <mesh {...props} receiveShadow castShadow>
      <boxGeometry  args={[1, 1, 1]} /> {/* Specify the size of the box */}
      <meshPhysicalMaterial color={"white"} />
    </mesh>
  );
}

export default Box;
