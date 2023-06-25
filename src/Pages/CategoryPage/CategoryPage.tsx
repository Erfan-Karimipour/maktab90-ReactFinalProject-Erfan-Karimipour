import React, { useEffect, useState } from 'react'
import { Header } from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { ProductSection } from '../HomePage/Components/MainComponents/productSection'
import { useParams } from 'react-router-dom'
import { Box, Tab, Tabs } from '@mui/material'
import { useData } from '../../Context/Context'
import axios from 'axios'
import { Categories } from '../HomePage/Components/MainComponents/Categories'

export const CategoryPage = () => {
  let { id } = useParams<{id: string}>()

  let [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/subcategories?limit=null`).then((res) => {
      console.log(res.data.data.subcategories);
      setSubCategories(res.data.data.subcategories);
    })
  }, [])
  
  return (
    <>
      <Header />
      <Categories />
      <div className='my-10 flex justify-center'>
        <div className='h-fit border-l rounded-bl-md'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <p className='w-full text-center border-b pb-2 text-red-500'>مجموعه ها</p>
          <Tabs centered orientation='vertical'>

            {subCategories.map((subCat) => {
              if(subCat.category == id){
                return (
                  <Tab label={subCat.name} value={subCat._id} id={subCat._id} style={{fontSize: 18, fontFamily: "vazir"}}  key={subCat._id} onClick={(e) => {window.open(`/subcategory/${subCat._id}`)}}/>
                  )
                }
              })}
          </Tabs>
        </Box>
        </div>
        <ProductSection cat={id}/>
      </div>
      <Footer />
    </>
  )
}
