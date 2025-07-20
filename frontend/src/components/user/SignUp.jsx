import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import  {useNavigate , Link} from "react-router-dom";


const Signup = ()=>{

      const [username,setUsername] = useState("");
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [phoneNumber , setPhoneNumber] = useState("");
      const navigate = useNavigate();
      
            useEffect(() => {
                     const token = localStorage.getItem("token");
                     if (token) {
                        navigate("/");
                     }
            }, [navigate]);

      async function handleForm(event) {
           event.preventDefault();

               if (!username.trim() || !email.trim() || !password.trim() || !phoneNumber.trim()) {
                     toast.error("All fields are required");
                     return;
                  }

                  if (username.length < 2) {
                     toast.error("Username must be at least 2 characters");
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

                  const phoneRegex = /^\d{10}$/;
                  if (!phoneRegex.test(phoneNumber)) {
                     toast.error("Phone number must be exactly 10 digits");
                     return;
                  }


             const response = await fetch("http://localhost:3000/user/register",{
                   method : "POST",
                   headers : {
                      "content-type" : "application/json",
                   },
                   body : JSON.stringify({name: username, password, email, phoneNumber})
             })

             const data = await response.json();
             if(data.msg == "User Signed Up successfully"){
                   toast.success("User Registered successfully");
                   
                     setEmail("");
                     setPassword("");
                     setPhoneNumber("");
                     setUsername("");

                   navigate("/login");
             }else {
                  return toast.error(data.detailError || data.msg);
             }
      }



     return (
        <div className="bg-[#242424] ">
            <form onSubmit={handleForm} className="flex justify-center items-center ">
               <div className="mr-20 pt-20">
                    <h1 className="text-4xl mb-8 text-white font-serif">Signup Page</h1>

                     <span className="text-white text-xl">Already have an account ? <Link to={"/login"}> <button type="button" className="text-2xl cursor-pointer border-white text-indigo-500 border px-2 py-1 rounded-xl hover:bg-white hover:text-black"> Login</button></Link>
                     </span>
                    <div className="border-t-2 border-white my-2"></div>

                     <div className="my-5">
                         <label className="text-xl text-gray-300 " htmlFor="username">Username</label> <br />
                          <input required autoFocus className="border-2 border-[#646cff] text-white px-2 mt-2 py-1 w-70 rounded-lg" type="text" id="username" placeholder="Enter Username" value={username} onChange={(event)=>{setUsername(event.target.value)}} />
                     </div>
                     <div className="my-5">
                         <label className="text-xl text-gray-300 " htmlFor="email">Email</label> <br />
                         <input required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="email" id="email" placeholder="Enter Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} />
                     </div>
                     <div className="my-5">

                         <label className="text-xl text-gray-300 " htmlFor="password">Password</label><br />

                         <input required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="password" id="password" placeholder="Enter Password" value={password} onChange={(event)=>{setPassword(event.target.value)}} />

                     </div>
                     <div className="my-5">

                          <label className="text-xl text-gray-300 " htmlFor="phoneNumber">Phone Number</label><br />

                          <input required  className="border-2 border-[#646cff] text-white px-2 mt-2 py-1 w-70 rounded-lg" type="number" id="phoneNumber" placeholder="Enter Number" value={phoneNumber} onChange={(event)=>{setPhoneNumber(event.target.value)}} />

                     </div>
                     <button className=" text-xl border-2 px-5 rounded-lg py-1 mt-2 bg-indigo-600 text-white border-black font-serif hover:bg-indigo-700 cursor-pointer mb-30">Register Now</button>
               </div>
               <div className="w-90">
                  <img src="/Mobile login-pana.png" alt="signup-image" />
               </div>
            </form>

        </div>
     )
}




export default Signup;