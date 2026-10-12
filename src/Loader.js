import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { setEntered } from "./store";

const STATUS = [
  "assembling the room",
  "unpacking furniture",
  "hanging the posters",
  "powering up the screens",
  "almost there",
];

// A minimal, cinematic loading screen: a large counter ticking to 100, a hairline
// progress rule, then a curtain-lift reveal that hands off to the camera intro.
export function Loader() {
  const { progress, active } = useProgress();
  const [shown, setShown] = useState(0); // eased 0..100
  const [revealing, setRevealing] = useState(false);
  const [removed, setRemoved] = useState(false);
  const raf = useRef();
  const target = useRef(0);

  // Smoothly ease the displayed number toward the real progress.
  useEffect(() => {
    const tick = () => {
      setShown((s) => {
        const goal = target.current;
        const next = s + (goal - s) * 0.08;
        return Math.abs(goal - next) < 0.1 ? goal : next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    target.current = progress;
  }, [progress]);

  // When loading is done, finish the count, lift the curtain and start the intro.
  useEffect(() => {
    if (!active && progress >= 100) {
      target.current = 100;
      const t1 = setTimeout(() => {
        setRevealing(true);
        setEntered(true);
      }, 650);
      const t2 = setTimeout(() => setRemoved(true), 2050);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [active, progress]);

  if (removed) return null;

  const pct = Math.min(100, Math.round(shown));
  const status = STATUS[Math.min(STATUS.length - 1, Math.floor((pct / 100) * STATUS.length))];

  return (
    <div className={`intro${revealing ? " intro--reveal" : ""}`} aria-hidden={revealing}>
      <div className="intro__grain" />
      <div className="intro__inner">
        <div className="intro__head">
          <span className="intro__name">NIHAL&nbsp;SHETTY</span>
          <span className="intro__sep" />
          <span className="intro__kind">3D&nbsp;ROOM</span>
        </div>

        <div className="intro__count">
          <span className="intro__num">{String(pct).padStart(2, "0")}</span>
          <span className="intro__pct">%</span>
        </div>

        <div className="intro__footer">
          <span className="intro__status">{status}</span>
          <span className="intro__rule">
            <span className="intro__fill" style={{ transform: `scaleX(${pct / 100})` }} />
          </span>
        </div>
      </div>
    </div>
  );
}
