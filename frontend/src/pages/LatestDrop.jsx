import ProductCard from "../components/ProductCard";
import ViewAllLink from "../components/ViewAllLink";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Backendurl } from "../BckendUrl";


export default function LatestDrop() {
  const [data, setData] = useState([])
  const LatestProduct =async()=>{
    try{
      const response = await fetch(`${Backendurl}/product/latest`, {
        method: 'GET'
      })
      const result = await response.json()
      console.log(result)
      if(response.ok){
        setData(result.products)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    LatestProduct()
  },[])
  return (

    <div className="min-h-[90vh] w-full ">
      <div className="flex justify-between px-2 pb-5">
        <p>Latest drop</p>
        <ViewAllLink/>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 mb-4 md:justify-between">
        {data.map((item)=> (
          <ProductCard key={item._id} image={item.image} name={item.name} price={item.price} id={item._id}/>
        ))}
       
        {/* <ProductCard/>
        <ProductCard/> */}
      </div>
       
      
    </div>

    
  )
}
