import React, { useEffect, useContext } from 'react'
import { useData } from '../../../../assets/Context/Context';
import axios from 'axios';

export const ProductSection = (cat) => {
  let {products, setProducts} = useData();
  if (!cat) cat = "any";

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products`).then((res) => {
        // console.log(res.data.data.products);
        
        setProducts(res.data.data.products);
        console.log(products);
        
    })
  },[])

  return (
    <div className='grid grid-cols-4 mt-6 mx-32'>
        {products.map((product) => (
            <div className='flex flex-col border border-gray-100 items-center py-4 h-[20vw] hover:shadow-md cursor-pointer'>
                <div className='h-[95%]'>
                    <img src={product.thumbnail} alt={product.name} className='w-[14vw] h-[14vw] bg-gray-200 mb-4'/>
                    <p className='w-[14vw]'>{product.name}</p>
                </div>
                <p className='self-end ml-20 font-bold'>{product.price} تومان</p>
            </div>
        ))}
    </div>
  )
}
