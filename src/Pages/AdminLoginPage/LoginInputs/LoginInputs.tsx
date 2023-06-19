import { useTheme } from '@emotion/react'
import { TextField, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import { useData } from '../../../Context/Context'

export const LoginInputs = () => {
  
  let {adminLoginError} = useData();

  const textFieldStyles = {
    height: '80px',
    color: '#fafafa',
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff0000",
      },
      background: {
        paper: '#790079f',
        default: '#790079f'
      }
    },
    shape: {
      borderRadius: 8
    },
    shadows: ['none', '2px 2px 2px 2px #000'],

  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TextField variant="outlined" label="User Name" type="text"     fullWidth style={textFieldStyles} error={adminLoginError.userName} helperText={adminLoginError.userName == true ? 'لطفا نام کاربری صحیحی وارد کنید' : ''}/>
        <TextField variant="outlined" label="Password"  type="Password" fullWidth style={textFieldStyles} error={adminLoginError.password} helperText={adminLoginError.password == true ? 'لطفا کلمه عبور صحیحی وارد کنید'  : ''}/>
      </ThemeProvider>
    </div>
  )
}
