import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    // Temporary frontend-only authentication.
    // This will be connected to the Node/Express backend later.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setLoading(false);
  };

  return (
    <section className="auth-card">
      <div className="auth-card-icon">
        <ShieldCheck size={25} />
      </div>

      <div className="auth-card-heading">
        <h1>Welcome back</h1>
        <p>Sign in to continue protecting yourself from digital scams.</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email address</label>

          <div className="input-wrapper">
            <Mail size={18} />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <div className="form-label-row">
            <label htmlFor="password">Password</label>

            <button
              type="button"
              className="forgot-password"
              onClick={() => setError("Password recovery will be available soon.")}
            >
              Forgot password?
            </button>
          </div>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="auth-spinner" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="auth-divider">
        <span>Secure access</span>
      </div>

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/register">Create one</Link>
      </p>

      <p className="auth-security-note">
        <ShieldCheck size={15} />
        Your security is our priority.
      </p>
    </section>
  );
}