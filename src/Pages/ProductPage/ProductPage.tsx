import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../Layout/Header'
import axios from 'axios'
import { ShoppingCart } from './productPageComponents/ShoppingCart'
import { InfoAndImage } from './productPageComponents/InfoAndImage'

export const ProductPage = () => {
  let { id } = useParams<{id: string}>()
  let [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`).then((res) => {  
      setProduct(res.data.data.product);
    })
  }, [])

  return (
    <>
      <Header />
      <div className='flex mx-20 mt-16'>
        <InfoAndImage product={product} />
        <ShoppingCart product={product} />
      </div>
    </>
  )
}
