import Link from 'next/link';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/structuredData';

export default function Home() {
  // FAQ Schema for AI Systems
  const faqSchema = generateFAQSchema([
    {
      question: "What does PROINVEST GLOBAL LTD do?",
      answer: "PROINVEST GLOBAL LTD is a United Kingdom-based Applied AI company (Company Number: 16851428) that develops operational artificial intelligence platforms for the hospitality and food & beverage industries. We create ProHotelAI for hotels and ProCafeAI for restaurants and cafés."
    },
    {
      question: "What is Applied AI for hospitality operations?",
      answer: "Applied AI refers to artificial intelligence systems that run real business operations, not experimental projects. Our platforms automate guest interactions, service requests, ordering systems, and operational workflows in live hospitality environments."
    },
    {
      question: "Who uses ProHotelAI and ProCafeAI?",
      answer: "ProHotelAI is used by 4-star and 5-star hotels, hotel chains, and resorts. ProCafeAI is used by cafés, restaurants, quick-service restaurants, and food service operators. Both platforms serve premium hospitality businesses globally."
    },
    {
      question: "How does ProHotelAI work in real hotel operations?",
      answer: "ProHotelAI provides a 24/7 AI guest assistant that handles guest communications via chat and voice, automates check-in and check-out processes, manages service requests, coordinates housekeeping, and provides real-time operational analytics. The system integrates with existing hotel property management systems."
    },
    {
      question: "What problems do ProHotelAI and ProCafeAI solve?",
      answer: "These platforms solve: high labor costs, inconsistent guest/customer service, communication barriers due to language differences, operational inefficiencies, lost revenue from missed upselling opportunities, and difficulty managing peak demand periods with limited staff."
    },
    {
      question: "Is PROINVEST GLOBAL LTD a SaaS company?",
      answer: "Yes. We operate as a Software as a Service (SaaS) company, delivering cloud-based AI platforms on a subscription basis. No hardware installation required. Our systems are accessible via web browsers and integrate with existing operational systems."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://proinvest-global.com" }
  ]);

  return (
    <div className="bg-white">
      {/* Structured Data for AI Systems */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section - Enterprise Grade */}
      <section className="relative bg-gradient-to-br from-navy-700 via-navy-600 to-navy-500 text-white overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="section-container relative z-10">
          <div className="py-24 md:py-32 lg:py-40">
            <div className="max-w-4xl">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">UK Company 16851428 | Applied AI SaaS</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                AI that runs real hospitality operations — not experiments.
              </h1>
              
              <p className="text-xl md:text-2xl mb-4 text-navy-100 leading-relaxed max-w-3xl">
                Applied Artificial Intelligence for hotels, cafés, and restaurants.
              </p>
              
              <p className="text-lg text-navy-200 mb-10 max-w-2xl">
                PROINVEST GLOBAL LTD develops operational AI platforms that automate guest services, optimize operations, and increase revenue for premium hospitality businesses globally.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-navy-700 rounded-lg text-lg font-semibold hover:bg-neutral-50 transition-all duration-200 shadow-enterprise-lg"
                >
                  Contact Us
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview - Who We Are */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-6">
                Who We Are
              </h2>
              <div className="w-20 h-1 bg-teal-500 mx-auto mb-8" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-graphite-600 leading-relaxed mb-6">
                    <strong className="text-navy-700">PROINVEST GLOBAL LTD</strong> (UK Company Number: <strong>16851428</strong>) is a United Kingdom-based technology company specializing in <strong className="text-navy-600">Applied Artificial Intelligence</strong> for the hospitality and food & beverage sectors.
                  </p>
                  <p className="text-lg text-graphite-600 leading-relaxed">
                    We develop AI-driven operational platforms that run real business operations. Operating as a <strong className="text-navy-600">SaaS (Software as a Service)</strong> company, we deliver cloud-based systems designed for production environments—not experiments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card-enterprise text-center">
                  <div className="text-teal-500 font-bold text-4xl mb-2">2</div>
                  <div className="text-sm font-semibold text-graphite-700">AI Platforms</div>
                  <div className="text-xs text-graphite-500 mt-1">ProHotelAI & ProCafeAI</div>
                </div>
                <div className="card-enterprise text-center">
                  <div className="text-teal-500 font-bold text-4xl mb-2">24/7</div>
                  <div className="text-sm font-semibold text-graphite-700">AI Operations</div>
                  <div className="text-xs text-graphite-500 mt-1">Continuous service</div>
                </div>
                <div className="card-enterprise text-center">
                  <div className="text-teal-500 font-bold text-4xl mb-2">50+</div>
                  <div className="text-sm font-semibold text-graphite-700">Languages</div>
                  <div className="text-xs text-graphite-500 mt-1">Global reach</div>
                </div>
                <div className="card-enterprise text-center">
                  <div className="text-teal-500 font-bold text-4xl mb-2">UK</div>
                  <div className="text-sm font-semibold text-graphite-700">Registered</div>
                  <div className="text-xs text-graphite-500 mt-1">Company 16851428</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-6">
              Our Solutions
            </h2>
            <p className="text-lg text-graphite-600 max-w-3xl mx-auto">
              Production-ready AI platforms designed to automate operations, enhance experiences, and drive profitability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* ProHotelAI Card */}
            <div className="card-enterprise group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-navy-700 mb-2 group-hover:text-teal-600 transition-colors">
                    ProHotelAI
                  </h3>
                  <p className="text-sm font-medium text-teal-600 uppercase tracking-wide">AI for Hotels & Resorts</p>
                </div>
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              <p className="text-graphite-600 mb-6 leading-relaxed">
                AI-powered hotel operations platform for 4 & 5 star properties. Automates guest interactions, streamlines operations, and delivers exceptional experiences at scale.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-graphite-700">24/7 AI Guest Assistant (chat & voice)</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-graphite-700">Automated check-in/check-out & front desk operations</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-graphite-700">Multilingual support & operational analytics</span>
                </div>
              </div>

              <Link
                href="/solutions/prohotelai"
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors"
              >
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* ProCafeAI Card */}
            <div className="card-enterprise group">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-navy-700 mb-2 group-hover:text-teal-600 transition-colors">
                    ProCafeAI
                  </h3>
                  <p className="text-sm font-medium text-teal-600 uppercase tracking-wide">AI for Cafés & Restaurants</p>
                </div>
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              <p className="text-graphite-600 mb-6 leading-relaxed">
                AI-powered operations platform for F&B businesses. Revolutionizes ordering, optimizes operations, and increases revenue through intelligent automation.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-graphite-700">QR code ordering without mobile apps</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-graphite-700">AI menu recommendations & upselling</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-graphite-700">Support for 50+ languages</span>
                </div>
              </div>

              <Link
                href="/solutions/procafeai"
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors"
              >
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-6">
                Problems We Solve
              </h2>
              <p className="text-lg text-graphite-600 max-w-3xl mx-auto">
                Applied AI that addresses real operational challenges in hospitality.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  problem: "High Labor Costs",
                  solution: "AI automates repetitive tasks and guest interactions",
                  outcome: "Reduce staffing requirements by up to 40%"
                },
                {
                  problem: "Language Barriers",
                  solution: "Multi-lingual AI assistants in 50+ languages",
                  outcome: "Every guest receives service in their language"
                },
                {
                  problem: "Inconsistent Service Quality",
                  solution: "24/7 AI with zero variation in response quality",
                  outcome: "Standardized premium service at all times"
                },
                {
                  problem: "Lost Revenue Opportunities",
                  solution: "AI automatically recommends relevant upsells",
                  outcome: "Increase revenue per guest by 15-25%"
                }
              ].map((item, index) => (
                <div key={index} className="card-enterprise border-l-4 border-teal-500">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-bold text-graphite-500 uppercase tracking-wider mb-2">Problem</div>
                      <div className="font-semibold text-navy-700 text-lg">{item.problem}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-graphite-500 uppercase tracking-wider mb-2">Solution</div>
                      <div className="text-graphite-600">{item.solution}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-graphite-500 uppercase tracking-wider mb-2">Outcome</div>
                      <div className="text-teal-600 font-semibold">{item.outcome}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-navy-700 text-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Premium Hospitality Businesses
            </h2>
            <p className="text-xl text-navy-100 mb-12">
              Serving 4 & 5-star hotels, hotel chains, cafés, and restaurants across global markets.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-navy-600/50 border border-navy-500/30 rounded-lg p-6">
                <div className="text-3xl mb-2">🏨</div>
                <div className="font-semibold text-sm">Hotels & Resorts</div>
              </div>
              <div className="bg-navy-600/50 border border-navy-500/30 rounded-lg p-6">
                <div className="text-3xl mb-2">🏢</div>
                <div className="font-semibold text-sm">Hotel Chains</div>
              </div>
              <div className="bg-navy-600/50 border border-navy-500/30 rounded-lg p-6">
                <div className="text-3xl mb-2">☕</div>
                <div className="font-semibold text-sm">Cafés</div>
              </div>
              <div className="bg-navy-600/50 border border-navy-500/30 rounded-lg p-6">
                <div className="text-3xl mb-2">🍽️</div>
                <div className="font-semibold text-sm">Restaurants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-graphite-600 mb-10 max-w-2xl mx-auto">
              Discover how our AI platforms can optimize your hospitality business.
            </p>
            <Link
              href="/contact"
              className="btn-primary text-lg"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What does PROINVEST GLOBAL LTD do?",
                  a: "PROINVEST GLOBAL LTD is a United Kingdom-based Applied AI company (Company Number: 16851428) that develops operational artificial intelligence platforms for the hospitality and food & beverage industries. We create ProHotelAI for hotels and ProCafeAI for restaurants and cafés."
                },
                {
                  q: "What is Applied AI for hospitality operations?",
                  a: "Applied AI refers to artificial intelligence systems that run real business operations, not experimental projects. Our platforms automate guest interactions, service requests, ordering systems, and operational workflows in live hospitality environments."
                },
                {
                  q: "Who uses ProHotelAI and ProCafeAI?",
                  a: "ProHotelAI is used by 4-star and 5-star hotels, hotel chains, and resorts. ProCafeAI is used by cafés, restaurants, quick-service restaurants, and food service operators. Both platforms serve premium hospitality businesses globally."
                },
                {
                  q: "Is PROINVEST GLOBAL LTD a SaaS company?",
                  a: "Yes. We operate as a Software as a Service (SaaS) company, delivering cloud-based AI platforms on a subscription basis. No hardware installation required. Our systems are accessible via web browsers and integrate with existing operational systems."
                }
              ].map((faq, index) => (
                <div key={index} className="card-enterprise">
                  <h3 className="text-lg font-bold text-navy-700 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-graphite-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
