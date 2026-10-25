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
    description: "Check suspicious SMS, WhatsApp or social messages.",
  },
  {
    icon: Link2,
    title: "URLs",
    description: "Inspect links before you open or trust them.",
  },
  {
    icon: Mail,
    title: "Emails",
    description: "Spot phishing attempts and impersonation.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job offers",
    description: "Identify suspicious recruitment and payment requests.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description: "Check suspicious buying and selling offers.",
  },
  {
    icon: Phone,
    title: "Phone numbers",
    description: "Look for reported or suspicious numbers.",
  },
];

const Home = () => {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Digital safety, explained
            </div>

            <h1>
              Before you trust it,
              <span> check it.</span>
            </h1>

            <p className="hero-description">
              ScamShield helps you understand suspicious messages,
              links, emails and offers before they cost you money,
              information or access to your accounts.
            </p>

            <div className="hero-actions">
              <Link to="/scan" className="btn btn-primary btn-large">
                Check something suspicious
                <ArrowRight size={19} />
              </Link>

              <Link to="/how-it-works" className="text-link">
                See how it works
                <ChevronRight size={17} />
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <CheckCircle2 size={17} />
                Explainable results
              </div>

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Multiple scam signals
              </div>

              <div className="trust-item">
                <CheckCircle2 size={17} />
                Built for everyday users
              </div>
            </div>
          </div>

          {/* SCANNER PREVIEW */}
          <div className="hero-scanner-wrapper">
            <div className="scanner-card">
              <div className="scanner-card-header">
                <div>
                  <span className="scanner-label">Quick check</span>
                  <h2>What looks suspicious?</h2>
                </div>

                <div className="scanner-secure-icon">
                  <LockKeyhole size={18} />
                </div>
              </div>

              <div className="scanner-input">
                <div className="scanner-input-placeholder">
                  <ScanSearch size={19} />
                  <span>
                    Paste a message, URL or suspicious content...
                  </span>
                </div>
              </div>

              <Link to="/scan" className="scanner-button">
                Analyze safely
                <ArrowRight size={17} />
              </Link>

              <div className="scanner-note">
                <ShieldAlert size={15} />
                We explain the warning signs instead of just saying
                "scam".
              </div>
            </div>

            <div className="floating-result">
              <div className="floating-result-icon">
                <ShieldAlert size={19} />
              </div>

              <div>
                <span>Example analysis</span>
                <strong>High risk detected</strong>
              </div>

              <div className="floating-score">87</div>
            </div>
          </div>
        </div>
      </section>

      {/* SCAN TYPES */}
      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-eyebrow">
              What can you check?
            </div>

            <h2>
              One place for suspicious
              <span> digital interactions.</span>
            </h2>

            <p>
              ScamShield is designed around the situations people
              actually encounter every day.
            </p>
          </div>

          <div className="scan-types-grid">
            {scanTypes.map((item) => {
              const Icon = item.icon;

              return (
                <Link to="/scan" className="scan-type-card" key={item.title}>
                  <div className="scan-type-icon">
                    <Icon size={21} />
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
            <div className="section-eyebrow">Simple by design</div>

            <h2>
              From suspicious to
              <span> understood.</span>
            </h2>

            <p>
              You don't need to be a cybersecurity expert to
              understand why something might be dangerous.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-number">01</div>

              <div className="process-icon">
                <ScanSearch size={22} />
              </div>

              <h3>Submit</h3>

              <p>
                Paste or enter the suspicious content you received.
              </p>
            </div>

            <div className="process-line" />

            <div className="process-card">
              <div className="process-number">02</div>

              <div className="process-icon">
                <Sparkles size={22} />
              </div>

              <h3>Analyze</h3>

              <p>
                ScamShield checks multiple warning signs and risk
                signals.
              </p>
            </div>

            <div className="process-line" />

            <div className="process-card">
              <div className="process-number">03</div>

              <div className="process-icon">
                <ShieldAlert size={22} />
              </div>

              <h3>Understand</h3>

              <p>
                See the risk level, reasons and what you should do
                next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT PREVIEW */}
      <section className="section">
        <div className="container result-preview-grid">
          <div className="result-preview-content">
            <div className="section-eyebrow">More than a verdict</div>

            <h2>
              Know <span>why</span> something feels wrong.
            </h2>

            <p>
              A simple "scam" label isn't enough. ScamShield breaks
              suspicious content into understandable signals so you
              can make a safer decision.
            </p>

            <ul className="feature-list">
              <li>
                <CheckCircle2 size={19} />
                Risk score from multiple signals
              </li>

              <li>
                <CheckCircle2 size={19} />
                Clear explanations for every warning
              </li>

              <li>
                <CheckCircle2 size={19} />
                Practical recommendations
              </li>

              <li>
                <CheckCircle2 size={19} />
                Option to report suspicious content
              </li>
            </ul>

            <Link to="/how-it-works" className="text-link">
              Learn about our analysis
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="result-card">
            <div className="result-card-top">
              <div>
                <span className="result-label">Example result</span>
                <h3>Suspicious message</h3>
              </div>

              <div className="risk-pill high">
                HIGH RISK
              </div>
            </div>

            <div className="risk-score-row">
              <div className="risk-score">
                <strong>87</strong>
                <span>/ 100</span>
              </div>

              <div className="risk-description">
                <span>Risk level</span>
                <strong>High</strong>
              </div>
            </div>

            <div className="risk-bar">
              <div className="risk-bar-fill" />
            </div>

            <div className="finding">
              <div className="finding-icon danger">
                <ShieldAlert size={17} />
              </div>

              <div>
                <strong>Urgency pressure</strong>
                <p>
                  The message pressures you to act immediately.
                </p>
              </div>

              <span>+20</span>
            </div>

            <div className="finding">
              <div className="finding-icon warning">
                <LockKeyhole size={17} />
              </div>

              <div>
                <strong>Sensitive information</strong>
                <p>
                  It appears to request information that should remain
                  private.
                </p>
              </div>

              <span>+25</span>
            </div>

            <div className="finding">
              <div className="finding-icon danger">
                <Link2 size={17} />
              </div>

              <div>
                <strong>Suspicious link</strong>
                <p>
                  The included link may not belong to the claimed
                  organization.
                </p>
              </div>

              <span>+22</span>
            </div>

            <div className="recommendation">
              <strong>Recommended action</strong>
              <p>
                Don't click the link or share sensitive information.
                Verify the sender through an official channel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-icon">
              <ShieldCheckIcon />
            </div>

            <div className="cta-content">
              <span>Something doesn't feel right?</span>

              <h2>Check it before you trust it.</h2>

              <p>
                A few seconds of checking can prevent a costly
                mistake.
              </p>
            </div>

            <Link to="/scan" className="btn btn-light">
              Start a check
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ShieldCheckIcon = () => {
  return (
    <div className="shield-check-icon">
      <ShieldAlert size={28} />
    </div>
  );
};

export default Home;
