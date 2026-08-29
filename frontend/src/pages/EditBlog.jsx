import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Fetch Blog
  // =========================
  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blog = response.data.blog;

      setTitle(blog.title || "");
      setContent(blog.content || "");
    } catch (error) {
      console.error("Fetch blog error:", error);

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
  // Update Blog
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a title and some content.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await api.put(
        `/blogs/${id}`,
        {
          title: title.trim(),
          content: content.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error("Update blog error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to update your story. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="animate-pulse">

            <div className="h-3 w-28 bg-slate-200 rounded mb-4" />

            <div className="h-10 w-64 bg-slate-200 rounded mb-3" />

            <div className="h-4 w-96 max-w-full bg-slate-200 rounded mb-10" />

            <div className="bg-white border border-slate-200 rounded-3xl p-8">

              <div className="h-4 w-24 bg-slate-200 rounded mb-3" />
              <div className="h-14 w-full bg-slate-200 rounded-xl mb-7" />

              <div className="h-4 w-24 bg-slate-200 rounded mb-3" />
              <div className="h-72 w-full bg-slate-200 rounded-xl" />

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-10">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
            Refine your story
          </p>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Edit your story.
          </h1>

          <p className="mt-3 text-slate-500 text-lg">
            Improve your ideas, fix your words and make your story even better.
          </p>

        </div>

        {/* =========================
            EDITOR
        ========================= */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_40px_rgb(15,23,42,0.06)] overflow-hidden">

          {/* Gradient accent */}
          <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

          <div className="p-6 sm:p-8 lg:p-10">

            {/* Error */}
            {error && (
              <div className="mb-7 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-red-600">

                <span className="font-bold">
                  !
                </span>

                <p className="text-sm font-medium">
                  {error}
                </p>

              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* =========================
                  TITLE
              ========================= */}

              <div className="mb-7">

                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-slate-800 mb-2"
                >
                  Story title
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your story title..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                />

              </div>

              {/* =========================
                  CONTENT
              ========================= */}

              <div className="mb-8">

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="content"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Story content
                  </label>

                  <span className="text-xs text-slate-400">
                    {content.length} characters
                  </span>

                </div>

                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your story..."
                  rows="16"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-base leading-7 text-slate-800 placeholder:text-slate-400 outline-none resize-y transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                />

              </div>

              {/* =========================
                  ACTIONS
              ========================= */}

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-7">

                <button
                  type="button"
                  onClick={() => navigate("/my-blogs")}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/10 hover:bg-indigo-600 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-slate-900 disabled:hover:translate-y-0"
                >
                  {saving
                    ? "Saving Changes..."
                    : "Save Changes →"}
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* =========================
            TIP
        ========================= */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-indigo-50 border border-indigo-100 px-5 py-4">

          <span className="text-indigo-600 font-bold">
            ✦
          </span>

          <p className="text-sm text-indigo-900/70 leading-6">
            <span className="font-semibold text-indigo-900">
              Editing tip:
            </span>{" "}
            Read your story once before saving. Small changes can make a big
            difference.
          </p>

        </div>

      </div>

    </div>
  );
}

export default EditBlog;