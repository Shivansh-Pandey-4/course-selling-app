# 🎓 Bright Path — Course Selling Application (MERN Stack)

**Bright Path** is a full-featured course selling web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to explore, purchase, and manage online courses, while giving administrators full control over content, users, and user communication.

---

## ✨ Features

### 🧑‍🎓 User Features

- User Registration and Login (JWT Authentication)
- Browse and Search for Courses
- Enroll in Courses
- Contact Us Form (Suggestions, Feedback, Queries)

### 🛠️ Admin Dashboard

- Create, Edit, and Delete Courses
- View All Registered Users
- See usernames, emails, admin status
- Edit user credentials
- Delete user accounts (forces re-registration)
- 📝 View All Contact Submissions
  - See user feedback, queries, and suggestions

---

## 🧪 Tech Stack

| Layer          | Technology             |
| -------------- | ---------------------- |
| **Frontend**   | React, Tailwind CSS    |
| **Backend**    | Node.js, Express.js    |
| **Database**   | MongoDB (Mongoose ODM) |
| **Auth**       | JWT + bcrypt           |
| **Validation** | Zod                    |

---

## 🔐 Authentication & Authorization

- Secure password storage using **bcrypt**
- **JWT** for session management
- Role-based route protection for **users** and **admins**

---

## 🧾 Admin Capabilities

- **User Management**

  - View all users with details (email, username, role)
  - Edit user details
  - Delete users from the system

- **Course Management**

  - Add, update, or remove course listings
  - Create course with course image, course name, description and price.

- **Contact Handling**
  - View user-submitted contact forms
  - Understand user suggestions, issues, and questions

---

## 💡 Future Improvements

- Integrate payment gateway (e.g., Stripe)

- Add course reviews and ratings

- Email verification and password reset

- Responsive design enhancements

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

```bash
# Backend
cd backend
npm install
node index.js

# Frontend
cd frontend
npm install
npm run dev
```
