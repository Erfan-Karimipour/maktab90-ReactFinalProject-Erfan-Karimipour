import React from 'react'
import { Link } from 'react-router-dom'

export const ContactUs = () => {
  return (
    <div className='text-end'>
      <p className='font-bold my-2'>تماس با ما</p>
      <div className='flex flex-col items-end w-full'>
        <p className='flex items-center'>
          <Link to={'https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvqsKchzFSsbdKpmnKswCGbCmLbdZmVvlGNnDPPFPDghdQHTVrdwRXtbHjSGmBxCRTQtDV'}>Programming1402@gmail.com</Link>
          <ion-icon name="mail-outline" class="mr-2"></ion-icon>
        </p>
        <p className='flex items-center'>
          <p>09555555533</p>
          <ion-icon name="call-outline" class="mr-2"></ion-icon>
        </p>
      </div>
    </div>
  )
}
