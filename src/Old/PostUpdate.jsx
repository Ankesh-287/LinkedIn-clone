import React, { useState, useMemo } from 'react'
// import Post from './Post';
import { postStatus, getStatus } from '../api/FireStoreAPI';
import ModalComponent from './Modalcomponent';
import { getCurrentTimeStamp } from '../helpers/useMoment';
import { getUniqueId } from '../helpers/getUniqueId'
import { useNavigate } from 'react-router-dom';

import { FcBriefcase, FcNews, FcStart, FcPicture } from "react-icons/fc";
import { Box, Grid2, Button, Typography, } from '@mui/material'


function PostUpdate({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatus, setAllStatus] = useState([]);

  let navigate = useNavigate();

  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      followers: followers,

      postId: getUniqueId(),
    };
    await postStatus(object);
    await setModalOpen(false);
    await setStatus('');
  }

  useMemo(() => {
    getStatus(setAllStatus);
  }, [])
  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', lg: '80%' },
          margin: { xs: '0', lg: 'auto' },
          maxWidth: '1170px',
          height: '100%',
          backgroundColor: '#f4f2ee',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <ModalComponent sendStatus={sendStatus} status={status} setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} />

        <Box sx={{ 
          boxSizing:'border-box',
          p:'5px',
          width: { xs: '100%'}, 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          display: 'flex', 
          flexDirection: 'column', 
          maxWidth: '575px',
          }} >

          <Grid2 container spacing={1}>
            <Grid2 item xs={12}>
              <img src="https://xsgames.co/randomusers/assets/avatars/male/46.jpg"
                alt="profile-pic" width="48px" style={{ borderRadius: "50px" }} />
            </Grid2>
            <Grid2 item flexGrow={1}>
              <Button fullWidth onClick={() => setModalOpen(true)}
                sx={{
                  height: '48px', paddingLeft: '20px', borderRadius: "50px", border: '1px solid',
                  borderColor: 'grey.500',
                  color: 'grey.900', textTransform: 'none', transition: 'none',
                  '&:hover': { backgroundColor: 'grey.100' },
                  '& .MuiInputBase-root': { borderRadius: "50px" },
                  justifyContent: 'left'
                }} >Start a post, try writing with AI</Button>
            </Grid2>
          </Grid2>
          
          <Grid2 container  justifyContent="space-around" sx={{ fontSize: '12px', paddingBottom: '2px' }}>

            <Grid2 item xs={3}
              sx={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', borderRadius: '3px',
                '&:hover': { backgroundColor: 'grey.100' }
              }}>
              <FcPicture size={25} />
              <Typography fontSize='12px' paddingLeft="3px">Media</Typography>
            </Grid2>

            <Grid2 item xs={3}
              sx={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', borderRadius: '3px',
                '&:hover': { backgroundColor: 'grey.100' }
              }}>
              <FcStart size={25} />
              <Typography fontSize='12px' paddingLeft="3px">Videos</Typography>
            </Grid2>

            <Grid2 item xs={3}
              sx={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', borderRadius: '3px',
                '&:hover': { backgroundColor: 'grey.100' }
              }}>
              <FcBriefcase size={25} />
              <Typography fontSize='12px' paddingLeft="3px">Jobs</Typography>
            </Grid2>

            <Grid2 item xs={3}
              sx={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center',  borderRadius: '3px',
                '&:hover': { backgroundColor: 'grey.100' }
              }}>
              <FcNews size={25} />
              <Typography fontSize='12px' paddingLeft="3px">Write Articles</Typography>
            </Grid2>

          </Grid2>
        </Box>
        <Box display="flex" flexDirection="row" width="80%" justifyContent="space-around">
          <Grid2 >
            {
              allStatus.map((posts, id) => {
                return (
                  <>
                    <Box key={posts.postId} sx={{
                      backgroundColor: 'white', padding: '10', borderRadius: '10px', margin: '10px', display: 'flex', flexDirection:
                        'column', width: '100%', height: 'auto'
                    }}
                    >
                      <p
                        onClick={() =>
                          navigate('/home/profile', {
                            state: { id: posts?.userId, email: posts.userEmail },
                          })
                        }>
                          {posts.userName}
                          </p>
                      <p>{posts.timestamp}</p>
                      <p>{posts.status}</p>
                    </Box>
                  </>
                )
              })}
          </Grid2>
        </Box>
        {/* <Post /> */}
      </Box >

    </>
  )
}

export default PostUpdate
