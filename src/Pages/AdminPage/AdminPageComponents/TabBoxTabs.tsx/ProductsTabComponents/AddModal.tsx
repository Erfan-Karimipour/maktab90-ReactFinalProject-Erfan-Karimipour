import { Input, MenuItem, Select, StyledEngineProvider, TextField, ThemeProvider, createStyles, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useData } from '../../../../../Context/Context'
import defaultImage from '../../../../../assets/Images/defaultImage.jpg'
import axios, { toFormData } from 'axios'
import { validateImage } from '../../../../../modules/ValidateImage'

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

  async function showImage(e) {
    const file = e.target.files[0];
    if (file) {
      try {
        await validateImage(file);
        setImageSrc(URL.createObjectURL(file));
      } catch (error) {
        setImageSrc(defaultImage);
        return;
      }
    } else {
      setImageSrc(defaultImage);
    }
  }


  return (
    <div className={modal == false ? 'hidden' : 'bg-black bg-opacity-50 absolute top-0 right-0 w-screen h-screen z-10 flex'}>
        <div className='flex self-center m-auto bg-white flex-col p-2 rounded-xl'>
          
{/* Header */}

            <div className='flex text-xl items-center justify-between mb-2'>
                <p>افزودن کالا</p>
                <button onClick={() => setModal(false)}>
                  <ion-icon name="close-circle-outline" class="text-red-600"></ion-icon>
                </button>
            </div>

{/* Main */}

            <ThemeProvider theme={theme}>
              <form onSubmit={(e) => {
                e.preventDefault();

                console.log(e.target.elements);
                
                let formData = {
                  
                  name        : e.target.elements.name.value,
                  category    : selectedCategory,
                  subcategory : selectedSubCategory,
                  description : e.target.elements.description.value,
                  thumbnail   : e.target.elements.thumbnail.value,
                  image       : e.target.elements.image.value,
                  price       : e.target.elements.price.value,
                  brand       : e.target.elements.brand.value,
                  quantity    : e.target.elements.quantity.value,
                  
                }

                console.log(formData);
                

                axios.post(`http://localhost:8000/api/products`, formData).then((res) => {
                  console.log(res);
                  
                })
                
                
              }}>

                <div className='flex justify-between w-[26vw]'>

                  <div className='ml-2 w-full'>

                    <TextField type='text' variant="outlined" id='name' label="نام کالا" fullWidth />

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

                    <TextField
                      id="description"
                      label="توضیحات محصول"
                      multiline
                      rows={8}
                      fullWidth
                    />

                    <div className='my-2'>
                      <TextField type="text" name='brand' id='brand' placeholder='برند' fullWidth />
                    </div>

                  </div>

                  <div className='w-96'>

                    <img src={imageSrc} alt="Default Image" className='rounded-md' />
                    <label htmlFor="image">تصویر پیش نمایش</label>
                    <input type='file' id='thumbnail' name='thumbnail' accept='image/png, image/jpeg, image/webp' multiple className='my-2 w-full' onChange={(e) => showImage(e)} />
                    <label htmlFor="image">تصویر اصلی</label>
                    <input type='file' id='image' name='image' accept='image/png, image/jpeg, image/webp' multiple className='my-2 w-full' onChange={(e) => showImage(e)} />
                    
                    <TextField type="number" name='price' id='price' placeholder='قیمت' fullWidth />
                    <div className='my-2'>
                      <TextField type="number" name='quantity' id='quantity' placeholder='مقدار' fullWidth />
                    </div>

                  </div>
                </div>
                

                <button type='submit' className='text-xl w-full bg-red-600 text-white mt-2 py-1 rounded-md'>افزودن</button>
              </form>
            </ThemeProvider>


        </div>
    </div>
  )
}
