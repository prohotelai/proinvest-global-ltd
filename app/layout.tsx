import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Proinvest Global Ltd - AI Solutions for Hospitality",
  description: "AI that runs real hospitality operations — not experiments. Applied Artificial Intelligence solutions for hotels, cafés, and restaurants.",
  keywords: "AI hospitality, hotel automation, restaurant AI, ProHotelAI, ProCafeAI, hospitality technology",
  authors: [{ name: "Proinvest Global Ltd" }],
  openGraph: {
    title: "Proinvest Global Ltd - AI Solutions for Hospitality",
    description: "AI that runs real hospitality operations — not experiments.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
