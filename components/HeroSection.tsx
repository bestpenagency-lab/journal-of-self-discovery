import Image from "next/image";

const STRIPE_LINK = "https://buy.stripe.com/5kQcN68Uoeugdu1axt9bO09";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        {/* Left: Copy */}
        <div className="hero-copy">
          <p className="eyebrow">MIND SHIFT LAB · BRAIN REWIRING SYSTEMS</p>
          <h1 className="hero-headline">
            Your Mind Won&apos;t Let You{" "}
            <span className="purple-text">Rest.</span>
            <br />
            Here&apos;s Why.
          </h1>
          <p className="hero-sub">
            A neuroscience-based journal that stops mental chaos, ends
            overthinking, and rewires your brain for clarity in{" "}
            <strong>21 days.</strong>
          </p>

          {/* Price preview */}
          <div className="price-preview">
            <span className="old-price">$29</span>
            <span className="new-price">$9.99</span>
            <span className="launch-badge">Launch Price</span>
          </div>

          <a href={STRIPE_LINK} className="cta-btn" target="_blank" rel="noopener noreferrer">
            Buy Now — $9.99 →
          </a>
          <p className="guarantee-note">✓ 21-day money-back guarantee · ✓ Instant digital delivery</p>
        </div>

        {/* Right: Image */}
        <div className="hero-image-wrap">
          <Image
            src="/lucia-hero.jpg"
            alt="Lucia Giammarco Granier holding the Journal of Self-Discovery"
            width={480}
            height={620}
            priority
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
}
