import { Link } from "react-router-dom";


const CourseCard = (props)=>{
     const {courseName,description,price,author_id,createdAt,imageUrl} = props.detail;

     return (
          <div className="text-white text-center max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300">
              <img className="w-85" src={imageUrl} alt="" />
               <h1 className="text-lg font-bold mt-3 mb-2">{courseName.toUpperCase()}</h1>
               <p className="mb-2">{description}</p>
              <h3 className=" mb-2" >Author Name: {author_id.name} </h3>
              <h3 className=" mb-2" >Created At : {createdAt.slice(0, 10)} </h3>
              <h3 className=" mb-2" >Price : {price}</h3>
              <Link to={"/cart"}>
                            <button className="px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">
                            Purchase Now
                            </button>
              </Link>
         </div>
     )

}

export default CourseCard;