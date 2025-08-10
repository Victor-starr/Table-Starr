import type { Metadata } from "next";
import "@/lib/pixel-retroui-setup.js";
import "@/styles/globals.css";
import NotificationProvider from "@/context/NotificationProvider";
import Notification from "@/components/Notification";
import { TableProvider } from "@/context/TableContext";
import GithubLink from "@/components/GithubLink";

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
        <NotificationProvider>
          <Notification />
          <TableProvider>
            <main className="flex flex-col justify-center items-center bg-background rounded-xl w-[450px] h-full overflow-y-scroll">
              {children}
              <GithubLink />
            </main>
          </TableProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
