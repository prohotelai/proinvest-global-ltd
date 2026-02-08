import { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Privacy Policy | ProInvest Global',
  description: 'Privacy Policy for ProInvest Global Ltd. Learn how we collect, use, and protect your personal data. GDPR and CCPA compliant.',
  keywords: 'privacy policy, GDPR, CCPA, data protection, ProInvest Global, SaaS privacy',
  alternates: {
    canonical: 'https://www.proinvest.global/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ProInvest Global',
    description: 'Privacy Policy for ProInvest Global Ltd. Learn how we collect, use, and protect your personal data. GDPR and CCPA compliant.',
    url: 'https://www.proinvest.global/privacy',
    siteName: 'ProInvest Global Ltd',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.proinvest.global' },
    { name: 'Privacy Policy', url: 'https://www.proinvest.global/privacy' },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              Your privacy matters to us. This policy explains how ProInvest Global Ltd collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                ProInvest Global Ltd (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://www.proinvest.global" className="text-blue-600 hover:text-blue-800">https://www.proinvest.global</a> or use our SaaS platforms and services.
              </p>
              <p>
                ProInvest Global Ltd is a company registered in the United Kingdom (Company Number: 16851428). We develop and provide artificial intelligence software solutions for the hospitality and food &amp; beverage industries.
              </p>
              <p>
                By accessing our website or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with this policy, please do not access our website or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Information You Provide Directly</h3>
              <p>We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and job title when you fill out forms, request a demo, or contact us.</li>
                <li><strong>Account Information:</strong> Username, password, and account preferences when you create an account on our platforms.</li>
                <li><strong>Communication Data:</strong> Any information you provide when you communicate with us via email, contact forms, or other channels.</li>
                <li><strong>Business Information:</strong> Information about your business needs, preferences, and requirements when you engage with our sales team.</li>
                <li><strong>Payment Information:</strong> Billing address and payment details when you subscribe to our services (processed securely through third-party payment processors).</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Information Collected Automatically</h3>
              <p>When you visit our website or use our services, we may automatically collect certain information, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Device Information:</strong> Browser type, operating system, device type, and unique device identifiers.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths.</li>
                <li><strong>Log Data:</strong> IP address, access times, referring URLs, and other diagnostic data.</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Information from Third Parties</h3>
              <p>We may receive information about you from third parties, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Business partners and resellers</li>
                <li>Marketing partners and affiliate networks</li>
                <li>Publicly available sources</li>
                <li>Social media platforms (if you interact with us through these channels)</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Providing and Improving Our Services</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Deliver, maintain, and improve our SaaS platforms and services</li>
                <li>Process transactions and send related information</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Personalise your experience and deliver relevant content</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Communication</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Send administrative information, such as service updates and security alerts</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send marketing communications (with your consent where required)</li>
                <li>Provide information about products, services, and events</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Analytics and Research</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Analyse usage patterns and trends to improve our services</li>
                <li>Conduct research and development</li>
                <li>Monitor and analyse the effectiveness of our marketing activities</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.4 Legal and Security</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Comply with applicable laws, regulations, and legal processes</li>
                <li>Protect against fraudulent, unauthorised, or illegal activity</li>
                <li>Enforce our terms of service and other agreements</li>
                <li>Protect the rights, property, and safety of our users and the public</li>
              </ul>
            </div>

            {/* Cookies & Tracking Technologies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and store information when you visit our website. These technologies help us understand how you interact with our services and enable us to provide a better experience.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly. These cannot be disabled.</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</li>
                <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalisation, such as remembering your preferences.</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements (only with your consent).</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Managing Cookies</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly if cookies are disabled.
              </p>
              <p className="mt-3">
                You can also opt out of certain tracking by visiting:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Network Advertising Initiative: <a href="https://optout.networkadvertising.org" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">optout.networkadvertising.org</a></li>
                <li>Digital Advertising Alliance: <a href="https://optout.aboutads.info" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">optout.aboutads.info</a></li>
                <li>European Interactive Digital Advertising Alliance: <a href="https://youronlinechoices.eu" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a></li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p>
                We may share your information with third-party service providers who assist us in operating our business. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Categories of Third-Party Service Providers</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Cloud Infrastructure Providers:</strong> For hosting and data storage</li>
                <li><strong>Analytics Providers:</strong> For website and service analytics</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Email Service Providers:</strong> For sending transactional and marketing communications</li>
                <li><strong>Customer Support Tools:</strong> For managing customer inquiries</li>
                <li><strong>Marketing and Advertising Partners:</strong> For promotional activities and affiliate programmes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.
              </p>
              <p className="mt-3">
                The retention period may vary depending on the context and our legal obligations. Generally:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Account Information:</strong> Retained for the duration of your account and for a reasonable period thereafter</li>
                <li><strong>Transaction Records:</strong> Retained for up to seven years to comply with financial and tax regulations</li>
                <li><strong>Marketing Preferences:</strong> Retained until you withdraw consent or update your preferences</li>
                <li><strong>Website Analytics:</strong> Typically retained for up to 26 months</li>
              </ul>
              <p className="mt-3">
                When personal information is no longer needed, we will securely delete or anonymise it.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and security</li>
                <li>Incident response procedures</li>
                <li>Regular backups and disaster recovery planning</li>
              </ul>
              <p className="mt-3">
                While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security, but we continuously work to enhance our security measures.
              </p>
            </div>

            {/* GDPR Rights */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">8. GDPR Rights (EU/UK Users)</h2>
              <p>
                If you are located in the European Union, the European Economic Area, or the United Kingdom, you have certain rights under the General Data Protection Regulation (GDPR) and the UK GDPR. We act as a data controller for the personal information we collect.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete personal information.</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information in certain circumstances (&quot;right to be forgotten&quot;).</li>
                <li><strong>Restriction:</strong> Request restriction of processing of your personal information.</li>
                <li><strong>Data Portability:</strong> Request transfer of your personal information to another organisation in a structured, commonly used, machine-readable format.</li>
                <li><strong>Objection:</strong> Object to processing of your personal information based on legitimate interests or for direct marketing purposes.</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent to process your personal information.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.2 Legal Basis for Processing</h3>
              <p>We process your personal information on the following legal bases:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Contract:</strong> Processing necessary for the performance of a contract with you</li>
                <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, provided they do not override your rights</li>
                <li><strong>Consent:</strong> Processing based on your consent (which you may withdraw at any time)</li>
                <li><strong>Legal Obligation:</strong> Processing necessary to comply with legal requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.3 Exercising Your Rights</h3>
              <p>
                To exercise any of these rights, please contact us at <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-800">info@proinvest.global</a>. We will respond to your request within one month. In some cases, we may need to verify your identity before processing your request.
              </p>
              <p className="mt-3">
                If you are not satisfied with our response, you have the right to lodge a complaint with a supervisory authority. In the United Kingdom, this is the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
              </p>
            </div>

            {/* CCPA/CPRA Rights */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">9. CCPA / CPRA Rights (California Users)</h2>
              <p>
                If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.1 Your California Privacy Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
                <li><strong>Delete:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
                <li><strong>Correct:</strong> Request correction of inaccurate personal information.</li>
                <li><strong>Opt-Out of Sale/Sharing:</strong> Direct us not to sell or share your personal information. Note: We do not sell personal information as defined under the CCPA/CPRA.</li>
                <li><strong>Limit Use of Sensitive Personal Information:</strong> Limit how we use sensitive personal information, if applicable.</li>
                <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising your privacy rights.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.2 Categories of Personal Information Collected</h3>
              <p>In the preceding 12 months, we may have collected the following categories of personal information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Identifiers (name, email address, IP address)</li>
                <li>Commercial information (products or services considered or purchased)</li>
                <li>Internet or network activity (browsing history, interactions with our website)</li>
                <li>Geolocation data (general location based on IP address)</li>
                <li>Professional or employment-related information</li>
                <li>Inferences drawn from the above to create a profile</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.3 Exercising Your California Rights</h3>
              <p>
                To exercise your rights, please contact us at <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-800">info@proinvest.global</a>. You may designate an authorised agent to make a request on your behalf.
              </p>
              <p className="mt-3">
                We will verify your identity before processing your request. We will respond to verifiable requests within 45 days. If we require more time (up to 90 days), we will inform you of the reason and extension period.
              </p>
            </div>

            {/* Children's Information */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">10. Children&apos;s Information</h2>
              <p>
                Our website and services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-800">info@proinvest.global</a>.
              </p>
              <p className="mt-3">
                If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to delete that information promptly.
              </p>
            </div>

            {/* International Data Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p>
                Your personal information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from the laws of your country.
              </p>
              <p className="mt-3">
                When we transfer personal information outside the UK or EEA, we ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Transfers to countries with an adequacy decision from the UK or EU</li>
                <li>Standard Contractual Clauses approved by the UK or EU</li>
                <li>Binding Corporate Rules for transfers within our group</li>
                <li>Other legally recognised transfer mechanisms</li>
              </ul>
              <p className="mt-3">
                By using our services, you consent to the transfer of your information to countries outside your country of residence, including the United Kingdom and other jurisdictions where our service providers operate.
              </p>
            </div>

            {/* Updates to This Policy */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">12. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Update the &quot;Last Updated&quot; date at the top of this policy</li>
                <li>Provide notice through our website or by email (for significant changes)</li>
                <li>Obtain consent where required by applicable law</li>
              </ul>
              <p className="mt-3">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our website or services after any changes indicates your acceptance of the updated policy.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
              <p className="mt-6">
                We will endeavour to respond to all legitimate inquiries within a reasonable timeframe and in accordance with applicable data protection laws.
              </p>
            </div>

            {/* Compliance Summary */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Compliance Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">GDPR Compliant</h3>
                  <p className="text-sm text-blue-700">Full compliance with EU/UK General Data Protection Regulation</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">CCPA / CPRA Compliant</h3>
                  <p className="text-sm text-green-700">Full compliance with California Consumer Privacy Act</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">UK Data Protection</h3>
                  <p className="text-sm text-purple-700">Compliant with UK Data Protection Act 2018</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
