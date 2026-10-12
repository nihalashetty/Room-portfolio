// A tiny external store so the focus state can be shared between the DOM UI
// (loader, back button) and the R3F scene, which live in separate React
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

let state = { focus: null };
const listeners = new Set();

function emit() {
  for (const l of listeners) l();
}

export function setFocus(focus) {
  if (state.focus === focus) return;
  state = { ...state, focus };
  emit();
}

export function getFocus() {
  return state.focus;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Dev-only helper so the scene can be driven from the console / automated
// screenshots. Guarded so it never runs in a production build.
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  window.__roomSetFocus = setFocus;
}

// React hook for DOM components that need to re-render on focus changes.
export function useFocus() {
  return useSyncExternalStore(
    subscribe,
    () => state.focus,
    () => state.focus
  );
}
