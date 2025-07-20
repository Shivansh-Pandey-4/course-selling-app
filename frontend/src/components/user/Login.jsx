import { useState , useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate , Link } from "react-router-dom";
import useUserIsLoggedIn from "../../hooks/useIsUserLoggedIn";



const Login = ()=>{


      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const navigate = useNavigate();
      const isUserLoggedIn = useUserIsLoggedIn();

      
               useEffect(() => {
                     const token = localStorage.getItem("token");
                     if (token) {
                        navigate("/");
                     }
            }, [navigate]);



      async function handleForm(event) {
           event.preventDefault();

             if( !email|| !password){
                    toast.error("fill all the fields");
                    return;
             } 

             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                     toast.error("Please enter a valid email address");
                     return;
                  }

                  if (password.length < 6) {
                     toast.error("Password must be at least 6 characters");
                     return;
                  }

             const response = await fetch("http://localhost:3000/user/login",{
                   method : "POST",
                   headers : {
                      "content-type" : "application/json",
                   },
                   body : JSON.stringify({ password, email})
             })

             const data = await response.json();
             if(data.msg == "User Logged in successfully"){
                  localStorage.setItem("token",data.token);
                   isUserLoggedIn.setIsLoggedIn(true);
                   toast.success("User LoggedIn successfully");
      
                     setEmail("");
                     setPassword("");
                    navigate("/");
             }else {
                  return toast.error(data.detailError || data.msg);
             }
      }



     return (
        <div className="bg-[#242424]">
            <form onSubmit={handleForm} className="flex justify-center items-center ">
               <div className="mr-20 pt-20 ">
                    <h1 className="text-4xl mb-8 text-white font-serif">Login Page</h1>
                      <span className="text-white text-xl">Don't have an account ? <Link to={"/signup"}> <button type="button" className="text-2xl cursor-pointer border-white text-indigo-500 border px-2 py-1 rounded-xl hover:bg-white hover:text-black"> Signup</button ></Link></span>
                    <div className="border-t-2 border-white my-2"></div>
                    
                     <div className="my-5">
                         <label className="text-xl text-gray-300 " htmlFor="email">Email</label> <br />
                         <input autoFocus required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="email" id="email" placeholder="Enter Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} />
                     </div>
                     <div className="my-5">

                         <label className="text-xl text-gray-300 " htmlFor="password">Password</label><br />

                         <input required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="password" id="password" placeholder="Enter Password" value={password} onChange={(event)=>{setPassword(event.target.value)}} />

                     </div>
                     
                     <button className="border-2 px-6 rounded-lg py-1 mt-2 bg-indigo-600 text-white border-black font-serif hover:bg-indigo-700 cursor-pointer mb-30 text-xl">Login</button>
                     
               </div>
               <div >
                  <img className="w-90" src="/Mobile login-bro.png" alt="login-image" />
               </div>
            </form>

        </div>
     )
}




export default Login;