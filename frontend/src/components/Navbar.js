import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Avatar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import HouseIcon from '@mui/icons-material/House';

import { userLogoutAction } from '../redux/actions/userAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.user);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <AppBar position="static">
      <Box sx={{ px: 4 }}>
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textDecoration: 'none'
            }}>
            <HouseIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
            <Typography variant="h6">BLOG</Typography>
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
            {!userInfo ? (
              <>
                <Typography
                  sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}>
                  <Link
                    to="/login"
                    style={{ color: 'white', textDecoration: 'none' }}>
                    Login
                  </Link>
                </Typography>
                <Typography
                  sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}>
                  <Link
                    to="/register"
                    style={{ color: 'white', textDecoration: 'none' }}>
                    Register
                  </Link>
                </Typography>
              </>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: 'none' }}
                        to="/admin/dashboard">
                        Dashboard
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={logOutUser}>
                    <Typography textAlign="center" color="#8e67b2">
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Navbar;
