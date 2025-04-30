import React, { memo } from 'react'

 function AddressInput({type, placeholder, refs}) {
  return (
    <input ref={refs} type={type} placeholder={placeholder} className='w-full p-2 text-sm border rounded-md' />
  )
}
export default memo(AddressInput)