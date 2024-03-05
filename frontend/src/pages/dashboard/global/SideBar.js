import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import { Box } from '@mui/material';

import {
  userLogoutAction,
  userProfileAction
} from '../../../redux/actions/userAction';

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userProfileAction());
    //eslint-disable-next-line
  }, []);

  //log out
  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <Sidebar backgroundColor="white" style={{ borderRightStyle: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
        <Box sx={{ pt: 4 }}>
          <Menu
            menuItemStyles={{
              button: {
                [`&.${menuClasses.button}`]: {
                  color: '#000'
                },
                [`&.${menuClasses.disabled}`]: {
                  color: 'green'
                },
                '&:hover': {
                  backgroundColor: '#fafafa',
                  color: '#1976d2'
                }
              },
              icon: {
                [`&.${menuClasses.icon}`]: {
                  color: '#1976d2'
                }
              }
            }}>
            <MenuItem
              component={<Link to="/dashboard" />}
              icon={<DashboardIcon />}>
              Dashboard
            </MenuItem>
          </Menu>
        </Box>
        <Box>
          <Menu
            menuItemStyles={{
              button: {
                [`&.${menuClasses.button}`]: {
                  color: '#000'
                },
                '&:hover': {
                  backgroundColor: '#fafafa',
                  color: '#1976d2'
                }
              },
              icon: {
                [`&.${menuClasses.icon}`]: {
                  color: '#1976d2'
                }
              }
            }}>
            <MenuItem onClick={logOut} icon={<LoginIcon />}>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
