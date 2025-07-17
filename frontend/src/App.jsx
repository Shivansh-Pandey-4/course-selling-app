import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/user/Home";
import Signup from "./components/user/SignUp";
import Contact from "./components/user/Contact";
import Navbar from "./components/user/Navbar";
import Courses from "./components/user/Courses";
import CourseDetail from "./components/user/CourseDetail";
import Footer from "./components/user/Footer";
import Cart from "./components/user/Cart";
import Error from "./components/user/Error";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./components/user/Login";
import { LoginProvider } from "./context/LoginContext";
import { CartProvider } from "./context/CartContext";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import AdminHeader from "./components/admin/AdminHeader";
import { AdminProvider } from "./context/AdminLoginContext";
import AdminCreateCourse from "./components/admin/AdminCreateCourse";
import AdminUsers from "./components/admin/AdminUsers";
import AdminUpdateUser from "./components/admin/AdminUpdateUser";
import AdminContacts from "./components/admin/AdminContacts";



const App = ()=>{
   return( 
      <div className="">
       <LoginProvider>
          <CartProvider>
              <Navbar/>
              <Outlet/>
              <Footer/>
          </CartProvider>
       </LoginProvider>
      <ToastContainer/>
      </div>
   )
}

const AdminApp = ()=>{
     return (
        <div>
        <AdminProvider>
            <AdminHeader/>
            <Outlet/>
            <Footer/>
        </AdminProvider>
           <ToastContainer/>
        </div>
     )
}

const appRouter = createBrowserRouter([
          {
             path : "/",
             element : <App/>,
             errorElement : <Error/>,
             children : [
               {
                 path : "/",
                 element : <Home/>
               },
               {
                 path : "/signup",
                 element : <Signup/>
               },
               {
                 path : "/contact",
                 element : <Contact/>
               },
               {
                 path : "/login",
                 element : <Login/>
               },
               {
                 path : "/courses",
                 element : <Courses/>
               },
               {
                 path : "/courses/:course_id",
                 element : <CourseDetail/>
               },
               {
                 path : "/cart",
                 element : <Cart/>
               },
             ]
          },
          {
            path : "/admin",
            element : <AdminApp/>,
            errorElement : <Error/>,
            children : [
               {
                  path : "login",
                  element : <AdminLogin/>
               },
               {
                   path : "dashboard",
                   element : <AdminDashBoard/>
               },
               {
                  path : "create/course",
                  element : <AdminCreateCourse/>
               },
               {
                 path : "users",
                 element : <AdminUsers/>
               },
               {
                 path : "update/user/:user_id",
                 element : <AdminUpdateUser/>
               },
               {
                 path : "contacts",
                 element : <AdminContacts/>
               }
            ]
          }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)

export default App;