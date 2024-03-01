import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useProSidebar } from 'react-pro-sidebar';

const Header = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <Box sx={{ flexGrow: 1, px: 3 }}>
      <IconButton
        onClick={() => collapseSidebar()}
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, color: '#1976d2' }}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
