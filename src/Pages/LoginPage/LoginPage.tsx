import React, { useState } from 'react'
import { Header } from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { Select, TextField, ThemeProvider, createTheme, MenuItem } from '@mui/material'
import axios from 'axios'
import { useData } from '../../Context/Context'
import { Link } from 'react-router-dom'

export const Login = () => {

  let {newOrder, setNewOrder} = useData();
  
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
    password  : false,
  })

  function validate(e){
    e.preventDefault();
    e = e.target.elements;

    let name, password = false;
    
    if (e[0].value.length < 2  || /\d/.test(e[0].value                                                 )){name      = true} else {name      = false}
    if (e[2].value.length < 8 || e[2].value.length > 12 || !/[a-zA-Z]+[0-9]+/.test(e[2].value          )){password  = true} else {password  = false}

    setFormErrors({
      name        : name,
      password    : password,
    });

    
    if (!name && !password){
      
      let info = {
        "username"    : e[0].value,
        "password"    : e[2].value,
      }

      localStorage.setItem(`Order`, JSON.stringify(newOrder))
      localStorage.setItem(`info`, JSON.stringify(info));

      axios.post(`http://localhost:8000/api/auth/login`, info).then((res) => {
        console.log(res.data.data.user._id);

        console.log(newOrder); 
        
        window.open(`/Payment/${res.data.data.user._id}`);
      }).catch((err) =>{
        console.log(err);
      });
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
        <div className='mt-20 flex w-full min-h-[42.3rem]'>
          <form className='w-[30vw] m-auto border flex flex-col items-center shadow-lg mt-5 absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]' onSubmit={(e) => validate(e)}>
            <p className='text-2xl font-bold my-6 pb-6 text-center w-5/6 border-b mx-10'>نهایی کردن خرید</p>

            <TextField variant='outlined' helperText={formErrors.name && `لطفا نام خود را، صحیح وارد کنید`}                       error={formErrors.name}       label='نام' id='name' sx={{width: '25vw', margin: '0 0 20px 0'}}/>
            <TextField variant='outlined' helperText={formErrors.password && `کلمه عبور باید دارای حروف و اعداد بوده، و بین 8 تا 12 حرف باشد`}                 error={formErrors.password} label='کلمه عبور' id='password' sx={{width: '25vw', margin: '0 0 20px 0'}}/>

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

            {/* <Link to={'/Payment'}> */}
              <button type='submit' className='text-xl bg-green-500 w-5/6 text-center py-2 text-white font-bold rounded-md mb-5'>پرداخت</button>
            {/* </Link> */}
            <Link to={`/SignUp`} className='text-blue-500 mb-5'>حساب کاربری ندارید؟ ثبت نام کنید!</Link>
          </form>
        </div>
        <Footer />

      </ThemeProvider>
    </div>
  )
}
