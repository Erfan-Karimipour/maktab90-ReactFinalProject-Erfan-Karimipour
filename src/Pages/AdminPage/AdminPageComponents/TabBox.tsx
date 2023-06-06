import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import { blue, purple, red } from '@mui/material/colors';
import React, { useState } from 'react'

export const TabBox = () => {
  let [value, setValue] = useState(0);

  const theme = createTheme({
    palette:{
      primary: red,
    },
  })

  return (
    <div className='px-24'>
      <ThemeProvider theme={theme}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} centered onChange={(event, newValue) => setValue(newValue)}>

            <Tab label="first" />
            <Tab label="second"/>
            <Tab label="third" />
            
          </Tabs>
        </Box>
        
        {value == 0 && <p>1</p> }
        {value == 1 && <p>2</p> }
        {value == 2 && <p>3</p> }
      </ThemeProvider>
    </div>
  )
}
