import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Prompt Challenge – Hive Göppingen",
  description:
    "Lerne spielerisch, wie du KI richtig nutzt. Eine interaktive Lern-App für den Education Circle im Hive Göppingen.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
