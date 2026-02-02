import type { Metadata } from "next";
import { Rye, Courier_Prime, Crimson_Text } from "next/font/google";
import "./globals.css";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rye",
  display: "swap",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson-text",
  display: "swap",
});

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
      <body className={`${rye.variable} ${courierPrime.variable} ${crimsonText.variable} font-serif`}>
        {children}
      </body>
    </html>
  );
}
