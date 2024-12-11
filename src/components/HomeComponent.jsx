import React, { useEffect } from 'react';
import PostUpdate from './common/PostUpdate';
import { Box, Grid } from '@mui/material/';
import UserTab from './common/UserTab.jsx';
// import { toast } from 'react-toastify';

export default function HomeComponent({ currentUser }) {
  //   useEffect(() => {
  //   const updateNetworkStatus = () => {
  //     if (navigator.onLine) {
  //       toast.success("You are online");
  //     } else {
  //       toast.error("You are offline");
  //     }
  //   };

  //   // Initial check
  //   updateNetworkStatus();

  //   // Add event listeners to monitor network status
  //   window.addEventListener('online', updateNetworkStatus);
  //   window.addEventListener('offline', updateNetworkStatus);

  //   // Cleanup the event listeners on component unmount
  //   return () => {
  //     window.removeEventListener('online', updateNetworkStatus);
  //     window.removeEventListener('offline', updateNetworkStatus);
  //   };
  // }, []);
  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', sm: '90%', md: '93%', lg: '90%', },
          marginX: { xs: '0px', sm: 'auto', md: 'auto', lg: 'auto' },
          maxWidth: { sm: '640px', md: '1050px', lg: '1260px' },
          backgroundColor: '#f4f2ee',
          display: 'flex',
          justifyContent: { lg: 'center' }
        }}
      >
        <Grid container columnGap={4} >
          <Grid item
            xs={12}
            sm={11.8}
            md={2.8}
            lg={2.3}
          >
            <UserTab currentUser={currentUser} />
          </Grid>

          <Grid item
            xs={12}
            sm={11.8}
            md={4.5}
            lg={5.7}
          >
            <PostUpdate currentUser={currentUser} />
          </Grid>

          <Grid item
            xs={12}
            sm={11.8}
            md={3.7}
            lg={3.3}
          >
            <UserTab currentUser={currentUser} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

