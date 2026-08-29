import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <BrowserRouter>
      {/* ================= NAVBAR ================= */}
      <Navbar />

      <Routes>
        {/* ==========================================
            PUBLIC ROUTES
        ========================================== */}

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Blog Details */}
        <Route
          path="/blogs/:id"
          element={<BlogDetails />}
        />

        {/* ==========================================
            PROTECTED ROUTES
        ========================================== */}

        {/* Create Blog */}
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        {/* My Blogs */}
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />

        {/* Edit Blog */}
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            404 PAGE
        ========================================== */}

        <Route
          path="*"
          element={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
              <div className="text-center">

                {/* 404 Label */}
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
                  404
                </p>

                {/* Heading */}
                <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                  Page not found
                </h1>

                {/* Description */}
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  The page you're looking for doesn't exist
                  or may have been moved.
                </p>

                {/* Back Home */}
                <Link
                  to="/"
                  className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-600 hover:-translate-y-0.5 transition-all duration-200"
                >
                  ← Back to Home
                </Link>

              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;