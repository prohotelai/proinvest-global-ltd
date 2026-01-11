import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Proinvest Global Ltd | AI Solutions for Hospitality',
  description: 'Learn about Proinvest Global Ltd, a UK-based technology company specializing in Applied Artificial Intelligence for the hospitality sector.',
  openGraph: {
    title: 'About Proinvest Global Ltd',
    description: 'UK-based technology company specializing in Applied AI for hospitality.',
  },
};

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Proinvest Global Ltd
            </h1>
            <p className="text-xl text-gray-300">
              UK-based technology and investment company pioneering Applied Artificial Intelligence for hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                Proinvest Global Ltd is a UK-based technology and investment company specializing in Applied Artificial Intelligence solutions for the hospitality and food & beverage sectors.
              </p>
              <p>
                We develop AI-driven operational platforms that automate guest and customer interactions, optimize daily operations, reduce operating costs, and increase revenue for hotels, cafés, and restaurants.
              </p>
              <p>
                Operating under a SaaS (Software as a Service) model, we deliver scalable, cloud-based systems designed to run inside real operational environments—not experiments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-blue-600 text-white p-8 rounded-lg h-full">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-blue-100">
                  To transform hospitality operations through practical, production-ready AI solutions that deliver measurable results. We build technology that works in real environments, solving real operational challenges.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-gray-900 text-white p-8 rounded-lg h-full">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-300">
                  To be the global leader in Applied AI for hospitality, empowering hotels, cafés, and restaurants worldwide to deliver exceptional experiences while optimizing operations and maximizing profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automate Operations</h3>
              <p className="text-gray-600">
                Streamline guest interactions, order processing, and service delivery with intelligent automation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Increase Revenue</h3>
              <p className="text-gray-600">
                Optimize pricing, upselling, and customer engagement to maximize profitability.
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
                Lower operational expenses through intelligent resource allocation and process optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Company Information
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-semibold text-gray-500 uppercase">Company Name</dt>
                  <dd className="mt-1 text-lg text-gray-900">Proinvest Global Ltd</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-500 uppercase">Company Number</dt>
                  <dd className="mt-1 text-lg text-gray-900">16851428</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-500 uppercase">Registered Address</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    2 Frederick Street<br />
                    Kings Cross<br />
                    London WC1X 0ND<br />
                    United Kingdom
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-500 uppercase">Contact</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    Phone: <a href="tel:+447448810068" className="text-blue-600 hover:text-blue-700">+44 7448 810068</a><br />
                    Email: <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-700">info@proinvest.global</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner With Us
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover how Proinvest Global can transform your hospitality operations with AI.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
