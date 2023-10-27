import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MovingCube({ positionRef, rotationRef }) {
  const cubeRef = useRef();

  // State to store cube position, jump status, and rotation angle
  const [position, setPosition] = useState({ x: 0, y: 1, z: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [movementDirection, setMovementDirection] = useState({ x: 0, z: 1 });


  // Update cube position based on arrow key events
  useEffect(() => {
    const handleKeyDown = (event) => {
        switch (event.key) {
          case "ArrowUp":
            setPosition((prevPosition) => ({
              ...prevPosition,
              x: prevPosition.x + movementDirection.x * 0.1,
              z: prevPosition.z + movementDirection.z * 0.1,
            }));
            break;
          case "ArrowLeft":
            setRotationAngle(rotationAngle + Math.PI / 4);
            setMovementDirection({
              x: Math.sin(rotationAngle + Math.PI / 4),
              z: Math.cos(rotationAngle + Math.PI / 4),
            });
            break;
          case "ArrowRight":
            setRotationAngle(rotationAngle - Math.PI / 4);
            setMovementDirection({
              x: Math.sin(rotationAngle - Math.PI / 4),
              z: Math.cos(rotationAngle - Math.PI / 4),
            });
            break;
          case "ArrowDown":
            setPosition((prevPosition) => ({
              ...prevPosition,
              x: prevPosition.x - movementDirection.x * 0.1,
              z: prevPosition.z - movementDirection.z * 0.1,
            }));
            break;
          case " ":
            if (!isJumping) {
              setIsJumping(true);
              setPosition((prevPosition) => ({
                ...prevPosition,
                x: prevPosition.x + movementDirection.x * 1,
                z: prevPosition.z + movementDirection.z * 1,
              }));
              setTimeout(() => {
                setIsJumping(false);
              }, 500);
            }
            break;
          default:
            break;
        }
      };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping, rotationAngle, movementDirection]);
  // Update cube position and rotation in the scene

  useFrame(({ camera }) => {
    if (cubeRef.current) {
      // Apply jumping effect
      const jumpHeight = isJumping ? 1 : 0;
      cubeRef.current.position.x = position.x;
      cubeRef.current.position.y = position.y + jumpHeight;
      cubeRef.current.position.z = position.z;
      cubeRef.current.rotation.set(0, rotationAngle, 0);

      if (positionRef.current) {
        positionRef.current.x = cubeRef.current.position.x;
        positionRef.current.y = cubeRef.current.position.y;
        positionRef.current.z = cubeRef.current.position.z;
      }
      if (rotationRef.current) {
        rotationRef.current.x = cubeRef.current.rotation.x;
        rotationRef.current.y = cubeRef.current.rotation.y;
        rotationRef.current.z = cubeRef.current.rotation.z;
      }

      // Update camera position and rotation to follow the cube
      const distance = 6; // Distance between camera and cube
      const yOffset = 3; // Height above the cube
      const vector = new THREE.Vector3(0, 0, -distance);
      vector.applyQuaternion(cubeRef.current.quaternion);
      vector.add(cubeRef.current.position);
      camera.position.set(vector.x, vector.y + yOffset, vector.z);
      camera.lookAt(cubeRef.current.position.x, cubeRef.current.position.y, cubeRef.current.position.z);
    }
  });

  return (
    <mesh ref={cubeRef}>
      <capsuleGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default MovingCube;
