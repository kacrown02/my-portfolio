import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/profile.jpg";
import cert2 from "../assets/estate.jpg";
import cert3 from "../assets/social.jpg";
import cert4 from "../assets/frontend.png";
import cert5 from "../assets/fullstack.png";
import cert6 from "../assets/Great.png";

/* ── DATA ── */
const skills = [
  { label: "HTML", pct: 88, color: "#00D9FF" },
  { label: "CSS", pct: 85, color: "#D100FF" },
  { label: "Javascript", pct: 80, color: "#FFD500" },
  { label: "C#", pct: 75, color: "#00FF99" },
  { label: "React Ecosystem (React.js, React Native, Expo)", pct: 90, color: "#6A00FF" },
  { label: "Basic SQL", pct: 75, color: "#FF4D9D" },
  { label: "Python", pct: 75, color: "#FF8800" },
  { label: "Social Media Promotional Design", pct: 75, color: "#00E5FF" },
];

const education = [
  {
    degree: "ICT - Computer System Programming",
    school: "Catalunan Pequeño National High School",
    year: "2016 – 2020",
    icon: "🏫",
  },
  {
    degree: "BS Information Technology",
    school: "Holy Cross of Davao College",
    year: "2022 – 2026",
    icon: "🎓",
  },
];

const certifications = [
  {
    name: "Introduce to Database and SQL",
    issuer: "Great Learning",
    icon: "🛢️",
    image: cert6,
    color: "#00D9FF",
  },
  {
    name: "Introduce to Front End Development",
    issuer: "Simplilearn SkillUp",
    icon: "🌐",
    image: cert4,
    color: "#00D9FF",
  },
  {
    name: "Getting Started with Full Stack Java Development",
    issuer: "Simplilearn SkillUp",
    icon: "💻",
    image: cert5,
    color: "#00D9FF",
  },
  {
    name: "Real Estate Virtual Assistant Course",
    issuer: "Freelance Academy",
    icon: "📑",
    image: cert2,
    color: "#00D9FF",
  },
  {
    name: "Virtual Assistant Social Media Marketing Course",
    issuer: "Freelance Academy",
    icon: "📱",
    image: cert3,
    color: "#00D9FF",
  },
];

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
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
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
function SectionTitle({ eyebrow, title, color = "#00d4ff" }) {
  return (
    <div className="section-title-wrap reveal">
      <p className="section-eyebrow" style={{ color, textShadow: `0 0 10px ${color}88` }}>
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" style={{ background: `linear-gradient(90deg, ${color}, #bf00ff)` }} />
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

  const roles = ["Frontend Developer", "UI Designer", "Creative Technologist", "React Developer"];
  const typedText = useTypingAnimation(roles, 80, 2000);

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

          {/* Floating particles */}
          <div className="hero-particles" aria-hidden="true">
            {[...Array(18)].map((_, i) => (
              <span key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                background: ["#00D9FF", "#D100FF", "#FF4D9D", "#6A00FF"][Math.floor(Math.random() * 4)],
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

            {/* Typing animation subtitle */}
            <p className="hero-subtitle reveal">
              <span className="typing-text">{typedText}</span>
              <span className="typing-cursor">|</span>
            </p>

            <p className="hero-desc reveal">
  Building modern digital experiences through{" "}
  <span style={{ color: "#00d4ff", fontWeight: 700 }}>Technology</span>,{" "}
  <span style={{ color: "#bf00ff", fontWeight: 700 }}>Design</span>{" "}
  &{" "}
  <span style={{ color: "#ff00c8", fontWeight: 700 }}>Creativity</span>.
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

        {/* ══ EDUCATION + CERTIFICATIONS ══ */}
        <section className="section" id="education">
          <SectionTitle eyebrow="My Journey" title="Education" color="#bf00ff" />

          <div className="edu-container">
            <div className="edu-cert-grid">

              {/* ── Education Timeline ── */}
              <div className="edu-col">
                <div className="edu-col-title">
                  <span className="edu-col-accent" style={{ background: "#bf00ff" }} />
                  Education
                </div>

                <div className="edu-timeline">
                  {education.map((e, i) => (
                    <div className="edu-timeline-item reveal" key={e.degree}>
                      <div className="timeline-dot" style={{ borderColor: "#bf00ff", boxShadow: "0 0 10px #bf00ff88" }}>
                        <span className="timeline-dot-inner" style={{ background: "#bf00ff" }} />
                      </div>
                      {i < education.length - 1 && (
                        <div className="timeline-line" style={{ background: "linear-gradient(180deg, #bf00ff, #00D9FF)" }} />
                      )}
                      <div className="edu-card">
                        <div className="edu-card-year">{e.year}</div>
                        <div className="edu-card-degree">{e.degree}</div>
                        <div className="edu-card-school">{e.school}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Certifications ── */}
              <div className="cert-col">
                <div className="edu-col-title">
                  <span className="edu-col-accent" style={{ background: "#00D9FF" }} />
                  Certifications
                </div>

                <div className="cert-list">
                  {certifications.map((c) => (
                    <div
                      className="cert-card-new reveal"
                      key={c.name}
                      onClick={() => setSelectedCert(c)}
                    >
                      <div className="cert-card-accent" />
                      <div className="cert-icon-wrap">
                        <span className="cert-emoji">{c.icon}</span>
                      </div>
                      <div className="cert-info">
                        <div className="cert-name">{c.name}</div>
                        <div className="cert-issuer">{c.issuer}</div>
                      </div>
                      <div className="cert-arrow">›</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* ══ CERT MODAL ══ */}
      {selectedCert && (
        <div className="modal-overlay-local" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="modal-title">{selectedCert.name}</p>
            <p className="modal-issuer">{selectedCert.issuer}</p>
            <img src={selectedCert.image} alt={selectedCert.name} className="modal-image" />
            <button className="modal-close" onClick={() => setSelectedCert(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ══ INJECTED STYLES ══ */}
      <style>{`
        /* ── Typing cursor blink ── */
        .typing-cursor {
          display: inline-block;
          color: #00D9FF;
          animation: blink 0.8s step-end infinite;
          margin-left: 2px;
          font-weight: 300;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── Floating particles ── */
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
          0%   { transform: translateY(0px) scale(1);   opacity: 0.6; }
          50%  { transform: translateY(-30px) scale(1.3); opacity: 1; }
          100% { transform: translateY(0px) scale(1);   opacity: 0.6; }
        }

        /* ── Skill label ── */
        .skill-label { font-size: 0.92rem; color: #ccc; }
        .skill-pct   { font-size: 0.92rem; font-weight: 700; }

        /* ── Education col header ── */
        .edu-col-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #aaa;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .edu-col-accent {
          display: inline-block;
          width: 28px;
          height: 3px;
          border-radius: 2px;
        }

        /* ── Timeline layout ── */
        .edu-cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .edu-cert-grid { grid-template-columns: 1fr; }
        }

        .edu-timeline { display: flex; flex-direction: column; gap: 0; }

        .edu-timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          position: relative;
          padding-bottom: 32px;
        }
        .edu-timeline-item:last-child { padding-bottom: 0; }

        .timeline-dot {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }
        .timeline-dot-inner {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: block;
        }
        .timeline-line {
          position: absolute;
          left: 8px;
          top: 22px;
          width: 2px;
          bottom: 0;
          z-index: 0;
        }

        .edu-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(191,0,255,0.25);
          border-radius: 12px;
          padding: 14px 18px;
          flex: 1;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .edu-card:hover {
          border-color: rgba(191,0,255,0.6);
          box-shadow: 0 0 16px rgba(191,0,255,0.2);
        }
        .edu-card-year {
          font-size: 0.72rem;
          color: #bf00ff;
          letter-spacing: 0.1em;
          font-weight: 600;
          margin-bottom: 6px;
          text-shadow: 0 0 8px #bf00ff88;
        }
        .edu-card-degree {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .edu-card-school {
          font-size: 0.82rem;
          color: #888;
        }

        /* ── Cert cards ── */
        .cert-list { display: flex; flex-direction: column; gap: 12px; }

        .cert-card-new {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,217,255,0.2);
          border-radius: 12px;
          padding: 14px 16px;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
        }
        .cert-card-new:hover {
          border-color: rgba(0,217,255,0.6);
          box-shadow: 0 0 18px rgba(0,217,255,0.2);
          transform: translateX(4px);
        }
        .cert-card-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #00D9FF;
          box-shadow: 0 0 8px #00D9FF88;
          border-radius: 2px 0 0 2px;
        }
        .cert-icon-wrap {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(0,217,255,0.1);
          border: 1px solid rgba(0,217,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cert-emoji { font-size: 1.2rem; }
        .cert-info { flex: 1; min-width: 0; }
        .cert-name {
          font-size: 0.88rem;
          color: #ffffff;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 3px;
        }
        .cert-issuer {
          font-size: 0.78rem;
          color: #00D9FF;
          text-shadow: 0 0 8px #00D9FF66;
        }
        .cert-arrow {
          flex-shrink: 0;
          font-size: 1.4rem;
          color: rgba(0,217,255,0.4);
          transition: color 0.3s, transform 0.2s;
        }
        .cert-card-new:hover .cert-arrow {
          color: #00D9FF;
          transform: translateX(3px);
        }

        /* ── Section line override ── */
        .section-line {
          height: 3px;
          width: 60px;
          border-radius: 2px;
          margin: 10px auto 0;
        }
      `}</style>
    </>
  );
}
