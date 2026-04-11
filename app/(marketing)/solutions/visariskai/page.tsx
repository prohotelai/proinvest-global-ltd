import { Metadata } from 'next';
import Link from 'next/link';
import { generateVisaRiskAISchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'VisaRiskAI | AI-Powered Visa Risk Analysis Platform | ProInvest Global',
  description:
    'AI-powered visa risk analysis, case assessment, risk detection, and pre-submission readiness. Know your approval probability before you apply.',
  keywords:
    'visa risk analysis, visa approval AI, immigration risk assessment, visa case strength, file readiness, decision confidence, AI immigration tool, VisaRiskAI',
  alternates: {
    canonical: 'https://proinvest-global.com/solutions/visariskai',
  },
  openGraph: {
    title: 'VisaRiskAI | AI-Powered Visa Risk Analysis Platform',
    description:
      'AI-powered visa risk analysis, case assessment, risk detection, and pre-submission readiness. Know your approval probability before you apply.',
    url: 'https://proinvest-global.com/solutions/visariskai',
    siteName: 'PROINVEST GLOBAL LTD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisaRiskAI | AI-Powered Visa Risk Analysis',
    description:
      'AI-powered visa risk analysis, case assessment, risk detection, and pre-submission readiness.',
  },
};

export default function VisaRiskAIPage() {
  const productSchema = generateVisaRiskAISchema();

  const faqSchema = generateFAQSchema([
    {
      question: 'What is VisaRiskAI?',
      answer:
        'VisaRiskAI is an AI-powered visa risk analysis platform developed under PROINVEST GLOBAL LTD. It analyzes your profile, documents, and application factors to estimate approval probability, highlight weak points, and guide you toward a stronger submission.',
    },
    {
      question: 'Who is VisaRiskAI for?',
      answer:
        'VisaRiskAI serves individual applicants who want to avoid rejection, immigration consultants who want faster case evaluation and stronger client outcomes, and travel or visa agencies handling multiple cases at scale.',
    },
    {
      question: 'Does VisaRiskAI guarantee visa approval?',
      answer:
        'No. VisaRiskAI is a decision-support and case-analysis platform. It does not guarantee any visa outcome. Final visa decisions rest with the relevant immigration authority. VisaRiskAI helps you understand and improve your case before submission.',
    },
    {
      question: 'How does the risk analysis work?',
      answer:
        'VisaRiskAI evaluates your profile against real approval patterns, detects inconsistencies and hidden risks, highlights missing or weak supporting factors, and provides structured guidance before you submit your application.',
    },
    {
      question: 'How do I get access?',
      answer:
        'VisaRiskAI is available at https://www.visariskai.com/ — a cloud-based platform requiring no installation.',
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://proinvest-global.com' },
    { name: 'Solutions', url: 'https://proinvest-global.com/solutions' },
    { name: 'VisaRiskAI', url: 'https://proinvest-global.com/solutions/visariskai' },
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

      {/* ─── SECTION 1: HERO ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-700 to-violet-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Visa &amp; Immigration Risk Analysis
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Make visa decisions before you apply — not after rejection
            </h1>

            <p className="text-xl md:text-2xl text-indigo-100 mb-4 leading-relaxed">
              AI-powered visa risk analysis that evaluates your case, detects hidden risks, and
              helps you submit stronger applications with confidence.
            </p>

            <p className="text-lg text-indigo-200 mb-10">
              VisaRiskAI analyzes your profile, documents, and application factors to estimate
              approval probability, highlight weak points, and guide you toward a safer submission.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.visariskai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
              >
                Analyze Your Case
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: WHAT VISARISKAI DOES ─────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              From uncertainty to clarity — in minutes
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Applying for a visa is not just about eligibility — it&apos;s about how your case is
              presented.
            </p>

            <p className="text-lg text-gray-700 font-medium mb-4">
              VisaRiskAI uses intelligent analysis to:
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Evaluate your profile against real approval patterns',
                'Detect inconsistencies and hidden risks',
                'Highlight missing or weak supporting factors',
                'Provide actionable guidance before submission',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-lg text-gray-700 italic border-l-4 border-indigo-500 pl-4">
              Instead of guessing your chances, you understand them.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: CORE CAPABILITIES ────────────────────────── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Risk Analysis */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Case Risk Analysis</h3>
              <p className="text-gray-600">
                Understand your approval probability before applying. Get a clear breakdown of
                strengths vs risks in your case.
              </p>
            </div>

            {/* Document & Profile Evaluation */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Document &amp; Profile Evaluation</h3>
              <p className="text-gray-600">
                Identify missing, weak, or inconsistent information. Ensure your application tells
                a strong, coherent story.
              </p>
            </div>

            {/* Risk Factor Detection */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Factor Detection</h3>
              <p className="text-gray-600">
                Detect critical issues such as incomplete documentation, weak financial profile,
                travel history gaps, and inconsistent data.
              </p>
            </div>

            {/* Decision Confidence Scoring */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Decision Confidence Scoring</h3>
              <p className="text-gray-600">
                Get a structured confidence score instead of assumptions. Know whether to apply,
                improve, or delay.
              </p>
            </div>

            {/* Pre-Submission Optimization */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Submission Optimization</h3>
              <p className="text-gray-600">
                Fix problems before they become rejections. Improve your case before it reaches the
                embassy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHO IT'S FOR ──────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for real-world visa scenarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individuals */}
            <div className="bg-indigo-50 p-8 rounded-xl text-center">
              <div className="text-5xl mb-5">🧳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Individuals</h3>
              <p className="text-gray-600">
                Applicants who want to avoid rejection and understand their real chances before
                applying.
              </p>
            </div>

            {/* Immigration Consultants */}
            <div className="bg-violet-50 p-8 rounded-xl text-center">
              <div className="text-5xl mb-5">⚖️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Immigration Consultants</h3>
              <p className="text-gray-600">
                Professionals who want faster case evaluation and stronger client outcomes.
              </p>
            </div>

            {/* Travel & Visa Agencies */}
            <div className="bg-indigo-50 p-8 rounded-xl text-center">
              <div className="text-5xl mb-5">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Travel &amp; Visa Agencies</h3>
              <p className="text-gray-600">
                Teams that handle multiple cases and need scalable, structured analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: WHY IT MATTERS ───────────────────────────── */}
      <section className="bg-gray-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Because rejection is not just a &quot;no&quot;
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              A visa rejection is more than a failed application:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'It affects your future applications',
                'It becomes part of your record',
                'It reduces your approval chances next time',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-lg text-indigo-300 font-medium border-l-4 border-indigo-500 pl-4">
              VisaRiskAI helps you avoid avoidable mistakes — before they cost you.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: BENEFITS ─────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why teams and applicants use VisaRiskAI
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Reduce avoidable rejections',
                'Improve application quality',
                'Save time on manual evaluation',
                'Make data-driven decisions',
                'Increase approval confidence',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: TRUST / BRAND POSITIONING ────────────────── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Applied AI for smarter case decisions
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Built by ProInvest Global — delivering applied AI solutions for real-world
              decision-making.
            </p>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <p className="text-xl font-semibold text-gray-900 mb-2">No guesswork. No generic advice.</p>
              <p className="text-lg text-gray-600">
                Only structured analysis based on real case logic.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/about"
                className="text-indigo-600 font-medium hover:underline"
              >
                Learn more about ProInvest Global →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">What is VisaRiskAI?</h3>
                <p className="text-gray-600 text-sm">
                  VisaRiskAI is an AI-powered visa risk analysis platform developed under
                  PROINVEST GLOBAL LTD. It analyzes your profile, documents, and application
                  factors to estimate approval probability and guide you toward a stronger
                  submission.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Does VisaRiskAI guarantee approval?</h3>
                <p className="text-gray-600 text-sm">
                  No. VisaRiskAI is a decision-support and case-analysis platform. Final visa
                  decisions rest with the relevant immigration authority. VisaRiskAI helps you
                  understand and improve your case before submission.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">How do I get access?</h3>
                <p className="text-gray-600 text-sm">
                  VisaRiskAI is available at{' '}
                  <a
                    href="https://www.visariskai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    visariskai.com
                  </a>
                  . Cloud-based, no installation required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-700 to-violet-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t apply blindly. Apply strategically.
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Know your risks. Fix your case. Apply with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.visariskai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
            >
              Analyze Your Case Now
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
