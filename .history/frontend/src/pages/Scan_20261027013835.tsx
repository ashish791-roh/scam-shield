
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  KeyRound,
  Link2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Timer,
} from "lucide-react";

type ScanType =
  | "message"
  | "url"
  | "email"
  | "phone"
  | "job"
  | "marketplace";

type ScanOption = {
  id: ScanType;
  title: string;
  description: string;
  icon: typeof MessageSquare;
};

const scanOptions: ScanOption[] = [
  {
    id: "message",
    title: "Message",
    description: "WhatsApp, SMS or chat",
    icon: MessageSquare,
  },
  {
    id: "url",
    title: "URL",
    description: "Check a suspicious link",
    icon: Link2,
  },
  {
    id: "email",
    title: "Email",
    description: "Analyze an email",
    icon: Mail,
  },
  {
    id: "phone",
    title: "Phone",
    description: "Check a phone number",
    icon: Phone,
  },
  {
    id: "job",
    title: "Job Offer",
    description: "Verify a job opportunity",
    icon: BriefcaseBusiness,
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Check a seller or listing",
    icon: ShoppingBag,
  },
];

const analysisSteps = [
  "Analyzing submitted content",
  "Checking suspicious patterns",
  "Evaluating threat signals",
  "Calculating risk score",
];

const scamExample =
  "Congratulations! You have been selected for a ₹25,000 reward. Claim your reward immediately by clicking the link below. You must verify your account within 30 minutes or your reward will expire. Do not share this offer with anyone.";

function Scan() {
  const [selectedType, setSelectedType] = useState<ScanType>("message");
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAnalyzing) return;

    setCurrentStep(0);

    const interval = window.setInterval(() => {
      setCurrentStep((previous) => {
        if (previous >= analysisSteps.length - 1) {
          window.clearInterval(interval);
          return previous;
        }

        return previous + 1;
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, [isAnalyzing]);

  const handleTypeChange = (type: ScanType) => {
    setSelectedType(type);
    setInput("");
    setError("");
    setIsAnalyzing(false);
  };

  const handleAnalyze = () => {
    if (!input.trim()) {
      setError("Please enter something to analyze first.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    window.setTimeout(() => {
      setIsAnalyzing(false);
    }, 4000);
  };

  const handleTryExample = () => {
    setSelectedType("message");
    setInput(scamExample);
    setError("");
    setIsAnalyzing(false);
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case "url":
        return "https://example.com/suspicious-link";

      case "email":
        return "Paste the email content, sender details, or suspicious email text here...";

      case "phone":
        return "+91 98765 43210";

      case "job":
        return "Paste the job offer, recruiter message, salary details, payment request, or other information here...";

      case "marketplace":
        return "Paste the marketplace listing, seller message, payment request, or product details here...";

      default:
        return "Paste the suspicious message here...\n\nExample: Congratulations! You have won ₹50,000. Click this link immediately to claim your reward.";
    }
  };

  const getInputTitle = () => {
    switch (selectedType) {
      case "url":
        return "Suspicious URL";

      case "phone":
        return "Phone number";

      case "email":
        return "Email content";

      case "job":
        return "Job offer details";

      case "marketplace":
        return "Listing or seller details";

      default:
        return "Suspicious message";
    }
  };

  const getInputDescription = () => {
    switch (selectedType) {
      case "url":
        return "Paste the complete link you want ScamShield to check.";

      case "phone":
        return "Enter the phone number that contacted you.";

      case "email":
        return "Paste the suspicious email content or relevant details.";

      case "job":
        return "Include the recruiter message, payment request, salary promise or other details.";

      case "marketplace":
        return "Include the listing, seller conversation or payment instructions.";

      default:
        return "Paste the message exactly as you received it. Don't edit suspicious wording.";
    }
  };

  return (
    <main className="scan-page">
      {/* Hero */}
      <section className="scan-hero">
        <div className="scan-hero-icon">
          <ShieldCheck size={28} />
        </div>

        <div>
          <p className="eyebrow">SCAM ANALYZER</p>

          <h1>Check before you trust it.</h1>

          <p className="scan-hero-description">
            Submit a suspicious message, link, phone number or offer and
            ScamShield will look for common scam signals.
          </p>
        </div>
      </section>

      {/* Scanner */}
      <section className="scanner-card">
        <div className="scanner-card-header">
          <div>
            <h2>What would you like to check?</h2>
            <p>Select the type of suspicious content.</p>
          </div>

          <div className="scanner-security-badge">
            <ShieldCheck size={16} />
            Privacy focused
          </div>
        </div>

        <div className="scan-options">
          {scanOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedType === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`scan-option ${isSelected ? "active" : ""}`}
                onClick={() => handleTypeChange(option.id)}
              >
                <span className="scan-option-icon">
                  <Icon size={20} />
                </span>

                <span className="scan-option-content">
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="scanner-divider" />

        {!isAnalyzing ? (
          <div className="scanner-input-section">
            <div className="scanner-input-heading">
              <div>
                <label htmlFor="scan-input">{getInputTitle()}</label>
                <p>{getInputDescription()}</p>
              </div>

              <FileText size={20} />
            </div>

            {selectedType === "phone" || selectedType === "url" ? (
              <input
                id="scan-input"
                type={selectedType === "url" ? "url" : "tel"}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={getPlaceholder()}
                className="scanner-input"
              />
            ) : (
              <textarea
                id="scan-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={getPlaceholder()}
                className="scanner-textarea"
                rows={9}
              />
            )}

            {error && (
              <div className="scanner-error">
                <AlertTriangle size={17} />
                {error}
              </div>
            )}

            <div className="scanner-action-row">
              <button
                type="button"
                className="example-button"
                onClick={handleTryExample}
              >
                <Search size={16} />
                Try an example
              </button>

              <span className="scanner-hint">
                <ShieldCheck size={16} />
                Your submission will be analyzed for scam indicators.
              </span>

              <button
                type="button"
                className="analyze-button"
                onClick={handleAnalyze}
              >
                <Search size={19} />
                Analyze for threats
              </button>
            </div>
          </div>
        ) : (
          <div className="analysis-loading">
            <div className="loading-shield">
              <Loader2 size={32} className="spin" />
            </div>

            <h3>Analyzing your submission...</h3>

            <p>
              ScamShield is checking multiple signals before calculating the
              risk level.
            </p>

            <div className="analysis-steps">
              {analysisSteps.map((step, index) => {
                const completed = index < currentStep;
                const current = index === currentStep;

                return (
                  <div
                    key={step}
                    className={`analysis-step ${
                      completed ? "completed" : ""
                    } ${current ? "current" : ""}`}
                  >
                    <span className="analysis-step-icon">
                      {completed ? (
                        <CheckCircle2 size={18} />
                      ) : current ? (
                        <Loader2 size={18} className="spin" />
                      ) : (
                        <span className="step-dot" />
                      )}
                    </span>

                    <span>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* What ScamShield checks */}
      <section className="checks-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THREAT SIGNALS</p>
            <h2>What ScamShield checks</h2>
          </div>

          <p>
            We look for multiple warning signs instead of relying on a single
            keyword.
          </p>
        </div>

        <div className="checks-grid">
          <div className="check-card">
            <div className="check-card-icon">
              <Timer size={21} />
            </div>

            <h3>Urgency & pressure</h3>

            <p>
              Detects language designed to make you act quickly without
              thinking.
            </p>

            <span>“Act now” · “Limited time”</span>
          </div>

          <div className="check-card">
            <div className="check-card-icon">
              <Banknote size={21} />
            </div>

            <h3>Payment requests</h3>

            <p>
              Looks for unexpected requests for fees, transfers, UPI payments
              or gift cards.
            </p>

            <span>UPI · Fees · Transfers</span>
          </div>

          <div className="check-card">
            <div className="check-card-icon">
              <KeyRound size={21} />
            </div>

            <h3>Sensitive information</h3>

            <p>
              Identifies requests for OTPs, passwords, PINs or financial
              information.
            </p>

            <span>OTP · PIN · Passwords</span>
          </div>

          <div className="check-card">
            <div className="check-card-icon">
              <Link2 size={21} />
            </div>

            <h3>Suspicious links</h3>

            <p>
              Checks links for suspicious patterns, unusual domains and
              potential impersonation.
            </p>

            <span>Domains · Links · Redirects</span>
          </div>
        </div>
      </section>

      {/* How analysis works */}
      <section className="analysis-info-section">
        <div className="analysis-info-header">
          <div className="analysis-info-icon">
            <ShieldAlert size={22} />
          </div>

          <div>
            <p className="eyebrow">EXPLAINABLE ANALYSIS</p>
            <h2>We don't just say “scam”.</h2>
            <p>
              ScamShield is designed to explain the signals behind a risk
              assessment so you can make a safer decision.
            </p>
          </div>
        </div>

        <div className="analysis-flow">
          <div className="flow-item">
            <span>01</span>
            <strong>Content</strong>
            <small>Understand what was submitted</small>
          </div>

          <div className="flow-line" />

          <div className="flow-item">
            <span>02</span>
            <strong>Patterns</strong>
            <small>Find suspicious language and behavior</small>
          </div>

          <div className="flow-line" />

          <div className="flow-item">
            <span>03</span>
            <strong>Signals</strong>
            <small>Combine multiple risk indicators</small>
          </div>

          <div className="flow-line" />

          <div className="flow-item">
            <span>04</span>
            <strong>Risk</strong>
            <small>Calculate and explain the result</small>
          </div>
        </div>
      </section>

      {/* Safety reminder */}
      <section className="scan-safety-note">
        <div className="scan-safety-icon">
          <AlertTriangle size={20} />
        </div>

        <div>
          <strong>Never share passwords, OTPs or banking PINs.</strong>

          <p>
            ScamShield helps identify suspicious signals, but you should never
            provide sensitive credentials to anyone asking unexpectedly.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Scan;
