import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prestigious Tech | Web, AI automation, marketing.",
  description:
    "Premium web development, custom AI automation, digital marketing, and social media handling for brands that need sharper digital systems.",
  openGraph: {
    title: "Prestigious Tech",
    description: "Premium digital systems for brands that need trust, speed, and growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
