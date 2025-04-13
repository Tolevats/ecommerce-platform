import "./globals.css"; // Import global styles
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import CartSidebar from "@/components/cart/CartSidebar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Footer from "@/components/layout/FooterNav";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description:
    "A modern e-commerce store built with Next.js, React, and TypeScript",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning useful with theme switching */}
      <body
        className={`${inter.className} bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark  transition-colors duration-300`}
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientLayout>{children}</ClientLayout>{" "}
            {/* Render the client component */}
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
