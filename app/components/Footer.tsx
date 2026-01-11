import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-bold mb-4">PROINVEST GLOBAL LTD</h3>
            <p className="text-sm mb-2">Company Number: 16851428</p>
            <p className="text-sm mb-4">
              2 Frederick Street<br />
              Kings Cross<br />
              London WC1X 0ND<br />
              United Kingdom
            </p>
            <p className="text-sm mb-1">
              <a href="tel:+447448810068" className="hover:text-white transition">
                +44 7448 810068
              </a>
            </p>
            <p className="text-sm">
              <a href="mailto:info@proinvest.global" className="hover:text-white transition">
                info@proinvest.global
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solutions/prohotelai" className="hover:text-white transition">
                  ProHotelAI
                </Link>
              </li>
              <li>
                <Link href="/solutions/procafeai" className="hover:text-white transition">
                  ProCafeAI
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition">
                  Industries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {currentYear} Proinvest Global Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
