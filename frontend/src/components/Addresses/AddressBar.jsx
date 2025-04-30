import React, { memo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import AddAddress from "./AddAddress";

 function AddressBar({address, city, pincode, state, country, onclick}) {
  const [edit, setEdit] = useState(false);
  return (
    <div>
    <div className="flex flex-col justify-between p-5 border min-h-52 min-w-72">
      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <h1>{address}</h1>
        <h1>{city}</h1>
        <h1>{pincode}</h1>
        <h1>{state}</h1>
        <h1>{country}</h1>
      </div>
      <div className="flex gap-3 text-sm ">
        {/* <button onClick={()=> setEdit(true)} className="flex items-center justify-center">
          <FiEdit /> Edit
        </button> */}
        <button onClick={onclick} className="flex">
          <p className="mt-1">
            <FaTrash />{" "}
          </p>
          Remove
        </button>
      </div>
    </div>
    {edit && <AddAddress onclick={()=> setEdit(false)}/>}
    </div>
  );
}

export default memo(AddressBar)