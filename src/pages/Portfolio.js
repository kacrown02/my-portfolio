import React, { useEffect, useState, useCallback } from "react";

/* ─── DATA ─── */
const projects = [
  {
    title: "RiceSure",
    tag: "Mobile App",
    icon: "/RICESURE.png",
    color: "#00d4ff",
    tech: ["React Native", "Expo", "Firebase"],
    desc: "AI-powered mobile application for rice grain purity detection using React Native, Flask, and CNN-based image classification.",
    github: "https://github.com/kacrown02/RiceSureFinal-Caps",
    figma: null,
    canva: null,
    images: ["/ricesure1.jpg", "/ricesure2.jpg", "/ricesure3.jpg"],
  },
  {
    title: "PZAM Cups",
    tag: "Online Ordering System",
    icon: "/crop.jpg",
    color: "#bf00ff",
    tech: ["React.js", "Node.js", "MySQL"],
    desc: "Full-stack e-commerce web application for browsing products, customizing orders, and securely purchasing packaging products online.",
    github: "https://github.com/kacrown02/FINALPZAM",
    figma: null,
    canva: null,
    images: ["/CAPS1.jpg", "/CAPS2.jpg", "/CAPS3.jpg", "/CAPS4.jpg"],
  },
  {
    title: "Figma Design",
    tag: "Design",
    icon: "/des123.png",
    color: "#ff00c8",
    tech: ["Figma", "UI/UX", "Prototyping"],
    desc: "A modern and user-friendly Figma design for an online ordering and packaging management system with responsive desktop and mobile interfaces.",
    github: null,
    figma: "https://www.figma.com/design/z3UqagEETSrQYhsrtljbaT/Untitled?node-id=0-1&t=TxNuE6TCEdLxucDJ-1",
    canva: null,
    images: ["/D1.jpg", "/D2.jpg", "/D3.jpg", "/D4.jpg", "/D5.jpg", "/D6.jpg"],
  },
  {
    title: "Advertisement Design",
    tag: "Design",
    icon: "/canva123.png",
    color: "#00ffb3",
    tech: ["Canva", "Branding", "Marketing"],
    desc: "Creative Canva advertisement design for promoting products, services, and brand awareness with modern and eye-catching layouts.",
    github: null,
    figma: null,
    canva: "https://www.canva.com/design/DAG-cbz_uvs/c8IxTauzbQKHrAd0YHFObQ/edit",
    images: ["/C1.jpg", "/C2.jpg", "/C3.jpg", "/C4.jpg"],
  },
];

const FILTERS = ["All", "Mobile App", "Online Ordering System", "Design"];

/* ─── STYLES ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

  .pf-section {
    min-height: 100vh;
    padding: 80px 40px;
    position: relative;
    font-family: 'Rajdhani', sans-serif;
    background: transparent;
  }

  /* ── HEADER ── */
  .pf-header { text-align: center; margin-bottom: 50px; }
  .pf-eyebrow {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    letter-spacing: 5px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .pf-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(38px, 6vw, 68px);
    font-weight: 900;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .pf-line {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #a855f7, #6366f1);
    margin: 0 auto 20px;
    border-radius: 2px;
  }
  .pf-desc {
    font-size: 16px;
    color: rgba(255,255,255,0.38);
    font-weight: 400;
    letter-spacing: 0.3px;
  }

  /* ── FILTERS ── */
  .pf-filters {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  .pf-filter-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 9px 22px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.4);
    outline: none;
  }
  .pf-filter-btn:hover {
    border-color: rgba(255,255,255,0.28);
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.07);
  }
  .pf-filter-btn.active {
    border-color: #00d4ff;
    background: rgba(0,212,255,0.12);
    color: #00d4ff;
    box-shadow: 0 0 16px rgba(0,212,255,0.3), inset 0 0 12px rgba(0,212,255,0.05);
  }

  /* ── GRID — 2 columns ── */
  .pf-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 900px;
    margin: 0 auto;
  }
  @media (max-width: 640px) {
    .pf-grid { grid-template-columns: 1fr; }
    .pf-section { padding: 60px 20px; }
  }

  /* ── CARD ── */
  .pf-card {
    border-radius: 20px;
    padding: 0;
    cursor: pointer;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.5s ease, transform 0.5s ease,
                box-shadow 0.28s ease, border-color 0.28s ease;
  }
  .pf-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .pf-card:hover {
    transform: translateY(-7px) !important;
    box-shadow: 0 24px 64px var(--cc-shadow);
    border-color: var(--cc-border);
  }

  /* neon top accent bar */
  .pf-card-top-bar {
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--cc), transparent);
    opacity: 0.85;
    flex-shrink: 0;
  }

  /* radial glow overlay on hover */
  .pf-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: radial-gradient(ellipse at 50% 0%, var(--cc-faint), transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .pf-card:hover::after { opacity: 1; }

  .pf-card-body {
    padding: 28px 28px 0;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* icon */
  .pf-card-icon-wrap {
    width: 88px;
    height: 88px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    border: 1.5px solid var(--cc-border);
    background: var(--cc-icon-bg);
    box-shadow: 0 0 24px var(--cc-shadow);
    transition: box-shadow 0.28s;
    overflow: hidden;
    flex-shrink: 0;
  }
  .pf-card:hover .pf-card-icon-wrap {
    box-shadow: 0 0 40px var(--cc-shadow), 0 0 70px var(--cc-faint);
  }
  .pf-card-icon-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  .pf-card-tag {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--cc);
    text-shadow: 0 0 12px var(--cc);
    margin-bottom: 10px;
  }
  .pf-card-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    margin-bottom: 12px;
    line-height: 1.2;
  }
  .pf-card-desc {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.38);
    line-height: 1.75;
    margin-bottom: 16px;
  }

  /* tech tags */
  .pf-tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .pf-tech-tag {
    font-family: 'Orbitron', sans-serif;
    font-size: 8px;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 20px;
    background: var(--cc-icon-bg);
    border: 1px solid var(--cc-border);
    color: var(--cc);
  }

  /* card footer */
  .pf-card-footer {
    padding: 16px 28px 22px;
    display: flex;
    gap: 10px;
    justify-content: center;
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: auto;
  }
  .pf-view-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1.5px solid var(--cc-border);
    background: var(--cc-icon-bg);
    color: var(--cc);
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
  }
  .pf-view-btn:hover {
    background: var(--cc-hover-bg);
    box-shadow: 0 0 14px var(--cc-shadow);
    transform: scale(1.04);
  }

  /* ── MODAL OVERLAY ── */
  .pf-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    animation: pfFadeIn 0.2s ease;
  }
  @keyframes pfFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .pf-modal {
    background: linear-gradient(160deg, #0d0d20 0%, #080812 100%);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 22px;
    width: 100%;
    max-width: 560px;
    overflow: hidden;
    animation: pfSlideUp 0.25s ease;
    position: relative;
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
  }
  @keyframes pfSlideUp {
    from { transform: translateY(24px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  /* modal top accent */
  .pf-modal-accent {
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--cc), transparent);
    opacity: 0.8;
  }

  /* ── SLIDESHOW ── */
  .pf-slideshow {
    position: relative;
    width: 100%;
    height: 270px;
    overflow: hidden;
    background: #07070f;
  }
  .pf-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.45s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pf-slide.active { opacity: 1; }
  .pf-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pf-slide-ph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    height: 100%;
  }
  .pf-slide-ph .ph-icon-img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 16px;
    filter: drop-shadow(0 0 20px var(--cc));
  }
  .pf-slide-ph .ph-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.2);
  }
  .pf-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.14);
    color: rgba(255,255,255,0.8);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    z-index: 3;
    line-height: 1;
    outline: none;
  }
  .pf-arrow:hover { background: rgba(0,212,255,0.2); border-color: #00d4ff; color: #00d4ff; }
  .pf-arrow.left { left: 12px; }
  .pf-arrow.right { right: 12px; }
  .pf-counter {
    position: absolute;
    top: 12px;
    right: 14px;
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.55);
    background: rgba(0,0,0,0.55);
    padding: 4px 10px;
    border-radius: 20px;
    z-index: 3;
  }
  .pf-dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 7px;
    z-index: 3;
  }
  .pf-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, transform 0.2s;
    outline: none;
  }
  .pf-dot.active { background: #00d4ff; box-shadow: 0 0 8px #00d4ff; transform: scale(1.35); }

  /* modal body */
  .pf-modal-body { padding: 24px 30px 0; }
  .pf-modal-tag {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--cc);
    text-shadow: 0 0 10px var(--cc);
    margin-bottom: 8px;
  }
  .pf-modal-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: rgba(255,255,255,0.92);
    margin-bottom: 10px;
    line-height: 1.25;
  }
  .pf-modal-desc {
    font-family: 'Rajdhani', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.42);
    line-height: 1.8;
    margin-bottom: 14px;
  }
  .pf-modal-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 4px;
  }
  .pf-modal-tech-tag {
    font-family: 'Orbitron', sans-serif;
    font-size: 8px;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 20px;
    background: var(--cc-icon-bg);
    border: 1px solid var(--cc-border);
    color: var(--cc);
  }

  /* modal footer */
  .pf-modal-footer {
    padding: 20px 30px;
    margin-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .pf-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 10px;
    transition: all 0.2s;
    outline: none;
    cursor: pointer;
  }
  .pf-link-btn.github {
    background: rgba(0,212,255,0.08);
    border: 1.5px solid rgba(0,212,255,0.35);
    color: #00d4ff;
  }
  .pf-link-btn.github:hover {
    background: rgba(0,212,255,0.18);
    box-shadow: 0 0 18px rgba(0,212,255,0.35);
  }
  .pf-link-btn.figma {
    background: rgba(162,89,255,0.08);
    border: 1.5px solid rgba(162,89,255,0.35);
    color: #a259ff;
  }
  .pf-link-btn.figma:hover {
    background: rgba(162,89,255,0.18);
    box-shadow: 0 0 18px rgba(162,89,255,0.35);
  }
  .pf-link-btn.canva {
    background: rgba(0,200,150,0.08);
    border: 1.5px solid rgba(0,200,150,0.35);
    color: #00c896;
  }
  .pf-link-btn.canva:hover {
    background: rgba(0,200,150,0.18);
    box-shadow: 0 0 18px rgba(0,200,150,0.3);
  }
  .pf-close-btn {
    margin-left: auto;
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 18px;
    border-radius: 10px;
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.35);
    cursor: pointer;
    transition: all 0.22s;
    outline: none;
  }
  .pf-close-btn:hover {
    color: rgba(255,255,255,0.75);
    border-color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.07);
  }
  .pf-modal-x {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    z-index: 10;
    transition: all 0.2s;
    line-height: 1;
    outline: none;
  }
  .pf-modal-x:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.1);
  }
`;

/* ─── HELPER: detect if icon is an image path ─── */
function isImgPath(str) {
  if (!str) return false;
  return str.endsWith(".png") || str.endsWith(".jpg") || str.endsWith(".jpeg") ||
         str.endsWith(".svg") || str.endsWith(".webp") || str.startsWith("/");
}

/* ─── MAIN COMPONENT ─── */
export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [modal, setModal] = useState(null);
  const [slide, setSlide] = useState(0);

  const filtered = active === "All" ? projects : projects.filter((p) => p.tag === active);

  /* Reveal on scroll */
  useEffect(() => {
    const cards = document.querySelectorAll(".pf-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    cards.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  /* Auto-advance slides */
  useEffect(() => {
    if (!modal || modal.images.length <= 1) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % modal.images.length), 3500);
    return () => clearInterval(t);
  }, [modal, slide]);

  const openModal = useCallback((p) => { setModal(p); setSlide(0); }, []);
  const closeModal = useCallback(() => setModal(null), []);
  const prevSlide = () => setSlide((s) => Math.max(0, s - 1));
  const nextSlide = () => setSlide((s) => Math.min(modal.images.length - 1, s + 1));

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e) => {
      if (!modal) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modal]);

  const cssVars = (p, i) => ({
    "--cc": p.color,
    "--cc-faint": `${p.color}18`,
    "--cc-border": `${p.color}55`,
    "--cc-icon-bg": `${p.color}14`,
    "--cc-hover-bg": `${p.color}25`,
    "--cc-shadow": `${p.color}35`,
    transitionDelay: `${i * 0.07}s`,
  });

  return (
    <>
      <style>{css}</style>

      <div className="pf-section section page-enter">

        {/* ── Header ── */}
        <div className="pf-header reveal">
          <p className="pf-eyebrow">My Projects</p>
          <h2 className="pf-title">Portfolio</h2>
          <div className="pf-line" />
          <p className="pf-desc">
            A showcase of innovative IT systems, branding, and creative design projects.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="pf-filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pf-filter-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Cards Grid ── */}
        <div className="pf-grid">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="pf-card"
              style={cssVars(p, i)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(p)}
              role="button"
              aria-label={`View ${p.title}`}
            >
              {/* neon top bar */}
              <div className="pf-card-top-bar" />

              <div className="pf-card-body">
                {/* icon */}
                <div className="pf-card-icon-wrap">
                  {isImgPath(p.icon) ? (
                    <img src={p.icon} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }} />
                  ) : (
                    <span style={{ fontSize: 34, color: p.color, textShadow: `0 0 16px ${p.color}` }}>{p.icon}</span>
                  )}
                </div>

                <div className="pf-card-tag">{p.tag}</div>
                <div className="pf-card-title">{p.title}</div>
                <p className="pf-card-desc">{p.desc}</p>

                {/* tech tags */}
                {p.tech && (
                  <div className="pf-tech-tags">
                    {p.tech.map((t) => <span key={t} className="pf-tech-tag">{t}</span>)}
                  </div>
                )}
              </div>

              {/* card footer */}
              <div className="pf-card-footer">
                <button className="pf-view-btn" onClick={() => openModal(p)}>
                  ✦ View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div
          className="pf-overlay"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label={modal.title}
        >
          <div
            className="pf-modal"
            style={{
              "--cc": modal.color,
              "--cc-faint": `${modal.color}18`,
              "--cc-border": `${modal.color}55`,
              "--cc-icon-bg": `${modal.color}14`,
              "--cc-shadow": `${modal.color}35`,
            }}
          >
            <div className="pf-modal-accent" />
            <button className="pf-modal-x" onClick={closeModal} aria-label="Close">✕</button>

            {/* ── Slideshow ── */}
            <div className="pf-slideshow">
              {modal.images.length > 1 && (
                <div className="pf-counter">{slide + 1} / {modal.images.length}</div>
              )}

              {modal.images.map((img, i) => (
                <div
                  key={i}
                  className={`pf-slide${i === slide ? " active" : ""}`}
                  style={{ background: `${modal.color}0d` }}
                >
                  {img ? (
                    <img src={img} alt={`${modal.title} screenshot ${i + 1}`} />
                  ) : (
                    <div className="pf-slide-ph">
                      {isImgPath(modal.icon) ? (
                        <img src={modal.icon} alt={modal.title} className="ph-icon-img" />
                      ) : (
                        <span style={{ fontSize: 60, color: modal.color, filter: `drop-shadow(0 0 22px ${modal.color})` }}>
                          {modal.icon}
                        </span>
                      )}
                      <span className="ph-label">Photo {i + 1}</span>
                    </div>
                  )}
                </div>
              ))}

              {slide > 0 && (
                <button className="pf-arrow left" onClick={prevSlide} aria-label="Previous">‹</button>
              )}
              {slide < modal.images.length - 1 && (
                <button className="pf-arrow right" onClick={nextSlide} aria-label="Next">›</button>
              )}
              {modal.images.length > 1 && (
                <div className="pf-dots">
                  {modal.images.map((_, i) => (
                    <button
                      key={i}
                      className={`pf-dot${i === slide ? " active" : ""}`}
                      onClick={() => setSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Modal Body ── */}
            <div className="pf-modal-body">
              <div className="pf-modal-tag">{modal.tag}</div>
              <div className="pf-modal-title">{modal.title}</div>
              <p className="pf-modal-desc">{modal.desc}</p>
              {modal.tech && (
                <div className="pf-modal-tech">
                  {modal.tech.map((t) => <span key={t} className="pf-modal-tech-tag">{t}</span>)}
                </div>
              )}
            </div>

            {/* ── Modal Footer ── */}
            <div className="pf-modal-footer">
              {modal.github && (
                <a href={modal.github} className="pf-link-btn github" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {modal.figma && (
                <a href={modal.figma} className="pf-link-btn figma" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4v8h4V4zm4-4H8C5.792 0 4 1.792 4 4s1.792 4 4 4h4V0zm4 8c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8h4zm-4 2h-4v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4z"/>
                  </svg>
                  View on Figma
                </a>
              )}
              {modal.canva && (
                <a href={modal.canva} className="pf-link-btn canva" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.2c-1.987 0-3.6-1.613-3.6-3.6 0-.48.096-.938.267-1.356-.458.171-.916.267-1.396.267-1.987 0-3.6-1.613-3.6-3.6s1.613-3.6 3.6-3.6c.48 0 .938.096 1.356.267C8.456 7.096 8.36 6.638 8.36 6.158c0-1.987 1.613-3.6 3.6-3.6s3.6 1.613 3.6 3.6c0 .48-.096.938-.267 1.356.458-.171.916-.267 1.396-.267 1.987 0 3.6 1.613 3.6 3.6s-1.613 3.6-3.6 3.6c-.48 0-.938-.096-1.356-.267.171.458.267.916.267 1.396-.069 1.987-1.682 3.424-3.6 3.424z"/>
                  </svg>
                  View on Canva
                </a>
              )}
              <button className="pf-close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
