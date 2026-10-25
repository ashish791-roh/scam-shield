import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <div className="brand-icon">
                <ShieldCheck size={22} strokeWidth={2.4} />
              </div>

              <div className="brand-text">
                <span className="brand-name">ScamShield</span>
                <span className="brand-tagline">
                  Stay one step ahead
                </span>
              </div>
            </Link>

            <p>
              Understand suspicious messages, links and offers before
              they put your money, identity or accounts at risk.
            </p>
          </div>

          <div className="footer-column">
            <h3>Product</h3>

            <Link to="/how-it-works">How it works</Link>
            <Link to="/safety">Safety Center</Link>
            <Link to="/scan">Scanner</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>

            <Link to="/safety">Scam guides</Link>
            <Link to="/reports">Report a scam</Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} ScamShield. Built for safer
            digital interactions.
          </span>

          <div className="footer-status">
            <span className="status-dot" />
            <span>Protection system online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
