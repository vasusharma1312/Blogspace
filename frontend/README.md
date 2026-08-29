# ✍️ BlogSpace

BlogSpace is a modern full-stack blogging platform where users can create, read, edit, and delete blog posts.

A clean and responsive blogging platform with authentication, blog management, user profiles, and a REST API powered by Node.js, Express.js, and MongoDB.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout

### 📝 Blog Management
- Create Blog Posts
- View All Blogs
- View Blog Details
- Edit Your Own Blogs
- Delete Your Own Blogs
- View My Blogs

### 👤 User Profile
- View Profile
- Display User Name and Email
- Protected Profile Page

### 🎨 UI & Design
- Modern and Clean Design
- Responsive Layout
- Mobile-Friendly Navigation
- Sticky Navbar
- Smooth Hover Effects
- Responsive Blog Cards
- Custom 404 Page

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Vite
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- REST API

---

## 📁 Project Structure

BlogSpace/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

---

## ⚙️ Installation

### 1. Clone the Repository

git clone https://github.com/vasusharma1312/Blogspace.git

### 2. Open the Project

cd Blogspace

---

## 🔧 Backend Setup

Go to the backend folder:

cd backend

Install dependencies:

npm install

Create a `.env` file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:

npm run dev

Backend will run on:

http://localhost:5000

---

## 💻 Frontend Setup

Open another terminal and go to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend will normally run on:

http://localhost:5173

---

## 🔑 Environment Variables

The backend requires these environment variables:

PORT
MONGO_URI
JWT_SECRET

Never upload your `.env` file to GitHub.

---

## 🔌 API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login

### Blogs

GET /api/blogs
GET /api/blogs/:id
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

---

## 🔒 Authorization

Authenticated users can:

- Create their own blogs
- Edit their own blogs
- Delete their own blogs
- View their own blogs

Users cannot edit or delete blogs created by other users.

---

## 📱 Pages

- Home / Discover
- Login
- Register
- Create Blog
- My Stories
- Edit Blog
- Blog Details
- Profile
- 404 Page

---

## 🎯 Project Highlights

BlogSpace uses a full-stack architecture:

React Frontend
        ↓
React Router
        ↓
Express REST API
        ↓
JWT Authentication
        ↓
MongoDB Database

The frontend communicates with the backend through REST APIs, while MongoDB stores users and blog data.

---

## 🔮 Future Improvements

- Comments
- Likes
- Search Functionality
- Categories and Tags
- Pagination
- User Profile Images
- Rich Text Editor
- Image Uploads
- Dark Mode
- Blog Sharing
- Social Authentication
- Notifications

---

## 👨‍💻 Author

Vasu

GitHub:
https://github.com/vasusharma1312

---

## ⭐ Support

If you like this project, please give the repository a ⭐ on GitHub.

Your support helps motivate further development and improvements.

---

## 📄 License

This project is created for learning and portfolio purposes.

© 2026 Vasu. All rights reserved.