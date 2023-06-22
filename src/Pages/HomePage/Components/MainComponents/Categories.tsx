import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useData } from '../../../../Context/Context'

export const Categories = () => {
  
  let {categories, setCategories} = useData();
  let [subCategories, setSubCategories] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/subcategories?limit=null`).then((res) => {
      setSubCategories(res.data.data.subcategories);
    })
  }, [])
  
  
  return (
    <div className='mt-20 flex mx-[20%] flex-col'>
      <div className='flex justify-between mt-1 mb-2'>
        {categories.map((category) => {

          return (
            <div key={category._id} className='cursor-pointer flex flex-col items-center mb-5'>
              <img src={`http://localhost:8000/images/categories/icons/${category.icon}`} alt={category.name} className='w-20 h-20 bg-white border-2 border-red-500 rounded-full p-1'/>
              <div className='absolute top-[10.5rem] overflow-hidden h-[1.5rem] hover:h-60 z-10 bg-white duration-150 flex flex-col w-56 hover:shadow-2xl hover:border-l hover:border-r hover:border-b rounded-md'>
                
                <p className='rounded-md px-2 flex m-auto text-center' onClick={() => {
                  window.open(`/category/${category._id}`)
                }}>{category.name}</p>

                <div>
                  {subCategories.map((subCat) => {
                    if(subCat.category == category._id){
                      return (
                        <p className='py-2 px-2 border-t hover:bg-gray-100' onClick={() => {
                          window.open(`/subcategory/${subCat._id}`)
                        }}>{subCat.name}</p>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )})}
      </div>
    </div>
  )

}
