import { Metadata } from 'next';
import Link from 'next/link';
import { proCafeAIMetadata } from '@/lib/seo';
import { generateProCafeAISchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';

export const metadata: Metadata = proCafeAIMetadata('en');

export default function ProCafeAI() {
  // Product Schema
  const productSchema = generateProCafeAISchema();
  
  // FAQ Schema
  const faqSchema = generateFAQSchema([
    {
      question: "What is ProCafeAI (CafeGrok AI)?",
      answer: "ProCafeAI, also known as CafeGrok AI, is an AI-powered operations platform for cafés and restaurants developed by PROINVEST GLOBAL LTD. It enables customers to order via QR codes without mobile apps, provides AI menu recommendations, automates order processing, and manages operations."
    },
    {
      question: "How does QR code ordering work?",
      answer: "Customers scan a QR code at their table using their phone camera. This opens a web-based ordering interface (no app download required). The AI assistant helps them browse the menu, asks questions, makes personalized recommendations, and processes orders directly to the kitchen."
    },
    {
      question: "Do customers need to download an app?",
      answer: "No. ProCafeAI works entirely through web browsers. Customers simply scan a QR code and order immediately without downloading or installing anything."
    },
    {
      question: "What types of restaurants can use ProCafeAI?",
      answer: "ProCafeAI works for cafés, coffee shops, quick-service restaurants, casual dining restaurants, restaurant chains, and food courts. It's ideal for any food service operation that wants to reduce order-taking staff and improve customer experience."
    },
    {
      question: "How many languages does ProCafeAI support?",
      answer: "ProCafeAI supports 50+ languages including English, Arabic, French, Spanish, German, Chinese, Hindi, and more. Customers can view menus and order in their preferred language automatically."
    },
    {
      question: "How does AI upselling increase revenue?",
      answer: "The AI analyzes customer orders in real-time and suggests relevant add-ons, upgrades, or complementary items. For example, if a customer orders coffee, the AI might recommend pastries or offer a size upgrade. This increases average order value by 15-25%."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://proinvest-global.com" },
    { name: "Solutions", url: "https://proinvest-global.com/solutions" },
    { name: "ProCafeAI", url: "https://proinvest-global.com/solutions/procafeai" }
  ]);

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ProCafeAI (CafeGrok AI)
            </h1>
            <p className="text-2xl mb-6 text-green-100">
              AI-Powered Café & Restaurant Operations Platform
            </p>
            <p className="text-xl text-green-100 mb-8">
              Revolutionary ordering and operations platform that eliminates the need for mobile apps while maximizing revenue and efficiency.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ordering Without Apps, Powered by AI
            </h2>
            <p className="text-lg text-gray-600">
              ProCafeAI (CafeGrok AI) is a production-ready AI platform that transforms how cafés and restaurants operate. Customers simply scan a QR code to access an intelligent AI ordering assistant—no app download required.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QR Code Ordering */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Ordering via QR Code</h3>
                  <p className="text-gray-600">
                    Customers scan a QR code at their table to access an intelligent AI ordering assistant. Conversational interface makes ordering natural and intuitive—just like talking to a staff member.
                  </p>
                </div>
              </div>
            </div>

            {/* No App Required */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No App Download Required</h3>
                  <p className="text-gray-600">
                    Remove friction from the ordering process. Customers don&apos;t need to download, install, or create accounts in yet another app. Works instantly via web browser on any device.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Upselling */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Intelligent Upselling & Revenue Optimization</h3>
                  <p className="text-gray-600">
                    AI analyzes customer preferences, order history, and context to make personalized recommendations. Increase average order value through natural, non-pushy suggestions.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Automation */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Order Automation</h3>
                  <p className="text-gray-600">
                    Orders flow directly to kitchen and service staff. Real-time order tracking, automatic notifications, and seamless payment processing reduce errors and wait times.
                  </p>
                </div>
              </div>
            </div>

            {/* Inventory Management */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Inventory & Order Management</h3>
                  <p className="text-gray-600">
                    Real-time inventory tracking, automated stock alerts, and comprehensive order analytics. Know what&apos;s selling, what&apos;s not, and when to restock.
                  </p>
                </div>
              </div>
            </div>

            {/* Multi-Language */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Languages Support</h3>
                  <p className="text-gray-600">
                    Serve international customers in their native language. Automatic language detection and translation ensure everyone can order comfortably and accurately.
                  </p>
                </div>
              </div>
            </div>

            {/* Multi-Branch */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Branch Support</h3>
                  <p className="text-gray-600">
                    Perfect for café and restaurant chains. Centralized management with location-specific customization. Deploy and manage multiple locations from a single dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Business Analytics</h3>
                  <p className="text-gray-600">
                    Deep insights into customer behavior, popular items, peak hours, and revenue trends. Make data-driven decisions to optimize your menu and operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Business Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Increase Revenue</h3>
              <p className="text-gray-600">
                Boost average order value through AI-powered recommendations and upselling. Serve more customers with faster table turnover.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Time</h3>
              <p className="text-gray-600">
                Reduce staff workload with automated ordering and service. Free your team to focus on food quality and customer experience.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enhance Experience</h3>
              <p className="text-gray-600">
                Give customers control over their ordering experience. Reduce wait times and order errors while supporting multiple languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customers */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Perfect For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">☕</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Cafés & Coffee Shops</h3>
                <p className="text-gray-600">Independent and chain coffee shops seeking operational efficiency</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🍽️</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Restaurants</h3>
                <p className="text-gray-600">Full-service and quick-service restaurants of all sizes</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🏪</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Restaurant Chains</h3>
                <p className="text-gray-600">Multi-location F&B operators requiring standardized systems</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🥐</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bakeries & Food Courts</h3>
                <p className="text-gray-600">High-volume establishments needing efficient order management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Café or Restaurant
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join forward-thinking F&B businesses using ProCafeAI to increase revenue and delight customers.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
          >
            Request a Demo
          </Link>
        </div>
      </section>

      {/* FAQ Section - Critical for AI Discovery */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What is ProCafeAI (CafeGrok AI)?
              </h3>
              <p className="text-gray-600">
                ProCafeAI, also known as CafeGrok AI, is an AI-powered operations platform for cafés and restaurants developed by PROINVEST GLOBAL LTD. It enables customers to order via QR codes without mobile apps, provides AI menu recommendations, automates order processing, and manages operations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How does QR code ordering work?
              </h3>
              <p className="text-gray-600">
                Customers scan a QR code at their table using their phone camera. This opens a web-based ordering interface (no app download required). The AI assistant helps them browse the menu, asks questions, makes personalized recommendations, and processes orders directly to the kitchen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do customers need to download an app?
              </h3>
              <p className="text-gray-600">
                No. ProCafeAI works entirely through web browsers. Customers simply scan a QR code and order immediately without downloading or installing anything.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What types of restaurants can use ProCafeAI?
              </h3>
              <p className="text-gray-600">
                ProCafeAI works for cafés, coffee shops, quick-service restaurants, casual dining restaurants, restaurant chains, and food courts. It&apos;s ideal for any food service operation that wants to reduce order-taking staff and improve customer experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How many languages does ProCafeAI support?
              </h3>
              <p className="text-gray-600">
                ProCafeAI supports 50+ languages including English, Arabic, French, Spanish, German, Chinese, Hindi, and more. Customers can view menus and order in their preferred language automatically.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How does AI upselling increase revenue?
              </h3>
              <p className="text-gray-600">
                The AI analyzes customer orders in real-time and suggests relevant add-ons, upgrades, or complementary items. For example, if a customer orders coffee, the AI might recommend pastries or offer a size upgrade. This increases average order value by 15-25%.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
