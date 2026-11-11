
import { useState, type FormEvent } from "react";
import { Mail, MessageSquare, ShieldCheck, Send } from "lucide-react";
import { submissionAPI } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await submissionAPI.contact(form);

      setStatus({
        type: "success",
        message: response.message,
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="public-page contact-page">
      <section className="public-hero">
        <span className="public-eyebrow">
          <MessageSquare size={15} /> WE'RE HERE TO HELP
        </span>

        <h1>
          Let's start a <span>conversation.</span>
        </h1>

        <p>
          Have a question, suggestion, or feedback about ScamShield?
          Send us a message and we'll receive it securely.
        </p>
      </section>

      <section className="contact-layout">
        <aside className="contact-info">
          <div className="public-info-icon">
            <ShieldCheck size={25} />
          </div>

          <h2>Your voice matters.</h2>

          <p>
            ScamShield is built to make the internet safer.
            Your feedback helps us improve the experience.
          </p>

          <div className="contact-info-item">
            <Mail size={19} />
            <div>
              <strong>Contact support</strong>
              <span>Send us a message using this form.</span>
            </div>
          </div>

          <div className="contact-info-item">
            <ShieldCheck size={19} />
            <div>
              <strong>Privacy matters</strong>
              <span>Your message is handled as a private submission.</span>
            </div>
          </div>
        </aside>

        <form className="public-form" onSubmit={handleSubmit}>
          <div className="public-form-heading">
            <h2>Send us a message</h2>
            <p>Fields marked with * are required.</p>
          </div>

          <div className="public-form-grid">
            <label>
              Full name *
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your name"
                minLength={2}
                maxLength={60}
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            Subject *
            <input
              type="text"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="What would you like to discuss?"
              minLength={3}
              maxLength={100}
              required
            />
          </label>

          <label>
            Your message *
            <textarea
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Tell us how we can help..."
              minLength={10}
              maxLength={3000}
              rows={6}
              required
            />
            <span className="form-character-count">
              {form.message.length}/3000
            </span>
          </label>

          {status && (
            <div
              className={`form-feedback ${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <button
            className="public-submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send message"}
            <Send size={17} />
          </button>

          <p className="public-form-note">
            Please don't include passwords, verification codes,
            or sensitive financial information.
          </p>
        </form>
      </section>
    </main>
  );
}
