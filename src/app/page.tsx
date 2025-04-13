import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="@container flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="h-[65vh] flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl text-center px-4 sm:px-6 lg:px-8">
            {/* Animated Logo */}
            <div className="animate-bounce-slow">
              <Image
                src="/logo.svg"
                alt="OnPointStore Logo"
                width={100}
                height={100}
                className="mx-auto mb-6 md:mb-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain"
              />
            </div>

            {/* Welcome Message */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6 md:mb-10 drop-shadow-md transition-all duration-300">
              Discover Your Perfect Purchase
            </h1>

            {/* Paragraph with responsive spacing */}
            <p className="text-base md:text-xl lg:text-2xl text-accent mb-6 md:mb-8 leading-relaxed transition-all duration-300">
              Welcome to OnPointStore - Where quality meets convenience.
              <br />
              Explore curated collections, exclusive deals, and seamless
              shopping experiences.
            </p>

            {/* Button Group with responsive layout */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Shop Now Button */}
              <Link
                href="/products"
                className="bg-amber-50 border-2 border-violet-900 text-violet-700 px-8 py-3 rounded-full font-semibold 
                          hover:bg-violet-400 transition-all duration-200 shadow-lg
                          hover:text-amber-50 w-full md:w-auto hover:border-violet-900 text-center animate-fade-in-up"
              >
                Shop Now!
              </Link>

              {/*  Responsive OR Separator */}
              <div className="text-amber-50 font-semibold relative w-full md:w-auto">
                <span className="md:hidden">OR</span>
                <span className="hidden md:inline-flex items-center gap-4 before:content-[''] before:block before:w-8 before:h-px before:bg-white after:content-[''] after:block after:w-8 after:h-px after:bg-white">
                  OR
                </span>
              </div>

              {/* Create Account Button */}
              <Link
                href="/register"
                className="bg-violet-900 border-2 border-violet-400 text-amber-50 px-8 py-3 
                          rounded-full font-semibold hover:bg-violet-500 hover:border-violet-400
                          transition-all duration-200 w-full md:w-auto text-center animate-fade-in-up delay-100"
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
