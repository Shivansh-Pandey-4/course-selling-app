import { useState, useEffect } from "react";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";



const AdminUpdateUser = ()=>{

    const [userName,setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [isAdmin, setIsAdmin] = useState("");


    const {user_id} = useParams();
    const navigate = useNavigate();

    async function fetchData(){
     const response = await fetch(`http://localhost:3000/admin/user/${user_id}`,{
          method : "GET",
          headers : {
             "Content-Type" : "application/json",
             "token" : localStorage.getItem("adminToken")
          }
     });
     const data = await response.json();
     if(data.msg=="user exist"){
          toast.success("user detail found successfully");

          setUserEmail(data.userExist.email);
          setUserName(data.userExist.name);
          setUserPhone(data.userExist.phoneNumber);
          setIsAdmin(data.userExist.isAdmin);
     }else {
         toast.error(data.msg || data.detailError);
     }
    };

    async function updateUser(event){
         event.preventDefault();
         const response = await fetch(`http://localhost:3000/admin/update/user/${user_id}`,{
             method : "PUT",
             headers : {
                "Content-Type" : "application/json",
                "token" : localStorage.getItem("adminToken")
             },
             body : JSON.stringify({email : userEmail,userName,phoneNumber : parseInt(userPhone), isAdmin })
         })
         const data = await response.json();
         if(data.msg == "user updated successfully"){
               toast.success("user data updated successfully");
               navigate("/admin/users");
         }else {
              toast.error(data.detailError || data.msg);
         }
    }

    useEffect(()=>{
          fetchData();
    },[]);

    if(!userName){
         return <h1 className="text-2xl text-center min-h-screen pt-10">Loading User Data ....</h1>
    }

     return (
         <div className="min-h-screen bg-[#f0932b] ">
             <h1 className="text-center text-3xl pt-10">Update User Data</h1>
             <div className="flex justify-center py-10">
                 <form onSubmit={(event)=>{updateUser(event);}} className="border bg-[#badc58]  rounded-xl w-3/12 p-5 flex flex-col items-center">
                     <div>
                          <label className="text-xl" htmlFor="username">UserName</label> <br />
                          <input  type="text" id="username" required className=" w-60 p-2 mt-1 rounded-lg h-8 border-indigo-500 border-2" onChange={(event)=>setUserName(event.target.value)} value={userName}/>
                     </div>
                     <div className="py-3">
                           <label className="text-xl" htmlFor="email">Email</label> <br />
                           <input type="email" id="email" required onChange={(event)=>setUserEmail(event.target.value)} value={userEmail} className=" w-60 p-2 mt-1 rounded-lg h-8 border-indigo-500 border-2" />
                     </div>
                    <div className="my-3">
                         <label className="text-xl mr-3" htmlFor="status">Admin :</label>
                         <select  className=" w-30 h-8 px-4 mt-1 rounded-lg border-2 border-indigo-500" id="status" value={isAdmin} onChange={(event) => setIsAdmin(event.target.value === "true")}>
                         <option value="true">True</option>
                         <option value="false">False</option>
                         </select>
                    </div>
                     <div>
                            <label className="text-xl" htmlFor="phoneNumber">Phone Number</label> <br />
                            <input type="number" id="phoneNumber" required onChange={(event)=>setUserPhone(event.target.value)} value={userPhone} className=" w-60 p-2 mt-1 rounded-lg h-8 border-indigo-500 border-2" />
                     </div>
                     <button type="submit" className="border py-1 px-16 mt-5 rounded-lg bg-indigo-500 text-white border-black font-serif text-lg hover:bg-indigo-600 cursor-pointer">Update</button>
                 </form>
             </div>
         </div>
     )
}

export default AdminUpdateUser;