import React from 'react'
import { ProductSection } from '../../HomePage/Components/MainComponents/productSection'

export const SimilarProducts = ({product}) => {
    
  return (
    <div className='mx-20'>
        <p className='text-2xl mb-2'>کالا های مشابه</p>
        <ProductSection cat={product.category._id} subCat={product.subcategory._id} limit={5} />
     </div>
  )
}
