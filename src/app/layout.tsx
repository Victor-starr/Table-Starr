import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "@/styles/globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Table Starr",
  description:
    "Application that alows user to keep track of there orders and how the bill should be splited.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} antialiased `}>
        {children}
      </body>
    </html>
  );
}
