const STRIPE_LINK = "https://buy.stripe.com/5kQcN68Uoeugdu1axt9bO09";

export default function PricingCTA() {
  return (
    <section className="pricing-section">
      <div className="section-inner pricing-inner">
        <p className="section-eyebrow purple-text">LIMITED LAUNCH PRICE</p>
        <h2 className="pricing-headline">
          Stop the mental chaos.
          <br />
          <span className="purple-text">Start thinking clearly in 21 days.</span>
        </h2>

        <div className="pricing-card">
          <div className="price-row">
            <span className="price-old">$29</span>
            <span className="price-new">$9.99</span>
          </div>
          <p className="price-caption">Launch price · Limited availability</p>

          <ul className="pricing-includes">
            <li>✓ Full 21-day Journal of Self-Discovery</li>
            <li>✓ Saboteur Assessment + PQ Exercises</li>
            <li>✓ Reflection Questionnaires & Emotion Journaling</li>
            <li>✓ Progress Trackers</li>
            <li>✓ 21-day guarantee — free 1:1 if not satisfied</li>
          </ul>

          <a
            href={STRIPE_LINK}
            className="cta-btn cta-btn--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Your Journal Now →
          </a>
          <p className="pricing-secure">🔒 Secure checkout · Instant access</p>
        </div>
      </div>
    </section>
  );
}
