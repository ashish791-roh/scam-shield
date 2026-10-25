import {
  ArrowRight,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="inner-page">
      <section className="page-hero">
        <div className="container narrow">
          <div className="section-eyebrow">About ScamShield</div>

          <h1>
            Security tools should
            <span> make sense.</span>
          </h1>

          <p>
            ScamShield is built around a simple idea: people shouldn't
            need to be cybersecurity experts to recognize a suspicious
            digital interaction.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <div className="section-eyebrow">Our idea</div>

            <h2>
              Don't just tell people
              <span> what to think.</span>
            </h2>
          </div>

          <div className="about-copy">
            <p>
              Many scam-detection tools focus on a simple verdict:
              safe or dangerous.
            </p>

            <p>
              ScamShield takes a different approach. It aims to explain
              the warning signs behind a result, helping people build
              better digital safety habits over time.
            </p>

            <p>
              The goal isn't to replace good judgment. It's to give
              people better information before they make a decision.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-heading centered">
            <div className="section-eyebrow">Our principles</div>

            <h2>
              Built around
              <span> trust.</span>
            </h2>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-icon">
                <Eye size={23} />
              </div>

              <h3>Explainability</h3>

              <p>
                Every risk assessment should give understandable
                reasons instead of hiding behind a mysterious score.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <Target size={23} />
              </div>

              <h3>Practicality</h3>

              <p>
                Recommendations should help people decide what to do
                next, not overwhelm them with technical jargon.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <HeartHandshake size={23} />
              </div>

              <h3>Human first</h3>

              <p>
                Security is ultimately about protecting people, their
                money, their information and their peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-mission">
          <div className="mission-icon">
            <ShieldCheck size={32} />
          </div>

          <div>
            <div className="section-eyebrow">The mission</div>

            <h2>
              Make the internet a little harder
              <span> to scam people on.</span>
            </h2>

            <p>
              ScamShield is designed as an educational and analytical
              platform that helps users pause, investigate and make
              safer decisions.
            </p>

            <Link to="/scan" className="text-link">
              Try the scanner
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
