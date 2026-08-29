# BlogSpace

BlogSpace is a modern full-stack blogging platform where users can create, read, edit, and delete blog posts.

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected routes
- Create blog posts
- View all blog posts
- View individual blog posts
- Edit your own blog posts
- Delete your own blog posts
- My Blogs section
- User profile
- Logout functionality
- Responsive modern UI
- MongoDB database
- REST API
- Secure password hashing with bcrypt
- Authorization for blog editing and deletion

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## 📁 Project Structure

```text
BlogSpace/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

## 📥 Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd BlogSpace
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload your `.env` file to GitHub.

## ▶️ Running the Project

### Start Backend

Open a terminal:

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## 🔗 API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Blogs

```text
GET    /api/blogs
GET    /api/blogs/:id
GET    /api/blogs/my-blogs

POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

## 🔑 Authentication

BlogSpace uses JWT authentication.

Authenticated requests use:

```text
Authorization: Bearer <token>
```

Users can only edit or delete their own blog posts.

## 📱 Main Pages

- Home
- Login
- Register
- Profile
- Create Blog
- My Blogs
- Edit Blog
- Blog Details
- 404 Page

## 🎯 Project Highlights

BlogSpace provides a complete blogging experience with authentication, authorization, CRUD operations, protected routes, and a responsive user interface.

The application follows a full-stack architecture:

```text
React Frontend
      ↓
Axios API Requests
      ↓
Express REST API
      ↓
MongoDB Database
```

## 🔮 Future Improvements

Possible future features:

- Comments
- Likes
- Search functionality
- Categories and tags
- Pagination
- User profile images
- Rich text editor
- Image uploads
- Dark mode

## 👨‍💻 Author

BlogSpace

Built with React, Node.js, Express.js and MongoDB.

---

⭐ If you like this project, feel free to star the repository!