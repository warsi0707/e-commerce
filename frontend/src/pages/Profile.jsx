import React, {  useContext,  useState } from 'react'
import Overview from '../components/Profile/Overview.jsx'
import Profiles from '../components/Profile/Profiles.jsx'
import Address from '../components/Addresses/Address.jsx'
import { AuthProvider } from '../context/Authprovider.jsx'
import toast from 'react-hot-toast'
import useProfile from '../hooks/useProfile.jsx'
import Orders from './Orders.jsx'

export default function Profile() {
  const [item, setItem ] = useState("Overview")
  const {name, email, mobile} = useProfile()
  const {setUserAuth} = useContext(AuthProvider)
  const Logout =()=>{
    const token = localStorage.getItem('token')
    if(token.length>0){
      toast.success("Logout success")
      localStorage.removeItem('token')
      setUserAuth(false)
    }else{
      toast.error("Logout failed")
    }

  }
 
  return (
    <div className='w-[70vw] mx-auto min-h-[100vh]'>
      <div className='w-full grid grid-cols-10 min-h-[80vh] py-10 p-5'>
        <div className='flex flex-col items-start justify-start col-span-2 gap-5 py-5 '>
        <button onClick={()=> setItem("Overview")}>Overview</button>
          <button onClick={()=> setItem("profile")}>Profile</button>
          <button onClick={()=> setItem("address")}>Address</button>
          <button onClick={()=> setItem("order")}>Orders</button>
          <button onClick={Logout}>Logout</button>
         
        </div>
        <div className='col-span-8 p-5 '>
        {item === "Overview" && <Overview email={email} name={name}/>}
          {item === "profile" && <Profiles/>}
          {item === "address" && <Address/>}
          {item === "order" && <Orders/>}
        </div>
      </div>
    </div>
  )
}
