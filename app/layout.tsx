import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RankForge",
  description: "A contributor platform for the idan-devs repository",
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
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

// The dashboard has its own layout in the (dashboard) route group
// which doesn't include the Header and Footer components.
