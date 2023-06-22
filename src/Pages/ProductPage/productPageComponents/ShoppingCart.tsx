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


        <div>
          
          <button className='flex text-lg mb-5 font-bold bg-red-500 m-auto my-2 py-2 px-12 rounded-md text-white hover:bg-red-600 duration-100'>افزودن به سبد خرید</button>
        </div>
      </div>
        
    </div>
  )
}
