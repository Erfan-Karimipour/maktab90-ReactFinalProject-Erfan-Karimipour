import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Button, IconButton, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import { HandleDelete } from '../../../../modules/HandleDelete';
import { useData } from '../../../../Context/Context';
import { AddOrEditModal } from './ProductsTabComponents/AddOrEditModal';

export function ProductsTab() {

  let {updateList, setUpdateList, setModal, open, setOpen, modal} = useData();
  
  const [rows       , setRows       ] = useState([]);
  const [rowCount   , setRowCount   ] = useState(0);
  const [loading    , setLoading    ] = useState(true);
  let   [deleteModal, setDeleteModal] = useState('');

  const categories = {
    '64758e62ef56602d5ba216fd': 'کامپیوتر و مانیتور',
    '64758f43ef56602d5ba2170f': 'کنسول و واقعیت مجازی',
    '64758fffef56602d5ba21723' : 'قطعات کامپیوتر',
    '6475909cef56602d5ba21739' : 'لپ تاپ و تجهیزات جانبی'
  }

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const getRowId = (row) => row._id;

  useEffect(() => {
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

  let [editableData, setEditableData] = useState({});

  let [openDeleteSnack, setOpenDeleteSnack] = useState(false);

  return (
    <ThemeProvider theme={theme}>

    <div className={deleteModal ? 'absolute top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-40 duration-100' : 'opacity-0 pointer-events-none duration-200'}>

      <div className={deleteModal ? 'absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] duration-100 bg-white w-1/5 flex flex-col items-center py-10 rounded-md' : 'hidden'}>

        <p className='mb-5 text-xl'>آیا از حذف اطمینان دارید؟</p>

        <div className='text-lg flex gap-14'>

          <button className='bg-red-500 px-7 py-2 text-white rounded-md' onClick={() => {
            HandleDelete(deleteModal); 
            setUpdateList(updateList + 1);
            axios.get(`http://localhost:8000/api/products?page=${paginationModel.page+1}`).then((res) => {
              setRows(res.data.data.products);
              setUpdateList(!updateList);
            })
            setDeleteModal(``);
            setOpenDeleteSnack(true);
          }}>حذف</button>

          <button className='bg-blue-500 px-7 py-2 text-white rounded-md' onClick={() => {
            setDeleteModal(``);
          }}>انصراف</button>

        </div>
      </div>
    </div>

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
                field: '_id',
                headerName: <p className='text-xl' style={{ fontFamily: 'vazir' }}>عملیات</p>,
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                  
                  <div>
                  <Button style={{ fontFamily: 'vazir' }} id={params.value} onClick={(e) => {
                    setDeleteModal(e.target.id)
                  }}>
                    حذف
                    <ion-icon name="trash-outline" class="mr-2 text-lg"></ion-icon>
                  </Button>

                  <Button style={{ fontFamily: 'vazir' }} color='secondary' onClick={() => {setModal(true), setEditableData(params.row)}}>
                    ویرایش
                    <ion-icon name="pencil-outline" class="mr-2 text-lg"></ion-icon>
                  </Button>

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
      <button className='m-2 p-2 bg-red-600 text-white rounded-md font-bold flex' onClick={() => {setModal(true), setEditableData({})}}>
        <ion-icon name="add-circle-outline" class="text-2xl font-bold ml-2"></ion-icon>
        <p>
          افزودن کالا
        </p>
      </button>
      {modal && <AddOrEditModal editableData={editableData}/>}
      
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
      <Snackbar
        open={openDeleteSnack}
        autoHideDuration={4000}
        onClose={() => {setOpenDeleteSnack(false)}}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Alert severity='success' elevation={6} variant='filled'>
          <p className='text-lg mr-2'>
            محصول با موفقیت حذف شد
          </p>
        </Alert>
      </Snackbar>
    </div>
    </ThemeProvider>
  );
}