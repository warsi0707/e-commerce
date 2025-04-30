import React, { useEffect, useState } from 'react'
import { Backendurl } from '../BckendUrl'
import toast from 'react-hot-toast'

export default function useCartItem() {
    const [carts, setCarts] = useState([])
      const [totalAmount, setTotalAmount] = useState(0)

    const GetCartItem =async()=>{
        try{
          const response = await fetch(`${Backendurl}/user/cart`, {
            method: 'GET',
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          const result = await response.json()
          console.log(result)
          if(response.ok){
            setCarts(result.cart)
            setTotalAmount(result.totalPrice)
          }
        }catch(error){
          toast.error(error.message)
        }
      }
       useEffect(()=>{
          GetCartItem()
        },[totalAmount])
  return {
    carts, totalAmount, GetCartItem
  }
}
