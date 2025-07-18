import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useUserIsLoggedIn from "../../hooks/useIsUserLoggedIn";
import decodeUserToken from "../../utils/decodeUserToken";


const Cart = ()=>{

    const cartState = useCart();
    const loginState = useUserIsLoggedIn();
    const userToken = decodeUserToken();


    async function PurchaseCourse(id){
        if(loginState.isLoggedIn == false){
             return toast.error("First Login then only you can purchase the course");
        }else {
             const response = await fetch(`http://localhost:3000/courses/purchase/${id}`,{
                method : "POST",
                headers : {
                     "content-type" : "application/json",
                     "token" : localStorage.getItem("token")
                }
             });
             const data = await response.json();
             if(data.msg == "course purchased successfully"){
                  toast.success("course purchased successfully");
                 
             }else{
                 toast.error(data.detailError || data.msg);
             }
        }
    }

    if(cartState.items.length == 0){
        return <div className="bg-black py-10 flex flex-col items-center  min-h-screen">
               <h1 className="text-2xl text-white">Your Cart is Empty. Add some amazing courses to get started. </h1>
               <button className="text-white mt-10 cursor-pointer hover:bg-indigo-500 text-xl border px-4 py-2 rounded-xl"> <Link to={"/courses"}> Browse Courses </Link></button>
        </div>
    }
    
     return (
        <div className="bg-black py-10 grid grid-cols-[1fr_300px] px-20">
          

               <div className="flex flex-wrap gap-10 ">
             {
               
                  (cartState.items.length!==0) && cartState.items.map((item,index)=><div key={index} className=" w-90 border p-5 rounded-2xl border-[#646cff] ">

                    <img className="w-80 h-50 rounded-xl"src={item.props?.imageUrl} alt="" />

                    <h1 className=" text-center text-xl py-3 pt-5 text-white font-bold " >{item.props.courseName.toUpperCase()}</h1>

                    <h1 className="text-xl pb-3 text-white border-[] font-serif" >Author : {item.props.author_id.name}</h1>

                    <h1 className="text-xl pb-3 text-white border-[] font-serif">Price : ₹{item.props.price}</h1>

                    <button onClick={()=>{
                         PurchaseCourse(item.props._id);
                    }} className=" cursor-pointer px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">Buy Now</button>

                    <button onClick={()=>{
                         cartState.setItems((prev) => {
                              const updated = [...prev];
                              updated.splice(index, 1); 
                              return updated;
                         });
                         toast.success("item removed from the cart");
                    }} className=" ml-23 cursor-pointer px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">Remove Item</button>

                    </div>  )

               }
            </div>
             
            <div className=" bg-gray-800 flex flex-col items-center text-xl pb-3 text-white font-serif border h-80 rounded-2xl p-5">
               <h1 className="py-4"><span className=" text-2xl  font-serif">{userToken?.name}</span> <br />Your Cart has {cartState.items.length} items. </h1>
               <h1 className="py-4">Your Total Amount is : <br /> <span></span> </h1>
            </div>
       </div>
    )
               
}

export default Cart;