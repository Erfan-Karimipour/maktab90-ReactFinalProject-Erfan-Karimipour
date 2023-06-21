import { Input, MenuItem, Select, StyledEngineProvider, TextField, ThemeProvider, createStyles, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useData } from '../../../../../Context/Context'
import defaultImage from '../../../../../assets/Images/defaultImage.jpg'
import axios, { toFormData } from 'axios'
import { validateImage } from '../../../../../modules/ValidateImage'

export const AddOrEditModal = ({editableData}) => {
  
  let edit = false;
  if (Object.keys(editableData).length > 0) edit = true;
  
  let {modal, setModal, categories, updateList, setUpdateList} = useData();

  let [imageSrc           , setImageSrc             ] = useState(defaultImage);
  let [selectedCategory   , setSelectedCategory     ] = useState(`none`);
  let [subCategories      , setSubCategories        ] = useState([]);
  let [selectedSubCategory, setSelectedSubCategory  ] = useState(`none`);

  useEffect(() => {
    if (edit) {
      setSelectedCategory(editableData.category);
      setSelectedSubCategory(editableData.subcategory);
      setImageSrc(`http://localhost:8000/images/products/thumbnails/${editableData.thumbnail}`);
    } else {
      setSelectedCategory(`none`);
      setSelectedSubCategory(`none`);
      setImageSrc(defaultImage)
    }
  }, [editableData, edit])
  

  useEffect(() => {

    axios.get(`http://localhost:8000/api/subcategories?category=${selectedCategory}`).then((res) => {
      setSubCategories(res.data.data.subcategories);
      if(edit){
        setSelectedSubCategory(editableData.subcategory)
      } else{
        setSelectedSubCategory(`none`)
      }
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
        <div className='flex self-center m-auto bg-white flex-col p-4 rounded-xl'>
          
{/* Header */}

            <div className='flex text-xl items-center justify-between mb-2'>
                <p>{edit ? 'ویرایش کالا' : 'افزودن کالا'}</p>
                <button onClick={() => setModal(false)}>
                  <ion-icon name="close-circle-outline" class="text-red-600"></ion-icon>
                </button>
            </div>

{/* Main */}

            <ThemeProvider theme={theme}>
              <form onSubmit={(e) => {
                e.preventDefault();
                
                let formData = new FormData();

                if (e.target.elements.thumbnail.value){
                  formData.append('thumbnail'   , e.target.elements.thumbnail.files[0]);
                }

                if (e.target.elements.images.value){
                  formData.append('images', e.target.elements.images.files[0]);
                }
                
                formData.append('name'        , e.target.elements.name.value);
                formData.append('category'    , selectedCategory);
                formData.append('subcategory' , selectedSubCategory);
                formData.append('description' , e.target.elements.description.value);
                formData.append('price'       , e.target.elements.price.value);
                formData.append('brand'       , e.target.elements.brand.value);
                formData.append('quantity'    , e.target.elements.quantity.value);

                if (edit){

                  axios.patch(`http://localhost:8000/api/products/${editableData._id}`, formData)
                  .then(response => {
                    console.log(response.data);
                    setModal(false);
                    setUpdateList(!updateList);
                  })
                  .catch(error => {
                    console.log(error.response.data);
                  });

                } else {
                
                  axios.post('http://localhost:8000/api/products', formData)
                  .then(response => {
                    console.log(response.data);
                    setModal(false);
                    setUpdateList(!updateList);
                  })
                  .catch(error => {
                    console.log(error.response.data);
                  });
                }

                
                
              }}>

                <div className='flex justify-between w-[26vw]'>

                  <div className='ml-2 w-full'>

                    <TextField type='text' variant="outlined" id='name' label="نام کالا" fullWidth multiline rows={1} defaultValue={edit ? editableData.name : ``} />

                    <div className='my-2'>
                    
                    <Select name="categoty" id="categoty" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as string)} fullWidth>
                      <MenuItem value="none" disabled>لطفا یک دسته بندی را انتخاب کنید</MenuItem>
                      {categories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                    
                    </div>
                    <div className='my-2'>

                    <Select name="subCategoty" id="subCategoty" value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value as string)} fullWidth>
                      <MenuItem value="none" disabled>لطفا یک زیرمجموعه را انتخاب کنید</MenuItem>
                      {subCategories.map((subCategory) => (
                        <MenuItem value={subCategory._id} key={subCategory._id}>{subCategory.name}</MenuItem>
                        ))}
                    </Select>
                    
                    </div>

                    <TextField
                      id="description"
                      label="توضیحات محصول"
                      multiline
                      rows={8}
                      fullWidth
                      defaultValue={edit ? editableData.description : ``}
                    />

                    <div className='my-2'>
                      <TextField id='brand' label="برند" fullWidth multiline defaultValue={edit ? editableData.brand : ``}/>
                    </div>

                  </div>

                  <div className='w-96'>

                    <img src={imageSrc} alt="Default Image" className='rounded-md shadow-md' />

                    <label htmlFor="image">تصویر پیش نمایش</label>
                    <input type='file' id='thumbnail' name='thumbnail' accept='image/png, image/jpeg, image/webp' multiple className='my-2 w-full' onChange={(e) => showImage(e)} />

                    <label htmlFor="image">تصویر اصلی</label>
                    <input type='file' id='images' name='images' accept='image/png, image/jpeg, image/webp' multiple className='my-2 w-full' />
                    
                    <TextField type="number" name='price' label="قیمت" id='price' fullWidth multiline defaultValue={edit ? editableData.price : ``}/>
                    <div className='my-2'>
                      <TextField type="number" name='quantity' label="تعداد" id='quantity' fullWidth multiline defaultValue={edit ? editableData.quantity : ``} />
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
