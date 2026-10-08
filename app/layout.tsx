import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const META_PIXEL_CODE = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','3549766651863161');fbq('track','PageView');`;

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
      "Stop mental chaos. Gain clarity. Used by 6-7 figure coaching clients. Only $9.97 (Limited-Time Price).",
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
    description: "Stop overthinking. Gain clarity in 21 days. $9.97 limited-time price.",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL_CODE }} />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=3549766651863161&amp;ev=PageView&amp;noscript=1"
          />
        </noscript>
      </head>
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
