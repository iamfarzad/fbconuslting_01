import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t py-12 mt-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-black">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-black">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/ai-insight" className="text-sm text-gray-600 hover:text-black">
                  AI Insight
                </Link>
              </li>
              <li>
                <Link href="/services/automation" className="text-sm text-gray-600 hover:text-black">
                  Automation
                </Link>
              </li>
              <li>
                <Link href="/services/chatbots" className="text-sm text-gray-600 hover:text-black">
                  Chatbots
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/insights" className="text-sm text-gray-600 hover:text-black">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/resources/literature" className="text-sm text-gray-600 hover:text-black">
                  Literature
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-black">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-black">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-black">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-black">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Farzad Bayat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
