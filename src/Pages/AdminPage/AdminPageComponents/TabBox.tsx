import { Box, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import { blue, purple, red } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import { ProductsTab } from './TabBoxTabs.tsx/productsTab';
import { QuantityTab } from './TabBoxTabs.tsx/QuantityTab';
import { OrdersTab } from './TabBoxTabs.tsx/OrdersTab';
import { useData } from '../../../Context/Context';

export const TabBox = () => {
  let [value, setValue] = useState(0);
  let {updateList} = useData()

  const theme = createTheme({
    palette:{
      primary: red,
    },
  })

  useEffect(() => {
    console.log(`reRendered`);

  }, [updateList])
  
  return (
    <div className='px-24'>
      <ThemeProvider theme={theme}>
        <div className='shadow-lg border bg-gray-100'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} centered onChange={(event, newValue) => setValue(newValue)}>

            <Tab label="کالا ها"                style={{fontSize: 18, fontFamily: "vazir"}}/>
            <Tab label="موجودی و قیمت"        style={{fontSize: 18, fontFamily: "vazir"}}/>
            <Tab label="مدیریت سفارشات"       style={{fontSize: 18, fontFamily: "vazir"}}/>
            
          </Tabs>
        </Box>
        </div>
        <div className='bg-white border'>
          {value == 0 && <ProductsTab /> }
          {value == 1 && <QuantityTab /> }
          {value == 2 && <OrdersTab   /> }
        </div>
      </ThemeProvider>
    </div>
  )

}
