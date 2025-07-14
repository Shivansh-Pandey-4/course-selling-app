import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";



const CourseDetail = ()=>{

     const [course, setCourse] = useState(null);
     const {course_id} = useParams();
     const [wrongCourseId , setWrongCourseId] = useState(false);

     async function fetchData() {
        const response = await fetch(`http://localhost:3000/courses/${course_id}`)
        const data = await response.json();
        if(data.msg == "course exist"){
           setCourse(data.courseExist);
           setWrongCourseId(false);
        }else {
             setWrongCourseId(true);
             toast.error(data.msg);
        }
     }

     useEffect(()=>{
         fetchData();
     },[course_id]);

     

     if(wrongCourseId){
            return <h1 className="text-3xl text-center py-10">Invalid Course-Id Provide re-check again ...</h1> 
     }

     if(course == null){
          return <h1 className="text-3xl text-center py-10">Loading Course Details ......</h1>
     }

     



     return (
         <div className="flex  flex-col items-center pb-20 bg-[#2d2d2d] ">
               <h1 className=" text-white text-center py-10 text-2xl">{course.courseName.toUpperCase()} course details are here ⬇️</h1>
         <div className="flex justify-center items-center gap-20">

                <div>
                    <img className="w-80" src="/Course app-pana.png" alt="" />
                 </div>
                <div className="flex items-center border p-5 w-7/12 gap-15 rounded-2xl border-[#646cff] ">
                 
                  <img className="w-80 rounded-xl" src={course.imageUrl} alt="" />
                  <div>
                     <h1 className="text-xl pb-3 text-white font-bold " >{course.courseName.toUpperCase()}</h1>
                     <p className="text-xl pb-3 text-white border-[] font-serif" >{course.description}</p>
                     <h3 className="text-xl pb-3 text-white border-[] font-serif" >Author : {course.author_id.name}</h3>
                     <h3 className="text-xl pb-3 text-white border-[] font-serif" >Live Time Access. <br /> Discort Community Support</h3>
                     <h4 className="text-xl pb-3 text-white border-[] font-serif" >Price : ₹{course.price}</h4>

                        <button onClick={()=>{
                              
                              toast.success("Item added to Cart Successfully");
                        }} className=" cursor-pointer px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">
                            Add To Cart
                          </button>
                     
                  </div>
          </div>
               </div>
         </div>
     )
}

export default CourseDetail;