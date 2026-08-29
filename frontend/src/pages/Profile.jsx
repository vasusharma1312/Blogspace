import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_15px_50px_rgba(15,23,42,0.06)]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">
            👤
          </div>

          <h2 className="mt-6 font-display text-3xl font-bold text-slate-950">
            Please Login
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Login to your account to view your profile and manage
            your stories.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Login →
          </Link>

        </div>
      </div>
    );
  }

  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      {/* =========================
          Profile Header
      ========================= */}
      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            Account
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Your profile.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Manage your account and continue sharing your ideas
            with the BlogSpace community.
          </p>

        </div>

      </section>

      {/* =========================
          Profile Content
      ========================= */}
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">

        <div className="grid gap-6 lg:grid-cols-3">

          {/* =========================
              Profile Card
          ========================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_15px_50px_rgba(15,23,42,0.06)] lg:col-span-1">

            <div className="flex flex-col items-center text-center">

              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-3xl font-bold text-white shadow-lg shadow-indigo-200">
                {firstLetter}
              </div>

              <h2 className="mt-5 font-display text-2xl font-bold text-slate-950">
                {user.name}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Active Account
              </div>

            </div>

          </div>

          {/* =========================
              Account Details
          ========================= */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.06)] lg:col-span-2">

            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

              <h2 className="font-display text-2xl font-bold text-slate-950">
                Account information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your basic BlogSpace account details.
              </p>

            </div>

            <div className="divide-y divide-slate-100">

              {/* Name */}
              <div className="flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Full name
                  </p>

                  <p className="mt-2 text-base font-semibold text-slate-800">
                    {user.name}
                  </p>
                </div>

                <div className="text-2xl text-slate-200">
                  👤
                </div>

              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email address
                  </p>

                  <p className="mt-2 break-all text-base font-semibold text-slate-800">
                    {user.email}
                  </p>
                </div>

                <div className="text-2xl text-slate-200">
                  ✉
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            Quick Actions
        ========================= */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.06)] sm:p-8">

          <div className="mb-6">

            <h2 className="font-display text-2xl font-bold text-slate-950">
              Quick actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Jump back into your BlogSpace journey.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {/* My Blogs */}
            <Link
              to="/my-blogs"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                  📚
                </div>

                <span className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500">
                  →
                </span>

              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                My Blogs
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                View, edit and manage all your published stories.
              </p>

            </Link>

            {/* Create Blog */}
            <Link
              to="/create-blog"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  ✍️
                </div>

                <span className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500">
                  →
                </span>

              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Write a Story
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Share a new idea, experience or perspective.
              </p>

            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;