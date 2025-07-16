import { toast } from "react-toastify";
import useCart from "../../hooks/useCart";
import useUserIsLoggedIn from "../../hooks/useIsUserLoggedIn";


const Cart = ()=>{

    const cartState = useCart();
    const loginState = useUserIsLoggedIn();


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

    
     return (
        <div className="bg-black flex flex-col items-center py-10 gap-10">
             <h1 className="text-xl pb-3 text-white border-[] font-serif" >Your Cart has {cartState.items.length} items. </h1>
             {

                 (cartState.items.length!==0) && cartState.items.map((item)=><div key={item.props._id} className=" w-90 border p-5 rounded-2xl border-[#646cff] ">

                    <img className="w-80 rounded-xl"src={item.props?.imageUrl} alt="" />

                    <h1 className=" text-center text-xl py-3 pt-5 text-white font-bold " >{item.props.courseName.toUpperCase()}</h1>

                    <h1 className="text-xl pb-3 text-white border-[] font-serif" >{item.props.description}</h1>

                    <h1 className="text-xl pb-3 text-white border-[] font-serif" >{item.props.author_id.name}</h1>

                    <h1 className="text-xl pb-3 text-white border-[] font-serif">{item.props.createdAt}</h1>

                    <h1 className="text-xl pb-3 text-white border-[] font-serif">₹{item.props.price}</h1>

                    <button onClick={()=>{
                         PurchaseCourse(item.props._id);
                    }} className=" cursor-pointer px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">Buy Now</button>
                    </div>  )

             }
       </div>
    )
}

export default Cart;