import React, { useEffect, useState } from "react";
import profilePic from "../assets/grad.jpg";
import certificateImg from "../assets/techno.jpg";
import certificate2Img from "../assets/japan.png";

const technicalSkills = {
  frontend: {
    label: "Frontend",
    color: "#00D9FF",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "React Native",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  backend: {
    label: "Backend",
    color: "#00ffb3",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "Laravel",
    ],
  },
  database: {
    label: "Database",
    color: "#bf00ff",
    items: [
      "MySQL",
      "Firebase",
      "Supabase",
    ],
  },
  aiTools: {
    label: "AI Tools",
    color: "#ff00c8",
    items: [
      "ChatGPT",
      "GitHub Copilot",
      "Claude",
    ],
  },
  toolsAndPlatforms: {
    label: "Tools & Platforms",
    color: "#FFD500",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "VS Code",
    ],
  },
};

const awards = [
  {
    name: "2nd Runner-Up – RiceSure (Capstone Techno Fair)",
    issuer: "Holy Cross of Davao College, Philippines",
    icon: "🏆",
    image: certificateImg,
    accent: "#FFD500",
  },
  {
    name: "Certificate of Appreciation",
    issuer: "Holy Cross of Davao College, Philippines",
    icon: "🥇",
    image: certificate2Img,
    accent: "#00ffb3",
  },
];

/* SVG icon components for info items */
const InfoIcon = ({ type, color = "#00D9FF" }) => {
  const s = { width: 18, height: 18, display: "block", flexShrink: 0 };
  if (type === "name") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
  if (type === "course") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v6"/><path d="M6 10.5v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>
    </svg>
  );
  if (type === "focus") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 20h8M12 18v2"/>
      <path d="M7 9h4M7 12h6"/>
    </svg>
  );
  if (type === "status") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-4 0v2M9 12l2 2 4-4"/>
    </svg>
  );
  return null;
};

const infoItems = [
  { label: "Name",   value: "Crown James C. Cedeño", iconType: "name",   iconColor: "#00D9FF" },
  { label: "Course", value: "BS Information Technology", iconType: "course", iconColor: "#bf00ff" },
  { label: "Focus",  value: "Frontend & Web Development", iconType: "focus",  iconColor: "#ff00c8" },
  { label: "Status", value: "Open to Opportunities", iconType: "status", iconColor: "#00ffb3" },
];

const bioFull = `I'm passionate about building modern digital experiences through frontend development, full-stack web development, and user-centered design. With hands-on experience in React.js, Next.js, React Native, Node.js, Express.js, Python, MySQL, Firebase, and Supabase, I enjoy creating responsive websites and mobile applications that are functional, scalable, and easy to use.

Driven by continuous learning and real-world experience, I've developed practical skills in REST API integration, database management, authentication, and AI-assisted development. I'm committed to writing clean, maintainable code and delivering digital solutions that combine functionality, performance, and an excellent user experience.`;

const bioShort = bioFull.split("\n\n").slice(0, 2).join("\n\n");

/* ── HOOK: scroll-triggered animation ── */
function useScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Skill category block (badge/pill style) ── */
function SkillCategoryBlock({ category, delay }) {
  const { label, color, items } = category;
  return (
    <div className="skill-category reveal" style={{ animationDelay: `${delay}s`, borderColor: `${color}30` }}>
      <div className="skill-category-header">
        <span className="skill-category-dot" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        <span className="skill-category-label" style={{ color }}>{label}</span>
      </div>
      <div className="skill-pill-wrap">
        {items.map((item) => (
          <span
            key={item}
            className="skill-pill"
            style={{ borderColor: `${color}44`, color: "#eaeaea" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 10px ${color}55`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.boxShadow = "none"; }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  useScrollReveal();
  const [selectedAward, setSelectedAward] = useState(null);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedAward ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedAward]);

  return (
    <>
      <div className="page-enter section edu-container">
        {/* ── Title ── */}
        <div className="section-title-wrap reveal">
          <p className="section-eyebrow" style={{ color: "#00ffb3", textShadow: "0 0 10px #00ffb388" }}>
            Who I Am
          </p>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" style={{ background: "linear-gradient(90deg, #00ffb3, #00d4ff)" }} />
        </div>

        <div className="about-wrapper">
          {/* ── Bio block ── */}
          <div className="about-top reveal">
            {/* Profile picture */}
            <div style={{
              flexShrink: 0,
              position: "relative",
              width: 210,
              height: 290,
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: `
                0 0 0 2px rgba(0,212,255,0.7),
                0 0 20px rgba(0,212,255,0.45),
                0 0 50px rgba(191,0,255,0.25),
                0 8px 40px rgba(0,0,0,0.6)
              `,
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(5,5,16,0.55) 0%, transparent 50%)",
                zIndex: 1, pointerEvents: "none", borderRadius: 28,
              }} />
              <img
                src={profilePic}
                alt="Crown James Cedeño"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", borderRadius: 28 }}
              />
            </div>

            {/* Text */}
            <div className="about-text">
              <h3 className="about-name">Crown James</h3>
              <p className="about-role">FRONTEND DEVELOPER & DESIGNER</p>
              <p className="about-bio" style={{ whiteSpace: "pre-line" }}>
                {bioExpanded ? bioFull : bioShort}
              </p>
              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                style={{
                  marginTop: 10,
                  background: "none",
                  border: "none",
                  color: "#00D9FF",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textShadow: "0 0 8px #00D9FF88",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {bioExpanded ? "▲ Show Less" : "▼ Read More"}
              </button>

              {/* Info grid — pill style */}
              <div className="about-info-grid" style={{ marginTop: 24 }}>
                {infoItems.map((item) => (
                  <div className="about-info-item-new" key={item.label} style={{ borderColor: `${item.iconColor}22` }}>
                    <div style={{
                      flexShrink: 0,
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${item.iconColor}15`,
                      border: `1px solid ${item.iconColor}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <InfoIcon type={item.iconType} color={item.iconColor} />
                    </div>
                    <div>
                      <span className="about-info-label">{item.label}</span>
                      <span className="about-info-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="reveal" style={{
            width: "100%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)",
            margin: "0 0 48px",
          }} />

          {/* ── Skills ── */}
          <div className="about-skills-section">
            <div className="section-title-wrap reveal" style={{ marginBottom: 28 }}>
              <p className="section-eyebrow" style={{ color: "#ff00c8", textShadow: "0 0 10px #ff00c888" }}>
                Tech Stack
              </p>
              <h2 className="section-title">Skills</h2>
              <div className="section-line" style={{ background: "linear-gradient(90deg, #ff00c8, #bf00ff)", boxShadow: "0 0 12px #ff00c888" }} />
            </div>
            <div className="skills-grid">
              {Object.values(technicalSkills).map((category, i) => (
                <SkillCategoryBlock key={category.label} category={category} delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* ── Awards ── */}
          <div className="about-awards-section">
            <div className="section-title-wrap reveal" style={{ marginTop: 48 }}>
              <p className="section-eyebrow" style={{ color: "#00ffb3", textShadow: "0 0 10px #00ffb388" }}>
                Recognition
              </p>
              <h2 className="section-title">Awards</h2>
              <div className="section-line" style={{ background: "linear-gradient(90deg, #00ffb3, #00d4ff)", boxShadow: "0 0 12px #00ffb388" }} />
            </div>
            <div className="awards-grid">
              {awards.map((a, i) => (
                <div
                  key={a.name}
                  className="award-card-new reveal"
                  style={{ animationDelay: `${i * 0.1}s`, "--accent": a.accent }}
                  onClick={() => setSelectedAward(a)}
                >
                  <div className="award-card-top-bar" style={{ background: a.accent, boxShadow: `0 0 12px ${a.accent}88` }} />
                  <div className="award-icon-wrap" style={{ background: `${a.accent}18`, border: `2px solid ${a.accent}44` }}>
                    <span style={{ fontSize: "1.8rem" }}>{a.icon}</span>
                  </div>
                  <div className="award-name">{a.name}</div>
                  <div className="award-issuer" style={{ color: a.accent, textShadow: `0 0 8px ${a.accent}66` }}>
                    {a.issuer}
                  </div>
                  <div className="award-view-hint">
                    <span style={{ color: a.accent, fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                      VIEW CERTIFICATE ›
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {selectedAward && (
        <div className="modal-overlay-local" onClick={() => setSelectedAward(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="modal-title">{selectedAward.name}</p>
            <p className="modal-issuer">{selectedAward.issuer}</p>
            <img src={selectedAward.image} alt={selectedAward.name} className="modal-image" />
            <button className="modal-close" onClick={() => setSelectedAward(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ── INJECTED STYLES ── */}
      <style>{`
        /* Info items — pill style */
        .about-info-item-new {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,217,255,0.15);
          border-radius: 10px;
          padding: 10px 14px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .about-info-item-new:hover {
          border-color: rgba(0,217,255,0.4);
          box-shadow: 0 0 12px rgba(0,217,255,0.15);
        }
        .about-info-label {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 2px;
        }
        .about-info-value {
          display: block;
          font-size: 0.88rem;
          color: #fff;
          font-weight: 600;
        }

        /* ── Skills: categorized badge grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 800px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
        .skill-category {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px 22px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .skill-category:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.35);
        }
        .skill-category-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .skill-category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .skill-category-label {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .skill-pill-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-pill {
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .skill-pill:hover {
          transform: translateY(-2px);
        }

        /* ── Awards grid: always equal 2 columns ── */
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 24px;
        }
        @media (max-width: 600px) {
          .awards-grid { grid-template-columns: 1fr; }
        }
        .award-card-new {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 28px 24px 20px;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s;
        }
        .award-card-new:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .award-card-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 16px 16px 0 0;
        }
        .award-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .award-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
        }
        .award-issuer {
          font-size: 0.8rem;
          font-weight: 500;
        }
        .award-view-hint {
          margin-top: 6px;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .award-card-new:hover .award-view-hint {
          opacity: 1;
          transform: translateY(0);
        }
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
