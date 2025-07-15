import useCart from "../../hooks/useCart";


const Cart = ()=>{

    const cartState = useCart();

     return (
        <div className="bg-black flex flex-col items-center py-10 gap-10">
             <h1 className="text-xl pb-3 text-white border-[] font-serif" >Your Cart has {cartState.items.length} items. </h1>
             {
                 (cartState.items.length!==0) && cartState.items.map((item)=><div key={item.props.detail._id} className=" w-90 border p-5 rounded-2xl border-[#646cff] ">
                    <img className="w-80 rounded-xl"src={item.props.detail.imageUrl} alt="" />
                    <h1 className=" text-center text-xl py-3 pt-5 text-white font-bold " >{item.props.detail.courseName.toUpperCase()}</h1>
                    <h1 className="text-xl pb-3 text-white border-[] font-serif" >{item.props.detail.description}</h1>
                    <h1 className="text-xl pb-3 text-white border-[] font-serif" >{item.props.detail.author_id.name}</h1>
                    <h1 className="text-xl pb-3 text-white border-[] font-serif">{item.props.detail.createdAt}</h1>
                    <h1 className="text-xl pb-3 text-white border-[] font-serif">₹{item.props.detail.price}</h1>
                    <button className=" cursor-pointer px-4 py-2 bg-[#646cff] rounded hover:bg-white hover:text-black transition">Buy Now</button>
                    </div>  )
             }
       </div>
    )
}

export default Cart;