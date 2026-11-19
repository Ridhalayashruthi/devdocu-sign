import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevDocu-Sign | Free Client-Side PDF Signer & Electronic Signature Tool",
  description:
    "Sign PDF documents online for free with 100% browser-based privacy. Draw your signature, add date stamps, and download signed PDFs instantly without uploading files to any server.",
  keywords: [
    "sign PDF online free",
    "client-side PDF signer",
    "electronic signature tool",
    "private PDF signature",
    "add signature to PDF browser",
    "Next.js PDF tool",
  ],
  openGraph: {
    title: "DevDocu-Sign — 100% Private Browser-Based PDF Signer",
    description:
      "Draw, place, and embed electronic signatures into PDFs directly in your browser. Zero server uploads.",
    type: "website",
    siteName: "DevDocu-Sign",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevDocu-Sign — Free Private PDF Signer",
    description:
      "Sign PDFs locally in your browser without uploading sensitive documents.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DevDocu-Sign",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A 100% client-side, privacy-first web application to draw electronic signatures and embed them into PDF documents directly inside the browser.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
