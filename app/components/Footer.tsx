'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="section-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-20 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Company Info - Wider Column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-600 to-purple-600 flex items-center justify-center shadow-glow">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">PROINVEST GLOBAL</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Applied AI SaaS</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Applied Artificial Intelligence for the hospitality and food & beverage industries. 
                We build AI that runs real operations, not experiments.
              </p>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">UK Company</div>
                    <div className="text-xs text-slate-400">Registration: 16851428</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Solutions</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/solutions" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    All Solutions
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/solutions/prohotelai" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    ProHotelAI
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/solutions/procafeai" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    ProCafeAI
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/solutions/visariskai" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    VisaRiskAI
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/case-studies" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/insights" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Insights
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/partners" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Partner Program
                  </Link>
                </li>
              </ul>
            </div>

            {/* Industries */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Industries</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/industries" 
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    All Industries
                  </Link>
                </li>
                <li>
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Hotels & Resorts
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Restaurants & Cafés
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    QSR & Fast Casual
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-400 text-center md:text-left">
              © {currentYear} <span className="font-semibold text-slate-300">PROINVEST GLOBAL LTD</span>. All rights reserved.
              <span className="mx-2">•</span>
              <span className="text-slate-500">UK Company Number: 16851428</span>
            </div>

            <div className="flex items-center gap-8">
              <Link 
                href="/privacy" 
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
    </footer>
  );
}
