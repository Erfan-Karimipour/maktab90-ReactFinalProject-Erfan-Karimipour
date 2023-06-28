import React, { useEffect } from 'react'
import { Header } from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { CartMaker } from './ShoppingCartComponents/CartMaker';
import { useData } from '../../Context/Context';

import EmptyCart from '../../assets/Images/EmptyCart.png'
import { Link } from 'react-router-dom';

export const ShoppingCartPage = () => {

  let {updateList, setUpdateList} = useData();

  
  
  let carts = JSON.parse(localStorage.getItem('Carts'));
  if (!carts) carts = [];
  let total = 0;
  carts.map((cart) => {
    total += cart.quantity * cart.price;
  })
  
  useEffect(() => {
    carts = JSON.parse(localStorage.getItem('Carts'));
  }, [updateList])

  return (
    <div>
      <Header />
      {carts.length > 0 ? 
      <div className='mt-20 w-full px-[20%] flex justify-center gap-10 min-h-[67vh]'>
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
            <Link to={'/Info'} className='font-bold text-white bg-green-500 mt-10 py-3 rounded-md w-full text-center hover:bg-green-600 duration-100'>
              نهایی کردن خرید
            </Link>

        </div>  
      </div>
      : 
      <div className='min-h-[75vh] flex justify-center items-center'>
        <div>
          <img src={EmptyCart} alt="Empty Cart" />
          <p className='text-2xl font-bold w-full text-center'>سبد خرید شما خالی است!</p>
        </div>
      </div>
      }
      <Footer />
    </div>
  )
}
