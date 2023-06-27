import React from 'react'
import { Header } from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { CartMaker } from './ShoppingCartComponents/CartMaker';

export const ShoppingCartPage = () => {

  let carts = JSON.parse(localStorage.getItem(`Carts`));
  let total = 0;
  carts.map((cart) => {
    total += cart.quantity * cart.price;
  })
  

  return (
    <div>
      <Header />
      <div className='mt-20 w-full px-[20%] flex justify-center gap-10'>
        <div className='border-gray-150 w-2/3'>
          <div className='flex items-end mr-2'>
            <p className='ml-2 text-3xl'>سبد خرید</p>
            <p>(<span>{carts.length}</span> محصول)</p>
          </div>

          <div>

            {carts.map((cart) => (
              <CartMaker cart={cart} />
            ))}

          </div>
        </div>

        <div className='flex flex-col fixed w-96 left-40 h-fit mt-11 border p-4 rounded-md shadow-md'>

            <div className='flex justify-between w-full text-lg border-b pb-5'>
              <p>مجموع قیمت</p>
              <span>{total}</span>
            </div>
            <button className='font-bold text-white bg-green-500 mt-10 py-3 rounded-md'>
              نهایی کردن خرید
            </button>

        </div>  
      </div>
      <Footer />
    </div>
  )
}
