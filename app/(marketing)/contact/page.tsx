'use client';

import { useState } from 'react';
import { Hero, Breadcrumb } from '@/app/components/Corporate';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Contact request failed');
      setFormData({ name: '', company: '', email: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <Breadcrumb title="Contact" path="/contact" />
      <Hero eyebrow="Contact / PROINVEST GLOBAL" title={<>Start with the operation.<br /><em>Talk to our team.</em></>} copy="Discuss ProHotelAI, a corporate partnership or your organisation’s operational priorities." scene="company" variant="wide" />

      {/* Contact Form and Info */}
      <section className="contact-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Send your enquiry directly to our team, or email info@proinvest.global.
              </p>

              {status === 'sent' && <div role="status" className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">Your enquiry has been received.</div>}
              {status === 'error' && <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">We could not send your enquiry. Please email info@proinvest.global.</div>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={120}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent min-h-11"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    autoComplete="organization"
                    minLength={2}
                    maxLength={160}
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    minLength={10}
                    maxLength={5000}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full min-h-11 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Reach out to us directly using the information below, or fill out the contact form.
              </p>

              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-semibold text-gray-700">Company Name</dt>
                      <dd className="text-gray-900">Proinvest Global Ltd</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-gray-700">Company Number</dt>
                      <dd className="text-gray-900">16851428</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-gray-700">Registered Address</dt>
                      <dd className="text-gray-900">
                        2 Frederick Street<br />
                        Kings Cross<br />
                        London WC1X 0ND<br />
                        United Kingdom
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Contact Details */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <dt className="text-sm font-semibold text-gray-700 mb-1">Phone</dt>
                        <dd className="text-gray-900">
                          <a href="tel:+447448810068" className="hover:text-blue-600 transition">
                            +44 7448 810068
                          </a>
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <dt className="text-sm font-semibold text-gray-700 mb-1">Email</dt>
                        <dd className="text-gray-900">
                          <a href="mailto:info@proinvest.global" className="hover:text-blue-600 transition">
                            info@proinvest.global
                          </a>
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span className="text-gray-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registered corporate location */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">London, United Kingdom</h3>
            <p className="text-gray-600">
              2 Frederick Street, Kings Cross<br />
              London WC1X 0ND<br />
              United Kingdom
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
