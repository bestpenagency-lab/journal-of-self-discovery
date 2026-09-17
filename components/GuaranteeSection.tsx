const STRIPE_LINK = "https://buy.stripe.com/5kQcN68Uoeugdu1axt9bO09";

export default function GuaranteeSection() {
  return (
    <section className="guarantee-section">
      <div className="section-inner">
        <div className="guarantee-card">
          <div className="guarantee-icon">🛡️</div>
          <p className="section-eyebrow purple-text">THE GUARANTEE</p>
          <h2 className="guarantee-headline">
            Complete all 21 days. Still stuck?
          </h2>
          <p className="guarantee-body">
            Get a <strong className="purple-text">free 1:1 consultation</strong>{" "}
            with Lucia. No questions asked. No risk.
          </p>
          <p className="guarantee-sub">
            Lucia has coached 6–7 figure clients for over 10 years using this
            exact system. She&apos;s confident it works — and she&apos;s backing it with
            her time.
          </p>
          <a
            href={STRIPE_LINK}
            className="cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claim Your Journal — $9.99 →
          </a>
        </div>
      </div>
    </section>
  );
}
