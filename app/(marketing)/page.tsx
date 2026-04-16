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
      question: "What is VisaRiskAI?",
      answer: "VisaRiskAI is a SaaS platform for pre-submission UK and Schengen visa risk analysis. Users create a case, complete a structured application flow, upload supporting documents, and receive a score, risk level, flags, verdict, and actionable improvement guidance before applying."
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://proinvest-global.com" }
  ]);

  return (
    <div className="bg-white">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section - World-Class Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-navy-950 to-purple-950">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="section-container relative z-10 py-32">
          <div className="max-w-6xl mx-auto">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-glass">
                <div className="pulse-dot" />
                <span className="text-sm font-semibold text-white">UK Company 16851428 • Applied AI SaaS Platform</span>
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-none">
                <span className="block text-white mb-3">AI that runs real</span>
                <span className="block">
                  <span className="text-gradient bg-gradient-to-r from-teal-400 via-navy-400 to-purple-400 bg-clip-text text-transparent">
                    hospitality operations
                  </span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto mb-6 leading-relaxed font-light">
                Applied Artificial Intelligence for hotels, cafés, and restaurants.
                <span className="block mt-2 text-slate-400 text-lg md:text-xl">
                  Not experiments. Real operations. Real results.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-navy-600 to-purple-600 rounded-2xl shadow-glow-lg hover:shadow-glow hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                Explore Solutions
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-navy-400 bg-clip-text text-transparent mb-2">2</div>
                <div className="text-slate-400 font-medium">AI Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-navy-400 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-slate-400 font-medium">AI Operations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-navy-400 bg-clip-text text-transparent mb-2">50+</div>
                <div className="text-slate-400 font-medium">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-navy-400 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-slate-400 font-medium">Cloud-Based</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Bento Grid - Features Section */}
      <section className="py-32 bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mb-6">
              Why <span className="text-gradient">PROINVEST GLOBAL</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We build AI that actually works in production. Real operations, real results, real impact.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Large Card - Production Ready */}
            <div className="card-bento md:col-span-2 lg:row-span-2 p-12">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="feature-icon mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-950 mb-4">Production-Ready AI</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our AI systems are built for real-world operations—not lab experiments. Every feature is tested, secure, and ready to handle your business demands from day one.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="px-4 py-3 bg-teal-50 rounded-xl">
                    <div className="text-2xl font-bold text-teal-600">99.9%</div>
                    <div className="text-sm text-slate-600">Uptime SLA</div>
                  </div>
                  <div className="px-4 py-3 bg-navy-50 rounded-xl">
                    <div className="text-2xl font-bold text-navy-600">SOC 2</div>
                    <div className="text-sm text-slate-600">Compliant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 24/7 Operations */}
            <div className="card-bento p-8">
              <div className="feature-icon mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">24/7 Operations</h3>
              <p className="text-slate-600">
                AI assistants that never sleep, never take breaks, and always deliver consistent service.
              </p>
            </div>

            {/* Multilingual */}
            <div className="card-bento p-8">
              <div className="feature-icon mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">50+ Languages</h3>
              <p className="text-slate-600">
                Serve global customers in their native language with AI-powered multilingual support.
              </p>
            </div>

            {/* Easy Integration */}
            <div className="card-bento p-8">
              <div className="feature-icon mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">Instant Deployment</h3>
              <p className="text-slate-600">
                Cloud-based SaaS. No hardware, no complex setup. Start in minutes, not months.
              </p>
            </div>

            {/* Data Privacy */}
            <div className="card-bento md:col-span-2 p-8">
              <div className="flex items-start gap-6">
                <div className="feature-icon flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-950 mb-3">Enterprise-Grade Security</h3>
                  <p className="text-lg text-slate-600 mb-4">
                    Bank-level encryption, GDPR compliance, and UK data sovereignty. Your data stays secure and under your control.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="badge badge-primary">GDPR Compliant</span>
                    <span className="badge badge-primary">UK Hosted</span>
                    <span className="badge badge-primary">ISO 27001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Glass Cards */}
      <section className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-slate-950 to-purple-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our AI Platforms
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Purpose-built AI solutions for hospitality and F&B operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* ProHotelAI */}
            <div className="card-glass group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-5xl mb-4">🏨</div>
                  <h3 className="text-3xl font-bold text-slate-950 mb-2 group-hover:text-navy-600 transition-colors">
                    ProHotelAI
                  </h3>
                  <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">AI for Hotels & Resorts</p>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                AI-powered hotel operations platform for 4 & 5 star properties. Automate guest interactions, streamline operations, deliver exceptional experiences.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">24/7 AI Guest Assistant (chat & voice)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">Automated check-in/check-out operations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">Multilingual support & analytics</span>
                </div>
              </div>

              <Link
                href="/solutions/prohotelai"
                className="inline-flex items-center gap-2 font-bold text-navy-600 hover:text-navy-700 group/link"
              >
                Learn More
                <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* ProCafeAI */}
            <div className="card-glass group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-5xl mb-4">☕</div>
                  <h3 className="text-3xl font-bold text-slate-950 mb-2 group-hover:text-navy-600 transition-colors">
                    ProCafeAI
                  </h3>
                  <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">AI for Cafés & Restaurants</p>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                AI-powered F&B operations platform. Revolutionize ordering, optimize operations, increase revenue through intelligent automation.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">QR code ordering (no apps required)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">AI menu recommendations & upselling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">Real-time kitchen & service coordination</span>
                </div>
              </div>

              <Link
                href="/solutions/procafeai"
                className="inline-flex items-center gap-2 font-bold text-navy-600 hover:text-navy-700 group/link"
              >
                Learn More
                <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VisaRiskAI Section */}
      <section className="py-32 bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 font-semibold text-sm mb-6">
                <span>Visa & Immigration SaaS</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mb-6">
                VisaRiskAI
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                A SaaS platform for pre-submission visa risk analysis for UK and Schengen applications.
                Users register, create a case, complete a structured application flow, upload supporting documents,
                and receive a score, risk level, flags, verdict, and actionable guidance before applying.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="card-bento p-10">
                <h3 className="text-2xl font-bold text-slate-950 mb-6">What the product actually includes</h3>
                <div className="space-y-4 text-slate-700">
                  <p><span className="font-semibold text-slate-950">Full SaaS architecture:</span> user accounts, sessions, verification flows, password reset, case lifecycle, package purchases, uploaded documents, analysis records, and recommendation history.</p>
                  <p><span className="font-semibold text-slate-950">Structured workflow:</span> application → standard → premium → completed, creating a clear conversion funnel instead of a one-page wizard.</p>
                  <p><span className="font-semibold text-slate-950">Document intelligence:</span> passport, bank statement, employment letter, invitation letter, and other uploads can be processed, extracted, and flagged.</p>
                  <p><span className="font-semibold text-slate-950">Commercial readiness:</span> Stripe Checkout, webhook handling, package tiers, revision limits, and affiliate attribution are already part of the product model.</p>
                </div>
              </div>

              <div className="card-bento p-10">
                <h3 className="text-2xl font-bold text-slate-950 mb-6">What it helps users do</h3>
                <div className="space-y-4 text-slate-700">
                  <p>Capture a visa case in a structured, auditable format.</p>
                  <p>Measure case completeness and identify missing evidence.</p>
                  <p>Detect contradictions, weaknesses, and risk flags before submission.</p>
                  <p>Assess uploaded documents instead of relying only on self-reported answers.</p>
                  <p>Determine whether a case is ready now, ready after fixes, or not ready yet.</p>
                  <p>Generate deeper outputs for selected packages, including PDFs and annotated review artifacts.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="card-bento p-8 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
                <div className="text-slate-950 font-semibold mb-2">Package Tiers</div>
                <p className="text-slate-600 text-sm">Basic, Standard, and Premium flows supported through the payment model.</p>
              </div>
              <div className="card-bento p-8 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">PDF</div>
                <div className="text-slate-950 font-semibold mb-2">Report Outputs</div>
                <p className="text-slate-600 text-sm">Application PDFs and annotated review files are part of the product structure.</p>
              </div>
              <div className="card-bento p-8 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">Loop</div>
                <div className="text-slate-950 font-semibold mb-2">Calibration Layer</div>
                <p className="text-slate-600 text-sm">Snapshots, outcomes, eval datasets, and calibration records support continuous refinement.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 md:p-12">
              <div className="max-w-4xl">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">Why this matters</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  VisaRiskAI is not positioned as a vague AI demo. Its strength is in a strong case data model,
                  a clear pipeline, document workflow, monetization structure, and a foundation for calibration and learning over time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="https://www.visariskai.com"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-950 rounded-2xl hover:bg-slate-800 transition-colors"
                  >
                    Visit VisaRiskAI
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 border-2 border-slate-300 rounded-2xl hover:bg-slate-100 transition-colors"
                  >
                    Discuss Product Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="card-gradient p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join leading hospitality businesses that trust PROINVEST GLOBAL LTD for their AI operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/contact"
                  className="btn bg-white text-navy-700 hover:scale-105 btn-lg font-bold"
                >
                  Get Started Today
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/solutions"
                  className="btn btn-ghost bg-white/10 border-2 border-white text-white hover:bg-white/20 btn-lg font-bold"
                >
                  View All Solutions
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
