'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-600 to-purple-600 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-glow-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-950 tracking-tight group-hover:text-navy-600 transition-colors">
                PROINVEST GLOBAL
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                Applied AI SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <Link 
              href="/about" 
              className="px-4 py-2 text-slate-700 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium"
            >
              About
            </Link>
            
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-slate-700 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium flex items-center gap-1.5">
                Solutions
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block pt-2 w-72 left-0">
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-soft-lg p-2 animate-fade-in-up">
                  <Link 
                    href="/solutions" 
                    className="block px-4 py-3 text-sm font-semibold text-navy-600 hover:bg-navy-50 rounded-xl transition-all duration-200 border-b border-slate-100 mb-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-500 to-purple-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </div>
                      <span>All Solutions</span>
                    </div>
                  </Link>
                  <Link 
                    href="/solutions/prohotelai" 
                    className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-all duration-200 group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-100 to-purple-100 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span className="text-xl">🏨</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover/item:text-navy-600">ProHotelAI</div>
                        <div className="text-xs text-slate-500">AI Platform for Hotels</div>
                      </div>
                    </div>
                  </Link>
                  <Link 
                    href="/solutions/procafeai" 
                    className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-all duration-200 group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-navy-100 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span className="text-xl">☕</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover/item:text-navy-600">ProCafeAI</div>
                        <div className="text-xs text-slate-500">AI for Restaurants & Cafés</div>
                      </div>
                    </div>
                  </Link>
                  <Link 
                    href="/solutions/visariskai" 
                    className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-all duration-200 group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span className="text-xl">🛂</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover/item:text-navy-600">VisaRiskAI</div>
                        <div className="text-xs text-slate-500">Visa & Immigration Risk Analysis</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/industries" 
              className="px-4 py-2 text-slate-700 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium"
            >
              Industries
            </Link>
            <Link 
              href="/case-studies" 
              className="px-4 py-2 text-slate-700 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium"
            >
              Case Studies
            </Link>
            <Link 
              href="/insights" 
              className="px-4 py-2 text-slate-700 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium"
            >
              Insights
            </Link>
            <Link 
              href="/partners" 
              className="px-4 py-2 text-slate-700 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium"
            >
              Partner Program
            </Link>
            
            <div className="ml-4 flex items-center gap-3">
              <Link 
                href="/contact" 
                className="btn btn-primary btn-sm"
              >
                Contact Us
                <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden animate-fade-in-up bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200 mt-2 mx-2">
            <div className="px-2 pt-4 pb-6 space-y-1">
              <Link 
                href="/about" 
                className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-navy-600 font-medium rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Solutions
                </div>
                <div className="space-y-1 pl-2">
                  <Link 
                    href="/solutions" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Solutions
                  </Link>
                  <Link 
                    href="/solutions/prohotelai" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🏨 ProHotelAI
                  </Link>
                  <Link 
                    href="/solutions/procafeai" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ☕ ProCafeAI
                  </Link>
                  <Link 
                    href="/solutions/visariskai" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🛂 VisaRiskAI
                  </Link>
                </div>
              </div>
              <Link 
                href="/industries" 
                className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-navy-600 font-medium rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link 
                href="/case-studies" 
                className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-navy-600 font-medium rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                href="/insights" 
                className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-navy-600 font-medium rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <Link 
                href="/partners" 
                className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-navy-600 font-medium rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partner Program
              </Link>
              <div className="px-4 pt-4">
                <Link 
                  href="/contact" 
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                  <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
