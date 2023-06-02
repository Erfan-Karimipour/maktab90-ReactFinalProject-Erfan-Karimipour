import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useData } from '../../../../Context/Context'

export const Categories = () => {
  
  let {categories, setCategories, subCategories, setSubCategories} = useData();
  
  return (
    <div className='mt-20 flex mx-[20%] flex-col'>
      <div className='flex justify-between mt-4 mb-4'>
        {categories.map((category) => (
          <div key={category._id} className='cursor-pointer flex flex-col items-center'>
            <img src={`http://localhost:8000/images/categories/icons/${category.icon}`} alt={category.name} className='w-24 h-24 bg-gray-200 border-2 rounded-2xl'/>
            <p className='rounded-md px-2 mt-1 flex border-b border-red-600'>{category.name}</p>
          </div>
          ))}
      </div>
    </div>
  )

}
