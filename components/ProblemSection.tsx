import ScrollReveal from "./ScrollReveal";

export default function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="section-inner">
        <ScrollReveal direction="up">
          <p className="section-eyebrow purple-text">THE PROBLEM</p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={80}>
          <div className="problem-lines">
            <p className="problem-line">You lie down exhausted. Your mind won&apos;t stop.</p>
            <p className="problem-line muted">
              Replaying mistakes. Worrying about tomorrow. Questioning every decision.
            </p>
            <p className="problem-line accent">
              You&apos;re not overthinking.{" "}
              <span className="purple-text">
                Your brain is stuck in survival mode, and it&apos;s running the show.
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal direction="up" delay={200}>
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-num">10+</span>
              <span className="stat-label">Years of research</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">21</span>
              <span className="stat-label">Days to rewire</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">6-7</span>
              <span className="stat-label">Figure coaching clients</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
