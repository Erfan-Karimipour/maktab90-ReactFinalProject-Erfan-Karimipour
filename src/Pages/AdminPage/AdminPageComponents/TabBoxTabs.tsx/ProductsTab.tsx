import React from 'react';
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
        const products = res.data.data.products;
        const total = res.data.total;
        
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
            headerName: <p className='text-xl font-[vazir] mr-3'>تصویر</p>, 
            width: 100,
            filterable: false,
            sortable: false,
            renderCell: (params) => (
              <img
              src={`http://localhost:8000/images/products/thumbnails/${params.value}`}
              alt={params.value}
              style={{ height: '100%', margin: 'auto' }}
              />
              ),
            },
          { field: 'name', headerName: <p className='text-xl' style={{ fontFamily: 'vazir' }}>نام کالا</p>, flex: 2,
          renderCell: (params) => (
            <p style={{ fontFamily: 'vazir' }}>{params.value}</p>
          ),
        },
          {
            field: 'category',
            headerName: <p className='text-xl' style={{ fontFamily: 'vazir' }}>دسته بندی</p>,
            flex: 1,
            renderCell: (params) => (
              <p style={{ fontFamily: 'vazir' }}>{categories[params.value]}</p>
              )
            },
            { 
              field: 'delete-edit',
              headerName: <p className='text-xl' style={{ fontFamily: 'vazir' }}>عملیات</p>,
              flex: 1,
              sortable: false,
              filterable: false,
              renderCell: () => (
                
                <div>
                  <Button style={{ fontFamily: 'vazir' }}>
                    حذف
                    <ion-icon name="trash-outline" class="mr-2 text-lg"></ion-icon>
                  </Button>
                  <ThemeProvider theme={theme}>
                    <Button style={{ fontFamily: 'vazir' }}>
                      ویرایش
                      <ion-icon name="pencil-outline" class="mr-2 text-lg"></ion-icon>
                      </Button>
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
        rowSelection={false}
        disableColumnMenu
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