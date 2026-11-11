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
  ArrowRight,
  RotateCcw,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { scanAPI } from "../services/api";

import type {
  ScanType,
  ScanAnalysis,
} from "../services/api";

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
    title: "Website link",
    description: "Check a suspicious URL",
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
    title: "Phone number",
    description: "Check an unknown caller",
    icon: Phone,
  },
  {
    id: "job",
    title: "Job offer",
    description: "Verify an opportunity",
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
  "Reading submitted content",
  "Checking suspicious patterns",
  "Evaluating potential threat signals",
  "Preparing your risk assessment",
];

const scamExample =
  "Congratulations! You have been selected for a ₹25,000 reward. Claim your reward immediately by clicking the link below. You must verify your account within 30 minutes or your reward will expire. Do not share this offer with anyone.";

function Scan() {
  const { token } = useAuth();

  const [selectedType, setSelectedType] =
    useState<ScanType>("message");

  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<ScanAnalysis | null>(null);

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = window.setInterval(() => {
      setCurrentStep((previous) => {
        if (previous >= analysisSteps.length - 1) {
          return previous;
        }

        return previous + 1;
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, [isAnalyzing]);

  const handleTypeChange = (type: ScanType) => {
    if (isAnalyzing) return;

    setSelectedType(type);
    setInput("");
    setError("");
    setAnalysisResult(null);
    setCurrentStep(0);
  };

  const handleAnalyze = async () => {
    const content = input.trim();

    if (!content) {
      setError("Please enter something to analyze first.");
      return;
    }

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    if (content.length < 3) {
      setError("Please enter at least 3 characters.");
      return;
    }

    if (content.length > 10000) {
      setError("Content cannot exceed 10,000 characters.");
      return;
    }

    setError("");
    setAnalysisResult(null);
    setCurrentStep(0);
    setIsAnalyzing(true);

    try {
      const response = await scanAPI.analyze(
        selectedType,
        content,
        token
      );

      setCurrentStep(analysisSteps.length);
      setAnalysisResult(response.analysis);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing your submission."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTryExample = () => {
    if (isAnalyzing) return;

    setSelectedType("message");
    setInput(scamExample);
    setError("");
    setAnalysisResult(null);
    setCurrentStep(0);
  };

  const handleScanAgain = () => {
    setAnalysisResult(null);
    setError("");
    setCurrentStep(0);
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
        return "Suspicious website link";
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
        return "Paste the message exactly as you received it. Keep suspicious wording unchanged.";
    }
  };

  const riskScoreWidth = analysisResult
    ? Math.min(100, Math.max(0, analysisResult.riskScore))
    : 0;

  return (
    <main className="scan-page scan-page-refresh">
      {/* Scanner hero */}
      <section className="scan-hero scan-hero-refresh">
        <div className="scan-hero-copy">
          <div className="scan-hero-kicker">
            <span className="scan-hero-kicker-icon">
              <Sparkles size={14} />
            </span>
            YOUR PERSONAL SCAM CHECKER
          </div>

          <h1>
            Pause.
            <span> Check.</span>
            <br />
            Then trust.
          </h1>

          <p className="scan-hero-description">
            Something feel suspicious? Put it to the test.
            Check messages, links, emails and offers for
            common scam warning signs before you take action.
          </p>

          <div className="scan-hero-points">
            <span>
              <ShieldCheck size={16} />
              Explainable results
            </span>
            <span>
              <LockKeyhole size={16} />
              Privacy-conscious
            </span>
          </div>
        </div>

        <div className="scan-hero-visual" aria-hidden="true">
          <div className="scan-orbit scan-orbit-one" />
          <div className="scan-orbit scan-orbit-two" />

          <div className="scan-hero-shield">
            <div className="scan-hero-shield-glow" />
            <ShieldCheck size={68} strokeWidth={1.35} />
          </div>

          <div className="scan-floating-chip scan-floating-chip-top">
            <span className="scan-chip-dot scan-chip-dot-cyan" />
            Signal detection
          </div>

          <div className="scan-floating-chip scan-floating-chip-bottom">
            <span className="scan-chip-dot scan-chip-dot-violet" />
            Stay one step ahead
          </div>
        </div>
      </section>

      {/* Main scanner */}
      <section className="scanner-card scan-workspace">
        <div className="scan-workspace-heading">
          <div>
            <div className="scan-section-kicker">
              <span>01</span>
              START A NEW CHECK
            </div>

            <h2>What would you like to check?</h2>

            <p>
              Choose the type of content you received.
            </p>
          </div>

          <div className="scanner-security-badge">
            <ShieldCheck size={16} />
            Privacy focused
          </div>
        </div>

        {/* Scan categories */}
        <div className="scan-options scan-options-refresh">
          {scanOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedType === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`scan-option scan-option-refresh ${
                  isSelected ? "active" : ""
                }`}
                onClick={() => handleTypeChange(option.id)}
                disabled={isAnalyzing}
                aria-pressed={isSelected}
              >
                <span className="scan-option-icon">
                  <Icon size={21} />
                </span>

                <span className="scan-option-content">
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>

                {isSelected && (
                  <span className="scan-option-selected">
                    <CheckCircle2 size={17} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="scanner-divider" />

        {/* Results */}
        {analysisResult && !isAnalyzing ? (
          <div className="scan-results scan-results-refresh">
            <div className="scan-results-header scan-results-header-refresh">
              <div>
                <div className="scan-section-kicker">
                  <span>02</span>
                  ANALYSIS COMPLETE
                </div>

                <h2>Your safety report</h2>

                <p>{analysisResult.verdict}</p>
              </div>

              <span
                className={`risk-badge risk-${analysisResult.riskLevel}`}
              >
                <span className="risk-badge-dot" />
                {analysisResult.riskLevel.toUpperCase()} RISK
              </span>
            </div>

            {/* Risk score */}
            <div className="risk-score-card risk-score-card-refresh">
              <div className="risk-score-topline">
                <div>
                  <span className="risk-score-label">
                    Overall risk score
                  </span>

                  <p>
                    Based on the warning signals identified in
                    your submission.
                  </p>
                </div>

                <div className="risk-score risk-score-refresh">
                  {analysisResult.riskScore}
                  <small>/100</small>
                </div>
              </div>

              <div
                className="risk-score-track risk-score-track-refresh"
                role="progressbar"
                aria-label="Risk score"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={riskScoreWidth}
              >
                <div
                  className={`risk-score-fill risk-fill-${analysisResult.riskLevel}`}
                  style={{ width: `${riskScoreWidth}%` }}
                />
              </div>

              <div className="risk-score-scale">
                <span>Lower risk</span>
                <span>Higher risk</span>
              </div>
            </div>

            {/* Warning signals */}
            <div className="result-section result-section-refresh">
              <div className="result-section-heading">
                <div className="result-section-icon result-icon-warning">
                  <AlertTriangle size={19} />
                </div>

                <div>
                  <h3>Warning signals</h3>
                  <p>
                    {analysisResult.signals.length} signal
                    {analysisResult.signals.length === 1 ? "" : "s"}{" "}
                    identified
                  </p>
                </div>
              </div>

              {analysisResult.signals.length > 0 ? (
                <div className="result-signals result-signals-refresh">
                  {analysisResult.signals.map((signal) => (
                    <div
                      className="result-signal result-signal-refresh"
                      key={signal.id}
                    >
                      <div className="result-signal-heading">
                        <strong>{signal.title}</strong>

                        <span
                          className={`signal-severity severity-${signal.severity}`}
                        >
                          {signal.severity}
                        </span>
                      </div>

                      <p>{signal.description}</p>

                      <small>
                        {signal.points} risk points
                      </small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="result-empty result-empty-refresh">
                  <CheckCircle2 size={20} />
                  <p>
                    No warning signals were detected by the
                    current analysis rules.
                  </p>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="result-section result-section-refresh">
              <div className="result-section-heading">
                <div className="result-section-icon result-icon-safe">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h3>Recommended next steps</h3>
                  <p>Practical ways to protect yourself</p>
                </div>
              </div>

              <ul className="result-list result-list-refresh">
                {analysisResult.recommendations.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            {/* Limitations */}
            <div className="result-section result-section-refresh result-limitations">
              <div className="result-section-heading">
                <div className="result-section-icon result-icon-neutral">
                  <FileText size={19} />
                </div>

                <div>
                  <h3>Important limitations</h3>
                  <p>Keep these points in mind</p>
                </div>
              </div>

              <ul className="result-list result-list-refresh">
                {analysisResult.limitations.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="result-footer">
              <p className="result-timestamp">
                <Timer size={15} />
                Analyzed:{" "}
                {new Date(
                  analysisResult.analyzedAt
                ).toLocaleString()}
              </p>

              <button
                type="button"
                className="analyze-button scan-again-button scan-again-refresh"
                onClick={handleScanAgain}
              >
                <RotateCcw size={17} />
                Check something else
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : isAnalyzing ? (
          /* Loading state */
          <div className="analysis-loading analysis-loading-refresh">
            <div className="loading-shield loading-shield-refresh">
              <div className="loading-shield-ring" />
              <Loader2 size={34} className="spin" />
            </div>

            <div className="scan-loading-kicker">
              <span className="scan-loading-dot" />
              SCAN IN PROGRESS
            </div>

            <h3>Looking beyond the message.</h3>

            <p>
              We're evaluating your submission for common
              scam indicators. This may take a moment.
            </p>

            <div className="analysis-steps analysis-steps-refresh">
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
                        <Loader2
                          size={18}
                          className="spin"
                        />
                      ) : (
                        <span className="step-dot" />
                      )}
                    </span>

                    <span>{step}</span>

                    {completed && (
                      <small>Complete</small>
                    )}
                    {current && (
                      <small>In progress</small>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="scan-loading-note">
              <LockKeyhole size={14} />
              Please keep this page open while your scan runs.
            </p>
          </div>
        ) : (
          /* Input form */
          <div className="scanner-input-section scanner-input-section-refresh">
            <div className="scanner-input-heading scanner-input-heading-refresh">
              <div>
                <div className="scan-section-kicker">
                  <span>02</span>
                  ADD YOUR CONTENT
                </div>

                <label htmlFor="scan-input">
                  {getInputTitle()}
                </label>

                <p>{getInputDescription()}</p>
              </div>

              <div className="scan-input-file-icon">
                <FileText size={22} />
              </div>
            </div>

            {selectedType === "phone" ||
            selectedType === "url" ? (
              <input
                id="scan-input"
                type={selectedType === "url" ? "url" : "tel"}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  if (error) setError("");
                }}
                placeholder={getPlaceholder()}
                className="scanner-input scanner-input-refresh"
                maxLength={10000}
                disabled={isAnalyzing}
                autoComplete="off"
              />
            ) : (
              <textarea
                id="scan-input"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  if (error) setError("")
                }}
                placeholder={getPlaceholder()}
                className="scanner-textarea scanner-textarea-refresh"
                rows={8}
                maxLength={10000}
                disabled={isAnalyzing}
              />
            )}

            <div className="scan-input-meta">
              <span>
                <LockKeyhole size={14} />
                Avoid including passwords, OTPs or PINs.
              </span>

              <small>{input.length.toLocaleString()} / 10,000</small>
            </div>

            {error && (
              <div
                className="scanner-error scanner-error-refresh"
                role="alert"
              >
                <AlertTriangle size={17} />
                {error}
              </div>
            )}

            <div className="scanner-action-row scanner-action-row-refresh">
              <button
                type="button"
                className="example-button example-button-refresh"
                onClick={handleTryExample}
                disabled={isAnalyzing}
              >
                <Sparkles size={16} />
                Try an example
              </button>

              <button
                type="button"
                className="analyze-button analyze-button-refresh"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim()}
              >
                <Search size={18} />
                Analyze for threats
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Threat signals */}
      <section className="checks-section checks-section-refresh">
        <div className="section-heading checks-heading-refresh">
          <div>
            <div className="scan-section-kicker">
              <span>03</span>
              BEHIND THE CHECK
            </div>

            <h2>Small details can reveal big red flags.</h2>
          </div>

          <p>
            We look for multiple warning signs rather than
            relying on a single keyword or phrase.
          </p>
        </div>

        <div className="checks-grid checks-grid-refresh">
          <div className="check-card check-card-refresh">
            <div className="check-card-icon">
              <Timer size={21} />
            </div>

            <h3>Urgency & pressure</h3>

            <p>
              Detects language designed to make you act
              quickly without thinking.
            </p>

            <span>“Act now” · “Limited time”</span>
          </div>

          <div className="check-card check-card-refresh">
            <div className="check-card-icon">
              <Banknote size={21} />
            </div>

            <h3>Payment requests</h3>

            <p>
              Looks for unexpected requests for fees,
              transfers, UPI payments or gift cards.
            </p>

            <span>UPI · Fees · Transfers</span>
          </div>

          <div className="check-card check-card-refresh">
            <div className="check-card-icon">
              <KeyRound size={21} />
            </div>

            <h3>Sensitive information</h3>

            <p>
              Identifies requests for OTPs, passwords,
              PINs or financial information.
            </p>

            <span>OTP · PIN · Passwords</span>
          </div>

          <div className="check-card check-card-refresh">
            <div className="check-card-icon">
              <Link2 size={21} />
            </div>

            <h3>Suspicious links</h3>

            <p>
              Looks for suspicious patterns, unusual
              domains and potential impersonation.
            </p>

            <span>Domains · Links · Redirects</span>
          </div>
        </div>
      </section>

      {/* Analysis explanation */}
      <section className="analysis-info-section analysis-info-refresh">
        <div className="analysis-info-header">
          <div className="analysis-info-icon">
            <ShieldAlert size={22} />
          </div>

          <div>
            <div className="scan-section-kicker">
              TRANSPARENT BY DESIGN
            </div>

            <h2>We don't just say “scam”.</h2>

            <p>
              ScamShield is designed to explain the signals
              behind a risk assessment so you can make a
              more informed decision.
            </p>
          </div>
        </div>

        <div className="analysis-flow analysis-flow-refresh">
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
      <section className="scan-safety-note scan-safety-note-refresh">
        <div className="scan-safety-icon">
          <AlertTriangle size={20} />
        </div>

        <div>
          <strong>
            Your OTP is yours. Your PIN is yours. Keep them that way.
          </strong>

          <p>
            Never share passwords, OTPs or banking PINs with
            anyone asking unexpectedly. ScamShield can help
            identify suspicious signals, but no automated
            analysis can guarantee that content is safe.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Scan;