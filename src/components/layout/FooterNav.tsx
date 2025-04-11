import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaSquareFacebook,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand/About */}
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold text-primary dark:text-primary-light mb-2 inline-block"
            >
              OnPointStore
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your favorite place for amazing products. Built with modern tech.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  Contact
                </Link>
              </li>
              {/* Add more links */}
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  Returns
                </Link>
              </li>
              {/* Add more links */}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="X"
                className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-500 hover:text-primary dark:hover:text-primary-light"
              >
                <FaSquareFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600 text-center">
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} OnPointStore. All rights
              reserved.
            </p>
            <p>Made with 💚 by @Tolevats </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
