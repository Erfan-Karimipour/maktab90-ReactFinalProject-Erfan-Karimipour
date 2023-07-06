import React, { useEffect, useState } from 'react'
import { useData } from '../../../Context/Context';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../modules/formatNumber';

export const CartMaker = ({cart}) => {

  let {updateList, setUpdateList, badge, setBadge} = useData();
  let carts = JSON.parse(localStorage.getItem('Carts'));



  return (
    <div className='flex h-52 p-4 border shadow-md my-2 rounded-md'>
    <Link to={`/product/${cart.id}`} className='w-1/3'>
      <img src={`http://localhost:8000/images/products/thumbnails/${cart.thumbnail}`} alt={cart.name} /> 
    </Link>
    <div className='flex justify-between w-full'>
      <div className='mr-10'>
        <p className='text-lg my-6'>{cart.name}</p>
        <p>قیمت: {formatNumber(cart.price)} تومان</p>
        <p>تعداد: {cart.quantity} عدد</p>
        <p>مجموع قیمت: {formatNumber(cart.price * cart.quantity)} تومان</p>
      </div>
      
      <div className='flex items-stretch flex-col border rounded-t-full'>

        <button class='text-3xl px-2 py-2 mx-auto mt-3 text-white bg-red-500 rounded-full' onClick={() => {
          setBadge(badge - 1);
          carts = carts.filter((FindCart => FindCart.id != cart.id));
          localStorage.setItem(`Carts`, JSON.stringify(carts))
          setUpdateList(!updateList)
        }}>
          <ion-icon ion-icon name="trash-outline" class='flex self-center'></ion-icon>
        </button>

        <div className='flex h-full items-end gap-2 text-lg'>
          <button className='bg-red-500 text-white w-6 rounded-tr-lg' onClick={() => {
            carts.map((FindCart) => {
              if (FindCart.id == cart.id){
                FindCart.quantity += 1;
                setUpdateList(!updateList);
              }
            })
            localStorage.setItem(`Carts`, JSON.stringify(carts));
          }}>+</button>
          <span>{cart.quantity}</span>
          <button className='bg-red-500 text-white w-6 rounded-tl-lg' onClick={() => {
            carts.map((FindCart) => {
              if (FindCart.id == cart.id && FindCart.quantity > 1){
                FindCart.quantity -= 1;
                setUpdateList(!updateList);
              }
            })
            localStorage.setItem(`Carts`, JSON.stringify(carts));
          }}>-</button>
        </div>
      </div>
    </div> 
  </div>
  )
}
