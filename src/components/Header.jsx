import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Autocomplete, 
  Box, 
  Typography, 
  TextField, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';

import { 
  Search, 
  Home,
  Group, 
  Work, 
  TextsmsRounded, 
  NotificationsRounded, 
  AccountCircleRounded, 
  Apps, 
  WorkspacePremium 
} from '@mui/icons-material';

import ProfileMenu from './common/ProfileMenu';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../api/FireStoreAPI';

function Header({ currentUser }) {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [options, setOptions] = useState(false);
  const handleShowOptions = () => {
    setOptions((prevOptions) => !prevOptions);
  };
  useEffect(() => {
    getAllUsers(setUsers);
  })
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    navigate(`/${iconName}`);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value) {
      const searched = users.filter((user) =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredUsers(searched)
    } else {
      setFilteredUsers([]);
    }
  };

  const handleSearchClick = () => {
    setShowSearchBar(true);
  };

  const handleAutocompleteBlur = () => {
    setShowSearchBar(false);
  };

  const iconStyle = {
    color: 'grey',
    cursor: 'pointer',
    '&:hover': {
      color: 'black',
    },
  };

  const selectedStyle = {
    color: 'black',
    paddingY: '4px',
    paddingX: '11px',
    borderBottom: '2px solid black',
    transition: 'all 0.3s ease',
  };

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            // padding: '14px',
            // borderRadius: '12px',
          },
        },
      },
    },
  });

  const navItems = [
    { icon: <Search />, label: 'Search', name: 'search', onClick: handleSearchClick },
    { icon: <Home />, label: 'Home', name: 'home' },
    { icon: <Group />, label: 'Network', name: 'network' },
    { icon: <Work />, label: 'Jobs', name: 'jobs' },
    { icon: <TextsmsRounded />, label: 'Messaging', name: 'messaging' },
    { icon: <NotificationsRounded />, label: 'Notifications', name: 'notifications' },
    { icon: <AccountCircleRounded />, label: 'Profile', name: 'profile', onClick: handleShowOptions },
    { icon: <Apps />, label: 'For Business', name: 'apps' },
    { icon: <WorkspacePremium />, label: 'Try Premium', name: 'premium' },
  ];

  const renderOption = (props, option) => (
    <Box {...props} display="flex" alignItems="center">
      <img
        src={option.imageLink || 'default-image-url.jpg'}
        alt={option.name}
        style={{
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          objectFit: 'cover',
          marginRight: '10px',
        }}
      />
      <Typography>{option.name}</Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar elevation={0} sx={{ width: '100%', height: '52px', backgroundColor: 'white', color: 'black', display: 'flex', alignItems: 'center', px: '15px' }}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', maxWidth: '1128px' }}>
          <Box sx={{ display: 'flex', flexGrow: 1, minWidth: '30px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn Logo" width="35px" />

            <Autocomplete
              freeSolo
              disableClearable
              size="small"
              options={filteredUsers}
              getOptionLabel={(option) => option.name}
              onInputChange={(event) => handleSearchChange(event)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search />,
                    sx: {
                      display: 'flex',
                      justifyContent: 'flex-start',
                      background: '#edf3f8',
                      color: 'black',
                      maxWidth: '300px',
                      height: '35px',
                      pl: 3,
                      borderRadius: '4px',
                      border: 'none',
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                />
              )}
              renderOption={(props, option) => (
                <Box {...props} display="flex" alignItems="center">
                  <img
                    src={option.imageLink || "default-image-url.jpg"}
                    alt={option.name}
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <Typography>{option.name}</Typography>
                </Box>
              )}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                maxWidth: '300px',
                background: '#edf3f8',
                ml: 1,
                height: '35px',
                borderRadius: '4px',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', maxWidth: '750px', width: '100%' }}>
            {showSearchBar ? (
              <Autocomplete
                freeSolo
                disableClearable
                size="small"
                options={filteredUsers}
                getOptionLabel={(option) => option.name}
                onInputChange={(event) => handleSearchChange(event)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    onBlur={handleAutocompleteBlur}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        background: '#edf3f8',
                        color: 'black',
                        maxWidth: '100%',
                        height: '35px',
                        pl: 3,
                        borderRadius: '4px',
                        border: 'none',
                      },
                    }}
                    sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box {...props} display="flex" alignItems="center">
                    <img
                      src={option.imageLink || "default-image-url.jpg"}
                      alt={option.name}
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <Typography>{option.name}</Typography>
                  </Box>
                )}
                sx={{
                  display: { xs: 'flex', md: 'flex' },
                  flexGrow: 1,
                  background: '#edf3f8',
                  ml: 1,
                  height: '35px',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                {navItems.map(({ icon, label, name, onClick }) => (
                  <Box
                    key={name}
                    onClick={onClick || (() => handleIconClick(name))}
                    display="flex"
                    position="relative"
                    flexDirection="column"
                    alignItems="center"
                    paddingY="4px"
                    paddingX="11px"
                    sx={selectedIcon === name ? selectedStyle : iconStyle}
                  >
                    {icon}
                    <Typography variant="caption" sx={{ display: { xs: 'none', md: 'flex' } }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {options ? <ProfileMenu currentUser={currentUser} /> : null}
          </Box>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
