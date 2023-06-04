import React from 'react'
import { useParams } from 'react-router-dom'

export const ProductPage = () => {
  let { id } = useParams<{id: string}>()
  return (
    <div>ProductPage: {id}</div>
  )
}
