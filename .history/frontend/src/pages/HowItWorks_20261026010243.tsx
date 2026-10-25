import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Gauge,
  Lightbulb,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="inner-page">
      <section className="page-hero">
        <div className="container narrow">
          <div className="section-eyebrow">How ScamShield works</div>

          <h1>
            Turn uncertainty into
            <span> understanding.</span>
          </h1>

          <p>
            ScamShield analyzes suspicious content using multiple
            signals and turns them into a risk score you can actually
            understand.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="analysis-flow">
            <div className="flow-step">
              <div className="flow-icon">
                <FileSearch size={25} />
              </div>

              <span>01</span>

              <h3>You submit something</h3>

              <p>
                A suspicious message, URL, email, job offer, phone
                number or marketplace listing.
              </p>
            </div>

            <div className="flow-arrow">
              <ArrowRight />
            </div>

            <div className="flow-step">
              <div className="flow-icon">
                <SearchCheck size={25} />
              </div>

              <span>02</span>

              <h3>We look for signals</h3>

              <p>
                The system checks for patterns such as urgency,
                impersonation, suspicious links and payment requests.
              </p>
            </div>

            <div className="flow-arrow">
              <ArrowRight />
            </div>

            <div className="flow-step">
              <div className="flow-icon">
                <Gauge size={25} />
              </div>

              <span>03</span>

              <h3>We calculate risk</h3>

              <p>
                Individual findings contribute to an overall risk
                score between 0 and 100.
              </p>
            </div>

            <div className="flow-arrow">
              <ArrowRight />
            </div>

            <div className="flow-step">
              <div className="flow-icon">
                <Lightbulb size={25} />
              </div>

              <span>04</span>

              <h3>You understand why</h3>

              <p>
                Instead of a black-box verdict, you get explanations
                and practical next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-eyebrow">Analysis engine</div>

            <h2>
              Multiple signals.
              <span> One clearer picture.</span>
            </h2>

            <p>
              ScamShield is designed so that no single signal has to
              determine the result by itself.
            </p>
          </div>

          <div className="signal-grid">
            <div className="signal-card">
              <ShieldAlert size={22} />
              <h3>Behavioral signals</h3>
              <p>
                Detects pressure tactics, threats, urgency and unusual
                requests.
              </p>
            </div>

            <div className="signal-card">
              <SearchCheck size={22} />
              <h3>Pattern detection</h3>
              <p>
                Looks for language and structures commonly associated
                with scam attempts.
              </p>
            </div>

            <div className="signal-card">
              <BrainCircuit size={22} />
              <h3>Context analysis</h3>
              <p>
                Considers the surrounding context instead of relying
                only on individual keywords.
              </p>
            </div>

            <div className="signal-card">
              <ShieldCheck size={22} />
              <h3>Reputation signals</h3>
              <p>
                Future integrations can incorporate community reports
                and external reputation data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container risk-section">
          <div className="section-heading">
            <div className="section-eyebrow">Risk scoring</div>

            <h2>
              A score you can
              <span> understand.</span>
            </h2>

            <p>
              Every analysis receives a score from 0 to 100. Higher
              scores indicate more warning signs.
            </p>
          </div>

          <div className="risk-scale">
            <div className="risk-scale-item safe">
              <strong>0–20</strong>
              <span>Very low</span>
            </div>

            <div className="risk-scale-item low">
              <strong>21–40</strong>
              <span>Low</span>
            </div>

            <div className="risk-scale-item moderate">
              <strong>41–60</strong>
              <span>Moderate</span>
            </div>

            <div className="risk-scale-item high">
              <strong>61–80</strong>
              <span>High</span>
            </div>

            <div className="risk-scale-item critical">
              <strong>81–100</strong>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <span>Ready to check something?</span>
              <h2>Don't guess. Analyze it.</h2>
              <p>
                See the warning signs before you decide what to do.
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

export default HowItWorks;
