import React, { useCallback, useRef } from 'react'
import UserInput from '../components/User/UserInput'
import UserButton from '../components/User/UserButton'
import { Link } from 'react-router'
import {toast} from 'react-hot-toast'
import { Backendurl } from '../BckendUrl'


export default function Singup() {
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()

  const Signup =useCallback(async(e)=>{
    e.preventDefault()
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value
    try{
      const response = await fetch(`${Backendurl}/user/signup`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({email, name, password})
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
  },[])
  return (
    <div className='h-[90vh] w-full flex justify-center items-center'>
        <div className='flex flex-col gap-5 w-96'>
            <div className='flex flex-col gap-5 mb-5 text-center'>
                <h1 className='text-xl font-bold'>Become E-cart store member</h1>
                <h1 className='text-sm font-thin text-gray-900'>Create your Medusa Store Member profile, and get access to an enhanced shopping experience.</h1>
            </div>
            <div className='flex flex-col gap-5'>
               <div className='flex flex-col gap-2'>
                <UserInput refs={nameRef} placeholder={'Name'} type={"text"}/>
                <UserInput refs={emailRef}  placeholder={'Email'} type={"email"}/>
                <UserInput refs={passwordRef}  placeholder={'Password'} type={"Password"}/>
               </div>
                <p className='text-sm font-thin text-center text-gray-900'>By creating an account, you agree to Medusa Store's <strong>Privacy Policy</strong> and Terms of Use.</p>
                <UserButton onclick={Signup} title={"Join"}/>
            </div>
            <p className='text-sm font-thin text-center'>Already Member ? <Link to={"/signin"} className='underline '>Signin</Link></p>
        </div>
    </div>
  )
}
