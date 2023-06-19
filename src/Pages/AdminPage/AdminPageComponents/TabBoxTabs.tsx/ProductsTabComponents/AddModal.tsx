import { Input, MenuItem, Select, StyledEngineProvider, TextField, ThemeProvider, createStyles, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useData } from '../../../../../Context/Context'
import defaultImage from '../../../../../assets/Images/defaultImage.jpg'
import axios from 'axios'

export const AddModal = (e) => {

  let {modal, setModal, categories} = useData();

  let [imageSrc           , setImageSrc             ] = useState(defaultImage);
  let [selectedCategory   , setSelectedCategory     ] = useState(`none`);
  let [subCategories      , setSubCategories        ] = useState([])
  let [selectedSubCategory, setSelectedSubCategory  ] = useState(`none`);

  useEffect(() => {

    axios.get(`http://localhost:8000/api/subcategories?category=${selectedCategory}`).then((res) => {
      setSubCategories(res.data.data.subcategories);
      setSelectedSubCategory(`none`)
    })

  }, [selectedCategory])

  const theme = createTheme({
    palette: {
        primary: {
            main: '#eb0000'
        }
    },
  })


  return (
    <div className={modal == false ? 'hidden' : 'bg-black bg-opacity-50 absolute top-0 right-0 w-screen h-screen z-10 flex'}>
        <div className='flex self-center m-auto bg-white flex-col p-2 rounded-xl w-1/3'>
          
{/* Header */}

            <div className='flex text-xl items-center justify-between mb-2'>
                <p>افزودن/ویرایش کالا</p>
                <button onClick={() => setModal(false)}>
                  <ion-icon name="close-circle-outline" class="text-red-600"></ion-icon>
                </button>
            </div>

{/* Main */}

            <ThemeProvider theme={theme}>
              <form>

                <div className='flex'>

                  <div className='ml-2'>

                    <TextField type='text' variant="outlined" label="نام کالا" fullWidth />
                    <input type='file' id='fileInput' name='fileInput' accept='image/png, image/jpeg, image/webp' multiple className='my-2 w-full' onChange={(e) => setImageSrc(e.target.value)}/>

                    <div className='my-2'>
                    
                    <Select name="categoty" id="categoty" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as string)} fullWidth>
                      <MenuItem value="none">لطفا یک دسته بندی را انتخاب کنید</MenuItem>
                      {categories.map((category) => (
                        <MenuItem value={category._id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                    
                    </div>
                    <div className='my-2'>

                    <Select name="subCategoty" id="subCategoty" value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value as string)} fullWidth>
                      <MenuItem value="none">لطفا یک زیرمجموعه را انتخاب کنید</MenuItem>
                      {subCategories.map((subCategory) => (
                        <MenuItem value={subCategory._id}>{subCategory.name}</MenuItem>
                        ))}
                    </Select>
                    
                    </div>


                  <p>Use Text-area for this section</p> 
                  </div>

                  <img src={imageSrc} alt="Default Image" className='w-52 h-fit rounded-md' />
                </div>

              </form>
            </ThemeProvider>


        </div>
    </div>
  )
}
