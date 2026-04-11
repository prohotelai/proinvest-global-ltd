import Link from 'next/link';

export const metadata = {
  title: 'ProInvest Partner Network | Join Our Partner Program',
  description: 'Join the ProInvest Partner Network and earn lifetime commissions by referring customers to VisaRiskAI, ProHotelAI and ProCafeAI.',
};

export default function PartnersPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-navy-950 via-slate-900 to-purple-950">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8">
              <span className="text-teal-400 font-semibold text-sm">Partner Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Earn <span className="text-teal-400">Lifetime</span> Commissions
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join the ProInvest Partner Network and earn recurring commissions for every customer you refer to our AI platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ppn/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-navy-600 rounded-xl hover:scale-105 transition-all duration-300"
              >
                Become a Partner
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/ppn/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Partner Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start earning in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sign Up</h3>
              <p className="text-slate-600">
                Create your partner account and get approved. Access your unique referral links and marketing materials.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Promote</h3>
              <p className="text-slate-600">
                Share your unique links with your audience. Use our banners, widgets, and marketing content.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Earn</h3>
              <p className="text-slate-600">
                Earn lifetime commissions on every subscription payment. Get paid monthly via Stripe, Wise, or bank transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Partner With Us?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Lifetime Commissions</h3>
                    <p className="text-slate-600">Earn 5-30% on every payment while your referral stays subscribed</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">90-Day Cookie</h3>
                    <p className="text-slate-600">Long attribution window ensures you get credit for your referrals</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Marketing Materials</h3>
                    <p className="text-slate-600">Access banners, widgets, and promotional content for all products</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Real-Time Tracking</h3>
                    <p className="text-slate-600">Monitor clicks, conversions, and commissions in your dashboard</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy-950 to-purple-950 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Partner Tiers</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Starter</span>
                    <span className="text-teal-400">5-10%</span>
                  </div>
                  <p className="text-sm text-slate-300">Getting started with referrals</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Pro</span>
                    <span className="text-teal-400">10-15%</span>
                  </div>
                  <p className="text-sm text-slate-300">Active partners with consistent referrals</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Elite</span>
                    <span className="text-teal-400">15-25%</span>
                  </div>
                  <p className="text-sm text-slate-300">Top performers with high conversion rates</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl border border-teal-400/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Strategic</span>
                    <span className="text-teal-400">Up to 30%</span>
                  </div>
                  <p className="text-sm text-slate-300">Enterprise partners with custom agreements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Products You Can Promote</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Promote industry-leading AI platforms for hospitality and visa risk analysis
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* VisaRiskAI — FIRST */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100 relative">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-5">
                ✦ Featured
              </div>
              {/* VisaRiskAI Logo — SVG matching shield + bars + check design */}
              <div className="mb-4">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="VisaRiskAI Logo">
                  {/* Shield background */}
                  <path d="M28 4L8 12V28C8 38.5 17 47.5 28 52C39 47.5 48 38.5 48 28V12L28 4Z" fill="#0f1338" />
                  {/* Upward bar chart — analytics */}
                  <rect x="15" y="30" width="5" height="12" rx="1" fill="#2dd4bf" />
                  <rect x="23" y="24" width="5" height="18" rx="1" fill="#2dd4bf" />
                  <rect x="31" y="18" width="5" height="24" rx="1" fill="#14b8a6" />
                  {/* Green check circle overlay */}
                  <circle cx="41" cy="38" r="9" fill="#16a34a" />
                  <path d="M36.5 38.2L39.5 41.2L45.5 35.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">VisaRiskAI</h3>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Make visa decisions before you apply.</p>
              <p className="text-slate-600 mb-5">
                AI-powered visa risk analysis platform that evaluates application strength, detects hidden risks, and helps users improve approval chances before submission.
              </p>
              <a href="https://www.visariskai.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">
                Learn more →
              </a>
            </div>
            {/* ProCafeAI — SECOND */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">ProCafeAI</h3>
              <p className="text-slate-600 mb-4">
                AI platform for cafés and restaurants. QR ordering, AI recommendations, and kitchen coordination.
              </p>
              <a href="https://procafeai.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">
                Learn more →
              </a>
            </div>
            {/* ProHotelAI — THIRD */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">ProHotelAI</h3>
              <p className="text-slate-600 mb-4">
                AI-powered platform for hotels and resorts. 24/7 guest assistance, automated operations, and multilingual support.
              </p>
              <a href="https://prohotelai.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-semibold hover:underline">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-navy-600 to-purple-600">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of partners already earning lifetime commissions with ProInvest Partner Network.
          </p>
          <Link
            href="/ppn/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-navy-700 bg-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            Apply Now - It&apos;s Free
          </Link>
          <p className="text-white/70 mt-4 text-sm">
            Applications reviewed within 24-48 hours
          </p>
        </div>
      </section>
    </div>
  );
}
