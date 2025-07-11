import { Link } from "react-router-dom";

const HeroSection = () =>{
     return (
         <div className="flex justify-center items-center" >
             <div className="text-white mr-35">

                 <p>Your Journey to a Brighter Future.</p>

                  <h1 className=" mt-2 text-4xl font-mono">Welcome to <span className="underline text-indigo-500">Bright</span>  <br /> <span className="text-indigo-500 underline"> Path </span> </h1>

                  <p className="text-lg mt-4 leading-7"> your trusted guide to unlocking your potential. <br /> Our expert courses help you gain real-world skills and take steps <br /> toward a brighter future. Start your journey today.</p>

                 <Link to={"/about"}>
                 
                  <button className=" mt-8 px-3 py-1 rounded-lg text-gray-400 hover:bg-[#646cff] hover:text-white cursor-pointer border-1 border-white">Learn More</button>

                 </Link>

                 <Link to={"/courses"}>
                 
                  <button className=" ml-10 mt-8 px-5 py-1 rounded-lg  hover:bg-white hover:text-black bg-[#646cff] cursor-pointer border-1 border-white  hover:border-black  ">Courses</button>

                 </Link>

             </div>
                 <div>
                    <img className="w-100" src="/Webinar-rafiki.png" alt="teacher teaching a student" />
                </div>
        </div>
     )
}

export default HeroSection;