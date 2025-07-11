import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = ()=>{

      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const navigate = useNavigate();

      async function handleForm(event) {
           event.preventDefault();

             if( !email|| !password){
                    toast.error("fill all the fields");
             } 

             setEmail("");
             setPassword("");
           

             const response = await fetch("http://localhost:3000/user/login",{
                   method : "POST",
                   headers : {
                      "content-type" : "application/json",
                   },
                   body : JSON.stringify({ password, email})
             })

             const data = await response.json();
             if(data.msg == "User Logged in successfully"){
                   toast.success("User LoggedIn successfully");
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
                    
                     <div className="my-5">
                         <label className="text-xl text-gray-300 " htmlFor="email">Email</label> <br />
                         <input required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="email" id="email" placeholder="Enter Email" value={email} onChange={(event)=>{setEmail(event.target.value)}} />
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