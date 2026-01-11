import { Metadata } from 'next';
import Link from 'next/link';
import { proHotelAIMetadata } from '@/lib/seo';
import { generateProHotelAISchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';

export const metadata: Metadata = proHotelAIMetadata('en');

export default function ProHotelAI() {
  // Product Schema
  const productSchema = generateProHotelAISchema();
  
  // FAQ Schema
  const faqSchema = generateFAQSchema([
    {
      question: "What is ProHotelAI?",
      answer: "ProHotelAI is an AI-powered hotel operations platform developed by PROINVEST GLOBAL LTD. It automates guest interactions, front desk operations, service requests, and provides operational analytics. The platform includes a 24/7 AI guest assistant, automated check-in/check-out, and multilingual support."
    },
    {
      question: "Which hotels can use ProHotelAI?",
      answer: "ProHotelAI is designed for 4-star and 5-star hotels, luxury resorts, boutique hotels, and hotel chains. It works for properties of all sizes, from independent hotels to large multi-property management companies."
    },
    {
      question: "How does the AI guest assistant work?",
      answer: "The AI guest assistant communicates with guests via chat and voice interfaces in multiple languages. It answers questions about hotel services, processes service requests (room service, housekeeping, concierge), handles complaints, and escalates complex issues to human staff when needed. It operates 24/7 without breaks."
    },
    {
      question: "Does ProHotelAI replace hotel staff?",
      answer: "No. ProHotelAI automates repetitive tasks and routine inquiries, allowing staff to focus on high-value guest interactions and complex problem-solving. It reduces staff workload by 40-60% but does not eliminate the need for human hotel employees."
    },
    {
      question: "How does ProHotelAI integrate with hotel systems?",
      answer: "ProHotelAI integrates with existing Property Management Systems (PMS), Point of Sale (POS) systems, and housekeeping management systems via standard APIs. Integration typically takes 2-4 weeks depending on system complexity."
    },
    {
      question: "What languages does ProHotelAI support?",
      answer: "ProHotelAI supports 50+ languages including English, Arabic, French, Spanish, German, Chinese, Japanese, and more. The AI can automatically detect guest language preferences and switch languages mid-conversation."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://proinvest-global.com" },
    { name: "Solutions", url: "https://proinvest-global.com/solutions" },
    { name: "ProHotelAI", url: "https://proinvest-global.com/solutions/prohotelai" }
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ProHotelAI
            </h1>
            <p className="text-2xl mb-6 text-blue-100">
              AI-Powered Hotel Operations Platform
            </p>
            <p className="text-xl text-blue-100 mb-8">
              Transform guest experiences and streamline operations with our comprehensive AI platform designed specifically for hotels and resorts.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
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
              Revolutionize Hotel Operations
            </h2>
            <p className="text-lg text-gray-600">
              ProHotelAI is a production-ready AI platform that automates guest interactions, optimizes operations, and delivers exceptional experiences at scale. Built for 4 & 5 star hotels, resorts, and hotel chains.
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
            {/* AI Guest Assistant */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Guest Assistant</h3>
                  <p className="text-gray-600">
                    Intelligent chat and voice assistant available 24/7 to handle guest inquiries, requests, and support in multiple languages. Reduces front desk workload while improving guest satisfaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Service Automation */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Guest Service Automation</h3>
                  <p className="text-gray-600">
                    Streamline room service, housekeeping requests, concierge services, and maintenance tickets. Automated routing and tracking of all guest requests from initiation to completion.
                  </p>
                </div>
              </div>
            </div>

            {/* Front Desk Automation */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Front Desk & Support Automation</h3>
                  <p className="text-gray-600">
                    Optimize check-in/check-out processes, reservation management, and guest communications. Reduce waiting times and administrative overhead while maintaining personalized service.
                  </p>
                </div>
              </div>
            </div>

            {/* Multilingual Support */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multilingual Support</h3>
                  <p className="text-gray-600">
                    Communicate with international guests in their preferred language. Support for major languages ensures seamless guest experiences regardless of origin.
                  </p>
                </div>
              </div>
            </div>

            {/* PMS Integrations */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">PMS Integrations</h3>
                  <p className="text-gray-600">
                    Seamless integration with leading property management systems. Sync guest data, reservations, and operational information in real-time for unified operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Analytics */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Operational Analytics</h3>
                  <p className="text-gray-600">
                    Comprehensive dashboards and reports provide insights into guest behavior, service performance, and operational efficiency. Make data-driven decisions to optimize your hotel.
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
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Increase Revenue</h3>
              <p className="text-gray-600">
                Improve guest satisfaction scores, increase upselling opportunities, and boost repeat bookings through superior service delivery.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reduce Costs</h3>
              <p className="text-gray-600">
                Lower staffing requirements, reduce response times, and minimize operational inefficiencies through intelligent automation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enhance Guest Experience</h3>
              <p className="text-gray-600">
                Deliver instant, personalized service 24/7. Meet and exceed guest expectations with AI-powered assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customers */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Built For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🏨</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4 & 5 Star Hotels</h3>
                <p className="text-gray-600">Premium properties seeking to elevate guest experiences</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🏖️</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Resorts</h3>
                <p className="text-gray-600">Large properties with complex guest service requirements</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🏢</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hotel Chains</h3>
                <p className="text-gray-600">Multi-property operators requiring standardized operations</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="text-3xl mr-4">🌍</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Management Companies</h3>
                <p className="text-gray-600">Companies managing multiple hospitality properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Hotel Operations
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join leading hotels using ProHotelAI to deliver exceptional guest experiences and optimize operations.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
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
                What is ProHotelAI?
              </h3>
              <p className="text-gray-600">
                ProHotelAI is an AI-powered hotel operations platform developed by PROINVEST GLOBAL LTD. It automates guest interactions, front desk operations, service requests, and provides operational analytics. The platform includes a 24/7 AI guest assistant, automated check-in/check-out, and multilingual support.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Which hotels can use ProHotelAI?
              </h3>
              <p className="text-gray-600">
                ProHotelAI is designed for 4-star and 5-star hotels, luxury resorts, boutique hotels, and hotel chains. It works for properties of all sizes, from independent hotels to large multi-property management companies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How does the AI guest assistant work?
              </h3>
              <p className="text-gray-600">
                The AI guest assistant communicates with guests via chat and voice interfaces in multiple languages. It answers questions about hotel services, processes service requests (room service, housekeeping, concierge), handles complaints, and escalates complex issues to human staff when needed. It operates 24/7 without breaks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Does ProHotelAI replace hotel staff?
              </h3>
              <p className="text-gray-600">
                No. ProHotelAI automates repetitive tasks and routine inquiries, allowing staff to focus on high-value guest interactions and complex problem-solving. It reduces staff workload by 40-60% but does not eliminate the need for human hotel employees.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How does ProHotelAI integrate with hotel systems?
              </h3>
              <p className="text-gray-600">
                ProHotelAI integrates with existing Property Management Systems (PMS), Point of Sale (POS) systems, and housekeeping management systems via standard APIs. Integration typically takes 2-4 weeks depending on system complexity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What languages does ProHotelAI support?
              </h3>
              <p className="text-gray-600">
                ProHotelAI supports 50+ languages including English, Arabic, French, Spanish, German, Chinese, Japanese, and more. The AI can automatically detect guest language preferences and switch languages mid-conversation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
