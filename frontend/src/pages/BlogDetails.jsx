import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get(`/blogs/${id}`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      setBlog(response.data.blog);
    } catch (error) {
      console.error("Blog details error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load this story."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="animate-pulse">

            <div className="h-4 w-28 bg-slate-200 rounded mb-10" />

            <div className="h-4 w-24 bg-slate-200 rounded mb-5" />

            <div className="h-14 w-4/5 bg-slate-200 rounded mb-4" />

            <div className="h-14 w-3/5 bg-slate-200 rounded mb-8" />

            <div className="flex gap-4 mb-10">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div>
                <div className="h-3 w-28 bg-slate-200 rounded mb-2" />
                <div className="h-3 w-20 bg-slate-200 rounded" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <div className="h-4 w-full bg-slate-200 rounded mb-4" />
              <div className="h-4 w-full bg-slate-200 rounded mb-4" />
              <div className="h-4 w-5/6 bg-slate-200 rounded mb-8" />

              <div className="h-4 w-full bg-slate-200 rounded mb-4" />
              <div className="h-4 w-4/5 bg-slate-200 rounded" />
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-sm p-10 text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-6">
            <span className="text-2xl text-red-500">
              !
            </span>
          </div>

          <h1 className="font-display text-3xl font-semibold text-slate-900 mb-3">
            Story unavailable
          </h1>

          <p className="text-slate-500 mb-8">
            {error}
          </p>

          <Link
            to="/"
            className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600"
          >
            ← Back to Stories
          </Link>

        </div>

      </div>
    );
  }

  // =========================
  // Not Found
  // =========================
  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-slate-900 mb-3">
            Story not found
          </h1>

          <p className="text-slate-500 mb-6">
            The story you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            ← Back to BlogSpace
          </Link>
        </div>

      </div>
    );
  }

  // =========================
  // Author
  // =========================
  const authorName = blog.author?.name || "Anonymous";

  const authorInitial = authorName
    .charAt(0)
    .toUpperCase();

  // =========================
  // Check Owner
  // =========================
  const isOwner =
    user &&
    blog.author &&
    (
      user.id === blog.author._id ||
      user.id === blog.author.id ||
      user._id === blog.author._id
    );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-8">

        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <span className="text-lg">
              ←
            </span>

            Back to Stories
          </Link>

          {isOwner && (
            <button
              onClick={() =>
                navigate(`/edit-blog/${blog._id}`)
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-600"
            >
              Edit Story
            </button>
          )}

        </div>

      </div>

      {/* =================================================
          ARTICLE HEADER
      ================================================= */}

      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">

        <article>

          {/* Category */}
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              BlogSpace Story
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-slate-900 max-w-4xl">
            {blog.title}
          </h1>

          {/* Intro line */}
          <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-8 max-w-3xl">
            A story, idea or perspective shared with the
            BlogSpace community.
          </p>

          {/* =================================================
              AUTHOR INFO
          ================================================= */}

          <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-y border-slate-200 py-6">

            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/20">

                <span className="text-white font-bold">
                  {authorInitial}
                </span>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Written by
                </p>

                <p className="text-sm sm:text-base font-semibold text-slate-800">
                  {authorName}
                </p>

              </div>

            </div>

            {/* Date */}
            <div className="text-left sm:text-right">

              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Published
              </p>

              <p className="text-sm sm:text-base font-medium text-slate-700">
                {new Date(
                  blog.createdAt
                ).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

            </div>

          </div>

          {/* =================================================
              ARTICLE CONTENT
          ================================================= */}

          <div className="mt-12 bg-white border border-slate-200 rounded-3xl shadow-[0_12px_40px_rgb(15,23,42,0.05)] overflow-hidden">

            {/* Accent */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

            <div className="p-7 sm:p-10 lg:p-14">

              <div className="max-w-3xl mx-auto">

                <div className="font-display text-xl sm:text-2xl leading-[1.9] text-slate-700 whitespace-pre-wrap break-words">
                  {blog.content}
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              BOTTOM SECTION
          ================================================= */}

          <div className="max-w-3xl mx-auto mt-12">

            <div className="border-t border-slate-200 pt-8">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div>

                  <p className="text-sm font-semibold text-slate-800">
                    Enjoyed this story?
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Discover more ideas from the BlogSpace community.
                  </p>

                </div>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:-translate-y-0.5"
                >
                  Explore More →
                </Link>

              </div>

            </div>

          </div>

        </article>

      </main>

      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="bg-slate-950 mt-8">

        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-14">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-3">
                Have a story?
              </p>

              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Share your perspective.
              </h2>

            </div>

            <Link
              to={user ? "/create-blog" : "/register"}
              className="inline-flex items-center justify-center bg-white text-slate-950 px-7 py-3.5 rounded-xl font-bold hover:bg-indigo-50 hover:-translate-y-0.5"
            >
              {user
                ? "Write a Story"
                : "Join BlogSpace"}{" "}
              →
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default BlogDetails;