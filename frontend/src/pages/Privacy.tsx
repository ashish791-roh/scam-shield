
import { ShieldCheck, Database, LockKeyhole, UserRound } from "lucide-react";

export default function Privacy() {
  return (
    <main className="public-page privacy-page">
      <section className="public-hero">
        <span className="public-eyebrow">
          <ShieldCheck size={15} /> YOUR PRIVACY MATTERS
        </span>

        <h1>
          Privacy, with <span>transparency.</span>
        </h1>

        <p>
          Understand what information ScamShield processes,
          why it is needed, and how submissions are handled.
        </p>

        <span className="privacy-updated">
          Last updated: November 10, 2026
        </span>
      </section>

      <section className="privacy-content">
        <aside className="privacy-summary">
          <div>
            <Database size={21} />
            <strong>Information</strong>
            <span>What we receive</span>
          </div>
          <div>
            <LockKeyhole size={21} />
            <strong>Processing</strong>
            <span>How we use it</span>
          </div>
          <div>
            <UserRound size={21} />
            <strong>Your choices</strong>
            <span>How to contact us</span>
          </div>
        </aside>

        <article className="privacy-article">
          <section>
            <h2>1. Introduction</h2>
            <p>
              ScamShield is a web application designed to help users
              identify potentially suspicious messages, links, emails,
              phone numbers, job offers, and marketplace activity.
              This policy explains how information is handled when
              you use the application.
            </p>
          </section>

          <section>
            <h2>2. Information we collect</h2>
            <p>Depending on the features you use, we may process:</p>
            <ul>
              <li>
                <strong>Account information:</strong> Your name and
                email address when you register.
              </li>
              <li>
                <strong>Contact submissions:</strong> Your name,
                email address, subject, and message when you use
                the Contact form.
              </li>
              <li>
                <strong>Scam reports:</strong> The scam category,
                suspicious content, description, and any optional
                reporter details you provide.
              </li>
              <li>
                <strong>Scan content:</strong> Content submitted
                to the scanner is processed by the backend to
                generate an analysis.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How information is used</h2>
            <p>Information is used to:</p>
            <ul>
              <li>Provide account and authentication functionality.</li>
              <li>Analyze content submitted to the scam scanner.</li>
              <li>Receive and manage contact messages.</li>
              <li>Store scam reports for potential review and product improvement.</li>
              <li>Maintain application security and prevent abuse.</li>
            </ul>
          </section>

          <section>
            <h2>4. Scanner content and storage</h2>
            <p>
              The current scanner controller processes submitted
              content and returns an analysis. It does not explicitly
              save the submitted scan content to a MongoDB collection.
              This does not guarantee that hosting providers,
              infrastructure, or operational logs never retain
              technical request information.
            </p>
          </section>

          <section>
            <h2>5. Contact messages and scam reports</h2>
            <p>
              Contact messages and scam reports are stored in
              separate database collections with creation and
              update timestamps. They are not publicly displayed
              through the submission API.
            </p>
            <p>
              Optional reporter details are stored when provided.
              The application does not currently implement an
              automatic retention period or a self-service deletion
              feature for these submissions.
            </p>
          </section>

          <section>
            <h2>6. Data sharing and service providers</h2>
            <p>
              ScamShield does not currently provide a public feature
              for sharing submitted reports. The application uses
              database and hosting infrastructure to operate.
              The providers and their own data practices depend on
              the deployment configuration. Review those providers'
              policies before publishing this application.
            </p>
          </section>

          <section>
            <h2>7. Security</h2>
            <p>
              The backend uses request validation, security headers,
              cross-origin controls, and rate limiting. No internet
              application can guarantee absolute security, and
              deployment configuration also affects protection.
            </p>
          </section>

          <section>
            <h2>8. Your choices</h2>
            <p>
              Avoid submitting passwords, one-time verification
              codes, bank details, payment card information, or
              unnecessary personal information in messages or
              scam reports.
            </p>
            <p>
              If you have a privacy question or want to request
              information about a submission, contact us through
              the Contact page. Requests may require manual review.
            </p>
          </section>

          <section>
            <h2>9. Changes to this policy</h2>
            <p>
              This policy may be updated when application features,
              infrastructure, or data-handling practices change.
              The latest version will be published on this page.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              For questions about this policy or to request information about a submission, please <a href="/contact"> Contact Us </a>.
            </p>
          </section>

          <div className="privacy-disclaimer">
            <strong>Important publishing note</strong>
            <p>
              This is a project-specific privacy policy draft,
              not legal advice. Review it against your actual
              authentication implementation, hosting provider,
              database configuration, logging practices, and
              applicable privacy laws before publishing.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
