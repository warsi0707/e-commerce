import React, { memo } from 'react'

 function UpdateButton({onclick}) {
  return (
    <div className='flex justify-end'>
            <button onClick={onclick} className='px-8 py-1 text-white bg-gray-800 rounded-md'>Update</button>
        </div>
  )
}
export default memo(UpdateButton)