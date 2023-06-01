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
    <div className='grid grid-cols-4 mt-2 w-4/5 mx-auto px-10 border-t border-t-red-500 rounded-lg'>
        {products.map((product) => (
            <div className='flex flex-col border border-gray-100 items-center py-4 h-[17vw] hover:shadow-lg duration-150 cursor-pointer m-auto' key={product._id}>
                <div className='h-[95%]'>
                    <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} className='bg-gray-200 mb-4'/>
                    <p className='w-[14vw]'>{product.name}</p>
                </div>
                <p className='self-end ml-20 font-bold '>{product.price} تومان</p>
            </div>
        ))}
    </div>
  )
}
