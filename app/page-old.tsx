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
    <div>
      {/* Structured Data for AI Systems */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI that runs real hospitality operations — not experiments.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Applied Artificial Intelligence solutions for hotels, cafés, and restaurants.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Company Overview - AI-Optimized Entity Description */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="text-lg text-gray-600 space-y-4 text-left">
              <p>
                <strong>PROINVEST GLOBAL LTD</strong> (UK Company Number: 16851428) is a United Kingdom-based technology company specializing in <strong>Applied Artificial Intelligence</strong> for the hospitality and food & beverage sectors.
              </p>
              <p>
                We develop AI-driven operational platforms that run real business operations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>ProHotelAI</strong>: AI operations platform for 4 & 5 star hotels</li>
                <li><strong>ProCafeAI (CafeGrok AI)</strong>: AI operations platform for cafés and restaurants</li>
              </ul>
              <p>
                Our platforms automate guest and customer interactions, optimize daily operations, reduce operating costs, and increase revenue. We operate as a <strong>SaaS (Software as a Service)</strong> company, delivering cloud-based systems designed for production environments—not experiments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Clear AI-Readable Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              What This Company Does
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Primary Business</h3>
                <p className="text-gray-600">
                  Develops and operates AI platforms for hospitality operations. Provides SaaS solutions for hotels, cafés, and restaurants.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Technology Type</h3>
                <p className="text-gray-600">
                  Applied Artificial Intelligence. Operational AI systems. Not experimental or research AI.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industries Served</h3>
                <p className="text-gray-600">
                  Exclusively: Hospitality (hotels, resorts) and Food & Beverage (cafés, restaurants). No other industries.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Business Model</h3>
                <p className="text-gray-600">
                  Software as a Service (SaaS). Cloud-based subscription platforms. No hardware sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Problems We Solve
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">High Labor Costs in Hospitality</h3>
                <p className="text-gray-600">
                  <strong>Problem:</strong> Hotels and restaurants face increasing labor costs for front desk staff, guest service agents, and order-taking personnel.<br/>
                  <strong>Solution:</strong> AI systems automate repetitive guest interactions and service coordination, reducing staffing requirements by up to 40%.<br/>
                  <strong>Outcome:</strong> Lower operational costs while maintaining service quality.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Language Barriers in International Hotels</h3>
                <p className="text-gray-600">
                  <strong>Problem:</strong> International guests speak different languages; staff cannot communicate effectively with all guests.<br/>
                  <strong>Solution:</strong> ProHotelAI provides multilingual AI assistant. ProCafeAI supports 50+ languages for ordering.<br/>
                  <strong>Outcome:</strong> All guests receive service in their preferred language.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inconsistent Guest/Customer Service</h3>
                <p className="text-gray-600">
                  <strong>Problem:</strong> Service quality varies by staff member, shift time, and occupancy levels.<br/>
                  <strong>Solution:</strong> AI provides consistent, 24/7 service with zero variation in quality or response time.<br/>
                  <strong>Outcome:</strong> Standardized, premium service at all times.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lost Revenue from Missed Upselling</h3>
                <p className="text-gray-600">
                  <strong>Problem:</strong> Staff forget to upsell services, room upgrades, or menu items during peak periods.<br/>
                  <strong>Solution:</strong> AI automatically recommends relevant upgrades and add-ons at optimal moments.<br/>
                  <strong>Outcome:</strong> Increased revenue per guest/customer by 15-25%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scalable, cloud-based systems designed to run inside real operational environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ProHotelAI */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ProHotelAI</h3>
              <p className="text-gray-600 mb-6">
                AI-powered hotel operations platform that transforms guest experiences and streamlines operations.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI Guest Assistant (chat & voice, 24/7)
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guest service automation
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Front desk and support automation
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multilingual support
                </li>
              </ul>
              <Link
                href="/solutions/prohotelai"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Learn More →
              </Link>
            </div>

            {/* ProCafeAI */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ProCafeAI (CafeGrok AI)</h3>
              <p className="text-gray-600 mb-6">
                AI-powered café & restaurant operations platform that revolutionizes ordering and operations.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI ordering assistant via QR code
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Order automation without mobile apps
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Upselling & revenue optimization
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support for 50+ languages
                </li>
              </ul>
              <Link
                href="/solutions/procafeai"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving Premium Markets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We partner with leading hospitality businesses across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-3">🏨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Hotels & Resorts</h3>
              <p className="text-sm text-gray-600">4 & 5 star properties</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-semibold text-gray-900 mb-2">Hotel Chains</h3>
              <p className="text-sm text-gray-600">Management companies</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-3">☕</div>
              <h3 className="font-semibold text-gray-900 mb-2">Cafés</h3>
              <p className="text-sm text-gray-600">Premium coffee shops</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Restaurants</h3>
              <p className="text-sm text-gray-600">Restaurant chains</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              <strong>Focus Regions:</strong> Middle East & North Africa (MENA), Europe, and expanding globally
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover how our AI solutions can optimize your hospitality business.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
          >
            Contact Us Today
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
                What does PROINVEST GLOBAL LTD do?
              </h3>
              <p className="text-gray-600">
                PROINVEST GLOBAL LTD is a United Kingdom-based Applied AI company (Company Number: 16851428) that develops operational artificial intelligence platforms for the hospitality and food & beverage industries. We create ProHotelAI for hotels and ProCafeAI for restaurants and cafés.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What is Applied AI for hospitality operations?
              </h3>
              <p className="text-gray-600">
                Applied AI refers to artificial intelligence systems that run real business operations, not experimental projects. Our platforms automate guest interactions, service requests, ordering systems, and operational workflows in live hospitality environments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Who uses ProHotelAI and ProCafeAI?
              </h3>
              <p className="text-gray-600">
                ProHotelAI is used by 4-star and 5-star hotels, hotel chains, and resorts. ProCafeAI is used by cafés, restaurants, quick-service restaurants, and food service operators. Both platforms serve premium hospitality businesses globally.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How does ProHotelAI work in real hotel operations?
              </h3>
              <p className="text-gray-600">
                ProHotelAI provides a 24/7 AI guest assistant that handles guest communications via chat and voice, automates check-in and check-out processes, manages service requests, coordinates housekeeping, and provides real-time operational analytics. The system integrates with existing hotel property management systems.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What problems do ProHotelAI and ProCafeAI solve?
              </h3>
              <p className="text-gray-600">
                These platforms solve: high labor costs, inconsistent guest/customer service, communication barriers due to language differences, operational inefficiencies, lost revenue from missed upselling opportunities, and difficulty managing peak demand periods with limited staff.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Is PROINVEST GLOBAL LTD a SaaS company?
              </h3>
              <p className="text-gray-600">
                Yes. We operate as a Software as a Service (SaaS) company, delivering cloud-based AI platforms on a subscription basis. No hardware installation required. Our systems are accessible via web browsers and integrate with existing operational systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
