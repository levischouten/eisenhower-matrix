import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eisenhower Matrix",
  description: "Eisenhower matrix task manager",
  viewport: {
    viewportFit: "cover",
    initialScale: 1.0,
    width: "device-width",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
