import React from 'react'

export const CartMaker = ({cart}) => {
  return (
    <div className='flex h-52 p-4 border shadow-md my-2 rounded-md'>
    <img src={`http://localhost:8000/images/products/thumbnails/${cart.thumbnail}`} alt={cart.name} /> 
    <div className='flex justify-between w-full'>
      <div className='mr-10'>
        <p className='text-lg my-6'>{cart.name}</p>
        <p>قیمت: {cart.price}</p>
        <p>تعداد: {cart.quantity} عدد</p>
      </div>
      
      <div className='flex items-stretch flex-col border rounded-t-full'>

        <button class='text-3xl px-2 py-2 mx-auto mt-3 text-white bg-red-500 rounded-full'>
          <ion-icon ion-icon name="trash-outline" class='flex self-center'></ion-icon>
        </button>

        <div className='flex h-full items-end gap-2 text-lg'>
          <button className='bg-red-500 text-white w-6 rounded-tr-lg'>+</button>
          <span>{cart.quantity}</span>
          <button className='bg-red-500 text-white w-6 rounded-tl-lg'>-</button>
        </div>
      </div>
    </div> 
  </div>
  )
}
