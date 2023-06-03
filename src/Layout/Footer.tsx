import React from 'react'

export const Footer = () => {
  return (
    <div className='mt-8'>
      <div className='bg-gray-100 w-full flex flex-col items-center mb-2 text-center py-5'>
        <p className='font-bold my-2'>تماس با ما</p>
        <div className='flex flex-col items-center w-full'>
          <p className='flex items-center'>
            <p>Programming1402@gmail.com</p>
            <ion-icon name="mail-outline" class="mx-2"></ion-icon>
          </p>
          <p className='flex items-center'>
            <p>09555555533</p>
            <ion-icon name="call-outline" class="mx-2"></ion-icon>
          </p>
        </div>
      </div>
      <div className='text-red-600 bg-black py-1 text-center'> E Corp 2023 ©</div>
    </div>
  )
}
