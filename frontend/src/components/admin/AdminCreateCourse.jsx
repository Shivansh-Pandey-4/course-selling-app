import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn"
import { toast } from "react-toastify";


const AdminCreateCourse = ()=>{

      const [courseName,setCourseName] = useState("");
      const [description ,setDescription] = useState("");
      const [price, setPrice] = useState();
      const [imageUrl, setImageUrl] = useState("");

      const navigate = useNavigate();
      const isAdminLoggedIn = useIsAdminLoggedIn();

      useEffect(()=>{
         
         if(isAdminLoggedIn.isAdminLoggedIn == false){
              navigate("/error");
         }

      },[])


      async function handleForm(event) {
           event.preventDefault();

           
             const response = await fetch("http://localhost:3000/admin/create/course",{
                   method : "POST",
                   headers : {
                      "content-type" : "application/json",
                      "token" : localStorage.getItem("adminToken")
                   },
                   body : JSON.stringify({description: description.trim(),courseName: courseName.trim(),price: parseInt(price),imageUrl: imageUrl.trim()})
             })

             const data = await response.json();

             if(data.msg == "new course created successfully"){
                        setCourseName("");
                        setDescription("");
                        setImageUrl("");
                        setPrice("");
                   toast.success("Course Created Successfully.");
                    navigate("/admin/dashboard");
             }else {
                  return toast.error(data.detailError || data.msg);
             }
      }



     return (
        <div className="bg-[#242424]">
            <form onSubmit={handleForm} className="flex justify-center items-center ">
               <div className="mr-20 pt-20 ">
                    <h1 className="text-4xl mb-8 text-white font-serif">Create A New Course</h1>
                    
                     <div className="my-5">
                         <label className="text-xl text-gray-300" htmlFor="course">Course Name</label> <br />
                         <input autoFocus required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="text" id="course" placeholder="Enter Course Name" value={courseName} onChange={(event)=>{setCourseName(event.target.value)}} />
                     </div>
                     
                     <div className="my-5">

                         <label className="text-xl text-gray-300 " htmlFor="description">Description</label><br />

                         <textarea required placeholder="Enter Password" className="border-2 border-[#646cff] text-white h-30  px-2 mt-2 py-1 w-70 rounded-lg"  name="description" id="description" value={description} onChange={(event)=>{setDescription(event.target.value)}} ></textarea>

                     </div>

                    <div className="my-5">

                         <label className="text-xl text-gray-300 " htmlFor="Price">Price</label><br />

                         <input required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 w-70 rounded-lg" type="number" id="Price" placeholder="Enter Price" value={price} onChange={(event)=>{setPrice(event.target.value)}} />

                     </div>
                      <div className="my-5">

                         <label className="text-xl text-gray-300 " htmlFor="image">Image Url</label><br />

                         <textarea required  className="border-2 border-[#646cff] text-white  px-2 mt-2 py-1 h-30 w-70 rounded-lg" type="url" id="image" placeholder="Enter Image URL" value={imageUrl} onChange={(event)=>{setImageUrl(event.target.value)}} />

                     </div>
                     
                     <button className="border-2 px-6 rounded-lg py-1 mt-2 bg-indigo-600 text-white border-black font-serif hover:bg-indigo-700 cursor-pointer mb-30 text-xl">Create Course</button>
               </div>
               <div >
                  <img className="w-90" src="/Design thinking-amico.png" alt="create course image" />
               </div>
            </form>

        </div>
     )
}

export default AdminCreateCourse;
