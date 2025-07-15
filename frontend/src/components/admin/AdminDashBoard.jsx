import { useEffect, useState } from "react";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn";
import { useNavigate } from "react-router-dom";
import AdminCourseCard from "./AdminCourseCard";

const AdminDashBoard = () => {
  const [adminCourses, setAdminCourses] = useState([]);
  const [error, setError] = useState(false);
  const isAdminLoggedIn = useIsAdminLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn.isAdminLoggedIn == false) {
      navigate("/error");
    } else {
      fetchAdminData();
    }
  }, []);

  async function fetchAdminData() {
    const response = await fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        token: localStorage.getItem("adminToken"),
      },
    });
    const data = await response.json();
    if (data.msg == "course exist") {
      setAdminCourses(data.allCourses);
    } else {
      navigate("/");
    }
  }

  function handleDeleteCourse(courseId) {
    setAdminCourses((prev) => prev.filter((course) => course._id !== courseId));
  }

  if (error) {
    return <h1 className="text-2xl text-center">No Course exist for you.</h1>;
  }

  if (adminCourses.length == 0) {
    return <h1 className="text-2xl text-center">Loading Admin Courses....</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center py-10">
        Currently You Have {adminCourses.length} Course.
      </h1>
      <div className="flex flex-wrap justify-around px-20 gap-10 pb-10">
        {adminCourses.map((course) => (
          <AdminCourseCard
            key={course._id}
            detail={course}
            onDelete={handleDeleteCourse} 
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoard;
