import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { StyledButton } from '@nextui-org/react';
import { blue } from '@mui/material/colors';

export function ProductsTab() {

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
          { 
            field: 'thumbnail',
            headerName: 'تصویر', 
            width: 100,
            renderCell: (params) => (
              <img
              src={`http://localhost:8000/images/products/thumbnails/${params.value}`}
              alt={params.value}
              style={{ width: '100%' }}
              />
              ),
            },
          { field: 'name', headerName: 'نام کالا', flex: 2 },
          {
            field: 'category',
            headerName: 'دسته بندی',
            flex: 1,
            renderCell: (params) => (
              <p>{categories[params.value]}</p>
              )
            },
            { 
              field: 'delete-edit',
              headerName: 'عملیات',
              flex: 1,
              renderCell: () => (
                <div>
                <Button>حذف</Button>
                <ThemeProvider theme={theme}>
                  <Button>ویرایش</Button>
                </ThemeProvider>
              </div>
            )
          },
        ]}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        pagination={true}
        loading={loading}
        pageSizeOptions={[10]}
        onPaginationModelChange={setPaginationModel}
        />
    <button className='m-2 p-2 bg-red-600 text-white rounded-md font-bold flex'>
      <ion-icon name="add-circle-outline" class="text-2xl font-bold ml-2"></ion-icon>
      <p>
        افزودن کالا
      </p>
    </button>
    </div>
  );
}