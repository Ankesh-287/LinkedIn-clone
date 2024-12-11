import React, { useMemo, useState } from 'react';
import { getSingleUser } from '../../api/FireStoreAPI';
import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function UserTab({ currentUser }) {
  let location = useLocation();
  const [currentProfile, setCurrentProfile] = useState({});
  
  useMemo(() => {
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, [location?.state?.email]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundColor: 'white',
          borderRadius: { xs: '1px', sm: '10px' },
          mb: '10px',
        }}
      >
        <Box>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center" position="relative">
              <Box
                component="img"
                src="https://sixweekstraining.com/wp-content/uploads/2017/05/Six-Weeks-Training-in-Web-Development-1.jpg"
                alt="current user"
                sx={{
                  width: '100%',
                  maxHeight: '56px',
                  borderRadius: {
                    xs: '1px',
                    sm: '8px 8px 1px 1px',
                  },
                }}
              />
              <Box
                component="img"
                src={
                  Object.values(currentProfile).length === 0
                    ? currentUser.imageLink
                    : currentProfile?.imageLink
                }
                alt="profile"
                sx={{
                  borderRadius: '50%',
                  border: '3px solid white',
                  width: '72px',
                  height: '72px',
                  position: 'absolute',
                  top: '20px',
                  objectFit:'contain',
                }}
              />
            </Grid>

            <Grid
            item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 7,
                borderBottom: '2px solid',
                borderColor: 'grey.200',
                pb: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: '700', textAlign: 'center' }}>
                {Object.values(currentProfile).length === 0
                  ? currentUser.name
                  : currentProfile?.name}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: 'grey.500', fontSize: '12px', textAlign: 'center' }}
              >
                {Object.values(currentProfile).length === 0
                  ? currentUser.headline
                  : currentProfile?.headline}
              </Typography>
            </Grid>

            <Grid
            item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderBottom: '2px solid',
                borderColor: 'grey.200',
                p: 1,
              }}
            >
              <Typography sx={{ color: 'grey.500', fontSize: '12px', textAlign: 'left' }}>
                connections
              </Typography>
              <Typography sx={{ color: 'blue', fontSize: '12px', textAlign: 'right' }}>29</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

