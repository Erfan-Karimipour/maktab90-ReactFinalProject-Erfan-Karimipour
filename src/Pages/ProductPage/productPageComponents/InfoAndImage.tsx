import { Rating } from '@mui/material';
import React from 'react'

export const InfoAndImage = ({product}) => {


  return (

    <div className='w-[65vw]'>
      <div className='grid grid-cols-2 mt-16'>
        <img src={`http://localhost:8000/images/products/images/${product.images}`} alt={product.name} className='p-10 w-[30vw] border-b border-l rounded-bl-xl'/>
        <div>
          <p className='text-xl border-b pb-2 mb-2'>{product.name}</p>
          <div className='flex items-center'>
            <button className='text-blue-600 mx-1' onClick={() => window.open(`/category/${product.category._id}`)}>{product.category.name}</button>
            <ion-icon name="caret-back-outline" class="text-gray-900"></ion-icon>
            <button className='text-blue-600 mx-1' onClick={() => window.open(`/subcategory/${product.subcategory._id}`)}>{product.subcategory.name}</button>
          </div>
          <div className='flex mt-1 mb-10 mr-1 justify-between'>
            <div className='flex'>
              <p>امتیاز :</p>
              <p>{product.rating.rate}</p>
              <p className='mr-2'>(از {product.rating.count} رای)</p>
            </div>
            <Rating name='read-only' value={product.rating.rate} readOnly ></Rating>
          </div>
          <p className='text-xl border-b-2 border-red-500 mb-4 pb-1 w-fit pl-1'>
            درباره محصول
          </p>
          <p className='font-[vazir]'>
            {product.description}
          </p>
          <div className='text-xl border-b-2 border-red-500 mb-4 pb-1 w-fit pl-1 mt-6 flex items-center'>
            <ion-icon name="alert-circle-outline" class="text-red-500 ml-2"></ion-icon>
            <p>هشدار</p>
          </div>
          <p className='font-[vazir]'>
            لطفا در هنگام خرید، از صحت اطلاعات وارد شده اطمینان حاصل کنید. اطلاعات وارده قابل اصلاح نخواهند بود.
          </p>
          <p className='mt-8 text-gray-800 text-lg p-2 rounded-md w-fit bg-gray-300'>قابل ارسال از 3 روز دیگر</p>
        </div>
      </div>
    </div>

  )

}
