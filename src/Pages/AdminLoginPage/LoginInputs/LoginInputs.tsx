import { useTheme } from '@emotion/react'
import { TextField, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'

export const LoginInputs = () => {
  const textFieldStyles = {
    height: '70px',
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
    shadows: ['none', '2px 2px 2px 2px #000']
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        
      <TextField variant="outlined" label="User Name" type="text"     fullWidth style={textFieldStyles}/>
      <TextField variant="outlined" label="Password"  type="Password" fullWidth style={textFieldStyles}/>
      </ThemeProvider>
    </div>
  )
}
