import Header from "@/app/components/Header";
import "./corporate.css";
import Footer from "@/app/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="corporate-site">
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
