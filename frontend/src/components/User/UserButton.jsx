import React, { memo } from 'react'

 function UserButton({title, onclick}) {
  return (
    <button onClick={onclick} className='w-full p-2 text-white transition-all duration-300 rounded-md bg-slate-800 hover:bg-slate-700'>{title}</button>
  )
}
export default memo(UserButton)