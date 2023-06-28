import React from 'react'
import BG from '../../assets/Images/PaymentBG.jpg'
import { Link } from 'react-router-dom';
import { AddNewOrder } from '../../modules/AddNewOrder';

export const PaymentPage = () => {

  let total = JSON.parse(localStorage.getItem(`Price`));

  return (
    <div className={`w-screen h-screen bg-[url(assets/Images/PaymentBG.jpg)] bg-cover`}>
      <div className='absolute bottom-0 w-full h-24 flex justify-between'>
        <div className='flex'>
          <Link className='text-2xl text-white bg-green-500 h-fit px-44 py-4 mt-2 mr-[27rem] rounded-full' to={`/Result/success`} onClick={() => AddNewOrder()}>پرداخت</Link>
          <Link className='text-2xl text-white bg-yellow-300 h-fit px-12 py-4 mt-2 mr-2 rounded-full'      to={`/Result/failed`}>انصراف</Link>
        </div>
        <span className='text-4xl text-green-500 bg-white font-bold ml-28 pl-4 mt-5'>
          {total}
        </span>
      </div>
    </div>
  )
}
