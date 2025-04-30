import { useContext } from "react";
import { AuthProvider } from "../../context/Authprovider";
import { FaRupeeSign } from "react-icons/fa";


function CheckoutSummary({onclick}) {
  const { total } = useContext(AuthProvider);
 
  return (
    <div className="w-full mt-14 h-96 sm:h-full sm:col-span-3">
      <h1 className="text-3xl font-bold">Summary</h1>
      <div className="flex flex-col gap-5 py-5 text-sm border-gray-500 border-y">
        <div className="flex justify-between">
          <p>Total</p>
          <p className="flex items-center justify-center">
            <FaRupeeSign />
            {total}
          </p>
        </div>
      </div>
      <div className="py-2">
        <button onClick={onclick} className="w-full p-2 text-white bg-gray-900 rounded-md">
          Go to checkout
        </button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
