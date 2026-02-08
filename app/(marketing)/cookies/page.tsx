import { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Cookie Policy | ProInvest Global',
  description: 'Cookie Policy for ProInvest Global Ltd. Learn how we use cookies and tracking technologies on our website and services.',
  keywords: 'cookie policy, cookies, tracking, GDPR cookies, ProInvest Global',
  alternates: {
    canonical: 'https://www.proinvest.global/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | ProInvest Global',
    description: 'Cookie Policy for ProInvest Global Ltd. Learn how we use cookies and tracking technologies on our website and services.',
    url: 'https://www.proinvest.global/cookies',
    siteName: 'ProInvest Global Ltd',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicy() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.proinvest.global' },
    { name: 'Cookie Policy', url: 'https://www.proinvest.global/cookies' },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-gray-300">
              This policy explains how ProInvest Global Ltd uses cookies and similar technologies to recognise you when you visit our website and use our services.
            </p>
            <p className="text-sm text-gray-400 mt-4">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">

            {/* What Are Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
              </p>
              <p>
                Cookies may be &quot;session&quot; cookies (which are deleted when you close your browser) or &quot;persistent&quot; cookies (which remain on your device until they expire or you delete them).
              </p>
              <p>
                We use cookies and similar tracking technologies, including web beacons, pixels, and local storage, to collect and store information when you interact with our website at <a href="https://www.proinvest.global" className="text-blue-600 hover:text-blue-800">https://www.proinvest.global</a> and our SaaS platforms.
              </p>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              <p>We use the following categories of cookies:</p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Strictly Necessary Cookies</h3>
              <p>
                These cookies are essential for the website to function properly. They enable basic features like page navigation, secure access to protected areas, and session management. The website cannot function properly without these cookies.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold">Purpose</th>
                      <th className="text-left py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Session management</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Authentication status</td>
                      <td className="py-2">Session / 30 days</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Security tokens</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2">Cookie consent preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Performance and Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to improve the way our website works.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold">Purpose</th>
                      <th className="text-left py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Page view tracking</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">User journey analysis</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Error monitoring</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2">Performance metrics</td>
                      <td className="py-2">26 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold">Purpose</th>
                      <th className="text-left py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Language preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">User interface preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Chat support functionality</td>
                      <td className="py-2">Session / 1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2">Form data retention</td>
                      <td className="py-2">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.4 Marketing and Targeting Cookies</h3>
              <p>
                These cookies may be set through our site by our advertising partners. They are used to build a profile of your interests and show you relevant advertisements on other sites. If you do not allow these cookies, you will still see advertisements, but they will be less relevant to you.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold">Purpose</th>
                      <th className="text-left py-2 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Advertising effectiveness</td>
                      <td className="py-2">90 days - 2 years</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Remarketing</td>
                      <td className="py-2">30 days - 540 days</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Conversion tracking</td>
                      <td className="py-2">90 days</td>
                    </tr>
                    <tr>
                      <td className="py-2">Affiliate tracking</td>
                      <td className="py-2">30 - 90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide other services. These third parties may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Analytics providers</strong> – to help us understand how our website is used</li>
                <li><strong>Advertising networks</strong> – to deliver relevant advertisements</li>
                <li><strong>Social media platforms</strong> – to enable social sharing features</li>
                <li><strong>Payment processors</strong> – to facilitate secure transactions</li>
                <li><strong>Customer support tools</strong> – to provide chat and support functionality</li>
                <li><strong>Affiliate networks</strong> – to track referrals and commissions</li>
              </ul>
              <p className="mt-3">
                These third parties have their own privacy policies governing the use of cookies. We encourage you to review the privacy policies of any third-party services you interact with.
              </p>
            </div>

            {/* Cookie Consent */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">4. Your Consent</h2>
              <p>
                When you first visit our website, you will be presented with a cookie consent banner that allows you to accept or decline non-essential cookies. Your choices will be remembered for future visits.
              </p>
              <p className="mt-3">
                By clicking &quot;Accept All&quot; on the cookie banner, you consent to the use of all categories of cookies as described in this policy.
              </p>
              <p className="mt-3">
                By clicking &quot;Essential Only&quot; or similar options, only strictly necessary cookies will be used.
              </p>
              <p className="mt-3">
                You can change your cookie preferences at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Adjusting your browser settings to block or delete cookies</li>
                <li>Using our cookie preference centre (if available)</li>
                <li>Contacting us at <a href="mailto:info@proinvest.global" className="text-blue-600 hover:text-blue-800">info@proinvest.global</a></li>
              </ul>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">5. Managing and Disabling Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can typically:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
                <li>Set your browser to notify you when a cookie is set</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Browser-Specific Instructions</h3>
              <p>For more information on how to manage cookies in your browser, please visit:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-gb/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Impact of Disabling Cookies</h3>
              <p>
                Please note that if you disable or delete cookies, some features of our website may not function properly. Strictly necessary cookies cannot be disabled as they are required for the website to operate.
              </p>
            </div>

            {/* Opt-Out Options */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">6. Opt-Out Options</h2>
              <p>
                In addition to managing cookies through your browser, you can opt out of certain tracking through the following resources:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Advertising Opt-Outs</h3>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><a href="https://optout.networkadvertising.org" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Network Advertising Initiative (NAI)</a></li>
                <li><a href="https://optout.aboutads.info" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance (DAA)</a></li>
                <li><a href="https://youronlinechoices.eu" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">European Interactive Digital Advertising Alliance (EDAA)</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Analytics Opt-Outs</h3>
              <p>
                Many analytics providers offer browser extensions or tools that allow you to opt out of their tracking. Please visit the relevant provider&apos;s website for more information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 Do Not Track</h3>
              <p>
                Some browsers offer a &quot;Do Not Track&quot; (DNT) feature. We currently do not respond to DNT signals because there is no industry-standard interpretation of this signal. We will update this policy if a standard is established.
              </p>
            </div>

            {/* Similar Technologies */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">7. Similar Technologies</h2>
              <p>
                In addition to cookies, we may use other similar technologies:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Web Beacons</h3>
              <p>
                Small graphic images (also known as &quot;pixel tags&quot; or &quot;clear GIFs&quot;) that may be included on our website and emails. They help us understand whether you have opened an email or visited a page on our site.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Local Storage</h3>
              <p>
                Technology that allows a website to store and retrieve data on your device. We may use local storage to save your preferences or cache data for performance.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.3 Session Storage</h3>
              <p>
                Similar to local storage, but data is only stored for the duration of your browser session and is deleted when you close your browser.
              </p>
            </div>

            {/* GDPR and CCPA */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">8. Your Rights Under GDPR and CCPA</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 EU/UK Users (GDPR)</h3>
              <p>
                Under the General Data Protection Regulation (GDPR) and UK GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Withdraw consent for non-essential cookies at any time</li>
                <li>Access information about the cookies we use</li>
                <li>Request deletion of data collected through cookies</li>
                <li>Object to processing based on legitimate interests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.2 California Users (CCPA/CPRA)</h3>
              <p>
                Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Know what personal information is collected through cookies</li>
                <li>Request deletion of data collected through cookies</li>
                <li>Opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information (note: we do not sell personal information)</li>
                <li>Not be discriminated against for exercising your privacy rights</li>
              </ul>
              <p className="mt-3">
                For more information about your rights, please see our <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
              </p>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">9. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>We will update the &quot;Last Updated&quot; date at the top of this policy</li>
                <li>For significant changes, we will provide notice through a cookie banner or website notification</li>
                <li>Your continued use of our website after changes take effect constitutes your acceptance of the updated policy</li>
              </ul>
              <p className="mt-3">
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

            {/* Related Policies */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/privacy" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                  <h3 className="font-semibold text-blue-900 mb-2">Privacy Policy</h3>
                  <p className="text-sm text-blue-700">How we collect and protect your data</p>
                </a>
                <a href="/terms" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
                  <h3 className="font-semibold text-green-900 mb-2">Terms of Service</h3>
                  <p className="text-sm text-green-700">Terms and conditions for our services</p>
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
