import { ShieldCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-background-glow auth-background-glow-one" />
      <div className="auth-background-glow auth-background-glow-two" />

      <header className="auth-header">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon">
            <ShieldCheck size={24} strokeWidth={2.2} />
          </div>

          <div>
            <div className="auth-brand-name">ScamShield</div>
            <div className="auth-brand-tagline">STAY ONE STEP AHEAD</div>
          </div>
        </Link>

        <Link to="/" className="auth-back-link">
          Back to website
        </Link>
      </header>

      <main className="auth-main">
        <Outlet />
      </main>
    </div>
  );
}