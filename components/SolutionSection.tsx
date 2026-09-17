import Image from "next/image";

const STRIPE_LINK = "https://buy.stripe.com/5kQcN68Uoeugdu1axt9bO09";

const features = [
  {
    icon: "🧠",
    title: "Saboteur Assessment",
    desc: "Uncover what's really holding you back",
  },
  {
    icon: "💭",
    title: "Reflection Questionnaires",
    desc: "Slow your mind, gain clarity",
  },
  {
    icon: "❤️",
    title: "Emotion Journaling",
    desc: "Understand your patterns",
  },
  {
    icon: "📈",
    title: "Progress Trackers",
    desc: "See real change unfold",
  },
  {
    icon: "⚡",
    title: "PQ Exercises",
    desc: "Retrain your brain for focus",
  },
];

export default function SolutionSection() {
  return (
    <section className="solution-section">
      <div className="section-inner solution-grid">
        {/* Left: Journal image */}
        <div className="solution-image-wrap">
          <div className="journal-glow">
            <Image
              src="/lucia-hero.jpg"
              alt="Journal of Self-Discovery by Lucia Giammarco Granier"
              width={380}
              height={500}
              className="journal-img"
            />
          </div>
          <div className="author-badge">
            <p className="author-name">Lucia Giammarco Granier</p>
            <p className="author-title">ICF-Certified Brain Coach</p>
          </div>
        </div>

        {/* Right: Features */}
        <div className="solution-copy">
          <p className="section-eyebrow purple-text-dark">THE SOLUTION</p>
          <h2 className="solution-headline">
            This isn&apos;t a blank notebook.
            <br />
            <span className="purple-text-dark">It&apos;s a step-by-step system.</span>
          </h2>
          <p className="solution-desc">
            Built by ICF-certified brain coach{" "}
            <strong>Lucia Giammarco Granier</strong> and used by her 6–7 figure
            coaching clients for over 10 years.
          </p>

          <ul className="feature-list">
            {features.map((f) => (
              <li key={f.title} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <strong className="feature-title">{f.title}</strong>
                  <span className="feature-desc"> — {f.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <a href={STRIPE_LINK} className="cta-btn cta-btn--dark" target="_blank" rel="noopener noreferrer">
            Get Your Journal — $9.99 →
          </a>
        </div>
      </div>
    </section>
  );
}
