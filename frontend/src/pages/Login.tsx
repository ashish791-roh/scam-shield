
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      await login(email, password);
      navigate("/scan", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card auth-card-redesign">
      <div className="auth-brand-mark">
        <div className="auth-brand-icon">
          <ShieldCheck size={25} strokeWidth={2.2} />
        </div>
        <span>SCAM<span>SHIELD</span></span>
      </div>

      <div className="auth-card-heading auth-heading-redesign">
        <div className="auth-eyebrow">
          <Sparkles size={13} />
          YOUR DIGITAL SAFETY STARTS HERE
        </div>

        <h1>Welcome <span>back.</span></h1>

        <p>
          Sign in to your account and take control of your
          digital safety. A smarter way to stay one step ahead.
        </p>
      </div>

      {error && (
        <div className="auth-error" role="alert">
          <ShieldCheck size={17} />
          <span>{error}</span>
        </div>
      )}

      <form className="auth-form auth-form-redesign" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email address</label>

          <div className="input-wrapper auth-input-redesign">
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
              onClick={() =>
                setError("Password recovery will be available soon.")
              }
            >
              Forgot password?
            </button>
          </div>

          <div className="input-wrapper auth-input-redesign">
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

        <button
          className="auth-submit auth-submit-redesign"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="auth-spinner" />
              Signing in...
            </>
          ) : (
            <>
              Sign in to your account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="auth-divider auth-divider-redesign">
        <span>SECURE ACCESS</span>
      </div>

      <p className="auth-switch auth-switch-redesign">
        Don't have an account?{" "}
        <Link to="/register">Create one <ArrowRight size={14} /></Link>
      </p>

      <div className="auth-security-note auth-security-redesign">
        <ShieldCheck size={17} />
        <span>
          <strong>Your safety matters.</strong>
          Your account is protected by secure authentication.
        </span>
      </div>
    </section>
  );
}
