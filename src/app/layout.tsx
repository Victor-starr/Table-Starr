import type { Metadata } from "next";
import "@/lib/pixel-retroui-setup.js";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Table Starr ⭐",
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
      <body className="flex justify-center bg-op-50 w-screen h-screen">
        <main className="flex flex-col justify-center items-center bg-background rounded-xl w-[450px] h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
