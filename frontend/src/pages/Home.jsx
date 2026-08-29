import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  const fetchBlogs = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get("/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Fetch blogs error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load stories right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =====================================================
  // SEARCH / FILTER BLOGS
  // =====================================================

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      blog.title?.toLowerCase().includes(searchText) ||
      blog.content?.toLowerCase().includes(searchText) ||
      blog.author?.name?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900">

        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center py-24 lg:py-32">

            {/* ================= LEFT ================= */}

            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-7">

                <span className="w-2 h-2 rounded-full bg-emerald-400" />

                <span className="text-sm font-medium text-indigo-100">
                  A modern space for writers
                </span>

              </div>

              {/* Heading */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]">

                Stories that

                <span className="block bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  deserve attention.
                </span>

              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">

                Write about what you know. Share what you've
                learned. Discover perspectives from people
                around the world.

              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                {user ? (
                  <Link
                    to="/create-blog"
                    className="bg-white text-slate-900 px-7 py-3.5 rounded-xl font-semibold shadow-xl hover:bg-indigo-50 hover:-translate-y-0.5"
                  >
                    Start Writing →
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    className="bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold shadow-xl shadow-indigo-900/30 hover:bg-indigo-400 hover:-translate-y-0.5"
                  >
                    Join BlogSpace →
                  </Link>
                )}

                <a
                  href="#stories"
                  className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10"
                >
                  Explore Stories
                </a>

              </div>

            </div>

            {/* ================= RIGHT VISUAL ================= */}

            <div className="hidden lg:block">

              <div className="relative">

                {/* Back card */}
                <div className="absolute top-8 right-0 w-full h-full bg-indigo-500/20 rounded-3xl rotate-6" />

                {/* Main card */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-9 -rotate-2">

                  {/* Author header */}
                  <div className="flex items-center justify-between mb-8">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">

                        <span className="font-bold text-indigo-600">
                          B
                        </span>

                      </div>

                      <div>

                        <div className="h-2.5 w-24 bg-slate-800 rounded-full" />

                        <div className="h-2 w-16 bg-slate-200 rounded-full mt-2" />

                      </div>

                    </div>

                    <div className="text-xs text-slate-400">
                      5 min read
                    </div>

                  </div>

                  {/* Card title */}
                  <h3 className="font-display text-3xl font-semibold text-slate-900 leading-tight mb-5">
                    The art of sharing ideas
                  </h3>

                  {/* Card description */}
                  <p className="text-slate-500 leading-7">
                    Great writing isn't about saying more.
                    It's about making every word matter.
                  </p>

                  {/* Card footer */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400" />

                      <span className="text-sm font-semibold text-slate-600">
                        BlogSpace Writer
                      </span>

                    </div>

                    <span className="text-indigo-600 text-xl">
                      →
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          STORIES SECTION
      ================================================= */}

      <section
        id="stories"
        className="max-w-7xl mx-auto px-6 lg:px-8 py-20"
      >

        {/* ================= SECTION HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
              From the community
            </p>

            <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900">
              Latest Stories
            </h2>

            <p className="mt-3 text-slate-500">
              Fresh ideas, experiences and perspectives.
            </p>

          </div>

          {user && (
            <Link
              to="/my-blogs"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View My Stories →
            </Link>
          )}

        </div>

        {/* =================================================
            SEARCH BOX
        ================================================= */}

        <div className="mb-12">

          <div className="relative max-w-2xl">

            {/* Search icon */}
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories, authors or ideas..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition"
            />

            {/* Clear button */}
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

          {/* Search result count */}
          {!loading && blogs.length > 0 && (
            <p className="mt-3 text-sm text-slate-400">

              {search ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-slate-600">
                    {filteredBlogs.length}
                  </span>{" "}
                  {filteredBlogs.length === 1
                    ? "story"
                    : "stories"}{" "}
                  for "
                  <span className="font-semibold text-indigo-600">
                    {search}
                  </span>
                  "
                </>
              ) : (
                <>
                  {blogs.length}{" "}
                  {blogs.length === 1 ? "story" : "stories"} published
                </>
              )}

            </p>
          )}

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="bg-white border border-slate-200 rounded-2xl p-7 animate-pulse"
              >

                <div className="h-3 w-20 bg-slate-200 rounded mb-7" />

                <div className="h-7 w-4/5 bg-slate-200 rounded mb-5" />

                <div className="h-3 w-full bg-slate-200 rounded mb-3" />

                <div className="h-3 w-5/6 bg-slate-200 rounded mb-3" />

                <div className="h-3 w-2/3 bg-slate-200 rounded" />

              </div>

            ))}

          </div>

        ) : blogs.length === 0 ? (

          /* =================================================
             NO BLOGS
          ================================================= */

          <div className="bg-white border border-slate-200 rounded-3xl py-20 px-6 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">

              <span className="text-2xl text-indigo-600">
                ✎
              </span>

            </div>

            <h3 className="font-display text-3xl font-semibold text-slate-900 mb-3">
              Your story could be the first.
            </h3>

            <p className="text-slate-500 mb-7 max-w-md mx-auto">
              Start the conversation by publishing your first
              story on BlogSpace.
            </p>

            {user && (
              <Link
                to="/create-blog"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700"
              >
                Create Your First Story
              </Link>
            )}

          </div>

        ) : filteredBlogs.length === 0 ? (

          /* =================================================
             NO SEARCH RESULTS
          ================================================= */

          <div className="bg-white border border-slate-200 rounded-3xl py-20 px-6 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">

              <span className="text-2xl text-indigo-600">
                ⌕
              </span>

            </div>

            <h3 className="font-display text-3xl font-semibold text-slate-900 mb-3">
              No stories found
            </h3>

            <p className="text-slate-500 mb-7 max-w-md mx-auto">
              We couldn't find any stories matching{" "}
              <span className="font-semibold text-slate-700">
                "{search}"
              </span>
              .
            </p>

            <button
              onClick={() => setSearch("")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Clear Search
            </button>

          </div>

        ) : (

          /* =================================================
             BLOG GRID
          ================================================= */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {filteredBlogs.map((blog, index) => (

              <article
                key={blog._id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(15,23,42,0.05)] hover:shadow-[0_20px_45px_rgb(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300"
              >

                {/* Gradient line */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

                <div className="p-7">

                  {/* Metadata */}
                  <div className="flex items-center justify-between mb-6">

                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {index === 0 ? "Featured" : "Story"}
                    </span>

                    <span className="text-xs text-slate-400">
                      {new Date(
                        blog.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-semibold leading-tight text-slate-900 mb-4 group-hover:text-indigo-600 transition">

                    {blog.title}

                  </h3>

                  {/* Content */}
                  <p className="text-slate-500 leading-7 line-clamp-4">

                    {blog.content}

                  </p>

                  {/* Author */}
                  <div className="border-t border-slate-100 mt-7 pt-5">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">

                        <span className="text-indigo-600 font-bold text-sm">
                          {(blog.author?.name || "A")
                            .charAt(0)
                            .toUpperCase()}
                        </span>

                      </div>

                      <div>

                        <p className="text-[11px] text-slate-400 uppercase tracking-wider">
                          Written by
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {blog.author?.name || "Anonymous"}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Read button */}
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="mt-6 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600"
                  >
                    Read Story
                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* =================================================
          CTA SECTION
      ================================================= */}

      <section className="bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* CTA Text */}
            <div>

              <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Your voice matters
              </p>

              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">

                Have something

                <span className="text-indigo-400">
                  {" "}worth saying?
                </span>

              </h2>

              <p className="mt-5 text-slate-400 max-w-lg leading-7">

                Turn your ideas into stories and share them
                with people who want to hear them.

              </p>

            </div>

            {/* CTA Button */}
            <div className="md:text-right">

              <Link
                to={user ? "/create-blog" : "/register"}
                className="inline-block bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 hover:-translate-y-0.5 shadow-xl"
              >

                {user
                  ? "Write Your Story"
                  : "Create Your Account"}{" "}

                →

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;