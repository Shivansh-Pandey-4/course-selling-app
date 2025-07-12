import { Link } from "react-router-dom";


const CourseCard = (props)=>{
     const {courseName,description,price,author_id,createdAt,imageUrl,_id} = props.detail;

     return (
          <div className="text-white text-center max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300">
              <img className="w-85" src={imageUrl} alt="" />
               <h1 className="text-lg font-bold mt-3 mb-2">{courseName.toUpperCase()}</h1>
               <p className="mb-2">{description}</p>
              <h3 className=" mb-2" >Author Name: {author_id.name} </h3>
              <h3 className=" mb-2" >Created At : {createdAt.slice(0, 10)} </h3>
              <h3 className=" mb-2" >Price : {price}</h3>
              <Link to={"/courses/"+_id}>
                             <button className=" mt-8 px-3 py-1 rounded-lg text-gray-400 hover:bg-[#646cff] hover:text-white cursor-pointer border-1 border-white">Learn More</button>
              </Link>
              <Link to={"/cart"}>
                            <button className=" cursor-pointer mt-8 ml-8 px-3 py-1 rounded-lg bg-[#646cff] hover:bg-white hover:text-black transition border-2 border-black ">
                              Add To Cart
                            </button>
              </Link>
         </div>
     )

}

export default CourseCard;