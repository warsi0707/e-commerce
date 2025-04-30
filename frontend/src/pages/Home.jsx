import React from 'react'
import StarterPage from './StarterPage'
import LatestDrop from './LatestDrop'
import WeeklyPics from './WeeklyPics'
import Sale from './Sale'
import Footer from '../components/Footer/Footer'


export default function Home() {
  return (
    <div className='flex flex-col gap-10 px-10 py-10'>
      <StarterPage/>
      <LatestDrop/>
      <WeeklyPics/>
      <Sale/>
    </div>
  )
}
