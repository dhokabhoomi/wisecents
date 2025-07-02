import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../UI/Button";
import "./Navbar.css";

const Navbar = React.memo(({ darkMode, onToggleDark }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="logo">
        <i className="bi bi-wallet2"></i>
        <span>WiseCents</span>
      </div>

      <nav className={`nav-links ${isMobile && menuOpen ? "open" : ""}`}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/budgeting"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Budgeting
        </NavLink>
      </nav>

      <div className="navbar-actions">
        <Button
          onClick={onToggleDark}
          variant="text"
          className="theme-toggle"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}></i>
        </Button>
        {isMobile && (
          <button
            className="mobile-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        )}
      </div>
    </header>
  );
});

export default Navbar;
