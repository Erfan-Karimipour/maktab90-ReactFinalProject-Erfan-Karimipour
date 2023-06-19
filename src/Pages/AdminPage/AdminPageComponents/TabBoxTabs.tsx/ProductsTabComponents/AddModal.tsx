import { Input, TextField, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import { useData } from '../../../../../Context/Context'

export const AddModal = (e) => {

  let {modal, setModal} = useData();

  const theme = createTheme({
    palette: {
        primary: {
            main: '#eb0000'
        }
    },
  })
  

  return (
    <div className={modal == false ? 'hidden' : 'bg-black bg-opacity-50 absolute top-0 right-0 w-screen h-screen z-10 flex'}>
        <form className='flex self-center m-auto bg-white flex-col p-2 rounded-xl w-1/3'>
            <div className='flex text-xl items-center justify-between'>
                <p>افزودن/ویرایش کالا</p>
                <button onClick={() => setModal(false)}>
                  <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
            <ThemeProvider theme={theme}>
                <TextField type='text' variant="outlined" label="نام کالا"/>
            </ThemeProvider>
        </form>
    </div>
  )
}
