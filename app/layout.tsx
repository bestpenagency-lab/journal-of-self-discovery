import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://journal.mindshiftlabconsulting.com"),
  title: "Journal of Self-Discovery: Rewire Your Brain in 21 Days",
  description:
    "A neuroscience-based journal that stops mental chaos, ends overthinking, and rewires your brain for clarity in 21 days. By ICF-certified brain coach Lucia Giammarco Granier.",
  keywords: [
    "journal",
    "self-discovery",
    "neuroscience",
    "brain rewiring",
    "overthinking",
    "mental clarity",
    "Lucia Giammarco Granier",
    "Mind Shift Lab",
  ],
  openGraph: {
    title: "Journal of Self-Discovery: Rewire Your Brain in 21 Days",
    description:
      "Stop mental chaos. Gain clarity. Used by 6-7 figure coaching clients. Only $9.99 (Launch Price).",
    url: "https://mindshiftlabconsulting.com",
    siteName: "Mind Shift Lab",
    images: [
      {
        url: "/lucia-hero.jpg",
        width: 480,
        height: 620,
        alt: "Journal of Self-Discovery by Lucia Giammarco Granier",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal of Self-Discovery: Rewire Your Brain in 21 Days",
    description: "Stop overthinking. Gain clarity in 21 days. $9.99 launch price.",
    images: ["/lucia-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
