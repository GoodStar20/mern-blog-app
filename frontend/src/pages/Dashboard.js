import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import BlogModal from './dashboard/BlogModal';
import { getBlogsAction, deleteBlogAction } from '../redux/actions/blogAction';

const Dashboard = () => {
  const columns = [
    {
      field: '_id',
      headerName: 'Blog ID',
      flex: 1,
      editable: true
    },
    {
      field: 'title',
      headerName: 'Blog title',
      width: 150
    },

    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: params => (
        <img width="40%" src={params.row.image?.url} alt="field" />
      )
    },
    {
      field: 'likes',
      headerName: 'Likes',
      flex: 1,
      renderCell: params => params.row.likes.length
    },
    {
      field: 'comments',
      headerName: 'Comments',
      flex: 1,
      renderCell: params => params.row.comments.length
    },
    {
      field: 'postedBy',
      headerName: 'Posted by',
      flex: 1,
      valueGetter: data => data.row.postedBy.name
    },
    {
      field: 'createdAt',
      headerName: 'Create At',
      flex: 1,
      renderCell: params =>
        moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
    },
    {
      field: 'Actions',
      flex: 1,
      renderCell: value => (
        <Box
          sx={{
            display: 'flex'
          }}>
          <IconButton
            aria-label="edit"
            onClick={() => updateBlog(value.row._id)}>
            <EditIcon sx={{ color: '#1976d2' }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={e => deletePostById(e, value.row._id)}>
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        </Box>
      )
    }
  ];

  const dispatch = useDispatch();
  const { blogs } = useSelector(state => state.blog);

  const [isOpen, setIsOpen] = useState(false);
  const [blogId, setBlogId] = useState('');

  const createBlog = () => {
    setBlogId('');
    setIsOpen(true);
  };

  const updateBlog = id => {
    setBlogId(id);
    setIsOpen(true);
  };

  const deletePostById = async (e, id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deleteBlogAction(id));
    }
  };

  useEffect(() => {
    dispatch(getBlogsAction());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ color: 'black', pb: 3 }}>
        Blogs
      </Typography>
      <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={createBlog}>
          Create Blog
        </Button>
      </Box>
      <Paper sx={{ bgcolor: 'white' }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={row => row._id}
            sx={{
              '& .MuiTablePagination-displayedRows': {
                color: 'black'
              },
              color: 'black',
              [`& .${gridClasses.row}`]: {
                bgcolor: 'white'
              }
            }}
            rows={blogs}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
          />
        </Box>
      </Paper>
      <BlogModal setIsOpen={setIsOpen} isOpen={isOpen} blogId={blogId} />
    </>
  );
};

export default Dashboard;
