import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import AddressBar from './AddressBar';
import AddAddress from './AddAddress';
import toast from 'react-hot-toast';
import { Backendurl } from '../../BckendUrl';

export default function Address() {
    const [open, setOpen] = useState(false)
   const [addresses, setAddresses] = useState([])

   const GetAddress =async()=>{
    try{
        const response = await fetch(`${Backendurl}/user/address`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        const result = await response.json()

        if(response.ok){
            setAddresses(result.address)
        }
    }catch(error){
        toast.error(error.message)
    }
   }
   const DeleteAddress =useCallback( async(id)=>{
    try{
        const response = await fetch(`${Backendurl}/user/address/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        const result = await response.json()
        if(response.ok){
            toast.success(result.message)
            GetAddress()
        }else{
            toast.error(result.message)
        }
    }catch(error){
        toast.error(error.message)
    }
   },[])

   useEffect(()=>{
    GetAddress()
   },[])
  return (
    <>
    <div className='flex flex-col w-full h-full gap-5 '>
        <div className='w-full space-y-2'>
            <h1 className='text-xl'>Shipping Addresses</h1>
            <p className='text-sm text-gray-600'>View and update your shipping addresses, you can add as many as you like. Saving your addresses will make them available during checkout.</p>
        </div>
        <div className='flex flex-wrap items-center gap-2 '>
            <button onClick={()=> setOpen(!open)} className='flex items-center justify-center border h-52 w-72'>
                <div className='flex flex-col items-center justify-center'>
                    <p>New address</p>
                    <FaPlus/>
                </div> 
            </button>
            {addresses.map((item)=> (
               <AddressBar key={item._id} address={item.address} city={item.city} state={item.state} country={item.country} pincode={item.pincode} onclick={()=> DeleteAddress(item._id)}/>                 
            ))}
           
            {/* <AddressBar/>
            <AddressBar/> */}
        </div>
        
    </div>
    {open && <AddAddress onclick={()=> setOpen(false)}/>}
    {/* {edit && <AddAddress onclick={()=> setEdit(false)}/>} */}
    </>
  )
  
}
