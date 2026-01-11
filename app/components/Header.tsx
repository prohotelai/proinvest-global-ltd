'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <nav className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-navy-700 tracking-tight group-hover:text-navy-600 transition-colors">
                  PROINVEST GLOBAL
                </span>
                <span className="text-xs text-graphite-500 font-medium uppercase tracking-wider">
                  Applied AI for Hospitality
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <Link 
              href="/about" 
              className="text-graphite-600 hover:text-navy-600 transition-colors font-medium"
            >
              About
            </Link>
            <div className="relative group">
              <button className="text-graphite-600 hover:text-navy-600 transition-colors font-medium flex items-center gap-1">
                Solutions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block pt-2 w-56 left-0">
                <div className="bg-white border border-neutral-200 rounded-xl shadow-enterprise-lg py-3">
                  <Link 
                    href="/solutions" 
                    className="block px-6 py-3 text-sm font-semibold text-navy-600 hover:bg-neutral-50 border-b border-neutral-200"
                  >
                    All Solutions
                  </Link>
                  <Link 
                    href="/solutions/prohotelai" 
                    className="block px-6 py-3 text-sm text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 transition-colors"
                  >
                    <div className="font-semibold">ProHotelAI</div>
                    <div className="text-xs text-graphite-500 mt-0.5">AI for Hotels</div>
                  </Link>
                  <Link 
                    href="/solutions/procafeai" 
                    className="block px-6 py-3 text-sm text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 transition-colors"
                  >
                    <div className="font-semibold">ProCafeAI</div>
                    <div className="text-xs text-graphite-500 mt-0.5">AI for Restaurants</div>
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              href="/industries" 
              className="text-graphite-600 hover:text-navy-600 transition-colors font-medium"
            >
              Industries
            </Link>
            <Link 
              href="/case-studies" 
              className="text-graphite-600 hover:text-navy-600 transition-colors font-medium"
            >
              Case Studies
            </Link>
            <Link 
              href="/insights" 
              className="text-graphite-600 hover:text-navy-600 transition-colors font-medium"
            >
              Insights
            </Link>
            <Link 
              href="/contact" 
              className="btn-primary ml-4"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-graphite-600 hover:text-navy-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-neutral-200 mt-4">
            <div className="space-y-1 pt-4">
              <Link 
                href="/about" 
                className="block px-4 py-3 text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 font-medium rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-graphite-500 uppercase tracking-wider mb-2">
                  Solutions
                </div>
                <Link 
                  href="/solutions" 
                  className="block px-4 py-2 text-sm text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Solutions
                </Link>
                <Link 
                  href="/solutions/prohotelai" 
                  className="block px-4 py-2 text-sm text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ProHotelAI
                </Link>
                <Link 
                  href="/solutions/procafeai" 
                  className="block px-4 py-2 text-sm text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ProCafeAI
                </Link>
              </div>
              <Link 
                href="/industries" 
                className="block px-4 py-3 text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 font-medium rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link 
                href="/case-studies" 
                className="block px-4 py-3 text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 font-medium rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                href="/insights" 
                className="block px-4 py-3 text-graphite-700 hover:bg-neutral-50 hover:text-navy-600 font-medium rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <div className="px-4 pt-4">
                <Link 
                  href="/contact" 
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
