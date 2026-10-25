import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={closeMobile}>
          <div className="brand-icon">
            <ShieldCheck size={23} strokeWidth={2.4} />
          </div>

          <div className="brand-text">
            <span className="brand-name">ScamShield</span>
            <span className="brand-tagline">Stay one step ahead</span>
          </div>
        </Link>

        <nav className={`nav-links ${mobileOpen ? "mobile-open" : ""}`}>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMobile}
          >
            How it works
          </NavLink>

          <NavLink
            to="/safety"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMobile}
          >
            Safety
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMobile}
          >
            About
          </NavLink>

          <div className="mobile-nav-actions">
            <Link to="/login" className="nav-login" onClick={closeMobile}>
              Log in
            </Link>

            <Link to="/scan" className="btn btn-primary" onClick={closeMobile}>
              Check something
              <ArrowRight size={17} />
            </Link>
          </div>
        </nav>

        <div className="desktop-actions">
          <Link to="/login" className="nav-login">
            Log in
          </Link>

          <Link to="/scan" className="btn btn-primary">
            Check something
            <ArrowRight size={17} />
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
