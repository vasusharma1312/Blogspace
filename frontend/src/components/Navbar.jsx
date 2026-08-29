import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* ================= BRAND ================= */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">

              <span className="text-white font-extrabold text-lg">
                B
              </span>

            </div>

            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Blog<span className="text-indigo-600">Space</span>
            </span>

          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <div className="hidden md:flex items-center gap-7">

            <Link
              to="/"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
            >
              Discover
            </Link>

            {user ? (
              <>
                <Link
                  to="/create-blog"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
                >
                  Write
                </Link>

                <Link
                  to="/my-blogs"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
                >
                  My Stories
                </Link>

                <Link
                  to="/profile"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
                >
                  Profile
                </Link>

                {/* Divider */}
                <div className="h-7 w-px bg-slate-200" />

                {/* User */}
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    {user.name}
                  </span>

                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-500 hover:text-red-500"
                >
                  Sign out
                </button>

              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-slate-900/10 hover:bg-indigo-600 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}

          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl hover:bg-indigo-50 hover:text-indigo-600"
            aria-label="Toggle menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (

          <div className="md:hidden border-t border-slate-200 py-6">

            <div className="flex flex-col gap-5">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 font-semibold"
              >
                Discover
              </Link>

              {user ? (
                <>
                  <Link
                    to="/create-blog"
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-700 font-semibold"
                  >
                    Write
                  </Link>

                  <Link
                    to="/my-blogs"
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-700 font-semibold"
                  >
                    My Stories
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-700 font-semibold"
                  >
                    Profile
                  </Link>

                  <div className="pt-3 border-t border-slate-200">

                    <p className="text-sm text-slate-500 mb-3">
                      Signed in as
                    </p>

                    <p className="font-semibold text-slate-800 mb-4">
                      {user.name}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-semibold"
                    >
                      Sign out
                    </button>

                  </div>

                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-700 font-semibold"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;