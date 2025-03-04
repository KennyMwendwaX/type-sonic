import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "🚀 TypeSonic - The Ultimate Typing Speed & Accuracy Test",
  description:
    "Boost your typing speed and accuracy with TypeSonic! Take fast-paced typing tests, track your progress, and challenge yourself with real-time stats. Improve your skills with precision typing exercises. Try it now!",
  keywords:
    "typing, speed, accuracy, test, practice, improve, skills, boost, track, progress, stats, real-time, precision, exercises, challenge, type, sonic, typesonic, type-sonic, typesonic.app, typesonic.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
