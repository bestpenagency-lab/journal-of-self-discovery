import { IconCheck } from "./Icons";

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
          <p className="guarantee-note">
            <span className="note-item"><IconCheck size={16} color="var(--purple-primary)" /> 21-day money-back guarantee</span>
            <span className="note-dot" />
            <span className="note-item"><IconCheck size={16} color="var(--purple-primary)" /> Instant digital delivery</span>
          </p>
        </div>

        {/* Right: Ad video — fills the framed drop box */}
        <div className="hero-image-wrap">
          <div className="hero-photo-frame">
            <video
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
              controls
              poster="/lucia-hero.jpg"
            >
              <source src="/ad-1.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
