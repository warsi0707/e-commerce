import React, {  useContext} from 'react'
import CartItem from '../components/Cart/CartItem';
import { FaRupeeSign } from "react-icons/fa";
import { AuthProvider } from '../context/Authprovider';
import CheckoutSummary from '../components/Cart/CheckoutSummary';
import { Backendurl } from '../BckendUrl';
import toast from 'react-hot-toast';


export default function Cart() {
  const {cart,total,DeleteItem,setCart} = useContext(AuthProvider)
  const product = cart.map((item)=> item.product.id)
  // const product = cart.
  console.log("total", total)
   const Checkout =async()=>{
      try{
        const response = await fetch(`${Backendurl}/user/order`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({product,total})
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
          setCart([])
          toast.success(result.message)
        }else{
          toast.error(result.message)
        }

      }catch(error){
        toast.error(error.message)
      }
    }
  
  return (
    <div className='flex flex-col w-full gap-10 p-5 sm:grid-cols-10 sm:grid sm:px-10'>
      <div className='w-full h-full col-span-7 '>
        <div className='space-y-5'>
          <h1 className='text-2xl'>Cart</h1>
          <div className='grid grid-cols-10 border-b border-gray-600'>
            <div className='h-10 col-span-4 '>
              <h1>Item</h1>
            </div>
            <div className='h-10 col-span-2 '>
              <h1>Quantity</h1>
            </div>
            <div className='hidden h-10 col-span-2 sm:flex'>
              <h1>Price</h1>
            </div>
            <div className='h-10 col-span-2 '>
              <h1>Total</h1>
            </div>
          </div>
        </div>
     
        {cart.map(item=> (
            <CartItem key={item.product.id} name={item.product.name} price={item.product.price} image={item.product.image} id={item.product.id} quantity={item.quantity}/>
        ))}
      </div>
      <CheckoutSummary onclick={Checkout}/>
    </div>
  )
}
