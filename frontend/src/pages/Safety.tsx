import {
  ArrowRight,
  BadgeAlert,
  Banknote,
  BriefcaseBusiness,
  KeyRound,
  Link2,
  ShoppingBag,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

const guides = [
  {
    icon: Link2,
    title: "Phishing links",
    description:
      "Learn how fake login pages and misleading URLs are used to steal information.",
  },
  {
    icon: KeyRound,
    title: "OTP & account scams",
    description:
      "Understand why legitimate organizations should not ask for your passwords or OTPs.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job scams",
    description:
      "Recognize fake recruitment offers, registration fees and work-from-home scams.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace scams",
    description:
      "Stay safe when buying or selling products through online marketplaces.",
  },
  {
    icon: Banknote,
    title: "Investment scams",
    description:
      "Identify unrealistic returns, fake investment platforms and pressure tactics.",
  },
  {
    icon: Smartphone,
    title: "Delivery scams",
    description:
      "Watch for fake courier messages, parcel fees and malicious tracking links.",
  },
];

const Safety = () => {
  return (
    <div className="inner-page">
      <section className="page-hero">
        <div className="container narrow">
          <div className="section-eyebrow">Safety Center</div>

          <h1>
            Learn the warning signs
            <span> before they matter.</span>
          </h1>

          <p>
            The best defense against scams is knowing what to look for.
            Explore practical guides for common digital scams.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="safety-grid">
            {guides.map((guide) => {
              const Icon = guide.icon;

              return (
                <article className="safety-card" key={guide.title}>
                  <div className="safety-card-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{guide.title}</h3>

                  <p>{guide.description}</p>

                  <button className="card-link">
                    Learn more
                    <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="safety-rule">
            <div className="safety-rule-icon">
              <BadgeAlert size={30} />
            </div>

            <div>
              <div className="section-eyebrow">
                Remember this
              </div>

              <h2>
                Urgency is often the
                <span> weapon.</span>
              </h2>

              <p>
                Scammers often try to stop you from thinking. Messages
                that demand immediate payment, threaten account
                closure, or promise an opportunity that expires quickly
                deserve extra scrutiny.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container safety-checklist">
          <div>
            <div className="section-eyebrow">Quick checklist</div>

            <h2>
              Stop. Check.
              <span> Verify.</span>
            </h2>

            <p>
              Before sending money, sharing sensitive information or
              clicking an unexpected link, take a moment to verify the
              request independently.
            </p>
          </div>

          <div className="checklist">
            <div>
              <ShieldCheck size={19} />
              Don't rush because someone demands urgency.
            </div>

            <div>
              <ShieldCheck size={19} />
              Don't share passwords, OTPs or recovery codes.
            </div>

            <div>
              <ShieldCheck size={19} />
              Verify organizations through official channels.
            </div>

            <div>
              <ShieldCheck size={19} />
              Check suspicious links before opening them.
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <span>Not sure about something?</span>

              <h2>Let ScamShield take a closer look.</h2>

              <p>
                Check suspicious content and understand the warning
                signs.
              </p>
            </div>

            <Link to="/scan" className="btn btn-light">
              Check something
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;
