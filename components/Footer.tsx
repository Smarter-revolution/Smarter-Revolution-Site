import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-red-600 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Smarter <span className="text-red-600">Revolution</span>
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              The AI Architects leading the Business Empowerment Revolution™.
              We help mid-market companies transform their teams, content, and
              operations through intelligent AI implementation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-red-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-red-600 transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-red-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              Solutions
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/solutions#empower" className="hover:text-red-600 transition-colors">
                  Business Empowerment Revolution
                </Link>
              </li>
              <li>
                <Link href="/solutions#captivate" className="hover:text-red-600 transition-colors">
                  Story Institute
                </Link>
              </li>
              <li>
                <Link href="/solutions#automate" className="hover:text-red-600 transition-colors">
                  AI Automation Blueprint
                </Link>
              </li>
              <li>
                <Link href="/solutions#dominate" className="hover:text-red-600 transition-colors">
                  AI Search Dominance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              Connect
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/strategy"
                  className="hover:text-red-600 transition-colors"
                >
                  Free Strategy Session
                </Link>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/smarterrevolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@smarterrevolution.com"
                  className="hover:text-red-600 transition-colors"
                >
                  info@smarterrevolution.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+12133028260"
                  className="hover:text-red-600 transition-colors"
                >
                  (213) 302-8260
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-red-600 pt-6 text-xs text-gray-400 sm:flex-row">
          <p>© 2024 Smarter Revolution. All rights reserved.</p>
          <div className="flex gap-4">
            <button className="hover:text-red-600 transition-colors">
              Privacy Policy
            </button>
            <span>|</span>
            <button className="hover:text-red-600 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

