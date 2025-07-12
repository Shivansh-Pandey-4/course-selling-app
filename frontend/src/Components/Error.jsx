import { Link } from "react-router-dom";

const Error = ()=>{
     return (
        <div className="bg-[#2d2d2d]">
            <div className="flex justify-center">
                <img className="max-w-xl" src="\404 Error-bro.png" alt="" />
            </div>
            <div className="flex justify-center gap-20 pb-10" >
                <Link to={"/"}>
                    <button className="text-white border py-1 px-5 text-xl rounded-xl hover:bg-indigo-500 hover:text-white cursor-pointer "> Go Back To Home </button>
                </Link>
                <Link to={"/contact"}>
                    <button className="text-white border py-1 px-5 text-xl rounded-xl hover:bg-indigo-500 hover:text-white cursor-pointer "> Report A Problem </button>
                </Link>
            </div>
        </div>
     )
}

export default Error;