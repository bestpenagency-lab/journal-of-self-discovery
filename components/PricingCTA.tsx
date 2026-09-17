import ScrollReveal from "./ScrollReveal";
import { IconCheck, IconLock } from "./Icons";

const STRIPE_LINK = "https://buy.stripe.com/5kQcN68Uoeugdu1axt9bO09";

const includes = [
  "Full 21-day Journal of Self-Discovery",
  "Saboteur Assessment + PQ Exercises",
  "Reflection Questionnaires & Emotion Journaling",
  "Progress Trackers",
  "21-day guarantee — free 1:1 if not satisfied",
];

export default function PricingCTA() {
  return (
    <section className="pricing-section">
      <div className="section-inner pricing-inner">
        <ScrollReveal direction="up">
          <p className="section-eyebrow purple-text">LIMITED LAUNCH PRICE</p>
          <h2 className="pricing-headline">
            Stop the mental chaos.
            <br />
            <span className="purple-text">Start thinking clearly in 21 days.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <div className="pricing-card">
            <div className="price-row">
              <span className="price-old">$29</span>
              <span className="price-new">$9.99</span>
            </div>
            <p className="price-caption">Launch price · Limited availability</p>

            <ul className="pricing-includes">
              {includes.map((item) => (
                <li key={item} className="pricing-include-item">
                  <span className="pricing-check">
                    <IconCheck size={18} color="var(--purple-light)" strokeWidth={1.8} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={STRIPE_LINK}
              className="cta-btn cta-btn--large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Your Journal Now →
            </a>
            <p className="pricing-secure">
              <IconLock size={15} color="rgba(255,255,255,0.65)" strokeWidth={1.8} />
              Secure checkout · Instant access
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
