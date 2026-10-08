import { IconCheck, IconShield } from "./Icons";
import HeroVideo from "./HeroVideo";

const STRIPE_LINK = "https://buy.stripe.com/7sYeVe3A41HublT20X9bO0a";

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
            <span className="new-price">$9.97</span>
            <span className="launch-badge">Launch Price</span>
          </div>

          <a href={STRIPE_LINK} className="cta-btn" target="_blank" rel="noopener noreferrer">
            Buy Now: $9.97 →
          </a>

          <div className="hero-guarantee">
            <div className="hg-icon">
              <IconShield size={30} color="var(--purple-primary)" strokeWidth={1.6} />
            </div>
            <div className="hg-text">
              <span className="hg-title">21-Day Guarantee</span>
              <span className="hg-sub">
                Do the 21 days. Not satisfied? Free 1:1 session with Lucia. No
                questions asked.
              </span>
            </div>
          </div>

          <p className="guarantee-note">
            <span className="note-item"><IconCheck size={16} color="var(--purple-primary)" /> Instant digital delivery</span>
          </p>
        </div>

        {/* Right: Ad video fills the framed drop box */}
        <div className="hero-image-wrap">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
