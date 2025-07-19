import React from "react";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/user/Home";
import Signup from "./components/user/SignUp";
import Contact from "./components/user/Contact";
import Navbar from "./components/user/Navbar";
import Courses from "./components/user/Courses";
import CourseDetail from "./components/user/CourseDetail";
import Footer from "./components/user/Footer";
import Cart from "./components/user/Cart";
import Error from "./components/user/Error";
import Login from "./components/user/Login";

const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminDashBoard = lazy(() => import("./components/admin/AdminDashBoard"));
const AdminHeader = lazy(() => import("./components/admin/AdminHeader"));
const AdminCreateCourse = lazy(() => import("./components/admin/AdminCreateCourse"));
const AdminUsers = lazy(() => import("./components/admin/AdminUsers"));
const AdminUpdateUser = lazy(() => import("./components/admin/AdminUpdateUser"));
const AdminContacts = lazy(() => import("./components/admin/AdminContacts"));
const AdminEditCourse = lazy(() => import("./components/admin/AdminEditCourse"));

import { LoginProvider } from "./context/LoginContext";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminLoginContext";

import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";


const App = () => {
  return (
    <>
    <LoginProvider>
      <CartProvider>
        <Navbar />
        <Outlet />
        <Footer />
         </CartProvider>
      </LoginProvider>
        <ToastContainer />
    </>
  );
};


const AdminApp = () => {
  return (
    <>
    <AdminProvider>
      <LoginProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      <Footer />
    </LoginProvider>
  </AdminProvider>
      <ToastContainer />
    </>
  );
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:course_id", element: <CourseDetail /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    errorElement: <Error />,
    children: [
      { path: "login",
        element: <AdminLogin />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedAdminRoute>
             <AdminHeader />
            <AdminDashBoard />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "create/course",
        element: (
          <ProtectedAdminRoute>
            <AdminHeader />
            <AdminCreateCourse />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "users",
        element: (
           <ProtectedAdminRoute>
            <AdminHeader />
            <AdminUsers />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "update/user/:user_id",
        element: (
          <ProtectedAdminRoute>
            <AdminHeader />
            <AdminUpdateUser />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <ProtectedAdminRoute>
            <AdminHeader />
            <AdminContacts />
          </ProtectedAdminRoute>
        ),
      },
      {
         path : "edit/course/:course_id",
         element : (
           <ProtectedAdminRoute>
              <AdminHeader/>
              <AdminEditCourse/>
           </ProtectedAdminRoute>
         )
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

export default App;
