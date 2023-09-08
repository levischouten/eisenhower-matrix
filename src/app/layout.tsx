import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eisenhower Matrix",
  description: "Eisenhower matrix task manager",
  viewport: {
    viewportFit: "cover",
    initialScale: 1.0,
    width: "device-width",
  },
  manifest: "/manifest.json",
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
          className={twMerge(
            inter.className,
            "dark:text-white bg-slate-50/50 dark:bg-slate-900"
          )}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
