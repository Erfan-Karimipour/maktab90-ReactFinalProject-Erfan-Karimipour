import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useData } from '../../../../Context/Context'
import { Link } from 'react-router-dom';

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
                
                <div className='rounded-md flex h-full duration-100'>
                  <Link className='px-2 m-auto' to={`/category/${category._id}`}>{category.name}</Link>
                </div>

                <div>
                  {subCategories.map((subCat) => {
                    if(subCat.category == category._id){
                      return (
                        <div className='border-t w-full flex hover:bg-gray-100'>
                          <Link className='py-2 mx-auto w-full text-center' to={`/subcategory/${subCat._id}`}>{subCat.name}</Link>
                        </div>
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
