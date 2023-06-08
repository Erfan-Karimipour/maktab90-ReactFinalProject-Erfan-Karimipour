import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { StyledButton } from '@nextui-org/react';
import { blue } from '@mui/material/colors';

export function QuantityTab() {

  const theme = createTheme({
    palette: {
      primary: blue
    }
  })

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
      .get(`http://localhost:8000/api/products?page=${paginationModel.page+1}`)
      .then((res) => {
        console.log(res);
        const products = res.data.data.products;
        const total = res.data.total;
        console.log(total);
        
        setRows(products);
        setRowCount(total);
        setLoading(false);
      });
  }, [paginationModel.page, paginationModel.pageSize]);

  const categories = {
    '64758e62ef56602d5ba216fd': 'کامپیوتر و مانیتور',
    '64758f43ef56602d5ba2170f': 'کنسول و واقعیت مجازی',
    '64758fffef56602d5ba21723' : 'قطعات کامپیوتر',
    '6475909cef56602d5ba21739' : 'لپ تاپ و تجهیزات جانبی'
  }

  return (
    
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={[
          { field: 'name', headerName: 'نام کالا', flex: 2},
          { field: 'price', headerName: 'قیمت', flex: 1, editable: true},
          { field: 'quantity', headerName: 'موجودی', flex: 1, editable: true },
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
    <button className='m-2 p-2 bg-red-600 text-white rounded-md font-bold flex'>
      <ion-icon name="save-outline" class="text-xl font-bold ml-2"></ion-icon>
      <p>
        ذخیره
      </p>
    </button>
    </div>
  );
}