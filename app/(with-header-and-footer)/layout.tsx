import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function WithHeaderAndFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-3.5rem-6rem)]">{children}</main>
      <Footer />
    </>
  );
}
