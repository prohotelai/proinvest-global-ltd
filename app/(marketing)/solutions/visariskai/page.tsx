import { Metadata } from 'next';
import Link from 'next/link';
import { generateVisaRiskAISchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'VisaRiskAI — AI-Powered Visa Risk Analysis Platform | Proinvest Global',
  description:
    'VisaRiskAI helps applicants and advisors evaluate visa case strength, detect risk factors, and improve submission readiness before applying. AI-powered visa approval risk analysis.',
  keywords:
    'visa risk analysis, visa approval AI, immigration risk assessment, visa case strength, file readiness, AI immigration tool, VisaRiskAI',
  alternates: {
    canonical: 'https://proinvest-global.com/solutions/visariskai',
  },
  openGraph: {
    title: 'VisaRiskAI — AI-Powered Visa Risk Analysis Platform',
    description:
      'Evaluate visa case strength, detect risk factors, and improve your submission readiness with AI-driven analysis.',
    url: 'https://proinvest-global.com/solutions/visariskai',
    siteName: 'PROINVEST GLOBAL LTD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisaRiskAI — AI-Powered Visa Risk Analysis',
    description:
      'Evaluate visa case strength, detect risk factors, and improve your submission readiness with AI.',
  },
};

export default function VisaRiskAI() {
  const productSchema = generateVisaRiskAISchema();

  const faqSchema = generateFAQSchema([
    {
      question: 'What is VisaRiskAI?',
      answer:
        'VisaRiskAI is an AI-powered visa risk analysis platform developed under PROINVEST GLOBAL LTD. It helps individual applicants, immigration advisors, and visa service businesses evaluate the strength of a visa case, identify risk factors, and improve file readiness before submitting an application.',
    },
    {
      question: 'Who is VisaRiskAI designed for?',
      answer:
        'VisaRiskAI serves three primary audiences: individual visa applicants who want to understand and improve their chances before applying, immigration advisors and consultants who need a structured case assessment tool, and travel agencies or visa service businesses handling applications at scale.',
    },
    {
      question: 'How does the risk assessment work?',
      answer:
        'VisaRiskAI analyses case details against known visa approval criteria and risk patterns. It surfaces potential weaknesses, flags high-risk factors, and provides a structured readiness report so applicants and advisors can address issues before submission.',
    },
    {
      question: 'Does VisaRiskAI guarantee visa approval?',
      answer:
        'No. VisaRiskAI does not guarantee any visa outcome. It provides AI-driven analysis and guidance to improve case preparation and reduce avoidable errors. Final visa decisions remain with the relevant immigration authority.',
    },
    {
      question: 'How do I access VisaRiskAI?',
      answer:
        'VisaRiskAI is available at https://www.visariskai.com/. It is a cloud-based platform requiring no software installation.',
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

      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">VisaRiskAI</h1>
            <p className="text-2xl mb-6 text-indigo-100">AI-Powered Visa Risk Analysis Platform</p>
            <p className="text-xl text-indigo-100 mb-8">
              VisaRiskAI helps applicants and advisors evaluate visa case strength, detect risk
              factors, and improve submission readiness before applying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.visariskai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition text-center"
              >
                Visit VisaRiskAI →
              </a>
              <Link
                href="/contact"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What VisaRiskAI Does
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AI-driven case analysis that surfaces risk before it becomes rejection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Risk Assessment */}
            <div className="bg-indigo-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Case Risk Assessment</h3>
              <p className="text-gray-600">
                Analyse your visa case against known approval criteria and receive a structured risk
                score before you submit.
              </p>
            </div>

            {/* File Readiness Analysis */}
            <div className="bg-violet-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">File Readiness Analysis</h3>
              <p className="text-gray-600">
                Identify missing documents, weak supporting evidence, and gaps in your submission
                file before it reaches a decision-maker.
              </p>
            </div>

            {/* Risk Factor Detection */}
            <div className="bg-indigo-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Factor Detection</h3>
              <p className="text-gray-600">
                Surface high-risk signals — travel history gaps, financial inconsistencies, or
                profile mismatches — early in the process.
              </p>
            </div>

            {/* Decision Confidence */}
            <div className="bg-violet-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Decision Confidence</h3>
              <p className="text-gray-600">
                Get clear, actionable guidance on which factors strengthen your case and which need
                to be addressed before applying.
              </p>
            </div>

            {/* Faster Review */}
            <div className="bg-indigo-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Faster Case Review</h3>
              <p className="text-gray-600">
                Replace hours of manual review with structured AI analysis. Get a comprehensive
                assessment in minutes, not days.
              </p>
            </div>

            {/* Preparation Guidance */}
            <div className="bg-violet-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Better Preparation</h3>
              <p className="text-gray-600">
                Understand exactly what a stronger application looks like. Structured guidance
                tailored to the specific visa type and destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who Uses VisaRiskAI</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for everyone involved in the visa application process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individual Applicants */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🧳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Individual Applicants</h3>
              <p className="text-gray-600 mb-4">
                Understand your visa case strength before you apply. Identify weaknesses, close
                gaps, and submit with confidence.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Know your risk level before applying
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Get actionable preparation steps
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No legal jargon — clear guidance
                </li>
              </ul>
            </div>

            {/* Immigration Advisors */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Immigration Advisors</h3>
              <p className="text-gray-600 mb-4">
                Streamline case assessment across your client portfolio. Use structured AI analysis
                to prioritise case work and reduce review time.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Faster initial case triage
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Structured risk reports per client
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Focus time where it matters most
                </li>
              </ul>
            </div>

            {/* Travel & Visa Agencies */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visa Service Businesses</h3>
              <p className="text-gray-600 mb-4">
                Scale your visa service operations. Process higher case volumes with consistent
                quality assessments and fewer avoidable errors.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Handle more cases efficiently
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Consistent quality across all submissions
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Reduce rework and resubmission costs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why It Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most visa rejections are avoidable. VisaRiskAI helps you see the problems before an
              immigration officer does.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Reduce Avoidable Mistakes</h3>
                <p className="text-gray-600 text-sm">
                  Catch documentation gaps, inconsistencies, and weak supporting evidence before
                  submission. Stop preventable rejections.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Improve Case Preparation</h3>
                <p className="text-gray-600 text-sm">
                  Know exactly what to strengthen. Structured guidance means you go into every
                  submission with a complete, well-prepared file.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Save Time on Manual Review</h3>
                <p className="text-gray-600 text-sm">
                  Replace slow, inconsistent manual case reviews with fast AI-driven analysis.
                  Assessment in minutes, not days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Earlier Visibility Into Risk</h3>
                <p className="text-gray-600 text-sm">
                  Don&apos;t find out at the rejection stage. Get visibility into case risk early so
                  there is still time to act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">What is VisaRiskAI?</h3>
                <p className="text-gray-600 text-sm">
                  VisaRiskAI is an AI-powered visa risk analysis platform developed under PROINVEST
                  GLOBAL LTD. It helps applicants, advisors, and visa service businesses evaluate
                  case strength, detect risk factors, and improve file readiness before submission.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Does VisaRiskAI guarantee approval?</h3>
                <p className="text-gray-600 text-sm">
                  No. VisaRiskAI does not guarantee any visa outcome. It provides AI-driven
                  analysis to improve case preparation and reduce avoidable errors. Final decisions
                  remain with the relevant immigration authority.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
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
                  . It is a cloud-based platform — no installation required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-700 to-violet-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Assess Your Visa Case?</h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Don&apos;t leave your visa application to chance. Use AI to understand your risk before
            you apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.visariskai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
            >
              Visit VisaRiskAI →
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              Contact ProInvest Global
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
