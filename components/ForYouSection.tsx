import ScrollReveal from "./ScrollReveal";
import { IconLightning, IconBrainWave, IconCompass } from "./Icons";

const targets = [
  {
    Icon: IconLightning,
    title: "You're high-performing but internally exhausted",
    desc: "You keep achieving, but the silence feels louder than the success.",
  },
  {
    Icon: IconBrainWave,
    title: "You overthink everything and can't switch off",
    desc: "Even sleep doesn't feel like rest. Your brain is always on.",
  },
  {
    Icon: IconCompass,
    title: "You know you're meant for more, but feel stuck",
    desc: "The clarity you need is just 21 days of intentional work away.",
  },
];

export default function ForYouSection() {
  return (
    <section className="foryou-section">
      <div className="section-inner">
        <ScrollReveal direction="up">
          <p className="section-eyebrow purple-text">THIS IS FOR YOU IF…</p>
          <h2 className="section-headline">
            High performers who feel{" "}
            <span className="purple-text">stuck inside</span>
          </h2>
        </ScrollReveal>

        <div className="target-grid">
          {targets.map(({ Icon, title, desc }, i) => (
            <ScrollReveal key={title} direction="up" delay={i * 120}>
              <div className="target-card">
                <div className="icon-badge icon-badge--dark">
                  <Icon size={22} />
                </div>
                <h3 className="target-title">{title}</h3>
                <p className="target-desc">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
