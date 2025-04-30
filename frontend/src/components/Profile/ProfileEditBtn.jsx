import React, { memo } from 'react'

 function ProfileEditBtn({onclick}) {
  return (
    <button onClick={onclick} className='px-10 py-1 text-sm transition-all duration-300 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200'>Edit</button>
  )
}
export default memo(ProfileEditBtn)