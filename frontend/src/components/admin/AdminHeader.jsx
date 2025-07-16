import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn";



const AdminHeader = () =>{

    const isAdminLoggedIn = useIsAdminLoggedIn();


    
     return (
         <div className="flex justify-around items-center bg-[#646cff]">
            <div className="website-logo-container">
                 <img className="w-28" src="\logo-transparent.png" alt="logo-website" />
            </div>
            <div className="navigation-container">
                 <nav>
                    <ul className="flex text-xl text-gray-400 ">

        {
         isAdminLoggedIn.isAdminLoggedIn ? <>
          
                       <Link to={"/admin/dashboard"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            My Courses </li>
                        </Link>

                        <Link to={"/admin/users"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            Users </li>
                        </Link>

                        <Link to={"/admin/create/course"}>
                            <li className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            Create Course </li>
                        </Link>

                         <Link to={"/"}>
                            <li onClick={()=>{
                                localStorage.removeItem("adminToken");
                                toast.success("User Logged Out successfully.");
                                
                            }} className="mx-5 cursor-pointer relative text-black hover:text-white after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                            Logout </li>
                        </Link> 
                       </>  : <div className="text-white" >This is Admin authorized route</div>
                
     }
                    </ul>
                 </nav>
            </div>
         </div>
     )
}

export default AdminHeader;