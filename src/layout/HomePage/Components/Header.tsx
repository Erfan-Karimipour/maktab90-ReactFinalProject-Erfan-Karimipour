import React from 'react'
import Logo from '../../../assets/Images/Logo.png'

export const Header = () => {
  return (
    <div className='h-22 border-b fixed w-full'>
        <div className='mx-56 flex justify-between'>
            <div className='flex'>
                <img src={Logo} alt="Logo" width={'75px'} className='opacity-90'/>
                <div className='w-full flex content-center h-full'>
                    <p className='text-3xl self-center text-gray-800'>Shop of</p>
                </div>
            </div>
            <div className='flex text-xl gap-8 self-center'>
                <button className='border-white border-b-2 hover:border-red-500 duration-100 px-1 rounded-sm'>ورود ادمین</button>
                <button className='border-white border-b-2 hover:border-red-500 duration-100 px-1 rounded-sm'>سبد خرید</button>
            </div>
        </div>
    </div>
  )
}
