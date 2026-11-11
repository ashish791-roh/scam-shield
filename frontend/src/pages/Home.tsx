
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  ShieldAlert,
  ShoppingBag,
  BriefcaseBusiness,
  ScanSearch,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const scanTypes = [
  {
    icon: MessageSquare,
    title: "Messages",
    description: "Check suspicious SMS, WhatsApp and social media messages.",
  },
  {
    icon: Link2,
    title: "URLs",
    description: "Inspect unfamiliar links before opening them.",
  },
  {
    icon: Mail,
    title: "Emails",
    description: "Recognize phishing attempts and email impersonation.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job offers",
    description: "Identify fake recruitment and suspicious payment requests.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description: "Evaluate questionable buying and selling offers.",
  },
  {
    icon: Phone,
    title: "Phone numbers",
    description: "Review suspicious numbers before responding.",
  },
];

const trustPoints = [
  "Understandable results",
  "Multiple risk indicators",
  "Practical safety guidance",
];

const processSteps = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Submit",
    description:
      "Paste the suspicious message, link, email or offer you want to check.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Analyze",
    description:
      "ScamShield examines the content for suspicious patterns and warning signs.",
  },
  {
    number: "03",
    icon: ShieldAlert,
    title: "Understand",
    description:
      "Review the risk level, explanations and recommended next steps.",
  },
];

const findings = [
  {
    icon: ShieldAlert,
    title: "Urgency pressure",
    description: "The message pressures you to act immediately.",
    score: "+20",
    type: "danger",
  },
  {
    icon: LockKeyhole,
    title: "Sensitive information",
    description: "It appears to request information that should remain private.",
    score: "+25",
    type: "warning",
  },
  {
    icon: Link2,
    title: "Suspicious link",
    description: "The included link may not belong to the claimed organization.",
    score: "+22",
    type: "danger",
  },
];

const Home = () => {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Your everyday digital safety companion
            </div>

            <h1>
              Before you trust it,
              <span> check it.</span>
            </h1>

            <p className="hero-description">
              Suspicious message? Unexpected payment request? A job offer
              that sounds too good to be true?

              ScamShield helps you identify warning signs and understand
              potential online threats before making a decision.
            </p>

            <div className="hero-actions">
              <Link to="/scan" className="btn btn-primary btn-large">
                Check something suspicious
                <ArrowRight size={19} />
              </Link>

              <Link to="/how-it-works" className="text-link">
                Discover how it works
                <ChevronRight size={17} />
              </Link>
            </div>

            <div className="hero-trust">
              {trustPoints.map((point) => (
                <div className="trust-item" key={point}>
                  <CheckCircle2 size={17} />
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* SCANNER PREVIEW */}
          <div className="hero-scanner-wrapper">
            <div className="scanner-card">
              <div className="scanner-card-header">
                <div>
                  <span className="scanner-label">SCAMSHIELD / QUICK CHECK</span>
                  <h2>What looks suspicious?</h2>
                </div>

                <div className="scanner-secure-icon">
                  <LockKeyhole size={19} />
                </div>
              </div>

              <div className="scanner-input">
                <div className="scanner-input-placeholder">
                  <ScanSearch size={20} />
                  <span>
                    Paste a suspicious message, URL or offer...
                  </span>
                </div>
              </div>

              <Link to="/scan" className="scanner-button">
                Analyze safely
                <ArrowRight size={17} />
              </Link>

              <div className="scanner-note">
                <ShieldAlert size={16} />
                Understand warning signs before taking action.
              </div>

              <div className="hero-preview-foot">
                <span className="hero-preview-pulse" />
                <span>Think before you click.</span>
                <span className="hero-preview-mark">SS / 01</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCAN CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-eyebrow">
              WHAT CAN YOU CHECK?
            </div>

            <h2>
              One place for suspicious
              <span> digital interactions.</span>
            </h2>

            <p>
              From suspicious messages to questionable job offers,
              get a clearer understanding of the risks you encounter online.
            </p>
          </div>

          <div className="scan-types-grid">
            {scanTypes.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  to="/scan"
                  className="scan-type-card"
                  key={item.title}
                  aria-label={`Check suspicious ${item.title.toLowerCase()}`}
                >
                  <div className="scan-type-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <span className="card-arrow">
                    Check now
                    <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-eyebrow">
              SIMPLE BY DESIGN
            </div>

            <h2>
              From suspicious to
              <span> understood.</span>
            </h2>

            <p>
              Staying safer online shouldn't require a cybersecurity
              background. The process is straightforward.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div className="process-card" key={step.number}>
                  <div className="process-number">
                    {step.number}
                  </div>

                  <div className="process-icon">
                    <Icon size={23} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                  {index !== processSteps.length - 1 && (
                    <div className="process-line" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULT PREVIEW */}
      <section className="section">
        <div className="container result-preview-grid">
          <div className="result-preview-content">
            <div className="section-eyebrow">
              MORE THAN A VERDICT
            </div>

            <h2>
              Know <span>why</span> something feels wrong.
            </h2>

            <p>
              A simple scam label isn't enough. You deserve to understand
              what makes something suspicious and what you should do next.
            </p>

            <ul className="feature-list">
              <li>
                <CheckCircle2 size={19} />
                Risk score based on detected signals
              </li>

              <li>
                <CheckCircle2 size={19} />
                Clear explanations for warning signs
              </li>

              <li>
                <CheckCircle2 size={19} />
                Practical safety recommendations
              </li>

              <li>
                <CheckCircle2 size={19} />
                Actionable next steps
              </li>
            </ul>

            <Link to="/how-it-works" className="text-link">
              Explore the analysis process
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* SAMPLE ANALYSIS CARD */}
          
{/* SAMPLE ANALYSIS CARD */}
    <div className="result-card result-card-polished">
     <div className="result-card-top">
       <div>
          <span className="result-label">ILLUSTRATIVE EXAMPLE</span>
         <h3>Suspicious message</h3>
       </div>

    <div className="risk-pill high">
      <span className="risk-status-dot" />
      HIGH RISK
    </div>
  </div>

  <div className="risk-overview">
    <div className="risk-score">
      <strong>87</strong>
      <span>/ 100</span>
    </div>

    <div className="risk-overview-details">
      <span>Overall risk assessment</span>
      <strong>High risk detected</strong>
      <small>Multiple suspicious indicators found</small>
    </div>
  </div>

  <div className="risk-progress">
    <div className="risk-progress-track">
      <div className="risk-progress-fill" />
    </div>
    <div className="risk-progress-labels">
      <span>LOW</span>
      <span>MEDIUM</span>
      <span>HIGH</span>
    </div>
  </div>

  <div className="risk-findings">
    <div className="risk-findings-heading">
      <span>DETECTED WARNING SIGNS</span>
      <span>03 signals</span>
    </div>

    {findings.map((finding) => {
      const Icon = finding.icon;

      return (
        <div className="risk-finding-row" key={finding.title}>
          <div className={`risk-finding-icon ${finding.type}`}>
            <Icon size={17} />
          </div>

          <div className="risk-finding-content">
            <strong>{finding.title}</strong>
            <p>{finding.description}</p>
          </div>

          <span className="risk-finding-score">{finding.score}</span>
        </div>
      );
    })}
  </div>

  <div className="risk-recommendation">
    <div className="risk-recommendation-icon">
      <ShieldAlert size={18} />
    </div>

    <div>
      <strong>What should you do?</strong>
      <p>
        Don't click the link or share sensitive information.
        Verify the sender through an official channel.
      </p>
    </div>
  </div>
</div>

  </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-icon">
              <div className="shield-check-icon">
                <ShieldAlert size={29} />
              </div>
            </div>

            <div className="cta-content">
              <span>WHEN SOMETHING DOESN'T FEEL RIGHT</span>

              <h2>Pause. Check. Then decide.</h2>

              <p>
                Make informed decisions before trusting suspicious
                digital interactions.
              </p>
            </div>

            <Link to="/scan" className="btn btn-light">
              Start a check
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
