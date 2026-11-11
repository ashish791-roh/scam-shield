
import { useState, type FormEvent } from "react";
import {
  ShieldAlert,
  Send,
  AlertTriangle,
  Eye,
} from "lucide-react";

import {
  submissionAPI,
  type ScamReportType,
} from "../services/api";

export default function Reports() {
  const [form, setForm] = useState({
    type: "message" as ScamReportType,
    suspiciousContent: "",
    description: "",
    reporterName: "",
    reporterEmail: "",
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
      const response = await submissionAPI.report({
        ...form,
        reporterName: form.reporterName.trim() || undefined,
        reporterEmail: form.reporterEmail.trim() || undefined,
      });

      setStatus({
        type: "success",
        message: response.message,
      });

      setForm({
        type: "message",
        suspiciousContent: "",
        description: "",
        reporterName: "",
        reporterEmail: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your report. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="public-page reports-page">
      <section className="public-hero">
        <span className="public-eyebrow">
          <ShieldAlert size={15} /> COMMUNITY PROTECTION
        </span>

        <h1>
          Help us stop <span>online scams.</span>
        </h1>

        <p>
          Spotted a suspicious message, fake job, fraudulent website,
          or marketplace scam? Share the details with ScamShield.
        </p>
      </section>

      <section className="report-notice">
        <AlertTriangle size={21} />
        <div>
          <strong>Before submitting your report</strong>
          <p>
            Never include passwords, OTPs, bank details, payment
            card numbers, or other sensitive personal information.
            Redact private information from any content you share.
          </p>
        </div>
      </section>

      <section className="report-layout">
        <form className="public-form" onSubmit={handleSubmit}>
          <div className="public-form-heading">
            <h2>Report suspicious activity</h2>
            <p>Tell us what happened. Fields marked with * are required.</p>
          </div>

          <label>
            Scam category *
            <select
              value={form.type}
              onChange={(e) =>
                updateField("type", e.target.value)
              }
              required
            >
              <option value="message">Suspicious text message</option>
              <option value="url">Suspicious website or URL</option>
              <option value="email">Fraudulent email</option>
              <option value="phone">Suspicious phone call or number</option>
              <option value="job">Fake job or recruitment offer</option>
              <option value="marketplace">Marketplace fraud</option>
              <option value="other">Other scam</option>
            </select>
          </label>

          <label>
            Suspicious content *
            <textarea
              value={form.suspiciousContent}
              onChange={(e) =>
                updateField("suspiciousContent", e.target.value)
              }
              placeholder="Paste the suspicious message, URL, phone number, or offer..."
              minLength={3}
              maxLength={10000}
              rows={5}
              required
            />
            <span className="form-character-count">
              {form.suspiciousContent.length}/10000
            </span>
          </label>

          <label>
            What happened? *
            <textarea
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder="Describe why you believe this is a scam..."
              minLength={10}
              maxLength={2000}
              rows={5}
              required
            />
            <span className="form-character-count">
              {form.description.length}/2000
            </span>
          </label>

          <div className="public-form-divider">
            Optional contact details
          </div>

          <div className="public-form-grid">
            <label>
              Your name
              <input
                type="text"
                value={form.reporterName}
                onChange={(e) =>
                  updateField("reporterName", e.target.value)
                }
                placeholder="Your name"
                minLength={2}
                maxLength={60}
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={form.reporterEmail}
                onChange={(e) =>
                  updateField("reporterEmail", e.target.value)
                }
                placeholder="you@example.com"
                maxLength={254}
              />
            </label>
          </div>

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
            {loading ? "Submitting report..." : "Submit scam report"}
            <Send size={17} />
          </button>

          <p className="public-form-note">
            Submitting a report does not automatically notify law
            enforcement or guarantee that the reported content will
            be investigated.
          </p>
        </form>

        <aside className="report-side-info">
          <div className="public-info-icon warning-icon">
            <Eye size={25} />
          </div>

          <h2>Every report helps.</h2>

          <p>
            Reports help build awareness of suspicious activity
            and can support future improvements to ScamShield.
          </p>

          <div className="report-step">
            <span>01</span>
            <div>
              <strong>Share the details</strong>
              <p>Describe the suspicious content clearly.</p>
            </div>
          </div>

          <div className="report-step">
            <span>02</span>
            <div>
              <strong>We store your submission</strong>
              <p>Your report is saved in our reporting database.</p>
            </div>
          </div>

          <div className="report-step">
            <span>03</span>
            <div>
              <strong>Help improve awareness</strong>
              <p>Reports can inform future safety improvements.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
