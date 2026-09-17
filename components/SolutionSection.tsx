import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import {
  IconTarget,
  IconReflection,
  IconHeartPulse,
  IconBarChart,
  IconRewire,
} from "./Icons";

const STRIPE_LINK = "https://buy.stripe.com/5kQcN68Uoeugdu1axt9bO09";

const features = [
  {
    Icon: IconTarget,
    title: "Saboteur Assessment",
    desc: "Uncover what's really holding you back",
  },
  {
    Icon: IconReflection,
    title: "Reflection Questionnaires",
    desc: "Slow your mind, gain clarity",
  },
  {
    Icon: IconHeartPulse,
    title: "Emotion Journaling",
    desc: "Understand your patterns",
  },
  {
    Icon: IconBarChart,
    title: "Progress Trackers",
    desc: "See real change unfold",
  },
  {
    Icon: IconRewire,
    title: "PQ Exercises",
    desc: "Retrain your brain for focus",
  },
];

export default function SolutionSection() {
  return (
    <section className="solution-section">
      <div className="section-inner solution-grid">

        {/* Left: Lucia's photo, black edges cropped via objectPosition + overflow:hidden */}
        <ScrollReveal direction="right" delay={0}>
          <div className="solution-image-wrap">
            <div className="journal-glow">
              {/* fill + objectFit cover + objectPosition removes the black letterbox bars */}
              <div className="lucia-photo-frame">
                <Image
                  src="/lucia-portrait.jpg"
                  alt="Lucia Giammarco Granier holding the Journal of Self-Discovery"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 38%",
                  }}
                  sizes="(max-width: 900px) 90vw, 380px"
                />
              </div>
            </div>
            <div className="author-badge">
              <p className="author-name">Lucia Giammarco Granier</p>
              <p className="author-title">ICF-Certified Brain Coach</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Features copy */}
        <div className="solution-copy">
          <ScrollReveal direction="up" delay={0}>
            <p className="section-eyebrow purple-text-dark">THE SOLUTION</p>
            <h2 className="solution-headline">
              This isn&apos;t a blank notebook.
              <br />
              <span className="purple-text-dark">
                It&apos;s a step-by-step system.
              </span>
            </h2>
            <p className="solution-desc">
              Built by ICF-certified brain coach{" "}
              <strong>Lucia Giammarco Granier</strong> and used by her 6-7
              figure coaching clients for over 10 years.
            </p>
          </ScrollReveal>

          <ul className="feature-list">
            {features.map(({ Icon, title, desc }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 80} as="li">
                <div className="feature-item">
                  <div className="icon-badge icon-badge--light">
                    <Icon size={20} />
                  </div>
                  <div>
                    <strong className="feature-title">{title}</strong>
                    <span className="feature-desc">: {desc}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal direction="up" delay={500}>
            <a
              href={STRIPE_LINK}
              className="cta-btn cta-btn--dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Your Journal: $9.99 →
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
