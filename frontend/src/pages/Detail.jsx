import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useParams } from 'react-router';
import { Backendurl } from '../BckendUrl';
import { AuthProvider } from '../context/Authprovider';

export default function Detail() {
  const {id} = useParams()
  const [product, setProduct] = useState({})
  const {AddToCart} = useContext(AuthProvider)
  
  const GetProduct =async()=>{
    try{
      const response = await fetch(`${Backendurl}/product/${id}`, {
        method: 'GET'
      })
      const result = await response.json()
      console.log(result.product)
      if(response.ok){
        setProduct(result.product)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    GetProduct()
  },[])
  return (
    <div className='grid w-full h-full grid-cols-10 py-10 my-5'>
      <div className='grid h-full col-span-3 px-16'>
        <div className='flex flex-col items-start justify-center gap-5'>
        <h1 className='text-2xl font-bold'>{product.name}</h1>
        <p className='text-gray-500'>{product.description}</p>
        </div>
        
      </div>
      <div className='grid h-[80vh] col-span-4 rounded-md  justify-center items-center i'>
        <img className='w-full max-h-[80vh] rounded-md' src={product.image} alt="" />
      </div>
      <div className='grid items-center justify-center h-full col-span-3'>
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-start text-xl'><FaIndianRupeeSign/> <p>{product.price}.00</p></div>
            <button onClick={()=> AddToCart({
              id: product._id,
              name: product.name,
              description: product.description,
              image: product.image,
              price: product.price
            })}  className='w-full px-16 py-2 text-gray-300 bg-gray-900 rounded-md'>Add to cart</button>
        </div>
      </div>
    </div>
  )
}
