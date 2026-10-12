// A tiny external store so UI state can be shared between the DOM overlay
// (loader, controls, cursor) and the R3F scene, which live in separate React
// reconcilers. Using useSyncExternalStore keeps this dependency-free and
// avoids coupling to a specific zustand version.
import { useSyncExternalStore } from "react";

// Camera framing for each focusable device. `pos` is where the camera flies to,
// `look` is the point it aims at. Tuned against the baked room model.
export const PLACEMENTS = {
  computer1: { pos: [-89, 30.5, -70.3], look: [-112.5, 29.6, -70.3] },
  computer2: { pos: [-57, 35.5, -80], look: [-59.58, 33.97, -108.3] },
  computer3: { pos: [-38, 30.5, -89], look: [-38, 29.8, -108] },
  mobile: { pos: [-99, 26, -62.9], look: [-106.2, 18.5, -62.9] },
};

// Where the camera starts the intro reveal, before easing into the overview.
export const INTRO_POS = [40, 70, 80];

// Lighting presets (target tone-mapping exposure). Lower = dimmer room; the
// screens and posters keep their own brightness, so they glow at night.
export const EXPOSURE = { min: 0.16, max: 1.45, day: 1.12, dusk: 0.6, night: 0.26 };

let state = {
  focus: null,
  exposure: EXPOSURE.day,
  entered: false,
  hovered: false,
};
const listeners = new Set();

function emit() {
  for (const l of listeners) l();
}

function update(patch) {
  let changed = false;
  for (const k in patch) {
    if (state[k] !== patch[k]) changed = true;
  }
  if (!changed) return;
  state = { ...state, ...patch };
  emit();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// --- focus (click-to-focus on a device) ---
export const setFocus = (focus) => update({ focus });
export const getFocus = () => state.focus;

// --- lighting / mood ---
export const setExposure = (exposure) => update({ exposure });
export const getExposure = () => state.exposure;

// --- intro reveal (set true once the loader finishes) ---
export const setEntered = (entered) => update({ entered });
export const getEntered = () => state.entered;

// --- hover (an interactive 3D object is under the pointer) ---
export const setHovered = (hovered) => update({ hovered });

// Dev-only helper so the scene can be driven from the console / automated
// screenshots. Guarded so it never runs in a production build.
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  window.__roomSetFocus = setFocus;
  window.__roomSetExposure = setExposure;
}

function useField(key) {
  return useSyncExternalStore(
    subscribe,
    () => state[key],
    () => state[key]
  );
}

export const useFocus = () => useField("focus");
export const useExposure = () => useField("exposure");
export const useEntered = () => useField("entered");
export const useHovered = () => useField("hovered");
