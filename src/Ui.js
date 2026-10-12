import React, { useEffect } from "react";
import { useFocus, setFocus } from "./store";

// DOM overlay that lives on top of the Canvas: a title, a one-line hint while in
// the overview, and a Back button once a device is focused. Escape also exits.
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

      <div className={`ui__hint${focus ? " ui__hint--focused" : ""}`}>
        Click a screen or the phone to take a closer look
      </div>
    </div>
  );
}
