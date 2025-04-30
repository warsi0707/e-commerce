import { memo } from "react"

function Overview({email, name}) {
  return (
    <div className='flex flex-col items-center justify-center w-full py-3 border-b sm:justify-between sm:flex-row'>
          <p className='text-2xl'>Hello {name}</p>
          <p className='mt-1 text-sm'>Signed in as: {email}</p>
        </div>
  )
}
export default memo(Overview)