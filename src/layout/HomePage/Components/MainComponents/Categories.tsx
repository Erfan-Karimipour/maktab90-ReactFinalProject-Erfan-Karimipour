import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useData } from '../../../../assets/Context/Context'

export const Categories = () => {
  
  let {categories, setCategories, subCategories, setSubCategories} = useData();
  console.log(categories);
  
  return (
    <div className='mt-20 flex mx-[20%] flex-col'>
      <div className='flex justify-between mt-4 mb-6'>
        {categories.map((category) => (
          <div key={category._id} className='cursor-pointer flex flex-col items-center'>
            <img src={category.icon} alt={category.name} className='w-20 h-20 bg-gray-200 rounded-2xl'/>
            <p className='rounded-md px-2 mt-1 flex'>{category.name}</p>
          </div>
          ))}
      </div>
    </div>
  )

}
