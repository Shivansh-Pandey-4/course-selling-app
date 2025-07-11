import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home";
import Signup from "./Components/SignUp";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Courses from "./Components/Courses";
import Footer from "./Components/Footer";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./Components/Login";

const App = ()=>{
   return( 
      <div className="">
          <Navbar/>
           <Outlet/>
          <Footer/>
           <ToastContainer/>
      </div>
   )
}

const appRouter = createBrowserRouter([
          {
             path : "/",
             element : <App/>,
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
               }
             ]
          }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)

export default App;