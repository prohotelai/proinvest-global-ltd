'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              PROINVEST GLOBAL
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition">
              About
            </Link>
            <div className="relative group">
              <Link href="/solutions" className="text-gray-700 hover:text-gray-900 transition">
                Solutions
              </Link>
              <div className="absolute hidden group-hover:block pt-2 w-48">
                <div className="bg-white border border-gray-200 rounded-md shadow-lg py-2">
                  <Link 
                    href="/solutions/prohotelai" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    ProHotelAI
                  </Link>
                  <Link 
                    href="/solutions/procafeai" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    ProCafeAI
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/industries" className="text-gray-700 hover:text-gray-900 transition">
              Industries
            </Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-gray-900 transition">
              Case Studies
            </Link>
            <Link href="/insights" className="text-gray-700 hover:text-gray-900 transition">
              Insights
            </Link>
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <Link 
                href="/" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/solutions" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                href="/solutions/prohotelai" 
                className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                ProHotelAI
              </Link>
              <Link 
                href="/solutions/procafeai" 
                className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                ProCafeAI
              </Link>
              <Link 
                href="/industries" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link 
                href="/case-studies" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link 
                href="/insights" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md mx-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
