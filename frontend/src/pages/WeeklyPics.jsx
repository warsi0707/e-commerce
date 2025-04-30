import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router'
import { FaLocationArrow } from "react-icons/fa6";
import ViewAllLink from '../components/ViewAllLink';
import { Backendurl } from '../BckendUrl';

export default function WeeklyPics() {
  const [data, setData] = useState([])

  const GetData =async()=>{
    const response = await fetch(`${Backendurl}/product/weekly`,{
      method: "GET"
    })
    const result = await response.json()
     if(response.ok){
      setData(result.products)
     }
  }
  useEffect(()=>{
    GetData()
  },[])
  return (
    <div className="min-h-[90vh] w-full ">
      <div className="flex justify-between px-2 pb-5">
        <p>Weekly Piks</p>
        <ViewAllLink/>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 md:justify-between">
        {data.map((item)=> (
           <ProductCard key={item._id} name={item.name} price={item.price} image={item.image} id={item._id}/>
        ))}
       
      </div>
       
      
    </div>
  )
}
