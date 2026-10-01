import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { IconCheck } from "@/components/Icons";
import ThankYouGate from "@/components/ThankYouGate";

export const metadata: Metadata = {
  title: "You're In: Download Your Journal of Self-Discovery",
  description:
    "Your Journal of Self-Discovery is ready to download. 21 days to rewire your brain for clarity.",
};

export default function ThankYouPage() {
  return (
    <main className="ty-page">
      <section className="ty-section">
        <div className="section-inner">
          <ScrollReveal direction="up">
            <div className="ty-card">
              <div className="ty-icon">
                <IconCheck size={56} color="var(--purple-light)" strokeWidth={1.4} />
              </div>

              <p className="section-eyebrow purple-text">YOU&apos;RE IN</p>
              <h1 className="ty-headline">
                You&apos;re in!
                <br />
                <span className="purple-text">
                  Your Journal of Self-Discovery is ready.
                </span>
              </h1>

              <ThankYouGate />

              <Link href="/" className="ty-back">
                ← Back to homepage
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}