import React, { memo, useContext} from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { AuthProvider } from "../../context/Authprovider";

function CartItem({name,price, image,id,quantity}) {
  const {DeleteItem,IncreaseQuantity,DecreaseQuantity} = useContext(AuthProvider)

  return (
    <div className="grid w-full grid-cols-10 p-2 ">
      <div className="flex items-center w-full h-32 col-span-4 gap-2 justify- ">
        <img
          className="w-32 h-full bg-gray-300 border border-gray-400 rounded-xl"
          src={image}
          alt=""
        />
        <h1 className="hidden md:flex">{name}</h1>
      </div>
      <div className="flex items-center justify-center w-full h-32 col-span-2 gap-1 sm:gap-2 ">
        <button className="text-2xl" onClick={()=> IncreaseQuantity(id)}>+</button>
       <p className="text-2xl">{quantity}</p>
        <button className="text-2xl" onClick={()=> DecreaseQuantity(id)}>-</button>
      </div>
      <div className="items-center justify-start hidden w-full h-32 col-span-3 sm:flex">
        <p className="flex items-center text-gray-700 text-md">
          <MdOutlineCurrencyRupee /> {price}.00
        </p>
      </div>
      
      <div className="flex items-center justify-start w-full h-32 col-span-1 ">
      <button className="text-xl" onClick={()=> DeleteItem(id)} ><FaTrash /></button>
      </div>
    </div>
  );
}
export default memo(CartItem)
