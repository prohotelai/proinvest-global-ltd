import { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Terms of Service | ProInvest Global',
  description: 'Terms of Service for ProInvest Global Ltd. Read our terms and conditions for using our SaaS platforms and services.',
  keywords: 'terms of service, terms and conditions, user agreement, ProInvest Global, SaaS terms',
  alternates: {
    canonical: 'https://www.proinvest.global/terms',
  },
  openGraph: {
    title: 'Terms of Service | ProInvest Global',
    description: 'Terms of Service for ProInvest Global Ltd. Read our terms and conditions for using our SaaS platforms and services.',
    url: 'https://www.proinvest.global/terms',
    siteName: 'ProInvest Global Ltd',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.proinvest.global' },
    { name: 'Terms of Service', url: 'https://www.proinvest.global/terms' },
  ]);

  const lastUpdated = 'February 8, 2026';

  return (
    <div>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-300">
              Please read these terms carefully before using our services. By accessing or using our platforms, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">1. Introduction and Acceptance</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and ProInvest Global Ltd (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a company registered in the United Kingdom (Company Number: 16851428).
              </p>
              <p>
                These Terms govern your access to and use of our website at <a href="https://www.proinvest.global" className="text-blue-600 hover:text-blue-800">https://www.proinvest.global</a>, our SaaS platforms (including ProHotelAI and ProCafeAI), and all related services, features, content, and applications (collectively, the &quot;Services&quot;).
              </p>
              <p>
                By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
              </p>
              <p>
                If you are using the Services on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation to these Terms, and references to &quot;you&quot; shall include that organisation.
              </p>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p>To use our Services, you must:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Be at least 18 years of age or the age of legal majority in your jurisdiction</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited from using the Services under applicable laws</li>
                <li>Provide accurate and complete registration information</li>
              </ul>
              <p className="mt-3">
                Our Services are designed for business use. By using our Services, you represent that you are acting in a business capacity or on behalf of a business entity.
              </p>
            </div>

            {/* Account Registration */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">3. Account Registration and Security</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Account Creation</h3>
              <p>
                To access certain features of our Services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your login credentials confidential and secure</li>
                <li>Notify us immediately of any unauthorised access to your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Account Responsibility</h3>
              <p>
                You are responsible for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to maintain the security of your account credentials.
              </p>
            </div>

            {/* Services Description */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">4. Description of Services</h2>
              <p>
                ProInvest Global Ltd provides artificial intelligence software solutions for the hospitality and food &amp; beverage industries. Our Services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>ProHotelAI:</strong> AI-powered operational platform for hotels and resorts</li>
                <li><strong>ProCafeAI:</strong> AI-powered operational platform for cafés and restaurants</li>
                <li>Related APIs, integrations, and support services</li>
              </ul>
              <p className="mt-3">
                We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice. We will endeavour to provide reasonable notice of significant changes where practicable.
              </p>
            </div>

            {/* Subscription and Payments */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">5. Subscription and Payments</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Subscription Plans</h3>
              <p>
                Access to our SaaS platforms requires a paid subscription. Subscription plans, pricing, and features are detailed on our website or in a separate service agreement. We reserve the right to modify pricing with reasonable notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable unless otherwise stated or required by law</li>
                <li>You authorise us to charge your designated payment method for all applicable fees</li>
                <li>Failure to pay may result in suspension or termination of your access</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3 Taxes</h3>
              <p>
                All fees are exclusive of taxes. You are responsible for paying all applicable taxes, including VAT, sales tax, or other similar taxes imposed by any government authority.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.4 Automatic Renewal</h3>
              <p>
                Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. You may cancel your subscription through your account settings or by contacting us.
              </p>
            </div>

            {/* Acceptable Use */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">6. Acceptable Use Policy</h2>
              <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You shall not:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Prohibited Activities</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Use the Services for fraudulent, deceptive, or illegal purposes</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Attempt to gain unauthorised access to any part of the Services</li>
                <li>Reverse engineer, decompile, or disassemble any aspect of the Services</li>
                <li>Copy, modify, or create derivative works of the Services</li>
                <li>Use automated systems (bots, scrapers) without our written consent</li>
                <li>Transmit malware, viruses, or other harmful code</li>
                <li>Harass, abuse, or harm other users or our personnel</li>
                <li>Misrepresent your identity or affiliation with any person or entity</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Content Standards</h3>
              <p>Any content you submit or transmit through the Services must not:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Be unlawful, harmful, threatening, abusive, or defamatory</li>
                <li>Infringe any intellectual property or proprietary rights</li>
                <li>Contain sensitive personal data without proper authorisation</li>
                <li>Violate the privacy or publicity rights of others</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Our Intellectual Property</h3>
              <p>
                The Services, including all content, features, and functionality (such as software, text, graphics, logos, icons, and images), are owned by ProInvest Global Ltd or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-3">
                &quot;ProInvest Global,&quot; &quot;ProHotelAI,&quot; &quot;ProCafeAI,&quot; and related logos and names are trademarks of ProInvest Global Ltd. You may not use our trademarks without our prior written consent.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 License to Use Services</h3>
              <p>
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes during the subscription term.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.3 Your Content</h3>
              <p>
                You retain ownership of any content you submit to the Services (&quot;Your Content&quot;). By submitting Your Content, you grant us a worldwide, royalty-free license to use, process, and store Your Content solely to provide the Services to you.
              </p>
            </div>

            {/* Data and Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">8. Data and Privacy</h2>
              <p>
                Your use of the Services is also governed by our <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>, which describes how we collect, use, and protect your personal information.
              </p>
              <p className="mt-3">
                You are responsible for ensuring that your use of the Services complies with applicable data protection laws, including obtaining necessary consents from individuals whose data you process through our Services.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">9. Confidentiality</h2>
              <p>
                Both parties agree to maintain the confidentiality of any non-public information disclosed during the course of using the Services. This includes, but is not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Business data and analytics</li>
                <li>Pricing and commercial terms</li>
                <li>Technical specifications and documentation</li>
                <li>Any information marked as confidential</li>
              </ul>
              <p className="mt-3">
                Confidential information may only be disclosed where required by law, with reasonable notice to the other party where permitted.
              </p>
            </div>

            {/* Warranties and Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">10. Warranties and Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Our Warranties</h3>
              <p>We warrant that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>The Services will perform substantially in accordance with the documentation</li>
                <li>We will provide the Services with reasonable skill and care</li>
                <li>We have the right to grant the licenses described in these Terms</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Disclaimers</h3>
              <p>
                EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p className="mt-3">
                We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components. We do not guarantee any specific results from using the Services.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.1 Exclusion of Damages</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL PROINVEST GLOBAL LTD BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, BUSINESS, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICES.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.2 Liability Cap</h3>
              <p>
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.3 Exceptions</h3>
              <p>
                Nothing in these Terms excludes or limits liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; or (c) any other liability that cannot be excluded by applicable law.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless ProInvest Global Ltd and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your Content or data submitted through the Services</li>
                <li>Your violation of any third-party rights</li>
                <li>Your violation of applicable laws or regulations</li>
              </ul>
            </div>

            {/* Term and Termination */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">13. Term and Termination</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.1 Term</h3>
              <p>
                These Terms commence when you first access or use the Services and continue until terminated in accordance with this section.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.2 Termination by You</h3>
              <p>
                You may terminate your account at any time by following the instructions in your account settings or by contacting us. Termination does not entitle you to any refund of prepaid fees.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.3 Termination by Us</h3>
              <p>We may suspend or terminate your access to the Services:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Immediately if you breach these Terms</li>
                <li>If required by law or legal process</li>
                <li>For non-payment of fees</li>
                <li>With 30 days&apos; notice for any other reason</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.4 Effect of Termination</h3>
              <p>Upon termination:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your right to access and use the Services will cease immediately</li>
                <li>You must pay any outstanding fees</li>
                <li>We may delete your data in accordance with our data retention policies</li>
                <li>Provisions that by their nature should survive will remain in effect</li>
              </ul>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">14. Modifications to Terms</h2>
              <p>
                We may modify these Terms at any time. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
                <li>Provide notice through the Services or by email</li>
                <li>Give you at least 30 days to review material changes before they take effect</li>
              </ul>
              <p className="mt-3">
                Your continued use of the Services after the effective date of any changes constitutes your acceptance of the modified Terms. If you do not agree to the changes, you must stop using the Services and terminate your account.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">15. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.2 Jurisdiction</h3>
              <p>
                Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.3 Informal Resolution</h3>
              <p>
                Before initiating any formal legal proceedings, we encourage you to contact us to attempt to resolve any disputes informally. You may reach us at <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-800">info@proinvest.global</a>.
              </p>
            </div>

            {/* General Provisions */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">16. General Provisions</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy and any applicable service agreements, constitute the entire agreement between you and ProInvest Global Ltd regarding the Services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.3 Waiver</h3>
              <p>
                No waiver of any term shall be deemed a further or continuing waiver of such term or any other term. Our failure to enforce any right or provision shall not constitute a waiver.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.5 Force Majeure</h3>
              <p>
                Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including natural disasters, acts of government, or internet service failures.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">16.6 No Third-Party Beneficiaries</h3>
              <p>
                These Terms do not create any third-party beneficiary rights in any individual or entity that is not a party to these Terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
              <p>
                If you have any questions or concerns about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <p className="font-semibold text-gray-900 text-lg mb-4">ProInvest Global Ltd</p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-800">info@proinvest.global</a></li>
                  <li><strong>Website:</strong> <a href="https://www.proinvest.global" className="text-blue-600 hover:text-blue-800">https://www.proinvest.global</a></li>
                  <li><strong>Jurisdiction:</strong> United Kingdom</li>
                  <li><strong>Company Registration:</strong> 16851428</li>
                </ul>
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/privacy" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                  <h3 className="font-semibold text-blue-900 mb-2">Privacy Policy</h3>
                  <p className="text-sm text-blue-700">How we collect and protect your data</p>
                </a>
                <a href="/cookies" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
                  <h3 className="font-semibold text-green-900 mb-2">Cookie Policy</h3>
                  <p className="text-sm text-green-700">How we use cookies and tracking</p>
                </a>
                <a href="/contact" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
                  <h3 className="font-semibold text-purple-900 mb-2">Contact Us</h3>
                  <p className="text-sm text-purple-700">Get in touch with our team</p>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
