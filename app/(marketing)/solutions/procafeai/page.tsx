import { Metadata } from 'next';
import { proCafeAIMetadata } from '@/lib/seo';
import { generateProCafeAISchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';

export const metadata: Metadata = proCafeAIMetadata('en');

export default function ProCafeAI() {
  // Product Schema
  const productSchema = generateProCafeAISchema();
  
  // FAQ Schema
  const faqSchema = generateFAQSchema([
    {
      question: "How does CafeGrok AI save staff costs?",
      answer: "CafeGrok AI automates order taking via QR codes and AI chat, reducing the need for waitstaff by 30-50%. Customers scan, order, and pay directly from their phones."
    },
    {
      question: "What is Grok AI and how does it help my cafe?",
      answer: "Grok AI from xAI powers our intelligent chat system. It understands customer requests in any language, suggests menu items, handles customizations, and provides upsell recommendations to boost sales by 20-40%."
    },
    {
      question: "Can I manage multiple cafe branches?",
      answer: "Yes! Our Pro and Enterprise plans support multi-branch management with unified dashboards, shared inventory, and cross-branch reporting."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Choose your plan (Basic $200/mo, Pro $300/mo, or Enterprise $500/mo), complete checkout, and you're ready to transform your cafe with AI-powered ordering within minutes."
    },
    {
      question: "Do customers need to download an app?",
      answer: "No. CafeGrok AI works entirely through web browsers. Customers simply scan a QR code and order immediately without downloading or installing anything."
    },
    {
      question: "How many languages does CafeGrok AI support?",
      answer: "CafeGrok AI supports 50+ languages including English, Arabic, French, Spanish, German, Chinese, Hindi, and more. Customers can view menus and order in their preferred language automatically."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://proinvest.global" },
    { name: "Solutions", url: "https://proinvest.global/solutions" },
    { name: "CafeGrok AI", url: "https://proinvest.global/solutions/procafeai" }
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
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Powered by Grok AI from xAI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ☕ CafeGrok AI
            </h1>
            <p className="text-2xl mb-6 text-amber-100">
              AI-Powered SaaS for Cafes & Restaurants
            </p>
            <p className="text-xl text-amber-100 mb-8">
              From QR Code Arrival to Smart Reports – Your AI Assistant for Smarter, Profitable Cafes. Save 30-50% on staff costs, increase sales 20-40%.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>30-50%</strong> staff cost savings</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>20-40%</strong> sales increase</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span><strong>50+</strong> languages supported</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.procafeai.com/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition text-center"
              >
                Start Now →
              </a>
              <a
                href="https://www.procafeai.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition text-center"
              >
                Contact Sales
              </a>
            </div>
            <p className="text-sm text-amber-200 mt-4">Credit card required • 7-day refund guarantee • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by 1,000+ cafes and restaurants worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">1,000+</p>
              <p className="text-sm text-gray-500 mt-1">Active Cafes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">50+</p>
              <p className="text-sm text-gray-500 mt-1">Languages</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">99.9%</p>
              <p className="text-sm text-gray-500 mt-1">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">24/7</p>
              <p className="text-sm text-gray-500 mt-1">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Save Costs. Boost Profits. <span className="text-amber-600">Automatically.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              CafeGrok AI transforms your operations with measurable results
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">💰</div>
                <div>
                  <p className="text-sm text-green-600 font-medium">LABOR SAVINGS</p>
                  <p className="text-4xl font-bold text-green-700">30-50%</p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Reduce Staff Costs Dramatically</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Customers order via QR – no waitstaff needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>AI handles orders, questions, and complaints</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Automate reservations, inventory, reporting</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">📈</div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">REVENUE INCREASE</p>
                  <p className="text-4xl font-bold text-blue-700">20-40%</p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Boost Sales with AI Intelligence</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>AI upsells and cross-sells every order</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom dish creation from inventory with dynamic pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Smart promotions based on weather, trends, inventory</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Simple Setup. <span className="text-amber-600">Zero Apps Needed.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Customers scan the QR code on their table and start chatting with AI instantly. No downloads, no logins, no friction. Works on any device, in any language.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">📱</div>
                  <div>
                    <h4 className="font-semibold">Scan QR, Start Ordering</h4>
                    <p className="text-sm text-gray-600">No apps to download. Works on any smartphone browser instantly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">💬</div>
                  <div>
                    <h4 className="font-semibold">Natural Conversation</h4>
                    <p className="text-sm text-gray-600">Order like talking to a friend. &quot;I&apos;d like a latte, extra hot&quot; just works.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">🌍</div>
                  <div>
                    <h4 className="font-semibold">Auto Language Detection</h4>
                    <p className="text-sm text-gray-600">Grok AI detects and responds in customer&apos;s preferred language automatically.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto border">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white">🤖</div>
                  <div>
                    <p className="font-semibold">CafeGrok AI</p>
                    <p className="text-xs text-green-500">Online</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                    <p className="text-sm">Welcome to Sunrise Cafe! ☀️ How can I help you today?</p>
                  </div>
                  <div className="bg-amber-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto">
                    <p className="text-sm">I&apos;d like a custom iced coffee with oat milk</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                    <p className="text-sm">Great choice! 🧊 I can make that with our premium oat milk. Would you like caramel or vanilla syrup? Today&apos;s special: Add a croissant!</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                ✓ No app download
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                🌍 50+ languages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Cafe Needs. <span className="text-amber-600">All in One Platform.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From customer ordering to kitchen management to owner reports – powered by Grok AI
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">QR Code System</h3>
              <p className="text-gray-600 text-sm">Table-specific QR codes for ordering, plus entrance QR for promotional engagement and reservations.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Chat Ordering</h3>
              <p className="text-gray-600 text-sm">Natural conversation ordering with Grok AI. Understands context, handles customizations, and upsells intelligently.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-semibold mb-2">Kitchen Display</h3>
              <p className="text-gray-600 text-sm">Real-time order display with priority management and prep time tracking.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Integrated POS</h3>
              <p className="text-gray-600 text-sm">Complete point of sale with cash, card, and digital payments.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-600 text-sm">AI-powered insights on sales, inventory, and customer behavior.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-gray-600 text-sm">Track stock levels, get low-stock alerts, and automate reordering.</p>
            </div>
          </div>

          {/* Grok AI Highlight */}
          <div className="mt-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 md:p-12 text-white max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Powered by Grok AI from xAI</h3>
                <p className="opacity-90 mb-6">
                  Grok acts as your intelligent AI assistant specifically trained for cafe operations. It understands context, remembers preferences, handles complex customizations, and provides smart suggestions to both customers and managers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    <span>Natural conversation in 50+ languages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    <span>Smart upselling and recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    <span>Manager insights: pricing, staffing, prep</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">🤖</div>
                <p className="text-lg font-medium">&quot;Your smartest employee that never sleeps&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent <span className="text-amber-600">Pricing</span>
            </h2>
            <p className="text-lg text-gray-600">Choose the plan that fits your cafe. Start growing your business today.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold">Basic</h3>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-bold">$200</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Perfect for small cafes getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 25 tables
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Single branch
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic AI chat
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Order management
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic reporting
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Email support
                </li>
              </ul>
              <a
                href="https://www.procafeai.com/checkout/basic"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-4 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Start Now
              </a>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border-2 border-amber-500 ring-4 ring-amber-500/20 hover:scale-105 transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold">Pro</h3>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-bold">$300</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Best for growing cafes with multiple locations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 50 tables
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 2 branches
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Full AI features
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Multi-branch linking
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced reporting
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Inventory management
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
              </ul>
              <a
                href="https://www.procafeai.com/checkout/pro"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-4 rounded-xl font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-lg shadow-amber-500/30"
              >
                Start Now
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-bold">$500</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">For large operations with advanced needs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 100 tables
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 5 branches
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All AI features
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom integrations
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  API access
                </li>
                <li className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Dedicated support
                </li>
              </ul>
              <a
                href="https://www.procafeai.com/checkout/enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-4 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Start Now
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            All plans include: Cancel anytime • 24/7 support • Secure payments via Stripe
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Cafe?
          </h2>
          <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
            Join 1,000+ cafes already growing with CafeGrok AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.procafeai.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all shadow-xl"
            >
              Start Now
            </a>
            <a
              href="https://www.procafeai.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/10 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-amber-600">Questions</span>
            </h2>
          </div>
          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                How does CafeGrok AI save staff costs?
                <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                CafeGrok AI automates order taking via QR codes and AI chat, reducing the need for waitstaff by 30-50%. Customers scan, order, and pay directly from their phones.
              </div>
            </details>
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                What is Grok AI and how does it help my cafe?
                <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Grok AI from xAI powers our intelligent chat system. It understands customer requests in any language, suggests menu items, handles customizations, and provides upsell recommendations to boost sales by 20-40%.
              </div>
            </details>
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                Can I manage multiple cafe branches?
                <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Yes! Our Pro and Enterprise plans support multi-branch management with unified dashboards, shared inventory, and cross-branch reporting.
              </div>
            </details>
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                Do customers need to download an app?
                <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                No. CafeGrok AI works entirely through web browsers. Customers simply scan a QR code and order immediately without downloading or installing anything.
              </div>
            </details>
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                How many languages does CafeGrok AI support?
                <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                CafeGrok AI supports 50+ languages including English, Arabic, French, Spanish, German, Chinese, Hindi, and more. Customers can view menus and order in their preferred language automatically.
              </div>
            </details>
            <details className="group bg-gray-50 rounded-xl">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold">
                How do I get started?
                <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Getting started is easy! Choose your plan (Basic $200/mo, Pro $300/mo, or Enterprise $500/mo), complete checkout, and you&apos;re ready to transform your cafe with AI-powered ordering within minutes.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Visit Website Banner */}
      <section className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-4">
            Visit the official CafeGrok AI website for more features, documentation, and support
          </p>
          <a
            href="https://www.procafeai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-xl"
          >
            www.procafeai.com
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
