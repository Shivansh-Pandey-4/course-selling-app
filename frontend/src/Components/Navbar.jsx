import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";

const Navbar = () =>{

    const loginState = useContext(LoginContext);
    console.log(loginState);


     return (
         <div className="flex justify-around items-center bg-[#646cff]">
            <div className="website-logo-container">
                 <img className="w-28" src="\logo-transparent.png" alt="logo-website" />
            </div>
            <div className="navigation-container">
                 <nav>
                    <ul className="flex text-xl text-gray-400 ">

                    <Link to={"/"}>
                     <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                      Home </li>
                    </Link> 

                     <Link to={"/contact"}>
                        <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                        Contact </li>
                     </Link>

                        <Link to={"/courses"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            Courses </li>
                        </Link>

                        <Link to={"/cart/"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                             Cart</li>
                        </Link>

                        {
                            loginState.isLoggedIn ? (<Link to={"/"}>
                            <li onClick={()=>{
                                  localStorage.removeItem("token");
                                  loginState.setIsLoggedIn(false);
                                  toast.success("User Logged Out successfully.");
                            }} className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            Logout </li>
                        </Link> ) :   <> <Link to={"/signup"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            SignUp </li>
                        </Link>

                        <Link to={"/login"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            Login </li>
                        </Link>  </>
                        }

                       

                    </ul>
                 </nav>
            </div>
         </div>
     )
}

export default Navbar;