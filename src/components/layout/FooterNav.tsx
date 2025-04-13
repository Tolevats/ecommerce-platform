import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FaInstagram,
  FaSquareXTwitter,
  FaSquareFacebook,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="@container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
          {/* Column 1: Brand/About */}
          <div className="hidden md:block space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-primary dark:text-primary-light mb-2"
            >
              {/* Logo Image */}
              <Image
                src="/assets/logos/logo-32x32.png"
                alt="OnPointStore Logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span className="hidden lg:inline-block text-violet-700">
                OnPointStore
              </span>
            </Link>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Your favorite place for amazing products. Built with modern tech.
            </p>
          </div>

          {/* Column 2: Quick Links Mock */}
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-xs md:text-sm lg:text-base text-gray-600 hover:bg-violet-200 active:text-violet-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-xs md:text-sm lg:text-base text-gray-600 hover:bg-violet-200 active:text-violet-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-xs md:text-sm lg:text-base text-gray-600 hover:bg-violet-200 active:text-violet-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support Mock Links */}
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-xs md:text-sm lg:text-base text-gray-600 hover:bg-violet-200 active:text-violet-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-xs md:text-sm lg:text-base text-gray-600 hover:bg-violet-200 active:text-violet-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-xs md:text-sm lg:text-base text-gray-600 hover:bg-violet-200 active:text-violet-700 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media Mock Links */}
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4 md:space-x-6">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="text-gray-500 hover:bg-violet-300 active:text-violet-700 dark:hover:text-violet-400 transition-colors"
              >
                <FaInstagram className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X"
                className="text-gray-500 hover:bg-violet-300 active:text-violet-700 dark:hover:text-violet-400 transition-colors"
              >
                <FaSquareXTwitter className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="text-gray-500 hover:bg-violet-300 active:text-violet-700 dark:hover:text-violet-400 transition-colors"
              >
                <FaSquareFacebook className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer: Copyright & Author */}
        <div className="border-gray-200 dark:border-gray-600 text-center space-y-2">
          <div className="border-t border-gray-800 mt-4 pt-4 text-center">
            <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} OnPointStore. All rights reserved.
            </p>
            <p className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400">
              Made with 💚 by @Tolevats
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
