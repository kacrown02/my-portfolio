import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: "/about",
    label: "About",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    to: "/portfolio",
    label: "Portfolio",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pillTop, setPillTop] = useState(0);
  const [pillReady, setPillReady] = useState(false);
  const navRefs = useRef([]);

  /* ── Move floating pill to active nav item ── */
  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => {
      if (item.to === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.to);
    });

    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const el = navRefs.current[activeIndex];
      const navEl = el.closest("nav");
      if (navEl) {
        const navTop = navEl.getBoundingClientRect().top;
        const btnTop = el.getBoundingClientRect().top;
        setPillTop(btnTop - navTop);
        setPillReady(true);
      }
    }
  }, [location.pathname]);

  return (
    <>
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          C<span className="sidebar-dot">.</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav" style={{ position: "relative" }}>

          {/* Floating pill indicator */}
          {pillReady && (
            <div
              className="sidebar-pill"
              style={{ top: pillTop }}
            />
          )}

          {navItems.map((item, i) => (
            <div
              key={item.to}
              className="sidebar-btn-wrap"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ position: "relative" }}
            >
              <NavLink
                to={item.to}
                end={item.to === "/"}
                ref={(el) => (navRefs.current[i] = el)}
                className={({ isActive }) =>
                  "sidebar-btn" + (isActive ? " active" : "")
                }
              >
                {item.icon}

                {/* Active glow pulse ring */}
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    isActive ? "sidebar-pulse-ring" : ""
                  }
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                />
              </NavLink>

              {/* Tooltip */}
              <div
                className="sidebar-tooltip"
                style={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  transform: hoveredIndex === i
                    ? "translateX(0) translateY(-50%)"
                    : "translateX(-6px) translateY(-50%)",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <style>{`
        /* ── Floating pill indicator ── */
        .sidebar-pill {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(0, 217, 255, 0.12);
          border: 1px solid rgba(0, 217, 255, 0.35);
          box-shadow: 0 0 16px rgba(0, 217, 255, 0.2);
          transition: top 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Nav button wrapper ── */
        .sidebar-btn-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Nav button: hover scale ── */
        .sidebar-btn {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.4);
          transition:
            color 0.25s ease,
            transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.25s ease;
          text-decoration: none;
        }
        .sidebar-btn:hover {
          color: #ffffff;
          transform: scale(1.18);
          background: rgba(255, 255, 255, 0.06);
        }
        .sidebar-btn.active {
          color: #00D9FF;
        }

        /* ── Active glow pulse ring ── */
        .sidebar-btn.active::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 14px;
          border: 1.5px solid rgba(0, 217, 255, 0.5);
          animation: sidebarPulse 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes sidebarPulse {
          0%   { opacity: 0.8; transform: scale(1); }
          50%  { opacity: 0.2; transform: scale(1.18); }
          100% { opacity: 0.8; transform: scale(1); }
        }

        /* ── Tooltip ── */
        .sidebar-tooltip {
          position: absolute;
          left: calc(100% + 14px);
          top: 50%;
          background: rgba(10, 10, 20, 0.92);
          border: 1px solid rgba(0, 217, 255, 0.3);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
          box-shadow: 0 0 12px rgba(0, 217, 255, 0.15);
          z-index: 100;
        }
        /* Tooltip arrow */
        .sidebar-tooltip::before {
          content: "";
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </>
  );
}
