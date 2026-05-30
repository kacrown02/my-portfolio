import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/profile.jpg";
import cert2 from "../assets/estate.jpg";
import cert3 from "../assets/social.jpg";
import cert4 from "../assets/frontend.png";
import cert5 from "../assets/fullstack.png";
import cert6 from "../assets/Great.png";
import cert7 from "../assets/sql.png";
import cert8 from "../assets/reactjs.png";
import cert9 from "../assets/computernetworking.png";
import cert10 from "../assets/machinelearning.png";
import cert11 from "../assets/pythonbegg.png";
import cert12 from "../assets/advancepython.png";
import cert13 from "../assets/deeplearning.png";

/* ── DATA ── */
const skills = [
  { label: "HTML", pct: 88, color: "#00b4d8" },
  { label: "CSS", pct: 85, color: "#0077b6" },
  { label: "Javascript", pct: 80, color: "#e9c46a" },
  { label: "C#", pct: 75, color: "#00d4f0" },
  { label: "React Ecosystem (React.js, React Native, Expo)", pct: 90, color: "#f4a261" },
  { label: "Basic SQL", pct: 75, color: "#48cae4" },
  { label: "Python", pct: 75, color: "#ffd166" },
  { label: "Social Media Promotional Design", pct: 75, color: "#90e0ef" },
];

const education = [
  {
    degree: "ICT - Computer System Programming",
    school: "Catalunan Pequeño National High School",
    year: "2016 – 2020",
    icon: "🎓",
  },
  {
    degree: "BS Information Technology",
    school: "Holy Cross of Davao College",
    year: "2022 – 2026",
    icon: "💻",
  },
];

const certifications = [

  { name: "Introduce to Front End Development", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 5, 2026", icon: "🌐", image: cert4 },
  { name: "Getting Started with Full Stack Java Development", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 4, 2026", icon: "💻", image: cert5 },
  { name: "Introduction to SQL", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 8, 2026", icon: "🛢️", image: cert7 },
  { name: "ReactJS for Beginners", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 9, 2026", icon: "⚛️", image: cert8 },
  { name: "Introduction to Computer Networking", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 11, 2026", icon: "🌐", image: cert9 },
  { name: "Introduction to Machine Learning", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 13, 2026", icon: "🤖", image: cert10 },
  { name: "Python for Beginners", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 14, 2026", icon: "🐍", image: cert11 },
  { name: "Advanced Python", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 15, 2026", icon: "🔥", image: cert12 },
  { name: "Deep Learning with TensorFlow and PyTorch", issuer: "Simplilearn SkillUp", platform: "Simplilearn", date: "April 16, 2026", icon: "🧠", image: cert13 },
   { name: "Introduce to Database and SQL", issuer: "Great Learning", platform: "Great Learning", date: "August 2024", icon: "🛢️", image: cert6 },
  { name: "Real Estate Virtual Assistant Course", issuer: "Freelance Academy", platform: "Freelance Academy", date: "January 17, 2026", icon: "📑", image: cert2 },
  { name: "Virtual Assistant Social Media Marketing Course", issuer: "Freelance Academy", platform: "Freelance Academy", date: "January 17, 2026", icon: "📱", image: cert3 },
];

const platforms = ["All", "Simplilearn", "Great Learning", "Freelance Academy"];

const platformColors = {
  "Simplilearn":       { color: "#00b4d8", bg: "rgba(0,180,216,0.12)", border: "rgba(0,180,216,0.3)" },
  "Great Learning":    { color: "#e9c46a", bg: "rgba(233,196,106,0.12)", border: "rgba(233,196,106,0.3)" },
  "Freelance Academy": { color: "#f4a261", bg: "rgba(244,162,97,0.12)", border: "rgba(244,162,97,0.3)" },
};

/* ── TYPING ANIMATION HOOK ── */
function useTypingAnimation(words, speed = 100, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

/* ── SKILLS ANIMATION HOOK ── */
function useSkillsAnimation() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, animated };
}

/* ── REVEAL HOOK ── */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── COUNTER ANIMATION HOOK ── */
function useCounter(target, animated, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!animated) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [animated, target, duration]);
  return count;
}

/* ── SECTION TITLE ── */
function SectionTitle({ eyebrow, title, color = "#00b4d8" }) {
  return (
    <div className="section-title-wrap reveal">
      <p className="section-eyebrow" style={{ color, textShadow: `0 0 10px ${color}88` }}>
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" style={{ background: `linear-gradient(90deg, ${color}, #f4a261)` }} />
    </div>
  );
}

/* ── SKILL ITEM with counter ── */
function SkillItem({ skill, animated }) {
  const count = useCounter(skill.pct, animated);
  return (
    <div className="skill-item reveal">
      <div className="skill-header">
        <span className="skill-label">{skill.label}</span>
        <span className="skill-pct" style={{ color: skill.color }}>{count}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: animated ? `${skill.pct}%` : "0%",
            background: skill.color,
            boxShadow: animated ? `0 0 12px ${skill.color}99, 0 0 24px ${skill.color}44` : "none",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1), box-shadow 1.2s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ═════════ HOME PAGE ═════════ */
export default function Home() {
  useReveal();
  const { ref: skillsRef, animated: skillsAnimated } = useSkillsAnimation();
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTab, setActiveTab] = useState("All");

  const roles = ["Frontend Developer", "UI Designer", "Creative Technologist", "React Developer"];
  const typedText = useTypingAnimation(roles, 80, 2000);

  const recentCount = certifications.filter((c) => c.date).length;
  const latestCert = [...certifications].filter((c) => c.date).sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )[0];

  const filteredCerts = activeTab === "All"
    ? certifications
    : certifications.filter((c) => c.platform === activeTab);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedCert]);

  return (
    <>
      <div className="page-enter">

        {/* ══ HERO ══ */}
        <section className="hero-section">
          <div className="hero-bg-glow" />
          <div className="hero-particles" aria-hidden="true">
            {[...Array(18)].map((_, i) => (
              <span key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                background: ["#00b4d8", "#0077b6", "#f4a261", "#e9c46a"][Math.floor(Math.random() * 4)],
              }} />
            ))}
          </div>
          <div className="hero-content">
            <div className="avatar-wrapper reveal">
              <img src={profilePic} alt="Crown James" className="avatar-img" />
              <span className="avatar-online" />
            </div>
            <p className="hero-eyebrow reveal">ASPIRING SOFTWARE DEVELOPER</p>
            <h1 className="hero-title reveal">Hi, I'm Crown James</h1>
            <p className="hero-subtitle reveal">
              <span className="typing-text">{typedText}</span>
              <span className="typing-cursor">|</span>
            </p>
            <p className="hero-desc reveal">
              Building modern digital experiences through{" "}
              <span style={{ color: "#00b4d8", fontWeight: 700 }}>Technology</span>,{" "}
              <span style={{ color: "#0077b6", fontWeight: 700 }}>Design</span>{" "}
              &{" "}
              <span style={{ color: "#f4a261", fontWeight: 700 }}>Creativity</span>.
            </p>
            <div className="hero-buttons reveal">
              <Link to="/portfolio" className="btn-primary">View My Work</Link>
              <Link to="/contact" className="btn-secondary">Contact Me</Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ══ SKILLS ══ */}
        <section className="section" id="skills" ref={skillsRef}>
          <SectionTitle eyebrow="What I Do" title="My Skills" />
          <div className="skills-grid">
            {skills.map((s) => (
              <SkillItem key={s.label} skill={s} animated={skillsAnimated} />
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ══ EDUCATION — horizontal timeline ══ */}
        <section className="section" id="education">
          <SectionTitle eyebrow="My Journey" title="Education" color="#0077b6" />

          <div className="edu-horiz-timeline reveal">
            {education.map((e, i) => (
              <React.Fragment key={e.degree}>
                <div className="edu-horiz-card">
                  <div className="edu-horiz-icon">{e.icon}</div>
                  <div className="edu-horiz-year">{e.year}</div>
                  <div className="edu-horiz-degree">{e.degree}</div>
                  <div className="edu-horiz-school">{e.school}</div>
                </div>
                {i < education.length - 1 && (
                  <div className="edu-horiz-connector">
                    <div className="edu-horiz-line" />
                    <div className="edu-horiz-arrow">→</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ══ CERTIFICATIONS ══ */}
        <section className="section" id="certifications">
          <SectionTitle eyebrow="Credentials" title="Certifications" color="#f4a261" />

          {/* ── Stats Strip ── */}
          <div className="cert-stats-strip reveal">
            <div className="cert-stat">
              <span className="cert-stat-num" style={{ color: "#00b4d8" }}>{certifications.length}</span>
              <span className="cert-stat-label">Total Certs</span>
            </div>
            <div className="cert-stat-divider" />
            <div className="cert-stat">
              <span className="cert-stat-num" style={{ color: "#e9c46a" }}>{recentCount}</span>
              <span className="cert-stat-label">Earned in 2026</span>
            </div>
            <div className="cert-stat-divider" />
            <div className="cert-stat">
              <span className="cert-stat-num" style={{ color: "#f4a261" }}>3</span>
              <span className="cert-stat-label">Platforms</span>
            </div>
            <div className="cert-stat-divider" />
            <div className="cert-stat" style={{ flex: 2 }}>
              <span className="cert-stat-num" style={{ color: "#00d4f0", fontSize: "0.82rem", fontWeight: 600 }}>
                {latestCert?.date}
              </span>
              <span className="cert-stat-label">Latest Earned</span>
            </div>
          </div>

          {/* ── Platform Tabs ── */}
          <div className="cert-tabs reveal">
            {platforms.map((p) => {
              const pc = platformColors[p];
              const count = p === "All"
                ? certifications.length
                : certifications.filter((c) => c.platform === p).length;
              const isActive = activeTab === p;
              return (
                <button
                  key={p}
                  className={`cert-tab${isActive ? " cert-tab-active" : ""}`}
                  style={isActive && pc ? {
                    borderColor: pc.color,
                    color: pc.color,
                    background: pc.bg,
                    boxShadow: `0 0 12px ${pc.color}44`,
                  } : isActive ? {
                    borderColor: "#00b4d8",
                    color: "#00b4d8",
                    background: "rgba(0,180,216,0.12)",
                    boxShadow: "0 0 12px #00b4d844",
                  } : {}}
                  onClick={() => setActiveTab(p)}
                >
                  {p}
                  <span className="cert-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* ── Cert Grid ── */}
          <div className="cert-grid">
            {filteredCerts.map((c) => {
              const pc = platformColors[c.platform] || { color: "#00b4d8", bg: "rgba(0,180,216,0.1)", border: "rgba(0,180,216,0.25)" };
              const isNew = !!c.date;
              return (
                <div
                  className="cert-grid-card reveal"
                  key={c.name}
                  onClick={() => setSelectedCert(c)}
                  style={{ "--card-accent": pc.color }}
                >
                  {/* Top accent bar */}
                  <div className="cert-grid-top-bar" style={{ background: pc.color, boxShadow: `0 0 8px ${pc.color}88` }} />

                  {/* Icon */}
                  <div className="cert-grid-icon-wrap" style={{ background: pc.bg, border: `1px solid ${pc.border}` }}>
                    <span className="cert-grid-emoji">{c.icon}</span>
                  </div>

                  {/* Info */}
                  <div className="cert-grid-name">{c.name}</div>
                  <div className="cert-grid-issuer" style={{ color: pc.color }}>{c.issuer}</div>
                  {c.date && <div className="cert-grid-date">{c.date}</div>}

                  {/* View hint */}
                  <div className="cert-grid-view" style={{ color: pc.color }}>
                    VIEW CERTIFICATE ›
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* ══ CERT MODAL ══ */}
      {selectedCert && (
        <div className="modal-overlay-local" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="modal-title">{selectedCert.name}</p>
            <p className="modal-issuer">{selectedCert.issuer}</p>
            {selectedCert.date && <p className="modal-date">{selectedCert.date}</p>}
            {selectedCert.image ? (
              <img src={selectedCert.image} alt={selectedCert.name} className="modal-image" />
            ) : (
              <div className="modal-no-image">
                <span style={{ fontSize: "3rem" }}>{selectedCert.icon}</span>
                <p>Certificate image not yet available</p>
              </div>
            )}
            <button className="modal-close" onClick={() => setSelectedCert(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ══ INJECTED STYLES ══ */}
      <style>{`
        .typing-cursor {
          display: inline-block;
          color: #00b4d8;
          animation: blink 0.8s step-end infinite;
          margin-left: 2px;
          font-weight: 300;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .hero-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: floatParticle linear infinite;
        }
        @keyframes floatParticle {
          0%   { transform: translateY(0px) scale(1);     opacity: 0.6; }
          50%  { transform: translateY(-30px) scale(1.3); opacity: 1;   }
          100% { transform: translateY(0px) scale(1);     opacity: 0.6; }
        }
        .skill-label { font-size: 0.92rem; color: #ccc; }
        .skill-pct   { font-size: 0.92rem; font-weight: 700; }
        .section-line {
          height: 3px;
          width: 60px;
          border-radius: 2px;
          margin: 10px auto 0;
        }

        /* ══ HORIZONTAL EDUCATION TIMELINE ══ */
        .edu-horiz-timeline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          max-width: 860px;
          margin: 0 auto;
          padding: 8px 0 24px;
        }
        .edu-horiz-card {
          flex: 1;
          min-width: 240px;
          max-width: 340px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,119,182,0.25);
          border-radius: 18px;
          padding: 28px 24px;
          text-align: center;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
        }
        .edu-horiz-card:hover {
          border-color: rgba(0,180,216,0.5);
          box-shadow: 0 0 28px rgba(0,180,216,0.15);
          transform: translateY(-4px);
        }
        .edu-horiz-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }
        .edu-horiz-year {
          font-size: 0.72rem;
          color: #0077b6;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-shadow: 0 0 8px #0077b688;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .edu-horiz-degree {
          font-size: 1rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .edu-horiz-school {
          font-size: 0.8rem;
          color: #666;
          line-height: 1.4;
        }
        .edu-horiz-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          gap: 4px;
          flex-shrink: 0;
        }
        .edu-horiz-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #0077b6, #00b4d8);
          box-shadow: 0 0 8px #0077b688;
        }
        .edu-horiz-arrow {
          font-size: 1.1rem;
          color: #00b4d8;
          text-shadow: 0 0 8px #00b4d888;
        }
        @media (max-width: 640px) {
          .edu-horiz-timeline { flex-direction: column; }
          .edu-horiz-connector { transform: rotate(90deg); padding: 8px 0; }
        }

        /* ══ CERT STATS STRIP ══ */
        .cert-stats-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(0,180,216,0.12);
          border-radius: 16px;
          padding: 18px 28px;
          margin: 0 auto 32px;
          max-width: 700px;
        }
        .cert-stat {
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-stat-num {
          font-family: var(--font-display, 'Orbitron', sans-serif);
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 1px;
          line-height: 1;
        }
        .cert-stat-label {
          font-size: 0.68rem;
          color: #555;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .cert-stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
          margin: 0 8px;
        }

        /* ══ CERT PLATFORM TABS ══ */
        .cert-tabs {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .cert-tab {
          font-family: var(--font-body, 'Rajdhani', sans-serif);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 8px 18px;
          border-radius: 30px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cert-tab:hover {
          border-color: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.8);
        }
        .cert-tab-active {
          font-weight: 700;
        }
        .cert-tab-count {
          font-size: 0.7rem;
          background: rgba(255,255,255,0.1);
          padding: 1px 7px;
          border-radius: 20px;
          font-weight: 700;
        }
        .cert-tab-active .cert-tab-count {
          background: rgba(255,255,255,0.15);
        }

        /* ══ CERT GRID ══ */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .cert-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
        }
        .cert-grid-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px 18px 18px;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s;
        }
        .cert-grid-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 12px 36px rgba(0,0,0,0.4);
        }
        .cert-grid-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 16px 16px 0 0;
        }
        .cert-new-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          padding: 2px 7px;
          border-radius: 20px;
        }
        .cert-grid-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          flex-shrink: 0;
        }
        .cert-grid-emoji { font-size: 1.4rem; }
        .cert-grid-name {
          font-size: 0.82rem;
          color: #fff;
          font-weight: 700;
          line-height: 1.35;
          flex: 1;
        }
        .cert-grid-issuer {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.03em;
        }
        .cert-grid-date {
          font-size: 0.68rem;
          color: #555;
        }
        .cert-grid-view {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-top: 4px;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .cert-grid-card:hover .cert-grid-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* ══ MODAL ══ */
        .modal-date {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 16px;
          text-align: center;
        }
        .modal-no-image {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(0,180,216,0.3);
          border-radius: 12px;
          margin-bottom: 16px;
          color: #555;
          font-size: 0.85rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
