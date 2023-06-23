import  React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { StyledButton } from '@nextui-org/react';
import { blue } from '@mui/material/colors';
import { RadioInputs } from './OrdersTabComponents/RadioInputs';

export function OrdersTab() {

  let [showCompleted, setShowCompleted] = useState('all')
  
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });


  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  
  const getRowId = (row) => row._id;
  
  React.useEffect(() => {
    let filter = '';
    setLoading(true);

    if (showCompleted == 'all'){
      filter = `http://localhost:8000/api/orders?page=${paginationModel.page+1}`;
    } else {
      filter = `http://localhost:8000/api/orders?page=${paginationModel.page+1}&deliveryStatus=${showCompleted}`
    }

    axios
      .get(filter)
      .then((res) => {
        const products = res.data.data.orders;
        const total = res.data.total;
        console.log(res.data);
        
        setRows(products);
        setRowCount(total);
        setLoading(false);
      });
  }, [paginationModel.page, paginationModel.pageSize, showCompleted]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000'
      },
      secondary: {
        main: '#0044ff'
      }
    },
    direction: "rtl"
  })
  
  return (

    
    <div style={{ height: '100%', width: '100%' }}>
      <ThemeProvider theme={theme}>

      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={[
          
          { field: 'user', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>خریدار</p>, flex: 2, 
          renderCell: (params) => (
            <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
            ),},
            
            { field: 'totalPrice', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>مجموع مبلغ</p>, flex: 1, 
            renderCell: (params) => (
              <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
              ),},
              
              { field: 'deliveryDate', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>زمان تحویل</p>, flex: 1, 
              renderCell: (params) => (
                <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
                ),},
              ]}
              rowCount={rowCount}
              paginationMode="server"
              paginationModel={paginationModel}
              pagination={true}
              loading={loading}
              pageSizeOptions={[10]}
              onPaginationModelChange={setPaginationModel}
              editMode='cell'
              rowSelection={false}
              disableColumnMenu
              />
      <RadioInputs showCompleted={setShowCompleted}/>
              </ThemeProvider>
    </div>
  );
}