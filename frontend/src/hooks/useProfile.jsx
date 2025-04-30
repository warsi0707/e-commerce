import React, { useCallback, useEffect, useState } from 'react'
import { Backendurl } from '../BckendUrl'
import toast from 'react-hot-toast'

export default function useProfile() {
      const [name, setName] = useState()
      const [email, setEmail] = useState()
      const [mobile, setMobile] = useState()
    const Profile =useCallback( async()=>{
        try{
          const response = await fetch(`${Backendurl}/user/profile`,{
            method: "GET",
            credentials: 'include',
            headers : {
              authorization : localStorage.getItem("token")
            }
          })
          const result = await response.json()
          console.log('profile',result)
          if(response.ok){
            setName(result.user.name)
            setEmail(result.user.email)
            setMobile(result.user.mobile)
            console.log(result.user)
          }
        }catch(e){
          toast.error("failed to fetch profile")
        }
      },[])
      useEffect(()=>{
        Profile()
      },[])
  return {
    name, email, mobile
  }
}
