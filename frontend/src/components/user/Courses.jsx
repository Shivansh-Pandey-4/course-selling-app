import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";


const Courses = ()=>{
    const [courses, setCourses] = useState([]);
    const [courseCopy , setCourseCopy] = useState([]);
    const [inputValue, setInputValue] = useState("");

    async function fetchData() {
         const response = await fetch("http://localhost:3000/courses");
         const data = await response.json();
         setCourses(data.allCourse);
         setCourseCopy(data.allCourse);
    }

    function searchHandler(event){
          event.preventDefault();
          setCourses(courses.filter((course)=>course.courseName.toLowerCase().includes(inputValue.toLocaleLowerCase())));
          setInputValue("");
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(courses.length == 0){
          return <h1 className="text-3xl text-center py-10">Loading Courses ......</h1>
     }

     return (
            <div className="bg-[#2d2d2d]">
                <form onSubmit={searchHandler} className="flex justify-center pt-10">

                    <input type="text" className="border text-white w-4/12 rounded-xl px-2 py-2" placeholder="Search by Course Name" value={inputValue} onChange={(event)=>setInputValue(event.target.value)} />

                    <button className="border text-white ml-2 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-800 cursor-pointer">Search</button>

                        <button onClick={()=>setCourses(courseCopy)} className="border text-white ml-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-800 cursor-pointer">Reset Filter</button>
                </form>
              <div className="flex flex-wrap gap-20 justify-center py-15">
              {
                  courses.map((course)=> <CourseCard key={course._id} detail={course} />)
              }
           </div>
         </div>
     )
}

export default Courses;