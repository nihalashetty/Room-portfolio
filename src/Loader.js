import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

// A small, friendly loading overlay. Lives in the DOM (outside the Canvas) and
// reads the global drei loading manager via useProgress, so it covers the GLTF,
// baked textures and screen videos while they download.
export function Loader() {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Once loading finishes, fade out and then stop rendering entirely.
  useEffect(() => {
    if (!active && progress >= 100) {
      const fade = setTimeout(() => setHidden(true), 400);
      const drop = setTimeout(() => setRemoved(true), 1300);
      return () => {
        clearTimeout(fade);
        clearTimeout(drop);
      };
    }
  }, [active, progress]);

  if (removed) return null;

  const pct = Math.min(100, Math.round(progress));

  return (
    <div className={`loader${hidden ? " loader--hidden" : ""}`} aria-hidden={hidden}>
      <div className="loader__card">
        {/* A tiny desk + monitor that "boots up" as things load. */}
        <svg className="loader__art" viewBox="0 0 120 96" width="150" height="120">
          {/* little plant */}
          <g className="loader__plant">
            <rect x="12" y="60" width="10" height="12" rx="2" fill="#e8c39e" />
            <path d="M17 60 C 10 50, 10 44, 14 40" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M17 60 C 24 50, 24 44, 20 40" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M17 60 C 17 50, 17 46, 17 42" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* monitor */}
          <rect x="40" y="26" width="64" height="40" rx="4" fill="#1f2937" />
          <rect x="44" y="30" width="56" height="32" rx="2" fill="#0b1026" />
          {/* screen glow sweeping as it loads */}
          <rect x="44" y="30" width="56" height="32" rx="2" fill="url(#scan)" opacity="0.9" />
          {/* cute face on screen */}
          <g className="loader__face">
            <circle cx="62" cy="44" r="2.6" fill="#a5b4fc" />
            <circle cx="82" cy="44" r="2.6" fill="#a5b4fc" />
            <path d="M60 51 Q72 58 84 51" stroke="#a5b4fc" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
          {/* stand */}
          <rect x="67" y="66" width="10" height="8" fill="#374151" />
          <rect x="56" y="74" width="32" height="4" rx="2" fill="#374151" />
          {/* desk */}
          <rect x="6" y="72" width="108" height="6" rx="3" fill="#7c5a3a" />

          <defs>
            <linearGradient id="scan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        <div className="loader__title">Nihal&rsquo;s Room</div>

        <div className="loader__bar">
          <div className="loader__fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="loader__meta">
          <span className="loader__pct">{pct}%</span>
          <span className="loader__hint">
            warming up the pixels
            <span className="loader__dots">
              <i>.</i>
              <i>.</i>
              <i>.</i>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
