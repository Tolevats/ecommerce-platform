import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="@container min-h-[calc(100vh-20rem)] flex flex-col">
      {" "}
      <main className="flex-1">
        {/* Hero Section - Gradient using custom theme colors (defined via CSS vars in globals.css @theme) */}
        <section className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-hero-gradientFrom to-hero-gradientTo">
          {" "}
          {/* from-blue-600 to-purple-700 */}
          <div className="max-w-4xl text-center px-4 sm:px-6 lg:px-8">
            {/* Animated Logo */}
            <div className="animate-bounce">
              <Image
                src="/logo.svg"
                alt="OnPointStore Logo"
                width={100}
                height={100}
                className="mx-auto mb-6 md:mb-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain"
                // Add a fallback later
              />
            </div>

            {/* Welcome Message - Custom text color (defined via CSS var in globals.css @theme) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-hero mb-6 md:mb-10 drop-shadow-md transition-all duration-300">
              {" "}
              {/* text-accent */}
              Discover Your Perfect Purchase
            </h1>

            {/* Paragraph with responsive spacing - Custom text color (defined via CSS var in globals.css @theme) */}
            <p className="text-base md:text-xl lg:text-2xl text-text-hero mb-6 md:mb-8 leading-relaxed transition-all duration-300">
              Welcome to <strong><em>OnPointStore</em></strong> - Where quality meets convenience.
              <br />
              Explore curated collections, exclusive deals, and seamless
              shopping experiences.
            </p>

            {/* Button Group with responsive layout */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Shop Now Button - Custom theme colors (defined via CSS vars in globals.css @theme) */}
              <Link
                href="/products"
                className="bg-accent border-2 border-primary-dark text-primary px-8 py-3 rounded-full font-semibold
                          hover:bg-primary-light hover:text-accent hover:border-primary-dark
                          transition-all duration-200 shadow-lg
                          w-full md:w-auto text-center"
              >
                Shop Now!
              </Link>

              {/*  Responsive OR Separator - Custom text color (defined via CSS var in globals.css @theme) */}
              <div className="text-text-hero font-semibold relative w-full md:w-auto">
                <span className="md:hidden">OR</span>
                {/* Use accent color for lines */}
                <span className="hidden md:inline-flex items-center gap-4 before:content-[''] before:block before:w-8 before:h-px before:bg-accent after:content-[''] after:block after:w-8 after:h-px after:bg-accent">
                  OR
                </span>
              </div>

              {/* Create Account Button - Custom theme colors (defined via CSS vars in globals.css @theme) */}
              <Link
                href="/register"
                className="bg-primary-dark border-2 border-primary-light text-accent px-8 py-3
                          rounded-full font-semibold hover:bg-primary hover:border-primary-light
                          transition-all duration-200 w-full md:w-auto text-center"
              >
                Create Your Account
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
