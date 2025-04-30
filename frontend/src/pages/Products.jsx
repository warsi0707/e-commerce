import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import {toast} from 'react-hot-toast'
import { Backendurl } from "../BckendUrl";

export default function Products() {
  const [product, setProduct] = useState([])
  const GetProducts =async()=>{
    try{
      const response = await fetch(`${Backendurl}/product`, {
        method: 'GET'
      })
      const result = await response.json()
      console.log(result)
      if(response.ok){
        setProduct(result.products)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    GetProducts()
  },[])
  return (
    <div className='flex flex-wrap justify-center gap-10 p-5 md:justify-between '>
      {product.map((item)=> (
         <ProductCard key={item._id} image={item.image} name={item.name} price={item.price} id={item._id}/>
      ))}
    </div>
  )
}
