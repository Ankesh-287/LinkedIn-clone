import React, { useEffect, useState } from 'react';
import { getAllUsers, addConnection} from '../api/FireStoreAPI';
import { Box, Grid, Typography } from '@mui/material';
import ConnectedUsers from './common/ConnectedUsers';
import NetworkTab from './common/NetworkTab';

export default function NetWorkComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  
  const handleAddConnection = (id) => {
    addConnection(currentUser.id, id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  return users.length > 1 ? (
    <Box
      sx={{
        width: { xs: '95%', lg: '100%' },
        margin: 'auto',
        backgroundColor: '#f4f2ee',
        maxWidth: '1128px',
        padding: {xs:0, sm:2},
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <NetworkTab />
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <Box 
            backgroundColor="white"
            sx={{
              width:'100%',
              borderRadius: { xs: 0, sm: 3 },
              boxSizing: 'border-box',
              padding: 2,
            }}

          >
            <Grid container spacing={2}>
              {shuffledUsers.map((user) =>
                user.id === currentUser.id ? null : (
                  <Grid item xs={6} sm={4} md={6} lg={3} key={user.id}>
                    <ConnectedUsers
                      currentUser={currentUser}
                      user={user}
                      handleAddConnection={handleAddConnection}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="body1">No Connections to Add</Typography>
    </Box>
  );
}
