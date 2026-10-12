# Room Portfolio

An interactive 3D room built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber).
Click a screen or the phone to glide the camera in for a closer look, then head
back to the room to explore the rest.

Live demo: https://nihal-shetty.netlify.app/

## Features

- **Click-to-focus camera** — clicking a monitor or the phone smoothly flies the
  camera to that device; clicking empty space (or pressing `Esc`, or the **Back**
  button) returns to the overview. When idle, the camera gently parallaxes with
  the pointer.
- **Live screens** — the desk monitors and the phone play looping videos mapped
  directly onto the screen geometry, so they stay correctly occluded by objects
  in front of them.
- **Windows clone** — the main left monitor embeds
  [nihals-computer.netlify.app](https://nihals-computer.netlify.app/), a separate
  project, in an occlusion-aware iframe.
- **Cute loading screen** — a progress-driven loader while the model, textures
  and videos download.

## Tech

React · Three.js · @react-three/fiber · @react-three/drei · maath

## Getting started

```bash
npm install
npm start      # dev server at http://localhost:3000
npm run build  # production build in ./build
```

The room model (`public/room.glb`) ships with baked lighting, and the screen
videos (`public/screen*.webm`) are generated as small, looping VP9 clips.
