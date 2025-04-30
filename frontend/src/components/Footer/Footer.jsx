import React from 'react'
import { Link } from 'react-router'
import FooterLink from './FooterLink'

export default function Footer() {
  return (
    <div className='h-[70vh] w-full border-t flex justify-between items-center px-10'>
      <div className='flex '>
        <h1>MEDUSA Store</h1>
      </div>
      <div className='flex gap-8 '>
        <div className='flex flex-col gap-5'>
            <FooterLink title={"Hello"}/>
            <FooterLink title={"Hello"}/>
            <FooterLink title={"Hello"}/>
        </div>
        <div className='flex flex-col gap-5'>
        <FooterLink title={"Latest Drop"}/>
        <FooterLink title={"Weekly Drop"}/>
        <FooterLink title={"Sale"}/>
        </div>
        <div className='flex flex-col gap-5'> 
        <FooterLink title={"Github"}/>
        <FooterLink title={"Source Code"}/>
        <FooterLink title={"About Me"}/>
            
        </div>
      </div>
    </div>
  )
}
