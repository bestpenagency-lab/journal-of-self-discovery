import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { IconStar } from "./Icons";

const testimonials = [
  {
    quote:
      "I used to lie awake replaying every conversation until 2am. Two weeks in, I could finally sit in silence without spiraling. This is the first journal that actually changed how I think, not just how I feel.",
    name: "Amara O.",
    role: "Founder & CEO",
    initials: "AO",
    image: "/testimonials/amara.jpg",
  },
  {
    quote:
      "I run a seven-figure agency and I cried in week one. Not from overwhelm, from relief. The Saboteur Assessment named the exact pattern that was costing me deals, and now I catch it before it runs me.",
    name: "Daniel R.",
    role: "Agency Owner",
    initials: "DR",
    image: "/testimonials/daniel.jpg",
  },
  {
    quote:
      "Every night my brain replayed the day on a loop. The emotion journaling pages quieted it in under a month. My partner noticed before I did. I sleep like a different person now.",
    name: "Priya N.",
    role: "Product Lead",
    initials: "PN",
    image: "/testimonials/priya.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="section-inner">
        <ScrollReveal direction="up">
          <p className="section-eyebrow purple-text-dark">REAL RESULTS</p>
          <h2 className="testimonials-headline">
            What members say after{" "}
            <span className="purple-text-dark">21 days</span>
          </h2>
        </ScrollReveal>

        <div className="testimonial-grid">
          {testimonials.map(({ quote, name, role, initials, image }, i) => (
            <ScrollReveal key={name} direction="up" delay={i * 120}>
              <figure className="testimonial-card">
                <div className="testimonial-stars" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} size={16} color="#f2a93b" />
                  ))}
                </div>

                <blockquote className="testimonial-text">{quote}</blockquote>

                <figcaption className="testimonial-person">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      width={48}
                      height={48}
                      className="testimonial-avatar testimonial-avatar--photo"
                    />
                  ) : (
                    <span className="testimonial-avatar" aria-hidden="true">
                      {initials}
                    </span>
                  )}
                  <span className="testimonial-meta">
                    <span className="testimonial-name">{name}</span>
                    <span className="testimonial-role">{role}</span>
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
