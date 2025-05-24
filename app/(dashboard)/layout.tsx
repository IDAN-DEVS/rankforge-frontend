import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
// import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body>
    <>
      {/* <ThemeProvider> */}
      <main className="min-h-screen">{children}</main>
      <Toaster />
      {/* </ThemeProvider> */}
    </>
    //   </body>
    // </html>
  );
}
