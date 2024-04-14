'use client';
import { AuthContext } from '@/context/auth';
import { apiUrl } from '@/utils/constants';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HouseIcon from '@mui/icons-material/House';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  alpha,
  styled
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    display: 'block'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: grey[50],
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    user,
    authContext: { logout }
  } = useContext(AuthContext);
  const router = useRouter();
  console.log({ user });

  const handleOpenUserMenu = (event) => {
    if (!user) {
      router.push('/login');
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' color='tripfare'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Button
            href='/'
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 3,
              color: grey[50]
            }}
          >
            <HouseIcon />
          </Button>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: grey[50],
              textDecoration: 'none'
            }}
          >
            TripFare
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
            >
              <MenuIcon sx={{ color: grey[50] }} />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: grey[50],
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            TripFare
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
              alignItems: 'center'
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: grey[50] }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <BorderColorIcon
              fontSize='medium'
              sx={{
                display: { xs: 'none', md: 'flex' },
                mx: 3,
                color: grey[50]
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user ? 'Open settings' : 'Login'}>
              <IconButton
                onClick={handleOpenUserMenu}
                aria-controls='menu-appbar'
                aria-haspopup='true'
              >
                {user?.profile_picture ? (
                  <Avatar
                    sx={{ width: 36, height: 36 }}
                    alt={`${user.first_name} ${user.last_name}`}
                    src={`${apiUrl}/${user.profile_picture.path}`}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: grey[50], width: 24, height: 24 }}>
                    <PersonIcon fontSize='small' color='tripfare' />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => router.push('/profile')}>
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
