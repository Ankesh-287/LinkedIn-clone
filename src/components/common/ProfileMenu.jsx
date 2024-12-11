import React, { useMemo, useState } from 'react';
import { getCurrentUser } from '../../api/FireStoreAPI';
import { Paper, Grid, Typography, Button, CardMedia } from '@mui/material'
import { onLogout } from '../../api/Auth'


function ProfileMenu() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
      getCurrentUser(setCurrentUser);
    }, []);
    return (
     <>
            <Paper
                elevation={10}
                sx={{
                    display: "flex",
                    width: '260px',
                    height: 'auto',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '60px',
                    right: '23%',
                    borderRadius: '5px',

                }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={3} zIndex="12" justifyContent="center" margin="5px">
                    <CardMedia
  component="img"
  image={currentUser?.imageLink}
  alt=""
  sx={{
    width: 60,
    height: 60,
    borderRadius: '50%', // Ensure the image is circular
    objectFit: 'contain',
  }}
/>
                    </Grid>
                    <Grid item xs={8} zIndex="12" marginTop="5px">
                        <Typography variant='body1' fontWeight="700">{currentUser?.name}</Typography>
                        <Typography variant='body2'>{currentUser?.headline}</Typography>
                    </Grid>
                    <Grid item xs={12} zIndex="12" display="flex" justifyContent="center" sx={{ borderBottom: '2px solid', borderColor: 'grey.200', pb: 1 }}>
                        <Button
                        href="home/profile"
                            sx={{
                                width: '90%',
                                color: '#0274b3',
                                padding: '10px',
                                height: '10px',
                                textTransform: 'none',
                                backgroundColor: 'white',
                                border: '2px solid #0274b3',
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: '#b9e1ee54',
                                    borderColor: ' #0084bf',
                                }
                            }}
                        > View Profile</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ borderBottom: '2px solid', borderColor: 'grey.200', pb: 1, ml: 2 }}>
                        <Typography variant='subtitle1' fontWeight="700" sx={{ color: 'black' }}>Account</Typography>
                        <Typography variant='body2' sx={{ color: 'grey.500' }}>Settings & Privacy</Typography>
                        <Typography variant='body2' sx={{ color: 'grey.500' }}>Help</Typography>
                        <Typography variant='body2' sx={{ color: 'grey.500' }}>Language</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ borderBottom: '2px solid', borderColor: 'grey.200', pb: 1, ml: 2 }}>
                        <Typography variant='subtitle1' fontWeight="600" sx={{ color: 'black' }}>Manage</Typography>
                        <Typography variant='body2' sx={{ color: 'grey.500' }}>Posts & Activity</Typography>
                        <Typography variant='body2' sx={{ color: 'grey.500' }}>Job Posting Account</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ borderBottom: '2px solid', borderColor: 'grey.200', pb: 1, ml: 2 }}>
                        <Typography variant='body2'
                        onClick={onLogout}
                        sx={{ color: 'grey.500', cursor:'pointer'
                         }}>Sign Out</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ProfileMenu
