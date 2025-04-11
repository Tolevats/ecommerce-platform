import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl text-center px-4">
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-md">
              Discover Your Perfect Purchase
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Welcome to NextCommerce - Where quality meets convenience.
              <br />
              Explore curated collections, exclusive deals, and seamless
              shopping experiences.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              {/* Shop Now Button */}
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold 
                          hover:bg-opacity-90 transition-all duration-200 shadow-lg
                          hover:shadow-xl w-full md:w-auto text-center"
              >
                Shop Now
              </Link>

              {/* OR Separator */}
              <div className="text-white font-semibold relative w-full md:w-auto">
                <span className="md:hidden">OR</span>
                <span className="hidden md:inline-flex items-center gap-4 before:content-[''] before:block before:w-8 before:h-px before:bg-white after:content-[''] after:block after:w-8 after:h-px after:bg-white">
                  OR
                </span>
              </div>

              {/* Create Account Button */}
              <Link
                href="/register"
                className="bg-purple-500 border-2 border-purple-500 text-white px-8 py-3 
                          rounded-full font-semibold hover:bg-purple-600 hover:border-purple-600
                          transition-all duration-200 w-full md:w-auto text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} OnPointStore. All rights
              reserved.
            </p>
            <p>Made with 💚 by @Tolevats </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
