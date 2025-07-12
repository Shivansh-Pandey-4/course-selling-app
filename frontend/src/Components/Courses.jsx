import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";


const Courses = ()=>{
    const [courses, setCourses] = useState([]);

    async function fetchData() {
         const response = await fetch("http://localhost:3000/courses");
         const data = await response.json();
         console.log(data);
         setCourses(data.allCourse);
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(courses.length == 0){
          return <h1 className="text-3xl text-center py-10">Loading Courses ......</h1>
     }

     return (
            <div className="bg-[#2d2d2d]">
              <div className="flex flex-wrap gap-20 justify-center py-20">
              {
                  courses.map((course)=> <CourseCard key={course._id} detail={course} />)
              }
           </div>
         </div>
     )
}

export default Courses;