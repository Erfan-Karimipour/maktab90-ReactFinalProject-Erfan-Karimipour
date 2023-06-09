import React from 'react'
import { Link } from 'react-router-dom'
import { ContactUs } from '../sharedComponents/Footer/ContactUs'
import { AboutUs } from '../sharedComponents/Footer/AboutUs'

export const Footer = () => {
  return (
    <div className='mt-8 bg-gray-100'>
      <div className='grid grid-cols-2 text-center py-5 w-fit m-auto mb-2 gap-48'>
        <ContactUs  />
        <AboutUs    />
      </div>
      <div className='text-red-600 bg-black py-1 text-center'> E Corp 2023 ©</div>
    </div>
  )
}
