import React, { useRef, useState } from "react";
import { Html, Image, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useControls } from "leva";

const cameraViews = {
  default: {
    position: [-10, 35, -15],
    lookAt: [-110, 30, -110]
  },
  computer1: {
    position: [-90, 30, -70],
    lookAt: [-114, 30, -70]
  },
  mobile: {
    position: [-103, 33, -66],
    lookAt: [-105, 13, -66],
    iframePosition: [0, 0, 0],
    iframeRotation: [0, 1.57, 0]
  }
};

function CameraRig({ activeView, setActiveView }) {
  const { position, computer, mobile } = useControls('Camera Controls', {
    position: {
      value: {x: -10, y: 35, z: -15},
      step: 0.5,
      joystick: 'invertY'
    },
    computer: false,
    mobile: false
  });

  useFrame((state, delta) => {
    const targetView = cameraViews[activeView] || cameraViews.default;
    
    easing.damp3(
      state.camera.position,
      targetView.position,
      1,
      delta
    );
    state.camera.lookAt(targetView.lookAt[0], targetView.lookAt[1], targetView.lookAt[2]);
  });

  return activeView;
}

export function Model(props) {
  const [activeView, setActiveView] = useState('default');
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/room.glb");
  const baked1 = useTexture('./Part1.jpg');
  const baked2 = useTexture('./Part2.jpg');
  const baked3 = useTexture('./Part3.jpg');
  baked1.flipY = false;
  baked2.flipY = false;
  baked3.flipY = false;

  const { mobileIframePosition, mobileIframeRotation } = useControls('Mobile Iframe Controls', {
    mobileIframePosition: {
      value: { x: 0, y: 0.2, z: -0.0 }, 
      step: 0.1
    },
    mobileIframeRotation: {
      value: { x: 1.6, y: 3.13, z: -1.57 },
      step: 0.1
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const clickedMesh = e.object;
    
    console.log('=== Click Debug Info ===');
    console.log('Click event target:', e.target);
    console.log('Clicked mesh:', clickedMesh);
    console.log('Current view:', activeView);
    console.log('Clicked mesh name:', clickedMesh?.name);

    if (!clickedMesh || !clickedMesh.name) {
      console.log('Switching to default view - no valid mesh');
      setActiveView('default');
      return;
    }

    console.log(`Switching to view: ${clickedMesh.name}`);
    setActiveView(clickedMesh.name);
  };

  return (
    <>
      <CameraRig activeView={activeView} setActiveView={setActiveView} />
      <group ref={groupRef} onClick={handleClick}>
        <mesh
          name="computer1"
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={nodes.Cube018.material}
          position={[-112.54, 29.52, -70.28]}
        >
          <meshBasicMaterial map={baked1} />
          <Html transform wrapperClass="htmlScreen" position={[0.2, 0, 0]} rotation-y={1.57}>
            <iframe id="computer1" width={1095} height={605} src="https://nihals-computer.netlify.app/" />
            {activeView !== 'computer1' && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveView('computer1');
                }}
              />
            )}
          </Html>
        </mesh>
        <mesh
          name="mobile"
          castShadow
          receiveShadow
          geometry={nodes.MobileScreen.geometry}
          material={nodes.MobileScreen.material}
          position={[-106.19, 18.27, -62.93]}
        >
          <meshBasicMaterial map={baked1} />
          <Html 
            occlude={"blending"}
            transform 
            wrapperClass="htmlScreen" 
            position={[mobileIframePosition.x, mobileIframePosition.y, mobileIframePosition.z]} 
            rotation-x={mobileIframeRotation.x}
            rotation-y={mobileIframeRotation.y}
            rotation-z={mobileIframeRotation.z}
          >
            <iframe id="mobile" width={100} height={175} src="https://www.google.com" />
            {activeView !== 'mobile' && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveView('mobile');
                }}
              />
            )}
          </Html>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Poster1001.geometry}
          material={nodes.Poster1001.material}
          position={[-57.92, 77.05, -117.85]}
          rotation={[0, -Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Poster1006.geometry}
          material={nodes.Poster1006.material}
          position={[-117.98, 77.05, -59.62]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Poster1007.geometry}
          material={nodes.Poster1007.material}
          position={[-117.98, 77.05, -59.62]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tubelightstand1.geometry}
          material={nodes.Tubelightstand1.material}
          position={[-57.99, 91.06, -116.06]}
          rotation={[0, 1.57, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Computer2stand.geometry}
          material={nodes.Computer2stand.material}
          position={[-59.04, 22.88, -107.21]}
          rotation={[0, 0.45, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Computer2001.geometry}
          material={nodes.Computer2001.material}
          position={[-59.56, 33.97, -108.22]}
          rotation={[-0.25, 0.44, 0.11]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Computer3Stand.geometry}
          material={nodes.Computer3Stand.material}
          position={[-38.25, 22.87, -107.73]}
          rotation={[0, -0.39, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Computer3standstand001.geometry}
          material={nodes.Computer3standstand001.material}
          position={[-37.95, 25.42, -108.24]}
          rotation={[0.38, -0.36, 0.14]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Computer3001.geometry}
          material={nodes.Computer3001.material}
          position={[-38.07, 29.78, -107.99]}
          rotation={[-0.5, -0.34, -0.18]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Printer001.geometry}
          material={nodes.Printer001.material}
          position={[-75.41, 22.28, -108.62]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Printer002.geometry}
          material={nodes.Printer002.material}
          position={[-75.41, 22.28, -108.62]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Printer003.geometry}
          material={nodes.Printer003.material}
          position={[-75.41, 22.28, -108.62]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={nodes.Cube016.material}
          position={[-111.77, 20.57, -70.4]}
          rotation={[0, 0, 0.44]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={nodes.Cube017.material}
          position={[-111.03, 18.29, -70.53]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube175.geometry}
          material={nodes.Cube175.material}
          position={[-112.54, 29.52, -70.28]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Left_Table_Box.geometry}
          material={nodes.Left_Table_Box.material}
          position={[-106.9, 27.59, -17.38]}
          rotation={[0, 0, 0.48]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Left_Table001.geometry}
          material={nodes.Left_Table001.material}
          position={[-108.7, 0.45, -7.16]}
          rotation={[Math.PI, 0, Math.PI]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeyboardSimple.geometry}
          material={nodes.KeyboardSimple.material}
          position={[-53.88, 33.83, -111.81]}
          rotation={[1.38, 0.1, -0.47]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mouse1.geometry}
          material={nodes.Mouse1.material}
          position={[-106.25, 18.86, -88.96]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mouse2.geometry}
          material={nodes.Mouse2.material}
          position={[-40.89, 23.2, -98.05]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.DrawDoor.geometry}
          material={nodes.DrawDoor.material}
          position={[-34.78, 13.36, -92.92]}
          rotation={[0, -1.48, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mobile.geometry}
          material={nodes.Mobile.material}
          position={[-106.19, 18.27, -62.93]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Left_Table_Box001.geometry}
          material={nodes.Left_Table_Box001.material}
          position={[-7.04, 16.68, -107.79]}
          rotation={[0, 0, 0.48]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={nodes.Cube007.material}
          position={[-92.29, 17.61, -107.44]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001.geometry}
          material={nodes.Mesh001.material}
          position={[-65.63, 19.33, -104.81]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh002.geometry}
          material={nodes.Mesh002.material}
          position={[-65.63, 19.33, -104.81]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Left_Table007.geometry}
          material={nodes.Left_Table007.material}
          position={[-108.73, 0.53, -7.22]}
          rotation={[Math.PI, 0, Math.PI]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.KeyboardKeysSimple001.geometry}
          material={nodes.KeyboardKeysSimple001.material}
          position={[-53.88, 33.83, -111.81]}
          rotation={[1.38, 0.1, -0.47]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube217.geometry}
          material={nodes.Cube217.material}
          position={[-101.62, 11.24, -60.72]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube218.geometry}
          material={nodes.Cube218.material}
          position={[-101.62, 7.32, -60.72]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube219.geometry}
          material={nodes.Cube219.material}
          position={[-97.68, 3.42, -60.72]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube220.geometry}
          material={nodes.Cube220.material}
          position={[-103.53, 15.65, -54.36]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube222.geometry}
          material={nodes.Cube222.material}
          position={[-115.52, 15.65, -54.36]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube028.geometry}
          material={nodes.Cube028.material}
          position={[-103.99, 18.7, -71.44]}
          rotation={[2.53, 1.4, -2.55]}
          scale={0.9}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube031.geometry}
          material={nodes.Cube031.material}
          position={[-103.37, 18.64, -71.99]}
          rotation={[2.53, 1.4, -2.55]}
          scale={0.91}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube032.geometry}
          material={nodes.Cube032.material}
          position={[-104.65, 18.76, -71.13]}
          rotation={[2.53, 1.4, -2.55]}
          scale={0.91}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube033.geometry}
          material={nodes.Cube033.material}
          position={[-105.22, 18.83, -69.98]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube035.geometry}
          material={nodes.Cube035.material}
          position={[-103.86, 18.71, -70.37]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039.geometry}
          material={nodes.Cube039.material}
          position={[-104.54, 18.59, -80.74]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040.geometry}
          material={nodes.Cube040.material}
          position={[-102.46, 18.58, -70.41]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube041.geometry}
          material={nodes.Cube041.material}
          position={[-103.15, 18.56, -75.53]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube042.geometry}
          material={nodes.Cube042.material}
          position={[-103.5, 18.54, -77.87]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043.geometry}
          material={nodes.Cube043.material}
          position={[-105.74, 18.88, -69.9]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube044.geometry}
          material={nodes.Cube044.material}
          position={[-105.84, 18.87, -70.72]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube045.geometry}
          material={nodes.Cube045.material}
          position={[-106.73, 18.77, -81.83]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube048.geometry}
          material={nodes.Cube048.material}
          position={[-107.36, 18.81, -81.71]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube050.geometry}
          material={nodes.Cube050.material}
          position={[-104.72, 18.54, -84.9]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051.geometry}
          material={nodes.Cube051.material}
          position={[-104.9, 18.59, -82.09]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube052.geometry}
          material={nodes.Cube052.material}
          position={[-104.08, 18.52, -82.72]}
          rotation={[3.14, -0.14, -3.05]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube053.geometry}
          material={nodes.Cube053.material}
          position={[-104.27, 18.51, -83.96]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube054.geometry}
          material={nodes.Cube054.material}
          position={[-103.81, 18.55, -79.73]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube057.geometry}
          material={nodes.Cube057.material}
          position={[-103.35, 18.51, -79.71]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Big_Keyboard_Holder.geometry}
          material={nodes.Big_Keyboard_Holder.material}
          position={[-105.38, 18.42, -77.32]}
          rotation={[0, 0.14, -0.05]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube182.geometry}
          material={nodes.Cube182.material}
          position={[-104.54, 18.77, -70.18]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube184.geometry}
          material={nodes.Cube184.material}
          position={[-103.21, 18.64, -70.7]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube186.geometry}
          material={nodes.Cube186.material}
          position={[-105.31, 18.65, -80.83]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube194.geometry}
          material={nodes.Cube194.material}
          position={[-106.03, 18.69, -81.92]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube195.geometry}
          material={nodes.Cube195.material}
          position={[-105.46, 18.64, -82.01]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube197.geometry}
          material={nodes.Cube197.material}
          position={[-106.09, 18.66, -84.72]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube203.geometry}
          material={nodes.Cube203.material}
          position={[-104, 18.54, -81.29]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube204.geometry}
          material={nodes.Cube204.material}
          position={[-103.91, 18.54, -80.52]}
          rotation={[2.53, 1.4, -2.55]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube114.geometry}
          material={nodes.Cube114.material}
          position={[-100.54, 14.67, -21.1]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube116.geometry}
          material={nodes.Cube116.material}
          position={[-100.58, 7.11, -21.1]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube117.geometry}
          material={nodes.Cube117.material}
          position={[-100.94, 7.3, -21.1]}
          rotation={[0, 0, -Math.PI / 2]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[-109.14, 7.39, -60.72]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Left_Table.geometry}
          material={nodes.Left_Table.material}
          position={[-111.12, -1.34, -5.79]}
          rotation={[Math.PI, 0, Math.PI]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[-38.44, 13.32, -91.89]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={nodes.Cube005.material}
          position={[-65.71, 12.45, -86.13]}
          rotation={[0, 0, -Math.PI / 2]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={nodes.Cube008.material}
          position={[-81.46, 8.59, -107.4]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube208.geometry}
          material={nodes.Cube208.material}
          position={[-100.9, 14.86, -21.1]}
          rotation={[0, 0, -Math.PI / 2]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Left_Table005.geometry}
          material={nodes.Left_Table005.material}
          position={[-111.12, -1.34, -5.79]}
          rotation={[Math.PI, 0, Math.PI]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube214.geometry}
          material={nodes.Cube214.material}
          position={[-88.11, 7.97, -98.46]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube215.geometry}
          material={nodes.Cube215.material}
          position={[-81.46, 8.59, -107.4]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube216.geometry}
          material={nodes.Cube216.material}
          position={[-65.71, 17.02, -90.61]}
          rotation={[0, 0, -Math.PI / 2]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh004.geometry}
          material={nodes.Mesh004.material}
          position={[-65.63, 19.28, -104.81]}
          rotation={[0, Math.PI / 2, 0]}
        ><meshBasicMaterial map={baked1} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Soda001.geometry}
          material={nodes.Soda001.material}
          position={[-63.13, 22.76, -99.25]}
          rotation={[Math.PI / 2, 0, 0]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plant.geometry}
          material={nodes.Plant.material}
          position={[-108.67, 18.09, -108.84]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plant003.geometry}
          material={nodes.Plant003.material}
          position={[-108.67, 18.09, -108.84]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lamp1.geometry}
          material={nodes.Lamp1.material}
          position={[-105.86, 20.55, -44.66]}
          rotation={[0, 0.33, 0]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube223.geometry}
          material={nodes.Cube223.material}
          position={[-23.22, 40.63, -110.59]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube224.geometry}
          material={nodes.Cube224.material}
          position={[-21.4, 49.95, -110.13]}
          rotation={[0, -0.38, -0.27]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lamp2sides001.geometry}
          material={nodes.Lamp2sides001.material}
          position={[-21.69, 49.95, -110.17]}
          rotation={[0, -0.38, -0.27]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube225.geometry}
          material={nodes.Cube225.material}
          position={[-23.22, 45.32, -110.59]}
          rotation={[0, 0, -0.3]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mug001.geometry}
          material={nodes.Mug001.material}
          position={[-105.4, 19.34, -54.97]}
          rotation={[0, -0.32, 0]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mug_Handle001.geometry}
          material={nodes.Mug_Handle001.material}
          position={[-104.9, 19.54, -56.55]}
          rotation={[0, -0.32, 0]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.eb_house_plant_03.geometry}
          material={nodes.eb_house_plant_03.material}
          position={[-108.66, 0.18, -1.46]}
          rotation={[Math.PI / 2, 0, 2.93]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.eb_house_plant_03001.geometry}
          material={nodes.eb_house_plant_03001.material}
          position={[-108.66, 0.18, -1.46]}
          rotation={[Math.PI / 2, 0, 2.93]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.eb_house_plant_03003.geometry}
          material={nodes.eb_house_plant_03003.material}
          position={[-108.66, 0.18, -1.46]}
          rotation={[Math.PI / 2, 0, 2.93]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.eb_house_plant_03006.geometry}
          material={nodes.eb_house_plant_03006.material}
          position={[-108.66, 0.18, -1.46]}
          rotation={[Math.PI / 2, 0, 2.93]}
        ><meshBasicMaterial map={baked2} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
          position={[0.1, 0.05, -0.09]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={nodes.Plane002.material}
          position={[-118.4, 59.27, -0.08]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={nodes.Plane003.material}
          position={[0.11, 118.53, -0.08]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={nodes.Plane001.material}
          position={[0.11, 59.31, -118.58]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair001.geometry}
          material={nodes.Chair001.material}
          position={[-48.02, 0.24, -85.46]}
          rotation={[Math.PI / 2, 0, -0.37]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair003.geometry}
          material={nodes.Chair003.material}
          position={[-48.02, 0.24, -85.46]}
          rotation={[Math.PI / 2, 0, -0.37]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair008.geometry}
          material={nodes.Chair008.material}
          position={[-48.02, 0.24, -85.46]}
          rotation={[Math.PI / 2, 0, -0.37]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair010.geometry}
          material={nodes.Chair010.material}
          position={[-48.02, 0.24, -85.46]}
          rotation={[Math.PI / 2, 0, -0.37]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair005.geometry}
          material={nodes.Chair005.material}
          position={[-83.08, 0.2, -60]}
          rotation={[Math.PI / 2, 0, -2.41]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair012.geometry}
          material={nodes.Chair012.material}
          position={[-83.08, 0.2, -60]}
          rotation={[Math.PI / 2, 0, -2.41]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair014.geometry}
          material={nodes.Chair014.material}
          position={[-83.08, 0.2, -60]}
          rotation={[Math.PI / 2, 0, -2.41]}
        ><meshBasicMaterial map={baked3} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair015.geometry}
          material={nodes.Chair015.material}
          position={[-83.08, 0.2, -60]}
          rotation={[Math.PI / 2, 0, -2.41]}
        ><meshBasicMaterial map={baked3} /></mesh>
      </group>
    </>
  );
}

useGLTF.preload("/room.glb");
