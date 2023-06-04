import React from 'react'
import axios from 'axios'
import { Categories } from './MainComponents/Categories'
import { SliderSection } from './MainComponents/SliderSection'
import { ProductSection } from './MainComponents/productSection'

export const Main = () => {
  return (
    <div>
      <Categories     />
      <SliderSection  />
      <ProductSection />
    </div>
  )
  


}
