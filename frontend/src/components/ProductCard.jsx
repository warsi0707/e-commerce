import React, { memo } from 'react'
import { Link } from 'react-router'
import { FaIndianRupeeSign } from "react-icons/fa6";


 function ProductCard({name, price,id,image}) {
  return (
    <Link to={`/product/${id}`} className="w-72 sm:w-96 h-[70vh] pb-5 ">
        <div className='w-full h-full border border-gray-300 rounded-md '>
            <img className='w-full h-full rounded-md' src={image} alt="" />
        </div>
        <div className='flex justify-between p-2 font-thin'>
            <p>{name}</p>
            <div className='flex items-center justify-center'><FaIndianRupeeSign/> <p className='mb-1'>{price}.00</p></div>
            
        </div>
    </Link>
  )
}
export default memo(ProductCard)