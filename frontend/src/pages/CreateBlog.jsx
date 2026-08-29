import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter a title and write some content.");
      return;
    }

    if (title.trim().length < 3) {
      setError("Blog title must contain at least 3 characters.");
      return;
    }

    if (content.trim().length < 10) {
      setError("Blog content must contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/blogs", {
        title: title.trim(),
        content: content.trim(),
      });

      navigate("/");
    } catch (error) {
      console.error("Create blog error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to publish your story. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  const characterCount = content.length;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 py-10 sm:py-14">

      <div className="max-w-5xl mx-auto px-5 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
            Create something meaningful
          </p>

          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900">
            Write your story
          </h1>

          <p className="mt-3 text-slate-500 max-w-2xl">
            Turn your ideas, experiences and perspectives into
            something worth reading.
          </p>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            <div className="flex items-start gap-3">

              <span className="font-bold">!</span>

              <p>{error}</p>

            </div>
          </div>
        )}

        {/* ================= EDITOR ================= */}

        <form onSubmit={handleSubmit}>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_15px_50px_rgba(15,23,42,0.07)] overflow-hidden">

            {/* Editor Header */}

            <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <span className="text-indigo-600 font-bold">
                    B
                  </span>

                </div>

                <div>

                  <p className="text-sm font-bold text-slate-800">
                    BlogSpace Editor
                  </p>

                  <p className="text-xs text-slate-400">
                    Your draft is ready
                  </p>

                </div>

              </div>

              <div className="hidden sm:block text-xs font-medium text-slate-400">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </div>

            </div>

            {/* ================= TITLE ================= */}

            <div className="px-6 sm:px-10 pt-8">

              <label
                htmlFor="title"
                className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a great title..."
                maxLength={120}
                className="w-full border-0 bg-transparent p-0 font-display text-3xl sm:text-4xl font-semibold text-slate-900 placeholder:text-slate-300 outline-none focus:ring-0"
              />

              <div className="mt-4 border-b border-slate-100" />

            </div>

            {/* ================= CONTENT ================= */}

            <div className="px-6 sm:px-10 pt-7">

              <label
                htmlFor="content"
                className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3"
              >
                Story
              </label>

              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story..."
                rows={18}
                className="w-full border-0 bg-transparent resize-none p-0 text-lg leading-8 text-slate-700 placeholder:text-slate-300 outline-none focus:ring-0"
              />

            </div>

            {/* ================= FOOTER ================= */}

            <div className="px-6 sm:px-10 py-5 mt-4 border-t border-slate-100 bg-slate-50/70">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                {/* Stats */}

                <div className="flex items-center gap-5 text-xs text-slate-400">

                  <span>
                    {wordCount} words
                  </span>

                  <span className="w-1 h-1 rounded-full bg-slate-300" />

                  <span>
                    {characterCount} characters
                  </span>

                </div>

                {/* Buttons */}

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    disabled={loading}
                    className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-indigo-600 hover:-translate-y-0.5 transition-all disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >

                    {loading ? (
                      <span className="flex items-center gap-2">

                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                        Publishing...

                      </span>
                    ) : (
                      "Publish Story →"
                    )}

                  </button>

                </div>

              </div>

            </div>

          </div>

        </form>

        {/* ================= WRITING TIP ================= */}

        <div className="mt-6 flex items-start gap-3 px-2">

          <span className="text-indigo-500">✦</span>

          <p className="text-xs leading-5 text-slate-400">
            Tip: A clear title and a strong opening sentence can
            make readers want to stay.
          </p>

        </div>

      </div>

    </div>
  );
}

export default CreateBlog;