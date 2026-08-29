import Blog from "../models/Blog.js";

// ======================================================
// CREATE BLOG
// ======================================================
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user._id,
    });

    // Populate author information
    const populatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name email"
    );

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating blog",
    });
  }
};

// ======================================================
// GET ALL BLOGS
// ======================================================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get all blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching blogs",
    });
  }
};

// ======================================================
// GET MY BLOGS
// ======================================================
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get my blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching your blogs",
    });
  }
};

// ======================================================
// GET SINGLE BLOG
// ======================================================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get blog by ID error:", error);

    // Invalid MongoDB ID
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while fetching blog",
    });
  }
};

// ======================================================
// UPDATE BLOG
// ======================================================
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find blog
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ==================================================
    // AUTHOR CHECK
    // ==================================================
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    // ==================================================
    // VALIDATION
    // ==================================================
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog title cannot be empty",
      });
    }

    if (content !== undefined && !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog content cannot be empty",
      });
    }

    // ==================================================
    // UPDATE FIELDS
    // ==================================================
    if (title !== undefined) {
      blog.title = title.trim();
    }

    if (content !== undefined) {
      blog.content = content.trim();
    }

    await blog.save();

    // Get updated blog with author
    const updatedBlog = await Blog.findById(blog._id).populate(
      "author",
      "name email"
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while updating blog",
    });
  }
};

// ======================================================
// DELETE BLOG
// ======================================================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ==================================================
    // AUTHOR CHECK
    // ==================================================
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while deleting blog",
    });
  }
};