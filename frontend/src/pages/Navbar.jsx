import { Link } from "react-router";
import Navlink from "../components/Navlink";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import { useContext } from "react";
import { AuthProvider } from "../context/Authprovider";

export default function Navbar() {
  const {userAuth} = useContext(AuthProvider)
  return (
    <div className="sticky top-0 flex justify-between w-full p-5 px-5 border-b border-gray-600 backdrop-blur-xl" >
      <div>
        <button className="text-sm transition-all duration-300 hover:text-gray-600">Menu</button>
      </div>
      <div>
        <Link to={"/"} className="text-xl transition-all duration-300 hover:text-gray-600">E-Cart Store</Link>
      </div>
      <div className="gap-8 text-sm sm:flex">
        <div className="hidden gap-2 sm:flex">
        <Navlink title={"Account"} link={"/signin"}/>
        </div>
        {userAuth &&
        <div className="flex gap-2">
          <Link to={"/cart"} className="flex text-xl"><CiShoppingCart/></Link>
        </div>
        }
      </div>
      
    </div>
  )
}
