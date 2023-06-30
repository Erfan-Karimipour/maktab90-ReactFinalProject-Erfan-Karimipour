import  React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { StyledButton } from '@nextui-org/react';
import { blue } from '@mui/material/colors';
import { RadioInputs } from './OrdersTabComponents/RadioInputs';
import { useData } from '../../../../Context/Context';

export function OrdersTab() {

  let {updateList, setUpdateList} = useData();

  let [showCompleted, setShowCompleted] = useState('all');

  let [modal, setModal] = useState(``);
  
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
        
        setRows(products);
        setRowCount(total);
        setLoading(false);
      });
  }, [paginationModel.page, paginationModel.pageSize, showCompleted, updateList, setUpdateList]);

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

  const today = new Date();

  let [namesAndPrices, setNamesAndPrices] = useState([])
  
  function nameAndPriceGetter(prod) {
    setNamesAndPrices([])
    prod.products.map((product) => {
      axios.get(`http://localhost:8000/api/products/${product.product}`).then((res) => {

        let newData = {
          name  : res.data.data.product.name,
          price : res.data.data.product.price,
        }
        setNamesAndPrices([...namesAndPrices, newData]);

        // product = {...product, name: res.data.data.product.name, price: res.data.data.product.price}

        // console.log(namesAndPrices);
        
        // setNamesAndPrices(namesAndPrices.push(newData));     

        
      }).catch((err) => {
        console.log(err);
      })
    })
    
  }
  


  return (

    
    <div style={{ height: '100%', width: '100%' }}>
      <ThemeProvider theme={theme}>

      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={[
      
          { field: `user`, headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>خریدار</p>, flex: 2, valueGetter: (params) => params.row.user.username,
            renderCell: (params) => (
              <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
          ),},
            
          { field: 'totalPrice', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>مجموع مبلغ</p>, flex: 1, 
            renderCell: (params) => (
            <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
          ),},
            
          { field: 'deliveryDate', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>زمان ثبت سفارش</p>, flex: 1, 
            renderCell: (params) => (
            <p style={{ fontFamily: 'vazir' }} className='mr-5'>{params.value}</p>
          ),},

          { field: 'id', headerName: <p className='text-xl' style={{fontFamily: 'vazir'}}>اطلاعات بیشتر</p>, flex: 1, 
            renderCell: (params) => (
            <button className='mr-10 text-3xl bg-blue-500 rounded-full flex text-white' onClick={() => {
              nameAndPriceGetter(params.row);
              setModal(params.row);
            }}>
              <ion-icon name="alert-circle-outline"></ion-icon>
            </button>
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

      {modal &&
      <div className='top-0 bottom-0 left-0 right-0 absolute flex z-10 bg-black bg-opacity-25'>
        <div className='bg-white w-1/3 flex h-fit m-auto self-center flex-col rounded-md p-5'>
          <button className='text-white bg-red-500 rounded-full flex w-fit text-2xl' onClick={() => {setModal(``); }}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
          <p className='w-full text-center text-3xl pb-3 border-b'>اطلاعات</p>

          <div className='flex justify-between mx-3 border-b'>
            <p>نام مشتری </p>
            <p>{modal.user.username}</p>
          </div>

          <div className='flex justify-between mx-3 border-b'>
            <p> آدرس </p>
            <p>{modal.user.address}</p>
          </div>

          <div className='flex justify-between mx-3 border-b'>
            <p> شماره تلفن </p>
            <p>{modal.user.phoneNumber}</p>
          </div>

          <div className='flex justify-between mx-3 border-b'>
            <p> زمان تحویل </p>
            <p>{modal.deliveryDate}</p>
          </div>

          <div className='flex justify-between mx-3 border-b'>
            <p> زمان سفارش </p>
            <p>{modal.createdAt}</p>
          </div>
          
          <div className='w-full h-96 overflow-y-scroll px-3 mt-4'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <td className='w-2/3 border'>کالا</td>
                  <td className='w-1/6 border'>قیمت</td>
                  <td className='w-1/6 border'>تعداد</td>
                </tr>
              </thead>
                {
                  modal.products.map((product, index) => {

                    if(namesAndPrices.length >= 1){

                      console.log(product);
                      
                      return(
                        <tr className='border-b'>
                        <td className='w-2/3 border'>{namesAndPrices[index].name}</td>
                        <td className='w-1/6 border'>{namesAndPrices[index].price}</td>
                        <td className='w-1/6 border'>{product.count}</td>
                      </tr>
                    )
                    
                  }
                    
                  })
                }
            </table>
          </div>
            {
              modal.deliveryStatus == false ? <button className='text-center bg-green-500 rounded-md w-full text-white py-2' onClick={() => {
                axios.patch(`http://localhost:8000/api/orders/${modal._id}`, {
                  deliveryStatus: true,
                  deliveryDate  : today
                });
                setUpdateList(!updateList);
                setModal(``);
              }}>تحویل شد</button> :
              <p className='text-center'>تحویل شده در {modal.deliveryDate}</p>
            }
        </div>
      </div>
      }

    </div>
  );
}