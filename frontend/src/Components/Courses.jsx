import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";


const Courses = ()=>{
    const [courses, setCourses] = useState([]);

    async function fetchData() {
         const response = await fetch("http://localhost:3000/courses");
         const data = await response.json();
         console.log(data.allCourse);
         setCourses(data.allCourse);
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(courses.length == 0){
          return <div>Loading...</div>
    }

     return (
            <div className="bg-[#2d2d2d]">
              <div className="flex flex-wrap justify-around py-10">
              {
                  courses.map((course)=> <CourseCard key={course._id} detail={course} />)
              }
           </div>
         </div>
     )
}

export default Courses;