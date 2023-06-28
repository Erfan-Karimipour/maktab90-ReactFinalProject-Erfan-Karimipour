import React, { useState } from 'react'
import { Header } from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { Select, TextField, ThemeProvider, createTheme, MenuItem } from '@mui/material'

export const InfoPage = () => {

  const currentDate = new Date();


  const day1 = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  const day2 = new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000);
  const day3 = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);

  const persianOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const persianDay1 = day1.toLocaleDateString('fa-IR', persianOptions);
  const persianDay2 = day2.toLocaleDateString('fa-IR', persianOptions);
  const persianDay3 = day3.toLocaleDateString('fa-IR', persianOptions);

  let [selectedOptions, setSelectedOptions] = useState({
    date    : persianDay1,
    method  : `sepah`
  });

  let [formErrors, setFormErrors] = useState({
    name      : false,
    familyName: false,
    address   : false,
    number    : false,
  })

  function validate(e){
    e.preventDefault();
    e = e.target.elements;

    let name, familyName, address, number = false;
    
    if (e[0].value.length < 2  || /\d/.test(e[0].value      )){name      = true} else {name      = false}
    if (e[2].value.length < 2  || /\d/.test(e[2].value      )){familyName= true} else {familyName= false}
    if (e[4].value.length < 10                               ){address   = true} else {address   = false}
    if (e[6].value.length != 11|| /^[a-z]+$/.test(e[6].value)){number    = true} else {number    = false}

    setFormErrors({
      name        : name,
      familyName  : familyName,
      address     : address,
      number      : number,
    });

    if (!name && !familyName && !address && !number){
      window.open(`/Payment`);
    }
  }
  

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff0000",
      },
    },
    
    shape: {
      borderRadius: 8,
    },
  })

  function handleChangeDate (e){
    setSelectedOptions({...selectedOptions, date: e.target.id})
  }

  function handleChangeMethod (e){
    setSelectedOptions({...selectedOptions, method: e.target.id})
    console.log(selectedOptions);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>

        <Header />
        <div className='mt-20 flex w-full'>
          <form className='w-[30vw] m-auto border flex flex-col items-center shadow-lg mt-5' onSubmit={(e) => validate(e)}>
            <p className='text-2xl font-bold my-6 pb-6 text-center w-5/6 border-b mx-10'>نهایی کردن خرید</p>
            <TextField variant='outlined' helperText={formErrors.name && `لطفا نام خود را، صحیح وارد کنید`}                       error={formErrors.name}       label='نام' id='name' sx={{width: '25vw', margin: '0 0 20px 0'}}/>
            <TextField variant='outlined' helperText={formErrors.familyName && `لطفا نام خانوادگی خود را، صحیح وارد کنید`}       error={formErrors.familyName} label='نام خانوادگی' id='familyName' sx={{width: '25vw', margin: '0 0 20px 0'}}/>
            <TextField variant='outlined' helperText={formErrors.address && `لطفا آدرس کامل را وارد کنید`}                        error={formErrors.address}    label='آدرس' id='name' sx={{width: '25vw', margin: '0 0 20px 0'}}/>
            <TextField variant='outlined' helperText={formErrors.number && `لطفا شماره تلفن ثابت خود را با کد استان وارد کنید`}  error={formErrors.number}     label='تلفن همراه' id='familyName' sx={{width: '25vw', margin: '0 0 20px 0'}} type='number'/>
            <p className='self-start mr-10 mb-2'>زمان ارسال</p>
            <Select
              value={selectedOptions.date}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '25vw', margin: '0 0 20px 0', fontFamily: 'vazir'}}
            > 
              <MenuItem value={persianDay1} id={persianDay1} sx={{backgroundColor: '#ffffff', border: '1px solid #c4c4c4', fontFamily: 'vazir'}} onClick={(e) => handleChangeDate(e)}>{persianDay1} (سریع ترین زمان ارسال)</MenuItem>
              <MenuItem value={persianDay2} id={persianDay2} sx={{backgroundColor: '#ffffff', border: '1px solid #c4c4c4', fontFamily: 'vazir'}} onClick={(e) => handleChangeDate(e)}>{persianDay2}</MenuItem>
              <MenuItem value={persianDay3} id={persianDay3} sx={{backgroundColor: '#ffffff', border: '1px solid #c4c4c4', fontFamily: 'vazir'}} onClick={(e) => handleChangeDate(e)}>{persianDay3}</MenuItem>
            </Select>

            <p className='self-start mr-10 mb-2'>انتخاب درگاه پرداخت</p>
            <Select
              value={selectedOptions.method}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '25vw', margin: '0 0 20px 0', fontFamily: 'vazir'}}
            > 
              <MenuItem value='sepah' id='sepah' sx={{backgroundColor: '#ffffff', border: '1px solid #c4c4c4', fontFamily: 'vazir'}} onClick={(e) => handleChangeMethod(e)}>سپه (پیش فرض)</MenuItem>
              <MenuItem value='melli' id='melli' sx={{backgroundColor: '#ffffff', border: '1px solid #c4c4c4', fontFamily: 'vazir'}} onClick={(e) => handleChangeMethod(e)}>ملی</MenuItem>
              <MenuItem value='saman' id='saman' sx={{backgroundColor: '#ffffff', border: '1px solid #c4c4c4', fontFamily: 'vazir'}} onClick={(e) => handleChangeMethod(e)}>سامان</MenuItem>
            </Select>
            <button type='submit' className='text-xl bg-green-500 w-5/6 text-center py-2 text-white font-bold rounded-md mb-10'>پرداخت</button>
          </form>
        </div>
        <Footer />

      </ThemeProvider>
    </div>
  )
}
