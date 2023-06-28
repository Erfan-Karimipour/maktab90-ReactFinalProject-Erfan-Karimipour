import React, { useEffect, useContext, useState } from 'react'
import { useData } from '../../../../Context/Context';
import axios from 'axios';
import { Pagination, Stack, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export const  ProductSection = ({cat, subCat, limit}) => {
  let {products, setProducts, selectedSubCat  } = useData();
  let [page       , setPage       ] = useState(1);
  let [totalPages , setTotalPages ] = useState(0);

  const theme = createTheme({
    direction: 'rtl',
  })

  let path = `http://localhost:8000/api/products?page=${page}`

  if (cat)     {
    path = path + `&category=${cat}`
  }
  if (subCat)  {
    path = path + `&subcategory=${subCat}`
  }
  
  if (limit)   {
    path = path + `&limit=${limit}`
  }

  useEffect(() => {
    axios.get(path).then((res) => { 
        setProducts(res.data.data.products);
        setTotalPages(res.data.total_pages);
        console.log(path);  
    })
  }, [page, path])
  

  return (
    <div className='flex flex-col'>
    <div className='grid grid-cols-5 mt-1 w-[90rem] mx-auto px-10 border-t gap-1'>

        {products.map((product) => (
          
          <a className='flex flex-col border h-full border-gray-200 items-center py-4 hover:shadow-xl duration-150 cursor-pointer m-auto hover:border hover:border-red-500' key={product._id} href={`/product/${product._id}`} target='_blank' >

            <div className='h-[95%]'>
                <img src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`} alt={product.name} className='mb-4 p-8'/>
                <p className='mx-4 overflow-hidden text-ellipsis productName'>{product.name}</p>
            </div>
            <p className='font-bold my-5'>{product.price} تومان</p>

          </a>

))}

    </div>
    <div className={subCat || totalPages <= 1 ? 'hidden' : 'm-auto mt-6'} >
      <ThemeProvider theme={theme}>
        <Stack>
          <Pagination count={totalPages} onChange={(e, value) => {

            setPage(value);

            window.scrollTo({
              top: 490,
              behavior: 'smooth'
            })
          }}/>
        </Stack>
      </ThemeProvider>
    </div>
    </div>
  )
}
