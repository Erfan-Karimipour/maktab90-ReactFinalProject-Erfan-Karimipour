import React, { useEffect, useState } from 'react'
import { Header } from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { ProductSection } from '../HomePage/Components/MainComponents/productSection'
import { useParams } from 'react-router-dom'
import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import { useData } from '../../Context/Context'
import axios from 'axios'
import { Categories } from '../HomePage/Components/MainComponents/Categories'

export const SubCategoryPage = () => {

  let theme = createTheme({
    palette: {
        primary: {
            main: '#ff0000'
        }
    }
  })

  let { id } = useParams<{id: string}>()

  let [subCategories, setSubCategories] = useState([]);
  let [cat , setCat] = useState(`
    
  `)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/subcategories/${id}`).then((res) => {
        console.log(res.data.data.subcategory.category._id);
        setCat(res.data.data.subcategory.category._id);
    })
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
        <ThemeProvider theme={theme}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <p className='w-full text-center border-b pb-2 text-red-500'>مجموعه ها</p>
          <Tabs centered orientation='vertical' value={id}>

            {subCategories.map((subCat) => {
                if(subCat.category == cat){
                    return (
                        <Tab label={subCat.name} value={subCat._id} id={subCat._id} style={{fontSize: 18, fontFamily: "vazir"}}  key={subCat._id} onClick={(e) => {window.open(`/subcategory/${subCat._id}`, `_self`)}}/>
                        )
                    }
                })}
          </Tabs>
        </Box>
        </ThemeProvider>        
        </div>
        <ProductSection subCat={id}/>
      </div>
      <Footer />
    </>
  )
}