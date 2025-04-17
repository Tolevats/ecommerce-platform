"use client"; // Needed for usePathname hook

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// Icons
import {
  FaInstagram,
  FaSquareXTwitter,
  FaSquareFacebook,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Define routes where the simplified footer should be shown
  const simpleLayoutRoutes = ["/", "/login", "/register"];
  const isSimpleLayout = simpleLayoutRoutes.includes(pathname);

  // --- Simplified Footer Content ---
  const SimpleFooterContent = () => (
    <div className="flex flex-col items-center space-y-6">
      {/* Social Media */}
      <div>
        <h3 className="sr-only">Follow Us</h3>{" "}
        {/* Screen reader only heading */}
        <div className="flex space-x-6">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <FaInstagram className="h-6 w-6 md:h-12 md:w-12 lg:h-18 lg:w-18" />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="X"
            className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <FaSquareXTwitter className="h-6 w-6 md:h-12 md:w-12 lg:h-18 lg:w-18" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
            className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <FaSquareFacebook className="h-6 w-6 md:h-12 md:w-12 lg:h-18 lg:w-18" />
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {currentYear} OnPointStore. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {" "}
          {/* Smaller text for author */}
          Made with 💚 by @Tolevats
        </p>
      </div>
    </div>
  );

  // --- Full Footer Content ---
  const FullFooterContent = () => (
    <>
      {/* Standard grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        {" "}
        {/* Column 1: Brand/About */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          {" "}
          {/* Adjusted span for better balance */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-primary dark:text-primary-light mb-2"
          >
            {/* Logo Image - Ensure path is correct */}
            <Image
              src="/logo.svg"
              alt="OnPointStore Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-primary dark:text-primary-light">
              {" "}
              {/* Use theme color */}
              OnPointStore
            </span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Your favorite place for amazing products. Built with modern tech.
          </p>
        </div>
        {/* Column 2: Quick Links Mock */}
        <div className="space-y-2 md:space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/products"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        {/* Column 3: Help & Support Mock Links */}
        <div className="space-y-2 md:space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/faq"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Shipping
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Returns
              </Link>
            </li>
          </ul>
        </div>
        {/* Column 4: Social Media Mock Links */}
        <div className="space-y-2 md:space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4 md:space-x-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="X"
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaSquareXTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaSquareFacebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Copyright & Author */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {currentYear} OnPointStore. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Made with 💚 by @Tolevats
        </p>
      </div>
    </>
  );

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="@container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Conditionally render full or simple footer content */}
        {isSimpleLayout ? <SimpleFooterContent /> : <FullFooterContent />}
      </div>
    </footer>
  );
};

export default Footer;
