import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"], 
  display: "swap", 
});

export const metadata: Metadata = {
  title: "Trivy?",
  description: "A simple trivia game built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable}`}>
        {children}
        <footer className="text-center mb-6">
          <p>© {new Date().getFullYear()} Fadhil Revinno H.</p>
        </footer>
      </body>
    </html>
  );
}