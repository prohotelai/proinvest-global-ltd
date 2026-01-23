import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insights & Blog | AI in Hospitality | Proinvest Global',
  description: 'Expert insights on AI, hospitality technology, and digital transformation in hotels, cafés, and restaurants.',
  openGraph: {
    title: 'Insights & Thought Leadership',
    description: 'Stay informed about AI innovations in hospitality.',
  },
};

export default function Insights() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & Resources
            </h1>
            <p className="text-xl text-purple-100">
              Expert perspectives on AI, hospitality technology, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Stay Informed
            </h2>
            <p className="text-lg text-gray-600">
              Explore the latest trends, insights, and best practices in Applied AI for hospitality. Learn how leading businesses are leveraging technology to transform their operations.
            </p>
          </div>
        </div>
      </section>

      {/* Topic Categories */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Featured Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI & Automation</h3>
              <p className="text-gray-600">
                How artificial intelligence is reshaping hospitality operations and guest experiences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Optimization</h3>
              <p className="text-gray-600">
                Strategies and technologies for maximizing revenue in hotels and restaurants.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Transformation</h3>
              <p className="text-gray-600">
                Best practices for implementing technology solutions in hospitality businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insights Placeholder */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Insight 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-48 flex items-center justify-center">
                <div className="text-white text-6xl">🤖</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">AI & Technology</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Future of AI in Hotel Operations
                </h3>
                <p className="text-gray-600 mb-4">
                  Exploring how AI is transforming guest experiences and operational efficiency in the hospitality industry.
                </p>
                <div className="text-sm text-gray-500">Coming Soon</div>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-br from-green-500 to-green-600 h-48 flex items-center justify-center">
                <div className="text-white text-6xl">📱</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-2">Restaurant Tech</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Why QR Ordering Beats Mobile Apps
                </h3>
                <p className="text-gray-600 mb-4">
                  Understanding the advantages of app-free ordering systems for cafés and restaurants.
                </p>
                <div className="text-sm text-gray-500">Coming Soon</div>
              </div>
            </div>

            {/* Insight 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-48 flex items-center justify-center">
                <div className="text-white text-6xl">💰</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">Revenue Strategy</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Maximizing Revenue Through AI Upselling
                </h3>
                <p className="text-gray-600 mb-4">
                  Data-driven approaches to increasing average order value in F&B operations.
                </p>
                <div className="text-sm text-gray-500">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Trends */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Industry Trends
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI Adoption Accelerating in Hospitality
              </h3>
              <p className="text-gray-600">
                Leading hotels and restaurants are rapidly adopting AI technologies to meet evolving guest expectations and operational demands. The focus has shifted from experimental pilots to production-ready, scalable solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Labor Challenges Driving Automation
              </h3>
              <p className="text-gray-600">
                Staff shortages and rising labor costs are pushing hospitality businesses toward intelligent automation. AI-powered solutions help maintain service quality while optimizing workforce allocation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Contactless & Mobile-First Experiences
              </h3>
              <p className="text-gray-600">
                Post-pandemic expectations have permanently elevated the importance of contactless service and mobile-friendly ordering systems. Customers now expect seamless digital interactions as standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to receive the latest insights, case studies, and updates on AI in hospitality.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
