import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn";


const AdminCourseCard = (props)=>{
    
     const {courseName,description,price,author_id,createdAt,imageUrl,_id} = props?.detail;     
     const isAdminLoggedIn = useIsAdminLoggedIn();

     async function deleteCourse(){
            if(isAdminLoggedIn.isAdminLoggedIn == false){
                  return toast.error("only admin can delete the course");
            }
            else {
          const response = await fetch(`http://localhost:3000/admin/delete/courses/${_id}`,{
                method : "DELETE",
                headers: {
                      "Content-Type" : "application/json",
                      "token" : localStorage.getItem("adminToken")
                }
          });
              const data = await response.json();
              if(data.msg == "course deleted successfully"){
                    toast.success("course deleted successfully");
                    props.onDelete(_id);
              }else {
                   toast.error(data.msg);
              }
            }
     }
     

     return (
          <div className="text-white text-center max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300">
              <img className="w-75 h-45 " src={imageUrl} alt="" />
               <h1 className="text-lg font-bold mt-3 mb-2">{courseName.toUpperCase()}</h1>
               <p className="mb-2">{description}</p>
              <h3 className=" mb-2" >Author Name: {author_id?.name} </h3>
              <h3 className=" mb-2" >Created At : {createdAt.slice(0, 10)} </h3>
              <h3 className=" mb-2" >Price : ₹{price}</h3>
              <Link to={"/courses/"+_id}>
                             <button className=" mt-8 px-3 py-1 rounded-lg text-gray-400 hover:bg-[#646cff] hover:text-white cursor-pointer border-1 border-white">Edit Course
                             </button>
              </Link>
                            <button onClick={deleteCourse}
                              className="cursor-pointer mt-8 ml-8 px-3 py-1 rounded-lg bg-[#646cff] hover:bg-white hover:text-black transition border-2 border-black "> Delete Course
                            </button>
         </div>
     )

}

export default AdminCourseCard;