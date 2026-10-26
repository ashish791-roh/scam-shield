import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Link2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
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

function Scan() {
  const [selectedType, setSelectedType] = useState<ScanType>("message");
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAnalyzing) return;

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
    setCurrentStep(0);
    setIsAnalyzing(true);

    window.setTimeout(() => {
      setIsAnalyzing(false);
    }, 4000);
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