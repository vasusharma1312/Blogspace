import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // =========================
  // Fetch My Blogs
  // =========================
  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get("/blogs/my-blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("My blogs error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your stories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  // =========================
  // Delete Blog
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      await api.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== id)
      );
    } catch (error) {
      console.error("Delete blog error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete the story."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="animate-pulse">

            <div className="h-3 w-32 bg-slate-200 rounded mb-4" />

            <div className="h-10 w-64 bg-slate-200 rounded mb-3" />

            <div className="h-4 w-80 bg-slate-200 rounded mb-10" />

            <div className="grid md:grid-cols-2 gap-6">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white border border-slate-200 rounded-2xl p-7"
                >
                  <div className="h-3 w-20 bg-slate-200 rounded mb-6" />
                  <div className="h-7 w-3/4 bg-slate-200 rounded mb-4" />
                  <div className="h-3 w-full bg-slate-200 rounded mb-3" />
                  <div className="h-3 w-5/6 bg-slate-200 rounded mb-7" />
                  <div className="h-10 w-full bg-slate-200 rounded" />
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
              Your writing
            </p>

            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              My Stories
            </h1>

            <p className="mt-3 text-slate-500 text-lg">
              Manage everything you've published on BlogSpace.
            </p>
          </div>

          <Link
            to="/create-blog"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-slate-900/10 hover:bg-indigo-600 hover:-translate-y-0.5"
          >
            <span className="text-lg">+</span>
            New Story
          </Link>

        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
            <div className="flex items-start gap-3">
              <span className="font-bold">!</span>

              <p className="text-sm font-medium">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            STATS
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Total Stories
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-1">
              {blogs.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Latest Story
            </p>

            <p className="text-lg font-bold text-slate-900 mt-2 truncate">
              {blogs.length > 0
                ? blogs[0].title
                : "No stories yet"}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="text-lg font-bold text-emerald-600 mt-2">
              {blogs.length > 0
                ? "Publishing"
                : "Ready to write"}
            </p>
          </div>

        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {blogs.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm py-20 px-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">

              <span className="font-display text-3xl text-indigo-600">
                B
              </span>

            </div>

            <h2 className="font-display text-3xl font-semibold text-slate-900 mb-3">
              Nothing published yet.
            </h2>

            <p className="text-slate-500 max-w-md mx-auto mb-8 leading-7">
              Every great writer starts with one story.
              Share your first idea with the BlogSpace community.
            </p>

            <Link
              to="/create-blog"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:-translate-y-0.5"
            >
              Write Your First Story →
            </Link>

          </div>

        ) : (

          /* =========================
             BLOG GRID
          ========================= */

          <div className="grid md:grid-cols-2 gap-6">

            {blogs.map((blog, index) => (

              <article
                key={blog._id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(15,23,42,0.05)] hover:shadow-[0_18px_40px_rgb(15,23,42,0.10)] hover:-translate-y-1 transition-all duration-300"
              >

                {/* Accent */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

                <div className="p-7">

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-5">

                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {index === 0 ? "Latest Story" : "Published"}
                    </span>

                    <span className="text-xs text-slate-400">
                      {new Date(
                        blog.createdAt
                      ).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                  </div>

                  {/* Title */}
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h2>

                  {/* Content */}
                  <p className="text-slate-500 leading-7 line-clamp-4 mb-7">
                    {blog.content}
                  </p>

                  {/* Actions */}
                  <div className="border-t border-slate-100 pt-5">

                    <div className="flex flex-wrap gap-3">

                      {/* Read */}
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="flex-1 min-w-[100px] text-center px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                      >
                        Read
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(`/edit-blog/${blog._id}`)
                        }
                        className="flex-1 min-w-[100px] px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(blog._id)
                        }
                        disabled={deletingId === blog._id}
                        className="flex-1 min-w-[100px] px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === blog._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default MyBlogs;