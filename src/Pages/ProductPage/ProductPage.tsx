import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../Layout/Header'
import axios from 'axios'
import { ShoppingCart } from './productPageComponents/ShoppingCart'
import { InfoAndImage } from './productPageComponents/InfoAndImage'
import { SimilarProducts } from './productPageComponents/SimilarProducts'
import { Footer } from '../../Layout/Footer'

export const ProductPage = () => {
  let { id } = useParams<{id: string}>()
  let [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((res) => {  
      setProduct(res.data.data.product);

      
    })
  }, [])
  
if (product.name){

  return (
    <>
      <Header />
      <div className='mx-20 mt-16'>
        <div className='flex'>
          <InfoAndImage     product={product} />
          <ShoppingCart     product={product} />
        </div>
        <SimilarProducts  product={product} />
      </div>
      <Footer />
    </>
  )
}
}
