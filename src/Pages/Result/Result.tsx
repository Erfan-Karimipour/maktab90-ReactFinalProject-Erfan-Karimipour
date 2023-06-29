import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const Result = () => {

  let { result } = useParams<{result: string}>();

  return (
    <div className={`absolute flex flex-col text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 ${result == 'success' ? 'border-green-500' : 'border-red-500'} rounded-xl`}>
      <p className='text-4xl p-10 pb-5'>
        {result == 'success' ? 'سفارش شما با موفقیت ثبت شد' : 'سفارش با موفقیت لغو شد'}
      </p>
      <Link to={'/ShoppingCart'} className='text-blue-500 mb-5'>
        بازگشت به سبد خرید
      </Link>
    </div>
  )
}
