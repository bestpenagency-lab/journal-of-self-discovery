const targets = [
  {
    icon: "🔥",
    title: "You're high-performing but internally exhausted",
    desc: "You keep achieving, but the silence feels louder than the success.",
  },
  {
    icon: "🌀",
    title: "You overthink everything and can't switch off",
    desc: "Even sleep doesn't feel like rest. Your brain is always on.",
  },
  {
    icon: "🎯",
    title: "You know you're meant for more, but feel stuck",
    desc: "The clarity you need is just 21 days of intentional work away.",
  },
];

export default function ForYouSection() {
  return (
    <section className="foryou-section">
      <div className="section-inner">
        <p className="section-eyebrow purple-text">THIS IS FOR YOU IF…</p>
        <h2 className="section-headline">
          High performers who feel{" "}
          <span className="purple-text">stuck inside</span>
        </h2>

        <div className="target-grid">
          {targets.map((t) => (
            <div key={t.title} className="target-card">
              <span className="target-icon">{t.icon}</span>
              <h3 className="target-title">{t.title}</h3>
              <p className="target-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
