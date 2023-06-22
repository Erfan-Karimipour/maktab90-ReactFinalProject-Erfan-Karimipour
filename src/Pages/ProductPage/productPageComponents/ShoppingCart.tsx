import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ShoppingCart = ({product}) => {

  let [similarProducts, setSimilarProducts] = useState({});
  let [quan           , setQuan           ] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products?subcategory=${product.subcategory._id}`).then((res) => {
      setSimilarProducts(res.data.data.products)
    })

  }, [])

  return (
    <div className='p-10'>
      <div className='mt-56 shadow-md border border-gray-300 w-[20vw] rounded-xl top-[30%] translate-y-[-50%] bg-gray-100'>
        <div className='mx-3 my-5 mb-0 pb-3 border-b'>
          <p>سازنده</p>
          <span className='text-xl items-center flex mt-3'>
            <ion-icon name="build-outline" class="ml-2 mb-1"></ion-icon>
            {product.brand}
          </span>
        </div>

        <div className='mx-3 my-5 mb-0 pb-3 border-b'>
          <p>موجودی</p>
          <span className='text-xl items-center flex mt-3'>
            <ion-icon name="save-outline" class="ml-2 mb-1"></ion-icon>
            {product.quantity}
            <p className='mr-1'>عدد</p>
          </span>
        </div>

        <div className='mx-3 my-5 mb-5 pb-3 border-b'>
          <p>قیمت فروشنده</p>
          <span className='text-xl items-center flex mt-3'>
            <ion-icon name="cash-outline" class="ml-2 mb-1"></ion-icon>
            {product.price}
            <p className='mr-1'>تومان</p>
          </span>
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col items-center text-sm ml-2 text-white bg-red-500 rounded-l-xl px-1 pt-1 h-fit'>

            <button onClick={() => {if(quan < product.quantity) setQuan(quan + 1)}}>
              <ion-icon name="caret-up-outline"></ion-icon>
            </button>

            <span className='pointer-events-none'>{quan}</span>

            <button onClick={() => {if(quan > 1)                setQuan(quan - 1)}}>
              <ion-icon name="caret-down-outline"></ion-icon>
            </button>
            
          </div>
          <button className='flex m-auto text-lg mb-5 font-bold bg-red-500 my-2 py-2 px-12 rounded-md text-white hover:bg-red-600 duration-100'>افزودن به سبد خرید</button>
        </div>
      </div>
        
    </div>
  )
}
