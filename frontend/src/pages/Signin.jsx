import { Link, useNavigate } from "react-router";
import UserButton from "../components/User/UserButton";
import UserInput from "../components/User/UserInput";
import { useCallback, useContext, useRef } from "react";
import toast from "react-hot-toast";
import { Backendurl } from "../BckendUrl";
import { AuthProvider } from "../context/Authprovider";

export default function Signin() {
  const {setUserAuth} = useContext(AuthProvider)
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()  

  
    const Signin =useCallback(async()=>{
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      try{
        const response = await fetch(`${Backendurl}/user/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        })
        const result = await response.json()

        if(response.ok){
          setUserAuth(true)
          toast.success(result.message)
          localStorage.setItem("token", result.token)
          navigate("/")
        }else{
          toast.error(result.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    },[])
  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="flex flex-col gap-5 w-96">
        <div className="flex flex-col gap-5 mb-5 text-center">
          <h1 className="text-xl font-bold">Welcome Back</h1>
          <h1 className="text-sm font-thin text-gray-900">
            Sign in to access an enhanced shopping experience.
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
              <UserInput refs={emailRef}  placeholder={'Email'} type={"email"}/>
              <UserInput refs={passwordRef}  placeholder={'Password'} type={"Password"}/>
          </div>

          <UserButton onclick={Signin} title={"Sign in"} />
        </div>
        <p className="text-sm font-thin text-center">
          Not A Member ?{" "}
          <Link to={"/signup"} className="underline ">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
