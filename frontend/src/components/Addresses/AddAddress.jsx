import React, { memo, useRef } from 'react'
import { RxCross1 } from "react-icons/rx";
import AddressInput from './AddressInput';
import toast from 'react-hot-toast';
import { Backendurl } from '../../BckendUrl';


 function AddAddress({onclick}) {
  const addressRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const countryRef = useRef()
  const pincodeRef = useRef()


  const AddAddress =async()=>{
    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const pincode = pincodeRef.current.value;

    try{
      const response = await fetch(`${Backendurl}/user/address`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({address, city, state, country, pincode})
      })
      const result = await response.json()
      if(response.ok){
        toast.success(result.message)
      }else{
        toast.error(result.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  return (
        <div>
          <div className="fixed top-0 left-0 flex justify-center w-screen h-screen bg-slate-500 opacity-90"></div>
          <div className="fixed top-0 left-0 flex justify-center w-screen h-screen ">
            <div className="flex flex-col justify-center">
              <span className="p-3 px-5 bg-white opacity-100 w-96 rounded-xl">
             
                <div className="flex justify-between">
                <h1>Add Address</h1>
                  <div className="text-2xl hover:cursor-pointer">
                    <button onClick={onclick}><RxCross1/></button>
                  </div>
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                <AddressInput refs={addressRef} type={'text'} placeholder={"Address"}/>
                    <div className='flex justify-between gap-2'>
                        <AddressInput refs={cityRef} type={'text'} placeholder={"City"}/>
                        <AddressInput refs={pincodeRef} type={'number'} placeholder={"Pincode"}/>
                    </div>
                    <AddressInput refs={stateRef} type={'text'} placeholder={"State"}/>
                    <AddressInput refs={countryRef} type={'text'} placeholder={"Country"}/>
                    <button onClick={AddAddress} className='w-full p-2 text-white bg-gray-900 rounded-md'>Add</button>
                </div>
               
              </span>
            </div>
          </div>
        </div>
  )
}
export default memo(AddAddress)