import React, { memo } from 'react'

 function UserInput({placeholder, type, refs}) {
  return (
    <input ref={refs} className='w-full p-2 text-sm border rounded-md' type={type} placeholder={placeholder}  />
  )
}
export default memo(UserInput)