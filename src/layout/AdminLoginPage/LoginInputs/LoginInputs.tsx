import { TextField } from '@mui/material'
import React from 'react'

export const LoginInputs = () => {
  const textFieldStyles = {
    height: '70px',
  }
  return (
    <div>
      <TextField variant="outlined" label="User Name" type="text"     fullWidth style={textFieldStyles}/>
      <TextField variant="outlined" label="Password"  type="Password" fullWidth style={textFieldStyles}/>
    </div>
  )
}
