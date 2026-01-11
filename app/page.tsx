import Link from 'next/link';

export default function Home() {
  return (
    <div>
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

      {/* Company Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transforming Hospitality with AI
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Proinvest Global Ltd is a UK-based technology and investment company specializing in Applied Artificial Intelligence solutions for the hospitality and food & beverage sectors.
            </p>
            <p className="text-lg text-gray-600">
              We develop AI-driven operational platforms that automate guest and customer interactions, optimize daily operations, reduce operating costs, and increase revenue for hotels, cafés, and restaurants.
            </p>
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
    </div>
  );
}
