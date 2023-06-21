import React from 'react'

export const InfoAndImage = ({product}) => {
  return (
    <div className='w-[65vw]'>
        <div className='grid grid-cols-2 mt-16'>
            <img src={`http://localhost:8000/images/products/images/${product.images}`} alt={product.name} className='p-10'/>
            <div>
                <p>{product.name}</p>
            </div>
        </div>
    </div>
  )
}
