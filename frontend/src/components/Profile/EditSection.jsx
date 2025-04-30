import React, { memo, useCallback, useRef, useState } from 'react'
import ProfileEditBtn from './ProfileEditBtn'
import UpdateButton from './UpdateButton'
import { Backendurl } from '../../BckendUrl'
import toast from 'react-hot-toast'


 function EditSection({name, title,type, placeholder,placeholder2,placeholder3, }) {
    const [open, setOpen] = useState(false)
    const namesRef = useRef()
    const emailRef = useRef()
    const mobileRef = useRef()
    const oldpasswordRef = useRef()
    const confirmPasswordRef = useRef()
    const passwordRef = useRef()

    const UpdateName =useCallback(async()=>{
      const names = namesRef.current.value;
    
      try{
        const response = await fetch(`${Backendurl}/user/profile/name`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({names})
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
          toast.success(result.message)
        }else{
          toast.error(result.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    },[])
    const UpdateEmail =useCallback(async()=>{
      const email = emailRef.current.value;
      try{
        const response = await fetch(`${Backendurl}/user/profile/email`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({email})
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
          toast.success(result.message)
        }else{
          toast.error(result.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    },[])
    const UpdateMobile =useCallback(async()=>{
      const mobile = mobileRef.current.value;
      try{
        const response = await fetch(`${Backendurl}/user/profile/mobile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({mobile})
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
          toast.success(result.message)
        }else{
          toast.error(result.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    },[])
    const UpdatePasswod =useCallback(async()=>{
      const password = passwordRef.current.value;
      const oldpassword = oldpasswordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      try{
        const response = await fetch(`${Backendurl}/user/profile/password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({password, oldpassword, confirmPassword})
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
          toast.success(result.message)
        }else{
          toast.error(result.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    },[])

    
    
  return (
    <>
     <div className='flex justify-between py-5 text-sm border-b'>
        <div>
          <h1 className='text-gray-600'>{title}</h1>
          <p >{name}</p>
        </div>
       <div>
      <ProfileEditBtn onclick={()=> setOpen(!open)}/>
       </div>
      </div>
      {open && 
     <div className='w-full py-2 space-y-5 '>
        {type === 'name' &&
        <div className='flex flex-col gap-2'>
            <input ref={namesRef}  type="text" placeholder={placeholder} className='w-full p-2 bg-gray-200 rounded-md' />
             <UpdateButton onclick={UpdateName} />
        </div>
        
        }
        {type === 'email' && 
        <div className='flex flex-col gap-2'>
            <input ref={emailRef} type="email" placeholder={placeholder} className='w-full p-2 bg-gray-200 rounded-md' />
            <UpdateButton onclick={UpdateEmail}/>
        </div>
        }
        {type === 'mobile' && 
        <div className='flex flex-col gap-2'>
            <input ref={mobileRef} type="email" placeholder={placeholder} className='w-full p-2 bg-gray-200 rounded-md' />
            <UpdateButton onclick={UpdateMobile}/>
        </div>
        }
        
        {type === 'password' && 
        <>
        <input ref={oldpasswordRef} type="text" placeholder={placeholder} className='w-full p-2 bg-gray-200 rounded-md' />
        <div className='flex justify-between gap-2'>
          <input ref={passwordRef} type="text" placeholder={placeholder2} className='w-full p-2 bg-gray-200 rounded-md' />
          <input ref={confirmPasswordRef} type="password" placeholder={placeholder3} className='w-full p-2 bg-gray-200 rounded-md' />
        </div>
        <UpdateButton onclick={UpdatePasswod}/>
     </>
        }
       
     </div>
      }
    </>
   
  )
}
export default memo(EditSection)