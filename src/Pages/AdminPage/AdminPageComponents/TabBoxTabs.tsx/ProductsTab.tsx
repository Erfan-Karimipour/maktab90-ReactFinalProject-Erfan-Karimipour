import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

export function ProductsTab() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);

  const columns: GridColDef[] = [
    { 
      field: 'image',
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
    {
      field: 'name',
      headerName: 'نام کالا',
      width: 700,
      editable: false,
      sortable: false
    },
    {
      field: 'category',
      headerName: 'دسته بندی',
      width: 500,
      editable: false,
      sortable: false
    },
    {
      field: 'edit-delete',
      headerName: 'ویرایش/حذف',
      width: 110,
      editable: false,
      sortable: false
    },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products?page=${page}`).then((res) => {
      console.log(res);
      const newRows = res.data.data.products.map((item) => ({
        image: item.thumbnail,
        name: item.name,
        category: item.category,
        id: item._id,
      }));
      setRows(newRows);
    });
  }, [page]);

  return (
    <div className='flex m-auto'>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableColumnMenu
          disableRowSelectionOnClick
          showCellVerticalBorder
          
        />
      </Box>
    </div>
  );
}