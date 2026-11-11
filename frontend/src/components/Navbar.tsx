import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    closeMobile();
    window.location.replace("/");
  };

  const showLogout = !loading && !!user;

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={closeMobile} aria-label="ScamShield home">
          <div className="brand-icon">
            <ShieldCheck size={23} strokeWidth={2.4} />
          </div>

          <div className="brand-text">
            <span className="brand-name">ScamShield</span>
            <span className="brand-tagline">Stay one step ahead</span>
          </div>
        </Link>

        <nav
          id="main-navigation"
          className={`nav-links ${mobileOpen ? "mobile-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/how-it-works" className={navClass} onClick={closeMobile}>
            How it works
          </NavLink>

          <NavLink to="/safety" className={navClass} onClick={closeMobile}>
            Safety
          </NavLink>

          <NavLink to="/about" className={navClass} onClick={closeMobile}>
            About
          </NavLink>

          <div className="mobile-nav-actions">
            {showLogout ? (
              <button type="button" className="nav-login" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <Link to="/login" className="nav-login" onClick={closeMobile}>
                Log in
              </Link>
            )}

            <Link to="/scan" className="btn btn-primary" onClick={closeMobile}>
              Check something
              <ArrowRight size={17} />
            </Link>
          </div>
        </nav>

        <div className="desktop-actions">
          {showLogout ? (
            <button type="button" className="nav-login" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <Link to="/login" className="nav-login">
              Log in
            </Link>
          )}

          <Link to="/scan" className="btn btn-primary">
            Check something
            <ArrowRight size={17} />
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="main-navigation"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
