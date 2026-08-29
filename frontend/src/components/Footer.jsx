import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-5 group"
            >

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
                <span className="text-white font-extrabold text-lg">
                  B
                </span>
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Blog<span className="text-indigo-400">Space</span>
              </span>

            </Link>

            <p className="max-w-md text-slate-400 leading-7">
              A modern space for writers, thinkers and curious
              minds. Share your ideas, tell your story and
              discover perspectives from others.
            </p>

          </div>

          {/* Explore */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              Explore
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="text-slate-400 hover:text-white transition"
              >
                Discover
              </Link>

              <Link
                to="/register"
                className="text-slate-400 hover:text-white transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="text-slate-400 hover:text-white transition"
              >
                Sign In
              </Link>

            </div>

          </div>

          {/* For Writers */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              For Writers
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/create-blog"
                className="text-slate-400 hover:text-white transition"
              >
                Write a Story
              </Link>

              <Link
                to="/my-blogs"
                className="text-slate-400 hover:text-white transition"
              >
                My Stories
              </Link>

              <Link
                to="/profile"
                className="text-slate-400 hover:text-white transition"
              >
                Profile
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BlogSpace. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built with <span className="text-indigo-400">React</span> &
            <span className="text-indigo-400"> Node.js</span>
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;