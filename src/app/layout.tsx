import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import Header from "@/components/layout/Header";
import CartSidebar from "@/components/cart/CartSidebar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Footer from "@/components/layout/FooterNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description:
    "A modern e-commerce store built with Next.js, React, and TypeScript",
  icons: {
    icon: "/src/app/favicon.ico", // Fallback icon
    other: {
      rel: "icon",
      url: "/src/app/favicon.svg",
      type: "'image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning useful with theme switching */}
      <body
        className={`${inter.className} bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark  transition-colors duration-300`}
      >
        {" "}
        {/* Apply Tailwind CSS classes for light/dark mode*/}
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="container mx-auto px-4 py-8">
              {" "}
              {/* Basic layout container */}
              {children} {/* This is the only children that should render */}
            </main>
            <CartSidebar />
            <Toaster position="bottom-center" reverseOrder={false} />{" "}
            {/* Add Toaster for notifications */}
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
