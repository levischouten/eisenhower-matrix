import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Menu from "./_components/navigation-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eisenhower Matrix",
  description: "Eisenhower matrix task manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={cn(
            inter.className,
            "flex flex-col h-screen items-center bg-slate-50/50"
          )}
        >
          <header className="p-4 w-full bg-white">
            <Menu />
          </header>
          <main className="flex-1 px-4 py-8 max-w-6xl w-full">{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}
