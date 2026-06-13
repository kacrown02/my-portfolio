import React, { useEffect, useState, useRef } from "react";
import emailjs from "emailjs-com";

const contactCards = [
  {
    icon: "✉",
    label: "Email",
    value: "kacrown4@gmail.com",
    link: "mailto:kacrown4@gmail.com",
    btnText: "Send Email",
    color: "#00d4ff",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+639555135269",
    link: "tel:+639555135269",
    btnText: "Call Now",
    color: "#00ffb3",
  },
  {
    icon: "◈",
    label: "Website",
    value: "crownjames.vercel.app",
    link: "https://crownjames.vercel.app",
    btnText: "Visit Site",
    color: "#bf00ff",
  },
  {
    icon: "⌥",
    label: "GitHub",
    value: "github.com/crownny2",
    link: "https://github.com/crownny2",
    btnText: "View Profile",
    color: "#ffd700",
  },
  {
    icon: "⬡",
    label: "LinkedIn",
    value: "Crown James Cedeño",
    link: "https://www.linkedin.com/in/crown-james-cedeno-715418416/",
    btnText: "Connect",
    color: "#00aaff",
  },
  {
    icon: "⊕",
    label: "Location",
    value: "Catalunan Pequeño, Davao City",
    link: "https://maps.app.goo.gl/9TxngCKXA13Uz9rEA",
    btnText: "View on Map",
    color: "#ff00c8",
  },
];

const css = `
  .ct-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }

  .ct-card {
    background: rgba(255,255,255,0.025);
    border-radius: 20px;
    padding: 28px 20px 22px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
    position: relative;
    overflow: hidden;
  }
  .ct-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: radial-gradient(ellipse at 50% 0%, var(--cc-faint), transparent 65%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .ct-card:hover::before { opacity: 1; }
  .ct-card:hover {
    transform: translateY(-5px);
    border-color: var(--cc-border);
    box-shadow: 0 16px 48px var(--cc-shadow);
  }

  .ct-icon-box {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    margin: 0 auto 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    border: 1.5px solid var(--cc-border);
    background: var(--cc-bg);
    box-shadow: 0 0 18px var(--cc-shadow);
    transition: box-shadow 0.25s;
  }
  .ct-card:hover .ct-icon-box {
    box-shadow: 0 0 30px var(--cc-shadow), 0 0 50px var(--cc-faint);
  }

  .ct-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--cc);
    text-shadow: 0 0 8px var(--cc);
    margin-bottom: 6px;
  }

  .ct-value {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    margin-bottom: 14px;
    line-height: 1.5;
    word-break: break-word;
  }

  .ct-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1.5px solid var(--cc-border);
    background: var(--cc-bg);
    color: var(--cc);
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
  }
  .ct-btn:hover {
    background: var(--cc-hover-bg);
    box-shadow: 0 0 16px var(--cc-shadow);
    transform: scale(1.05);
  }

  /* ── Form ── */
  .ct-form-wrap {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(0,212,255,0.12);
    border-radius: 24px;
    padding: 36px 40px;
    position: relative;
    overflow: hidden;
  }
  /* left accent bar */
  .ct-form-wrap::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #00d4ff, #bf00ff, #ff00c8);
    box-shadow: 0 0 16px #00d4ff88;
    border-radius: 3px 0 0 3px;
  }

  .ct-form-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #00d4ff, #bf00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 28px;
  }

  .ct-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 560px) {
    .ct-form-row { grid-template-columns: 1fr; }
    .ct-form-wrap { padding: 28px 20px; }
  }

  .ct-form-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 16px;
  }

  .ct-form-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  .ct-input, .ct-textarea {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(0,212,255,0.18);
    border-radius: 12px;
    padding: 13px 16px;
    color: rgba(255,255,255,0.85);
    font-family: 'Rajdhani', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.25s;
    width: 100%;
  }
  .ct-input:focus, .ct-textarea:focus {
    border-color: #00d4ff;
    background: rgba(0,212,255,0.06);
    box-shadow: 0 0 0 2px rgba(0,212,255,0.15), 0 0 16px rgba(0,212,255,0.1);
  }
  .ct-textarea {
    min-height: 130px;
    resize: vertical;
  }

  .ct-submit-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 14px 36px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    background: linear-gradient(90deg, #00d4ff, #bf00ff, #ff00c8);
    color: #050510;
    box-shadow: 0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(191,0,255,0.2);
    transition: transform 0.2s, box-shadow 0.2s;
    background-size: 200% 100%;
    outline: none;
    margin-top: 8px;
  }
  .ct-submit-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(191,0,255,0.3);
  }

  .ct-success {
    background: rgba(0,255,136,0.08);
    border: 1px solid rgba(0,255,136,0.3);
    border-radius: 12px;
    padding: 14px 20px;
    margin-bottom: 20px;
    color: #00ff88;
    font-family: 'Rajdhani', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ).then(
      (result) => {
        console.log("Message Sent!", result.text);
        setSent(true);
        setTimeout(() => setSent(false), 3500);
      },
      (error) => { console.error("Error:", error.text); }
    );
    e.target.reset();
  };

  return (
    <>
      <style>{css}</style>
      <div className="page-enter section">

        {/* ── Title ── */}
        <div className="section-title-wrap reveal">
          <p
            className="section-eyebrow"
            style={{ color: "#ffd700", textShadow: "0 0 10px #ffd70088" }}
          >
            Get In Touch
          </p>
          <h2 className="section-title">Contact Me</h2>
          <div
            className="section-line"
            style={{
              background: "linear-gradient(90deg, #ffd700, #ff00c8)",
              boxShadow: "0 0 12px #ffd70088",
            }}
          />
          <p className="section-desc">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="contact-wrapper">

          {/* ── Info Cards ── */}
          <div className="ct-cards-grid reveal">
            {contactCards.map((c) => (
              <div
                key={c.label}
                className="ct-card"
                style={{
                  "--cc": c.color,
                  "--cc-faint": `${c.color}18`,
                  "--cc-border": `${c.color}50`,
                  "--cc-bg": `${c.color}14`,
                  "--cc-hover-bg": `${c.color}22`,
                  "--cc-shadow": `${c.color}33`,
                }}
              >
                <div className="ct-icon-box">
                  <span style={{
                    color: c.color,
                    textShadow: `0 0 12px ${c.color}`,
                    fontSize: 24,
                    lineHeight: 1,
                  }}>
                    {c.icon}
                  </span>
                </div>
                <div className="ct-label">{c.label}</div>
                <div className="ct-value">{c.value}</div>
                {c.link && (
                  <button
                    className="ct-btn"
                    onClick={() => window.open(c.link, "_blank")}
                  >
                    {c.btnText}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ── Form ── */}
          <div className="ct-form-wrap reveal">
            <div className="ct-form-title">Send a Message</div>

            {sent && (
              <div className="ct-success">
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="ct-form-row">
                <div className="ct-form-group">
                  <label className="ct-form-label">Name</label>
                  <input className="ct-input" type="text" name="name" required />
                </div>
                <div className="ct-form-group">
                  <label className="ct-form-label">Email</label>
                  <input className="ct-input" type="email" name="email" required />
                </div>
              </div>

              <div className="ct-form-group">
                <label className="ct-form-label">Subject</label>
                <input className="ct-input" type="text" name="subject" required />
              </div>

              <div className="ct-form-group">
                <label className="ct-form-label">Message</label>
                <textarea className="ct-textarea" name="message" required />
              </div>

              <button type="submit" className="ct-submit-btn">
                ✦ Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
