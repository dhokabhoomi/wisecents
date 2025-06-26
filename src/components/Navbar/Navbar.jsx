import React from "react";
import Button from "../UI/Button";
import "./Navbar.css";

// function Navbar({ currentView, setView, darkMode, onToggleDark }) {
const Navbar = React.memo(({ darkMode, onToggleDark }) => {
  return (
    <header className="navbar">
      <div className="logo">
        <i className="bi bi-wallet2"></i>
        <span>WiseCents</span>
      </div>
      <Button
        onClick={onToggleDark}
        variant="secondary"
        size="sm"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </header>
  );
});

export default Navbar;
