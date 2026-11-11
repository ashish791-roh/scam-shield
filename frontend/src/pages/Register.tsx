
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (name.length < 2) {
      setError("Please enter a valid name.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password);
      navigate("/scan", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card auth-card-register auth-card-redesign">
      <div className="auth-brand-mark">
        <div className="auth-brand-icon">
          <ShieldCheck size={25} strokeWidth={2.2} />
        </div>
        <span>SCAM<span>SHIELD</span></span>
      </div>

      <div className="auth-card-heading auth-heading-redesign">
        <div className="auth-eyebrow">
          <Sparkles size={13} />
          JOIN THE SAFER DIGITAL WORLD
        </div>

        <h1>Create your <span>account.</span></h1>

        <p>
          Start identifying suspicious messages, links and
          offers with a little more confidence.
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
          <label htmlFor="name">Full name</label>

          <div className="input-wrapper auth-input-redesign">
            <User size={18} />

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              minLength={2}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="register-email">Email address</label>

          <div className="input-wrapper auth-input-redesign">
            <Mail size={18} />

            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="register-password">Password</label>

          <div className="input-wrapper auth-input-redesign">
            <LockKeyhole size={18} />

            <input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
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

        <div className="form-field">
          <label htmlFor="confirm-password">Confirm password</label>

          <div className="input-wrapper auth-input-redesign">
            <LockKeyhole size={18} />

            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <label className="terms-checkbox auth-terms-redesign">
          <input type="checkbox" required />

          <span className="custom-checkbox">
            <Check size={13} />
          </span>

          <span>
            I agree to the ScamShield terms and understand
            that scan results are informational.
          </span>
        </label>

        <button
          className="auth-submit auth-submit-redesign"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="auth-spinner" />
              Creating account...
            </>
          ) : (
            <>
              Create my account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="auth-switch auth-switch-redesign">
        Already have an account?{" "}
        <Link to="/login">Sign in <ArrowRight size={14} /></Link>
      </p>

      <div className="auth-security-note auth-security-redesign">
        <ShieldCheck size={17} />
        <span>
          <strong>Privacy comes first.</strong>
          Built with privacy and safety in mind.
        </span>
      </div>
    </section>
  );
}
