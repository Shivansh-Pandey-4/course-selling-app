import { useEffect } from "react";
import { Link } from "react-router-dom";


const PopularCourses = () =>{


    useEffect(()=>{
        
    },[])

     return (
         <div className="mt-16 text-white text-center pb-20">
             <h2 className="text-3xl mb-10 font-semibold">Our Popular Courses</h2>
             <div className="flex flex-wrap justify-center gap-8">
                <div className="max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300">
                        <img src="/JavaScript frameworks-amico.png" alt="" />
                        <h3 className="text-lg font-bold mb-2">Full-Stack Web Development</h3>
                        <p className="mb-4">Master HTML, CSS, JavaScript, and backend technologies.</p>
                        <Link to={"/courses"}>
                            <button className="px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">
                            Purchase Now
                            </button>
                        </Link>
                    </div>

                    <div className="max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300">
                        <img src="/Data extraction-amico.png" alt="" />
                        <h3 className="text-lg font-bold mb-2">Data Science & Analytics</h3>
                        <p className="mb-4">Analyze data, build models, and make smarter decisions.</p>
                        <Link to={"/courses"}>
                            <button className="px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">
                            Purchase Now
                            </button>
                        </Link>
                    </div>

                    <div className="max-w-xs border p-5 rounded-2xl bg-[#2d2d2d] transition transform hover:shadow-xl hover:-translate-y-2 duration-300">
                        <img src="SEO analytics team-rafiki.png" alt="" />
                        <h3 className="text-lg font-bold mb-2">Digital Marketing</h3>
                        <p className="mb-4">Learn SEO, social media ads, and online brand growth.</p>
                        <Link to={"/courses"}>
                            <button className="px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">
                            Purchase Now
                            </button>
                        </Link>
                    </div>
                </div>
              </div>
     )
}

export default PopularCourses;