import React, { useState, useEffect } from 'react';
import { postStatus, getStatus, updatePost } from '../../api/FireStoreAPI';
import { getCurrentTimeStamp } from '../../helpers/useMoment';
import ModalComponent from './Modalcomponent';
import { uploadPostImage } from '../../api/ImageUpload'
import { getUniqueId } from '../../helpers/getUniqueId';
import PostCard from './PostCard';
import { Box, Grid, Button } from '@mui/material';
import { FcCalendar, FcPicture, FcNews } from "react-icons/fc";


export default function PostUpdate({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatus, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postId: getUniqueId(),
      userId: currentUser.id,
      postImage: postImage,
    };
    try {
      await postStatus(object);
      await setModalOpen(false);
      setIsEdit(false);
      await setStatus('');
    } catch (err) {
      console.error("Failed to post status", err)
    }
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  }

  const updateStatus = async () => {
    try {
      await updatePost(currentPost.id, status, postImage);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update post", err)
    }
  };

  useEffect(() => {
    getStatus(setAllStatus);
  }, []);

  const IconLabelButton = ({ icon: IconComponent, label }) => (
    <Button
      startIcon={<IconComponent />}
      sx={{ textTransform: 'none', color: 'inherit' }}
    >
      {label}
    </Button>
  );

  return (
    <>
      <Box sx={{
        p: '8px',
        width: '97%',
        backgroundColor: 'white',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <ModalComponent
          setStatus={setStatus}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          status={status}
          sendStatus={sendStatus}
          isEdit={isEdit}
          updateStatus={updateStatus}
          uploadPostImage={uploadPostImage}
          postImage={postImage}
          setPostImage={setPostImage}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
        />
        <Grid container columnGap={3}>
          <Grid item xs={1}>
            <Box
              component="img"
              src={currentUser?.imageLink}
              alt="user-profile"
              sx={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover'   
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Button fullWidth
              onClick={() => {
                setModalOpen(true);
                setIsEdit(false);
              }}
              sx={{
                height: '48px',
                paddingLeft: '20px',
                borderRadius: "50px",
                border: '1px solid',
                borderColor: 'grey.500',
                color: 'grey.900',
                textTransform: 'none',
                transition: 'none',
                '&:hover': { backgroundColor: 'grey.100' },
                '& .MuiInputBase-root': { borderRadius: "50px" },
                justifyContent: 'left'
              }}>Start a post, try writing with AI</Button>
          </Grid>
        </Grid>

        <Grid container >
          <Grid container>
            <Grid item xs={12}
              sx={{ display: 'flex', justifyContent: 'space-around', }} >
              <IconLabelButton icon={FcPicture} label="Media" />
              <IconLabelButton icon={FcCalendar} label="Event" />
              <IconLabelButton icon={FcNews} label="Write Article" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {allStatus.map((posts) => (
          <Box key={posts.id}
            sx={{
              width: { xs: '100%' },
              backgroundColor: 'white',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              mt: '10px'
            }}>
            <PostCard posts={posts} getEditData={getEditData} />
          </Box>
        ))}
      </Box>
    </>
  );
}

