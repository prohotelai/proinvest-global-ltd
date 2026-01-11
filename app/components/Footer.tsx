import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-700 text-white">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">PROINVEST GLOBAL LTD</h3>
              <p className="text-sm text-navy-100 font-medium">Applied AI for Hospitality Operations</p>
            </div>
            
            {/* Trust Block */}
            <div className="bg-navy-600/50 border border-navy-500/30 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-navy-200 uppercase tracking-wider mb-1">UK Company</div>
                  <div className="font-semibold">16851428</div>
                </div>
                <div>
                  <div className="text-xs text-navy-200 uppercase tracking-wider mb-1">Since</div>
                  <div className="font-semibold">2024</div>
                </div>
                <div>
                  <div className="text-xs text-navy-200 uppercase tracking-wider mb-1">Business Type</div>
                  <div className="font-semibold">AI SaaS</div>
                </div>
                <div>
                  <div className="text-xs text-navy-200 uppercase tracking-wider mb-1">Industries</div>
                  <div className="font-semibold">Hospitality & F&B</div>
                </div>
              </div>
            </div>

            <div className="text-sm text-navy-100 space-y-1">
              <p className="font-medium">2 Frederick Street, Kings Cross</p>
              <p>London WC1X 0ND, United Kingdom</p>
            </div>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/solutions" className="text-navy-100 hover:text-white transition-colors font-medium">
                  All Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/prohotelai" className="text-navy-100 hover:text-white transition-colors">
                  ProHotelAI
                </Link>
              </li>
              <li>
                <Link href="/solutions/procafeai" className="text-navy-100 hover:text-white transition-colors">
                  ProCafeAI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-navy-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-navy-100 hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-navy-100 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-navy-100 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-navy-200 uppercase tracking-wider mb-1">Email</p>
                <a 
                  href="mailto:info@proinvest-global.com" 
                  className="text-navy-100 hover:text-white transition-colors text-sm font-medium"
                >
                  info@proinvest-global.com
                </a>
              </div>
              <div className="pt-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-600/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-navy-200">
            <div>
              <p>&copy; {currentYear} PROINVEST GLOBAL LTD. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
