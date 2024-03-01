import { Box } from '@mui/material';
import React from 'react';
import Header from './Header';
import SideBar from './SideBar';

const Layout =
  Component =>
  ({ ...props }) => {
    return (
      <div style={{ display: 'flex', minHeight: '93vh' }}>
        <SideBar />
        <Box sx={{ width: '100%', bgcolor: '#fafafa' }}>
          <Header />
          <Box sx={{ p: 3 }}>
            <Component {...props} />
          </Box>
        </Box>
      </div>
    );
  };

export default Layout;
