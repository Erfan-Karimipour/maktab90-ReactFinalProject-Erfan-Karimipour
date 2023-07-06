import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Button, IconButton, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import { StyledButton } from '@nextui-org/react';
import { blue } from '@mui/material/colors';
import { HandleEditRows } from '../../../../modules/handleEditRows';
import { useData } from '../../../../Context/Context';
import { formatNumber } from '../../../../modules/formatNumber';

export function QuantityTab() {

  let {updateList, setUpdateList, open, setOpen} = useData();
  let EditingField = ``;
  let Edits        = [];

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
  }, [paginationModel.page, paginationModel.pageSize, updateList]);

  const categories = {
    '64758e62ef56602d5ba216fd': 'کامپیوتر و مانیتور',
    '64758f43ef56602d5ba2170f': 'کنسول و واقعیت مجازی',
    '64758fffef56602d5ba21723' : 'قطعات کامپیوتر',
    '6475909cef56602d5ba21739' : 'لپ تاپ و تجهیزات جانبی'
  }

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

  const handleEdit = (celldata) => {
    const {id, field, value} = celldata;
  }
  
  return (
    <ThemeProvider theme={theme}>

    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        onCellEditStop={handleEdit}
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
            { field: 'name', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>نام کالا</p>, flex: 2, 
            renderCell: (params) => (
              <p style={{ fontFamily: 'vazir' }}>{params.value}</p>
              ),},
              
              { field: 'price', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>قیمت</p>, flex: 1, editable: true, 
              renderCell: (params) => (
                <p style={{ fontFamily: 'vazir' }}>{formatNumber(params.value)}</p>
                ),},
                
                { field: 'quantity', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>موجودی</p>, flex: 1, editable: true,
                renderCell: (params) => (
                  <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
                  ),},
                ]}
                onCellEditStart={(e) => {
                  EditingField = e.field
                }}
                processRowUpdate={(e) => {
                  let newEdit = {};
                  if (EditingField == 'price'){
                    newEdit = {
                      _id         : e._id,
                      price       : e.price
                    }
                  } else {
                    newEdit = {
                      _id         : e._id,
                      quantity    : e.quantity
                    }
                  }
                  Edits.push(newEdit);
                }}
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
    <button className='m-2 p-2 bg-red-600 text-white rounded-md font-bold flex' onClick={() => {HandleEditRows(Edits); if(Edits.length > 0) {setUpdateList(!updateList); setOpen(true)}}} >
      <ion-icon name="save-outline" class="text-xl font-bold ml-2"></ion-icon>
      <p>
        ذخیره
      </p>
    </button>
    </div>
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => {setOpen(false)}}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
      <Alert severity='success' elevation={6} variant='filled'>
        <p className='text-lg mr-2'>
          دیتابیس با موفقیت آپدیت شد
        </p>
      </Alert>
    </Snackbar>
    
    </ThemeProvider>
  );
}