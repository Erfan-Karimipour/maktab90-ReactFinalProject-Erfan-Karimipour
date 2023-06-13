import React, { useEffect, useContext } from 'react'
import { useData } from '../../../../Context/Context';
import axios from 'axios';

export const ProductSection = (cat) => {
  let {products, setProducts} = useData();
  if (!cat) cat = "any";

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products`).then((res) => { 
        setProducts(res.data.data.products);
    })
  },[])

  return (
    <div className='grid grid-cols-5 mt-1 w-[90rem] mx-auto px-10 border-t gap-1'>

        {products.map((product) => (

            <div className='flex flex-col border border-t-0 border-gray-200 items-center py-4 h-fit hover:shadow-xl duration-150 cursor-pointer m-auto' key={product._id}>

                <div className='h-[95%]'>
                    <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} className='bg-gray-200 mb-4'/>
                    <p className='mx-4'>{product.name}</p>
                </div>
                <p className='font-bold my-5'>{product.price} تومان</p>

            </div>

        ))}
    </div>
  )
}
