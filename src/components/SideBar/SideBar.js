import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import avatar from '../../assets/images/avatar.png';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMoveToAccounts = () => {
    setAnchorElUser(null);
    navigate('/dashboard');
  };
  const handleMoveToTemplates = () => {
    setAnchorElUser(null);
    navigate('/template');
  };
  const handleMoveToRecords = () => {
    setAnchorElUser(null);
    navigate('/record');
  };
  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(45deg, rgb(255 84 114) 30%, rgb(255 214 148) 90%)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem key="accounts" onClick={handleMoveToAccounts}>
                <Typography sx={{ textAlign: 'center' }}>Accounts</Typography>
              </MenuItem>
              <MenuItem key="templates" onClick={handleMoveToTemplates}>
                <Typography sx={{ textAlign: 'center' }}>Templates</Typography>
              </MenuItem>
              <MenuItem key="records" onClick={handleMoveToRecords}>
                <Typography sx={{ textAlign: 'center' }}>Records</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Archivo',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Email WarmUp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="accounts"
                onClick={handleMoveToAccounts}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Accounts
              </Button>
              <Button
                key="templates"
                onClick={handleMoveToTemplates}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Templates
              </Button>
              <Button
                key="records"
                onClick={handleMoveToRecords}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Records
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Gregory Gibbons">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;