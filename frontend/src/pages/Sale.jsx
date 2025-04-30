import React from 'react'
import ViewAllLink from '../components/ViewAllLink'
import ProductCard from '../components/ProductCard'

export default function Sale() {
  return (
 <div className="min-h-[90vh] w-full ">
       <div className="flex justify-between px-2 pb-5">
         <p>Latest Sales</p>
         <ViewAllLink/>
       </div>
       <div className="flex flex-wrap items-center justify-center gap-10 md:justify-between">
         <ProductCard/>
         <ProductCard/>
         <ProductCard/>
       </div>
        
       
     </div>
  )
}
