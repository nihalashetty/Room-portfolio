import React, { useEffect, useRef } from "react";
import { useFocus, setFocus, useExposure, setExposure, useHovered, EXPOSURE } from "./store";

// Brightness dimmer. The moon / sun glyphs are also quick night / day presets,
// and the range in between gives fine control over the room's mood.
function Dimmer() {
  const exposure = useExposure();
  return (
    <div className="dimmer">
      <button
        className="dimmer__ic"
        onClick={() => setExposure(EXPOSURE.night)}
        title="Night"
        aria-label="Night"
      >
        ☾
      </button>
      <input
        className="dimmer__range"
        type="range"
        min={EXPOSURE.min}
        max={EXPOSURE.max}
        step="0.01"
        value={exposure}
        onChange={(e) => setExposure(parseFloat(e.target.value))}
        aria-label="Room brightness"
      />
      <button
        className="dimmer__ic"
        onClick={() => setExposure(EXPOSURE.day)}
        title="Day"
        aria-label="Day"
      >
        ☀
      </button>
    </div>
  );
}

// A soft trailing ring cursor that grows over interactive objects. Only enabled
// on real pointer devices; the native cursor is restored if anything fails.
function Cursor() {
  const hovered = useHovered();
  const ref = useRef();
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return (
    <div ref={ref} className={`cursor${hovered ? " cursor--active" : ""}`} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__dot" />
    </div>
  );
}

// DOM overlay on top of the Canvas: title, hint, Back button, dimmer, a cinematic
// vignette and the custom cursor. Escape also exits a focused view.
export function Ui() {
  const focus = useFocus();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFocus(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="ui">
      <div className="ui__vignette" />

      <button
        className={`ui__back${focus ? " ui__back--show" : ""}`}
        onClick={() => setFocus(null)}
        tabIndex={focus ? 0 : -1}
      >
        <span aria-hidden="true">&larr;</span> Back to room
      </button>

      <div className="ui__title">
        <b>Nihal&rsquo;s Room</b>
        <span>a little 3D corner of the web</span>
      </div>

      <Dimmer />

      <div className={`ui__hint${focus ? " ui__hint--focused" : ""}`}>
        Click a screen or the phone to take a closer look
      </div>

      <Cursor />
    </div>
  );
}
