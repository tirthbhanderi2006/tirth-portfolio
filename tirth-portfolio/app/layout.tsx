import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tirth Bhanderi - AI & ML Student | Android & Flutter Developer",
  description: "Portfolio of Tirth Bhanderi, AI and ML Engineering student and proficient Android and Flutter Developer with experience in Java, Python, and Spring Boot development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
