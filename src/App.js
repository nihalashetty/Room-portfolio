import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { Model } from "./Model";
import { Loader } from "./Loader";
import { Ui } from "./Ui";
import { setFocus } from "./store";

export default function Viewer() {
  return (
    <>
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 2000, position: [-8, 42, -10] }}
        dpr={[1, 2]}
        // Clicking empty space returns to the room overview.
        onPointerMissed={() => setFocus(null)}
      >
        <color attach="background" args={["#0b1026"]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
      <Ui />
      <Loader />
    </>
  );
}
