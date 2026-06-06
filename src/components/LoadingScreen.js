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

  const getStatus = (pct) => {
    let label = STATUSES[0][1];
    for (const [threshold, text] of STATUSES) {
      if (pct >= threshold) label = text;
    }
    return label;
  };

  const getStepClass = (pct, at) => {
    if (pct >= at + 15) return "lr-step done";
    if (pct >= at) return "lr-step active";
    return "lr-step";
  };

  // Canvas particle + grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COLORS = ["#00b4d8","#0077b6","#f4a261","#e9c46a","#00d4f0"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Dot {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.8 + 0.4;
        this.a = Math.random();
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.globalAlpha = this.a * 0.8; ctx.fill();
      }
    }

    const dots = Array.from({ length: 60 }, () => new Dot());
    let rafId;

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.06; ctx.strokeStyle = "#00b4d8"; ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      ctx.globalAlpha = 1;
      dots.forEach(d => { d.update(); d.draw(); });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 80) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.globalAlpha = (1 - dist / 80) * 0.15;
            ctx.strokeStyle = "#00b4d8"; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  // Progress animation
  useEffect(() => {
    const duration = 3800;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const raw = Math.min((now - start) / duration, 1);
      const eased = raw < 0.5 ? 2*raw*raw : -1 + (4 - 2*raw)*raw;
      setProgress(Math.round(eased * 100));
      if (raw < 1) raf = requestAnimationFrame(tick);
      else { setDone(true); setTimeout(onComplete, 900); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const SEGS = 20;
  const litCount = Math.floor(progress / 100 * SEGS);

  return (
    <>
      <div className={`lr-root ${done ? "lr-fadeout" : ""}`}>
        <canvas ref={canvasRef} className="lr-canvas" />
        <div className="lr-scanline" />
        <div className="lr-vignette" />
        <div className="lr-corner lr-tl" /><div className="lr-corner lr-tr" />
        <div className="lr-corner lr-bl" /><div className="lr-corner lr-br" />

        <div className="lr-center">
          {/* Hexagon avatar */}
          <div className="lr-hex">
            <svg viewBox="0 0 110 110" width="110" height="110">
              <g style={{animation:"hexspin 8s linear infinite",transformOrigin:"55px 55px"}}>
                <polygon points="55,8 98,31 98,79 55,102 12,79 12,31" fill="none" stroke="#00b4d8" strokeWidth="1" strokeDasharray="6 3" opacity="0.6"/>
              </g>
              <g style={{animation:"hexspin 5s linear infinite reverse",transformOrigin:"55px 55px"}}>
                <polygon points="55,18 90,37 90,73 55,92 20,73 20,37" fill="none" stroke="#f4a261" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4"/>
              </g>
              <polygon points="55,24 86,41 86,69 55,86 24,69 24,41" fill="rgba(0,180,216,0.06)" stroke="rgba(0,180,216,0.3)" strokeWidth="1"/>
            </svg>
            <div className="lr-photo">
              <img src={profilePic} alt="Crown James" />
            </div>
            <span className="lr-online" />
          </div>

          {/* Name with glitch */}
          <div className="lr-glitch lr-name" data-text="CROWN JAMES">CROWN JAMES</div>
          <div className="lr-role">Aspiring Software Developer</div>

          {/* Skill tags */}
          <div className="lr-skills">
            {[["React","#00b4d8"],["UI/UX","#f4a261"],["Python","#e9c46a"],["Full Stack","#00d4f0"]].map(([tag, color]) => (
              <span key={tag} className="lr-tag" style={{color, borderColor: color + "44", background: color + "18"}}>{tag}</span>
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

          <div className={`lr-complete ${done ? "show" : ""}`}>System online — welcome</div>
          <div className="lr-tagline">Technology · Design · Creativity</div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        @keyframes hexspin { to { transform: rotate(360deg); } }
        @keyframes fadeup  { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes glitch1 { 0%,90%,100%{transform:translate(0)} 92%{transform:translate(-3px,1px)} 94%{transform:translate(3px,-1px)} }
        @keyframes glitch2 { 0%,90%,100%{transform:translate(0)} 91%{transform:translate(3px,-1px)} 93%{transform:translate(-3px,2px)} }

        .lr-root { position:fixed; inset:0; background:#030d18; display:flex; align-items:center; justify-content:center; z-index:9999; overflow:hidden; opacity:1; transition:opacity 0.7s ease; }
        .lr-fadeout { opacity:0; pointer-events:none; }
        .lr-canvas { position:absolute; inset:0; width:100%; height:100%; opacity:0.55; }
        .lr-scanline { position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,180,216,0.018) 3px,rgba(0,180,216,0.018) 4px); pointer-events:none; z-index:5; }
        .lr-vignette { position:absolute; inset:0; background:radial-gradient(ellipse at center,transparent 50%,rgba(3,13,24,0.75) 100%); pointer-events:none; z-index:4; }

        .lr-corner { position:absolute; width:22px; height:22px; opacity:0.45; }
        .lr-tl { top:18px; left:18px; border-top:1.5px solid #00b4d8; border-left:1.5px solid #00b4d8; }
        .lr-tr { top:18px; right:18px; border-top:1.5px solid #00b4d8; border-right:1.5px solid #00b4d8; }
        .lr-bl { bottom:18px; left:18px; border-bottom:1.5px solid #00b4d8; border-left:1.5px solid #00b4d8; }
        .lr-br { bottom:18px; right:18px; border-bottom:1.5px solid #00b4d8; border-right:1.5px solid #00b4d8; }

        .lr-center { position:relative; z-index:10; display:flex; flex-direction:column; align-items:center; }

        .lr-hex { position:relative; width:110px; height:110px; margin-bottom:26px; }
        .lr-photo { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
        .lr-photo img { width:72px; height:72px; border-radius:50%; object-fit:cover; }
        .lr-online { position:absolute; bottom:12px; right:12px; width:11px; height:11px; background:#00ffaa; border-radius:50%; border:2px solid #030d18; animation:blink 1.4s ease-in-out infinite; }

        .lr-glitch { position:relative; font-family:'Orbitron',sans-serif; font-size:1.45rem; font-weight:900; color:#fff; letter-spacing:4px; text-shadow:0 0 30px rgba(0,180,216,0.5); animation:fadeup 0.7s 0.1s both; }
        .lr-glitch::before,.lr-glitch::after { content:attr(data-text); position:absolute; top:0; left:0; font-family:'Orbitron',sans-serif; font-size:1.45rem; font-weight:900; letter-spacing:4px; }
        .lr-glitch::before { color:#f4a261; clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%); animation:glitch1 4s infinite; opacity:0.7; }
        .lr-glitch::after  { color:#00b4d8; clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%); animation:glitch2 4s infinite; opacity:0.7; }

        .lr-role { font-family:'Rajdhani',sans-serif; font-size:0.78rem; font-weight:700; letter-spacing:0.28em; color:#00b4d8; text-transform:uppercase; margin-top:7px; animation:fadeup 0.7s 0.3s both; }

        .lr-skills { display:flex; gap:8px; margin-top:20px; flex-wrap:wrap; justify-content:center; animation:fadeup 0.7s 0.5s both; }
        .lr-tag { font-family:'Rajdhani',sans-serif; font-size:0.65rem; font-weight:700; letter-spacing:0.14em; padding:4px 10px; border-radius:20px; text-transform:uppercase; border:1px solid; }

        .lr-bar-wrap { width:260px; margin-top:30px; animation:fadeup 0.7s 0.6s both; }
        .lr-bar-header { display:flex; justify-content:space-between; margin-bottom:8px; }
        .lr-status { font-family:'Rajdhani',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.16em; color:rgba(0,180,216,0.7); text-transform:uppercase; }
        .lr-pct { font-family:'Orbitron',sans-serif; font-size:0.78rem; font-weight:700; color:#00b4d8; }
        .lr-track { width:100%; height:4px; background:rgba(0,180,216,0.1); border-radius:4px; overflow:visible; }
        .lr-fill { height:100%; border-radius:4px; background:#00b4d8; transition:width 0.08s linear; position:relative; }
        .lr-cursor { position:absolute; right:-1px; top:50%; transform:translateY(-50%); width:8px; height:8px; border-radius:50%; background:#fff; box-shadow:0 0 10px #00b4d8,0 0 20px #00b4d8; }
        .lr-segs { display:flex; gap:3px; margin-top:8px; }
        .lr-seg { flex:1; height:2px; border-radius:1px; background:rgba(0,180,216,0.12); transition:background 0.3s; }
        .lr-seg.lit { background:#00b4d8; }

        .lr-steps { display:flex; flex-direction:column; gap:6px; margin-top:18px; width:260px; animation:fadeup 0.7s 0.7s both; }
        .lr-step { display:flex; align-items:center; gap:10px; font-family:'Rajdhani',sans-serif; font-size:0.68rem; font-weight:600; letter-spacing:0.1em; color:rgba(255,255,255,0.22); text-transform:uppercase; transition:color 0.4s; }
        .lr-step.active { color:#00b4d8; }
        .lr-step.done   { color:rgba(0,255,170,0.7); }
        .lr-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.12); flex-shrink:0; transition:background 0.4s,box-shadow 0.4s; }
        .lr-step.active .lr-dot { background:#00b4d8; box-shadow:0 0 8px #00b4d8; }
        .lr-step.done   .lr-dot { background:#00ffaa; }

        .lr-complete { font-family:'Orbitron',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.22em; color:#00ffaa; text-transform:uppercase; margin-top:18px; opacity:0; transform:translateY(6px); transition:opacity 0.5s,transform 0.5s; }
        .lr-complete.show { opacity:1; transform:translateY(0); }
        .lr-tagline { font-family:'Rajdhani',sans-serif; font-size:0.66rem; font-weight:600; letter-spacing:0.2em; color:rgba(255,255,255,0.14); text-transform:uppercase; margin-top:10px; animation:fadeup 0.7s 0.9s both; }
      `}</style>
    </>
  );
}