import  React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { StyledButton } from '@nextui-org/react';
import { blue } from '@mui/material/colors';
import { RadioInputs } from './OrdersTabComponents/RadioInputs';

export function OrdersTab() {

  let [showCompleted, setShowCompleted] = useState(true)

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [rows, setRows] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const getRowId = (row) => row._id;

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/orders?page=${paginationModel.page+1}&deliveryStatus=${showCompleted}`)
      .then((res) => {
        const products = res.data.data.orders;
        const total = res.data.total;
        console.log(res.data);
        
        setRows(products);
        setRowCount(total);
        setLoading(false);
      });
  }, [paginationModel.page, paginationModel.pageSize, showCompleted]);
  
  return (

    
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={[
          { field: 'user', headerName: <p className='text-xl'>خریدار</p>, flex: 2},
          { field: 'totalPrice', headerName: <p className='text-xl'>مجموع مبلغ</p>, flex: 1},
          { field: 'deliveryDate', headerName: <p className='text-xl'>زمان تحویل</p>, flex: 1},
        ]}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        pagination={true}
        loading={loading}
        pageSizeOptions={[10]}
        onPaginationModelChange={setPaginationModel}
        editMode='cell'
      />
      <RadioInputs showCompleted={setShowCompleted}/>
    </div>
  );
}