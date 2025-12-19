'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    phone: '',
    service: '',
    message: '',
    hearAbout: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        companySize: '',
        phone: '',
        service: '',
        message: '',
        hearAbout: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Start Your <span className="text-red-600">Revolution</span>
          </h1>
          <p className="text-xl text-gray-300">
            Whether you're ready to transform or just curious about what's possible, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
            {submitted ? (
              <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                <p className="font-semibold">Thank you! We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  >
                    <option value="">Select company size</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    What brings you here?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  >
                    <option value="">Select an option</option>
                    <option value="empower">Team Empowerment</option>
                    <option value="content">Content Production</option>
                    <option value="automate">Automation</option>
                    <option value="search">AI Search</option>
                    <option value="notsure">Not Sure Yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    id="hearAbout"
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border-2 border-gray-700 rounded-lg focus:border-red-600 focus:outline-none text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-red-600 font-semibold mb-2">Email</h3>
                  <p className="text-gray-300">
                    <a href="mailto:hello@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                      hello@smarterrevolution.com
                    </a>
                    <br />
                    <a href="mailto:wolf@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                      wolf@smarterrevolution.com
                    </a>
                    <br />
                    <a href="mailto:mark@smarterrevolution.com" className="hover:text-red-600 transition-colors">
                      mark@smarterrevolution.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-red-600 font-semibold mb-2">Phone</h3>
                  <p className="text-gray-300">
                    <a href="tel:+12133028260" className="hover:text-red-600 transition-colors">
                      (213) 302-8260
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-red-600 font-semibold mb-2">Social Media</h3>
                  <p className="text-gray-300">
                    <a href="https://linkedin.com/company/smarterrevolution" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                      LinkedIn
                    </a>
                    <br />
                    <a href="https://linkedin.com/in/krammel" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                      Wolf on LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-red-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Why Choose Us?</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Free initial consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Customized AI solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>24/7 AI monitoring & support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Transparent reporting & analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Proven track record of success</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

