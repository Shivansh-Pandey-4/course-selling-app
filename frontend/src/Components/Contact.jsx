import { useState } from "react";
import {toast} from "react-toastify";


const Contact = () =>{

      const [username,setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [message , setMessage] = useState("");
    
      async function handleForm(event){
           event.preventDefault();
           if(!username || !email || !message ){
                 return  toast.error("fill all the three inputs");
           }

           setEmail("");
           setUsername("");
           setMessage("");

           const response = await fetch("http://localhost:3000/contact",{
                 method : "POST",
                 headers : {
                     "content-type" : "application/json"
                 },
                 body : JSON.stringify({username,email,message})
           })
           const data = await response.json();
              if(data.msg == "message send successfully. Thankyou for contacting us"){
                   toast.success(data.msg+"😇 ");
              }else{
                  toast.error(`failed to contact us. Try again later.${data.detailError}`);
              }

      }

     return (
         <div className="flex justify-center items-center bg-[#242424] pl-30  ">
             <div className="flex justify-center items-center pt-20  ">
                 <form onSubmit={handleForm} className=" flex flex-col mr-28" >
                     <h1 className="text-4xl ml-2 mb-8 text-white font-serif">ContactUs Form</h1>
                      <div className="">

                          <label className="text-xl text-gray-300 ml-2" htmlFor="username">Username</label><br />
                          <input autoFocus required  className="border-2 border-[#646cff] text-white ml-2  px-2 mt-2 py-1 w-70 rounded-lg" type="text" placeholder="UserName"  id="username" value={username}     onChange={(event)=>{setUsername(event.target.value)}} />

                      </div>

                       <div className="m-2 mt-8" >

                          <label  className="text-xl text-gray-300 " htmlFor="email">Email</label> <br />
                          <input required className="border-2 border-[#646cff] text-white px-2 mt-2 py-1 w-70 rounded-lg" type="email" placeholder="Email ID" id="email" value={email}     onChange={(event)=>{setEmail(event.target.value)}} />

                      </div>

                       <div className="m-2 mt-6" >

                          <label className="text-xl text-gray-300 " htmlFor="message">Message</label> <br />
                          <textarea required className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg h-25"  placeholder="any thing what to share with us?" name="message" id="message"  value={message} onChange={(event)=>{ setMessage(event.target.value) }}     ></textarea>

                      </div>

                        <button className=" text-xl border-2  ml-2 rounded-lg py-1 mt-5 bg-indigo-600 text-white border-black font-serif hover:bg-indigo-700 cursor-pointer mb-30">SUBMIT</button>

                 </form>
             </div>
              <div >
                <img className="w-110" src="/Mobile login-rafiki.png" alt="" />
             </div>
         </div>
     )
}

export default Contact;