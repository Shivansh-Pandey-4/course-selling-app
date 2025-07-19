import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AdminEditCourse = ()=>{
    const {course_id} = useParams();
    const navigate = useNavigate();

    const [courseName, setCourseName] = useState("");
    const [description , setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl , setImageUrl] = useState("");

    async function fetchData() {
        const response = await fetch(`http://localhost:3000/courses/${course_id}`);
        const data = await response.json();
        if(data.msg == "course exist"){
             toast.success("course exist in the database");
             console.log(data);
             setCourseName(data.courseExist.courseName);
             setDescription(data.courseExist.description);
             setPrice(data.courseExist.price);
             setImageUrl(data.courseExist.imageUrl);
        }else{
              toast.error(data.detailError || data.msg);
        }
    }

    async function editCourse(event){
          event.preventDefault();
          const response = await fetch(`http://localhost:3000/admin/edit/course/${course_id}`,{
             method : "PUT",
             headers : {
                 "Content-Type" : "application/json",
                 "token" : localStorage.getItem("adminToken")
             },
             body : JSON.stringify({courseName,description,imageUrl,price: parseInt(price)})
          })

          const data = await response.json();
          if(data.msg == "course details edited successfully"){
                toast.success(data.msg);
                navigate("/admin/dashboard");
                return ;
          }else {
              toast.error(data.detailError || data.msg);
          }
    }

    useEffect(()=>{
      fetchData();
    },[])

     return (
         <div className="min-h-screen bg-[#f0932b] ">
             <h1 className="text-center text-3xl pt-10">Edit Course Data</h1>
             <div className="flex justify-center py-10">
                 <form onSubmit={(event)=>{editCourse(event);}} className="border bg-[#badc58]  rounded-xl w-4/12 p-5 flex flex-col items-center">
                     <div>
                          <label className="text-xl" htmlFor="coursename">CourseName</label> <br />
                          <input  type="text" id="coursename" required className=" w-70 p-2 mt-1 rounded-lg h-8 border-indigo-500 border-2" onChange={(event)=>setCourseName(event.target.value)} value={courseName}/>
                     </div>
                     <div className="my-5">

                         <label className="text-xl" htmlFor="description">Description</label><br />

                         <textarea required  className="border-2 border-[#646cff] px-2 mt-2 py-1 h-40 w-70 rounded-lg" type="text" id="description" placeholder="Enter Image URL" value={description} onChange={(event)=>{setDescription(event.target.value)}} />

                     </div>
                     <div>
                            <label className="text-xl" htmlFor="price">Price </label> <br />
                            <input type="number" id="price" required onChange={(event)=>setPrice(event.target.value)} value={price} className=" w-70 p-2 mt-1 rounded-lg h-8 border-indigo-500 border-2" />
                     </div>
                     <div className="my-5">

                         <label className="text-xl" htmlFor="image">Image Url</label><br />

                         <textarea required  className="border-2 border-[#646cff] px-2 mt-2 py-1 h-30 w-70 rounded-lg" type="url" id="image" placeholder="Enter Image URL" value={imageUrl} onChange={(event)=>{setImageUrl(event.target.value)}} />

                     </div>
                     <button type="submit" className="border py-1 px-16 mt-5 rounded-lg bg-indigo-500 text-white border-black font-serif text-lg hover:bg-indigo-600 cursor-pointer">Edit Course</button>
                 </form>
             </div>
         </div>
     )
}

export default AdminEditCourse;