import express from "express";

import {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get all blogs
// GET /api/blogs
router.get("/", getAllBlogs);


// =====================================================
// PROTECTED ROUTES
// =====================================================

// Get logged-in user's blogs
// GET /api/blogs/my-blogs
router.get(
  "/my-blogs",
  authMiddleware,
  getMyBlogs
);


// Create a new blog
// POST /api/blogs
router.post(
  "/",
  authMiddleware,
  createBlog
);


// Update a blog
// PUT /api/blogs/:id
router.put(
  "/:id",
  authMiddleware,
  updateBlog
);


// Delete a blog
// DELETE /api/blogs/:id
router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);


// =====================================================
// SINGLE BLOG
// =====================================================

// Get single blog
// GET /api/blogs/:id
router.get(
  "/:id",
  getBlogById
);


export default router;