// src/components/LoadingScreen.jsx
import React, { useState, useEffect, useRef } from "react";
import profilePic from "../assets/profile.jpg";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef(null);

  const STATUSES = [
    [0,  "Initializing system..."],
    [20, "Loading assets..."],
    [45, "Building interface..."],
    [65, "Rendering portfolio..."],
    [85, "Almost ready..."],
    [99, "System online..."],
  ];

  const STEPS = [
    { label: "Loading assets",      at: 0  },
    { label: "Building interface",  at: 30 },
    { label: "Rendering portfolio", at: 60 },
    { label: "Almost ready",        at: 85 },
  ];

  const SKILL_TAGS = [
    { label: "React",      color: "#00d4ff", border: "rgba(0,212,255,0.3)",   bg: "rgba(0,212,255,0.08)"   },
    { label: "UI/UX",      color: "#bf00ff", border: "rgba(191,0,255,0.3)",   bg: "rgba(191,0,255,0.08)"   },
    { label: "Python",     color: "#ff00c8", border: "rgba(255,0,200,0.3)",   bg: "rgba(255,0,200,0.08)"   },
    { label: "Full Stack", color: "#00ffb3", border: "rgba(0,255,179,0.3)",   bg: "rgba(0,255,179,0.08)"   },
  ];

  const getStatus = (pct) => {
    let label = STATUSES[0][1];
    for (const [threshold, text] of STATUSES) {
      if (pct >= threshold) label = text;
    }
    return label;
  };

  const getStepClass = (pct, at) => {
    if (pct >= at + 15) return "lr-step done";
    if (pct >= at)      return "lr-step active";
    return "lr-step";
  };

  // Canvas: grid + particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COLORS = ["#00d4ff", "#bf00ff", "#ff00c8", "#00ffb3", "#ffd700"];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Dot {
      constructor() { this.reset(); }
      reset() {
        this.x     = Math.random() * canvas.width;
        this.y     = Math.random() * canvas.height;
        this.vx    = (Math.random() - 0.5) * 0.28;
        this.vy    = (Math.random() - 0.5) * 0.28;
        this.r     = Math.random() * 1.8 + 0.4;
        this.a     = Math.random() * 0.7 + 0.2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle   = this.color;
        ctx.globalAlpha = this.a * 0.75;
        ctx.fill();
      }
    }

    const dots = Array.from({ length: 65 }, () => new Dot());
    let rafId;

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.globalAlpha  = 0.05;
      ctx.strokeStyle  = "#00d4ff";
      ctx.lineWidth    = 0.5;
      for (let x = 0; x < canvas.width;  x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);  ctx.stroke(); }

      // Dots + connections
      ctx.globalAlpha = 1;
      dots.forEach(d => { d.update(); d.draw(); });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.globalAlpha = (1 - dist / 85) * 0.13;
            ctx.strokeStyle = "#bf00ff";
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  // Progress bar animation
  useEffect(() => {
    const duration = 3800;
    const start    = performance.now();
    let raf;
    const tick = (now) => {
      const raw   = Math.min((now - start) / duration, 1);
      const eased = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw;
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(onComplete, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const SEGS     = 20;
  const litCount = Math.floor(progress / 100 * SEGS);

  return (
    <>
      <div className={`lr-root ${done ? "lr-fadeout" : ""}`}>

        {/* Canvas background */}
        <canvas ref={canvasRef} className="lr-canvas" />

        {/* Radial glows — matches homepage body radials */}
        <div className="lr-radial1" />
        <div className="lr-radial2" />

        {/* Overlays */}
        <div className="lr-scanline" />
        <div className="lr-vignette" />

        {/* HUD corners */}
        <div className="lr-corner lr-tl" />
        <div className="lr-corner lr-tr" />
        <div className="lr-corner lr-bl" />
        <div className="lr-corner lr-br" />

        {/* ── CENTER CONTENT ── */}
        <div className="lr-center">

          {/* Hexagon rings + avatar */}
          <div className="lr-hex">
            <svg viewBox="0 0 116 116" width="116" height="116">
              <g style={{ animation: "lrhexspin 8s linear infinite", transformOrigin: "58px 58px" }}>
                <polygon points="58,6 104,31 104,85 58,110 12,85 12,31"
                  fill="none" stroke="#00d4ff" strokeWidth="1"
                  strokeDasharray="6 3" opacity="0.55" />
              </g>
              <g style={{ animation: "lrhexspin 5s linear infinite reverse", transformOrigin: "58px 58px" }}>
                <polygon points="58,16 96,38 96,78 58,100 20,78 20,38"
                  fill="none" stroke="#bf00ff" strokeWidth="0.8"
                  strokeDasharray="4 6" opacity="0.45" />
              </g>
              <polygon points="58,24 90,42 90,74 58,92 26,74 26,42"
                fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
            </svg>

            <div className="lr-photo">
              <img src={profilePic} alt="Crown James" />
            </div>
            <span className="lr-online" />
          </div>

          {/* Name with glitch */}
          <div className="lr-glitch lr-name" data-text="CROWN JAMES">CROWN JAMES</div>

          {/* Role */}
          <div className="lr-role">Aspiring Software Developer</div>

          {/* Skill tags */}
          <div className="lr-skills">
            {SKILL_TAGS.map(({ label, color, border, bg }) => (
              <span key={label} className="lr-tag" style={{ color, borderColor: border, background: bg }}>
                {label}
              </span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="lr-bar-wrap">
            <div className="lr-bar-header">
              <span className="lr-status">{getStatus(progress)}</span>
              <span className="lr-pct">{progress}%</span>
            </div>
            <div className="lr-track">
              <div className="lr-fill" style={{ width: `${progress}%` }}>
                <span className="lr-cursor" />
              </div>
            </div>
            <div className="lr-segs">
              {Array.from({ length: SEGS }, (_, i) => (
                <div key={i} className={`lr-seg ${i < litCount ? "lit" : ""}`} />
              ))}
            </div>
          </div>

          {/* Step checklist */}
          <div className="lr-steps">
            {STEPS.map(({ label, at }) => (
              <div key={at} className={getStepClass(progress, at)}>
                <span className="lr-dot" />
                {label}
              </div>
            ))}
          </div>

          {/* Complete message */}
          <div className={`lr-complete ${done ? "show" : ""}`}>
            System online — welcome
          </div>

          <div className="lr-tagline">Technology · Design · Creativity</div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');

        @keyframes lrhexspin  { to { transform: rotate(360deg); } }
        @keyframes lrfadeup   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes lrblink    { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes lrglitch1  { 0%,90%,100%{transform:translate(0)} 92%{transform:translate(-3px,1px)} 94%{transform:translate(3px,-1px)} }
        @keyframes lrglitch2  { 0%,90%,100%{transform:translate(0)} 91%{transform:translate(3px,-1px)} 93%{transform:translate(-3px,2px)} }
        @keyframes lrpulse    { 0%,100%{opacity:0.8} 50%{opacity:0.4} }

        /* ── ROOT ── */
        .lr-root {
          position: fixed; inset: 0;
          background: #050510;
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; overflow: hidden;
          opacity: 1; transition: opacity 0.7s ease;
        }
        .lr-fadeout { opacity: 0; pointer-events: none; }

        /* ── CANVAS ── */
        .lr-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%; opacity: 0.5;
        }

        /* ── RADIAL GLOWS (matches homepage body) ── */
        .lr-radial1 {
          position: absolute; top: 10%; left: 10%;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(191,0,255,0.13) 0%, transparent 70%);
          pointer-events: none;
        }
        .lr-radial2 {
          position: absolute; bottom: 10%; right: 10%;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── OVERLAYS ── */
        .lr-scanline {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.015) 3px, rgba(0,212,255,0.015) 4px);
          pointer-events: none; z-index: 5;
        }
        .lr-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(5,5,16,0.78) 100%);
          pointer-events: none; z-index: 4;
        }

        /* ── HUD CORNERS ── */
        .lr-corner { position: absolute; width: 22px; height: 22px; opacity: 0.5; z-index: 6; }
        .lr-tl { top:16px; left:16px;  border-top:1.5px solid #00d4ff; border-left:1.5px solid #00d4ff; }
        .lr-tr { top:16px; right:16px; border-top:1.5px solid #00d4ff; border-right:1.5px solid #00d4ff; }
        .lr-bl { bottom:16px; left:16px;  border-bottom:1.5px solid #00d4ff; border-left:1.5px solid #00d4ff; }
        .lr-br { bottom:16px; right:16px; border-bottom:1.5px solid #00d4ff; border-right:1.5px solid #00d4ff; }

        /* ── CENTER ── */
        .lr-center {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
        }

        /* ── HEX + AVATAR ── */
        .lr-hex { position: relative; width: 116px; height: 116px; margin-bottom: 26px; }
        .lr-photo {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lr-photo img {
          width: 76px; height: 76px; border-radius: 50%; object-fit: cover;
          border: 2px solid #00d4ff;
          box-shadow: 0 0 12px #00d4ff88, 0 0 30px #00d4ff44;
        }
        .lr-online {
          position: absolute; bottom: 14px; right: 14px;
          width: 11px; height: 11px; background: #00ff88;
          border-radius: 50%; border: 2px solid #050510;
          box-shadow: 0 0 8px #00ff88;
          animation: lrblink 1.4s ease-in-out infinite;
        }

        /* ── NAME + GLITCH ── */
        .lr-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.45rem; font-weight: 900;
          background: linear-gradient(90deg, #00d4ff, #bf00ff, #ff00c8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          letter-spacing: 3px;
          animation: lrfadeup 0.7s 0.1s both;
        }
        .lr-glitch { position: relative; }
        .lr-glitch::before, .lr-glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          font-family: 'Orbitron', sans-serif;
          font-size: 1.45rem; font-weight: 900; letter-spacing: 3px;
        }
        .lr-glitch::before {
          background: linear-gradient(90deg, #ff00c8, #bf00ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          animation: lrglitch1 4s infinite; opacity: 0.75;
        }
        .lr-glitch::after {
          background: linear-gradient(90deg, #00d4ff, #bf00ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          clip-path: polygon(0 62%, 100% 62%, 100% 80%, 0 80%);
          animation: lrglitch2 4s infinite; opacity: 0.75;
        }

        /* ── ROLE ── */
        .lr-role {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.26em;
          color: #00d4ff;
          text-shadow: 0 0 12px #00d4ff88, 0 0 30px #00d4ff44;
          text-transform: uppercase; margin-top: 8px;
          animation: lrfadeup 0.7s 0.3s both;
        }

        /* ── SKILL TAGS ── */
        .lr-skills {
          display: flex; gap: 8px; margin-top: 20px;
          flex-wrap: wrap; justify-content: center;
          animation: lrfadeup 0.7s 0.5s both;
        }
        .lr-tag {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; padding: 4px 11px;
          border-radius: 20px; text-transform: uppercase; border: 1px solid;
        }

        /* ── PROGRESS BAR ── */
        .lr-bar-wrap { width: 264px; margin-top: 30px; animation: lrfadeup 0.7s 0.6s both; }
        .lr-bar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .lr-status {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.16em; color: rgba(0,212,255,0.7); text-transform: uppercase;
        }
        .lr-pct {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          color: #00d4ff; text-shadow: 0 0 8px #00d4ff88;
        }
        .lr-track {
          width: 100%; height: 5px;
          background: rgba(0,212,255,0.1);
          border-radius: 4px; overflow: visible; position: relative;
        }
        .lr-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, #00d4ff, #bf00ff, #ff00c8);
          transition: width 0.08s linear; position: relative;
          box-shadow: 0 0 10px #00d4ff66, 0 0 20px #bf00ff44;
        }
        .lr-cursor {
          position: absolute; right: -1px; top: 50%; transform: translateY(-50%);
          width: 9px; height: 9px; border-radius: 50%; background: #fff;
          box-shadow: 0 0 10px #00d4ff, 0 0 20px #bf00ff;
        }
        .lr-segs { display: flex; gap: 3px; margin-top: 8px; }
        .lr-seg {
          flex: 1; height: 2px; border-radius: 1px;
          background: rgba(0,212,255,0.1); transition: background 0.3s;
        }
        .lr-seg.lit { background: linear-gradient(90deg, #00d4ff, #bf00ff); }

        /* ── STEP CHECKLIST ── */
        .lr-steps {
          display: flex; flex-direction: column; gap: 6px;
          margin-top: 18px; width: 264px;
          animation: lrfadeup 0.7s 0.7s both;
        }
        .lr-step {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.22); transition: color 0.4s;
        }
        .lr-step.active { color: #00d4ff; text-shadow: 0 0 8px #00d4ff66; }
        .lr-step.done   { color: rgba(0,255,136,0.85); }
        .lr-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.12); flex-shrink: 0;
          transition: background 0.4s, box-shadow 0.4s;
        }
        .lr-step.active .lr-dot { background: #00d4ff;  box-shadow: 0 0 8px #00d4ff; }
        .lr-step.done   .lr-dot { background: #00ff88;  box-shadow: 0 0 6px #00ff88; }

        /* ── COMPLETE ── */
        .lr-complete {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          background: linear-gradient(90deg, #00d4ff, #bf00ff, #ff00c8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-top: 18px; opacity: 0;
          transform: translateY(6px); transition: opacity 0.5s, transform 0.5s;
        }
        .lr-complete.show { opacity: 1; transform: translateY(0); }

        /* ── TAGLINE ── */
        .lr-tagline {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.66rem; font-weight: 600;
          letter-spacing: 0.2em; color: rgba(255,255,255,0.18);
          text-transform: uppercase; margin-top: 10px;
          animation: lrfadeup 0.7s 0.9s both;
        }
      `}</style>
    </>
  );
}