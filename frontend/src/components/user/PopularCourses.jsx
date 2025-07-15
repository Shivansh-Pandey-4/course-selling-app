import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();
      if (data.msg === "successfully fetched all the courses") {
        setCourses(data.allCourse);
      } else {
        setFetchError(true);
      }
    } catch (err) {
      console.error(err);
      setFetchError(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (fetchError) {
    return (
      <div>
        <h2 className="text-3xl mb-10 font-semibold">Our Popular Courses</h2>
        <h1 className="text-center text-2xl text-red-500">Error fetching courses.</h1>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div>
        <h2 className="text-3xl mb-10 font-semibold text-white text-center">Our Popular Courses</h2>
        <h1 className="text-center text-2xl text-white pb-10">Loading Course Details...</h1>
      </div>
    );
  }

  return (
    <div className="mt-16 text-white text-center pb-20">
      <h2 className="text-3xl mb-10 font-semibold">Our Popular Courses</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {
            courses.slice(0, 3).map((course) => (
            <div
                key={course._id}
                className="max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300"
            >
                <img src={course.imageUrl} alt={course.courseName} className="mb-4 w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-bold mb-2">{course.courseName}</h3>
                <p className="mb-4">{course.description.slice(0, 60)}...</p>
                <Link to={`/courses/${course._id}`}>
                <button className="px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition cursor-pointer ">
                    Learn More
                </button>
                </Link>
            </div>
            ))
        }
      </div>

      <Link to={"/courses"}>
        <button className="mt-10 border py-1 px-3 rounded-lg bg-[#646cff] hover:bg-black hover:text-white cursor-pointer">
          Show More Courses
        </button>
      </Link>
    </div>
  );
};

export default PopularCourses;
