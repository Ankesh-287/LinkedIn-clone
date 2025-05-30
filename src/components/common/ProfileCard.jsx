import React, { useState, useEffect } from 'react'
import { getSingleStatus, getSingleUser } from '../../api/FireStoreAPI';
import PostCard from './PostCard'
import { Box, Typography, Paper, Grid, Divider } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom';
import FileUpload from "./FileUpload"
import { uploadImage as uploadImageAPI } from '../../api/ImageUpload'

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };
  
  useEffect(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  console.log(allStatus);

  return (
    <>
      <FileUpload
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />

      <Box
        sx={{
          width: { xs: '90%', lg: '100%' },
          margin: { xs: 'auto', lg: 'auto' },
          backgroundColor: '#f4f2ee',
          maxWidth: '1228px',
          display: 'flex',
          justifyContent: 'center',
        }}>


        {currentUser.id === location?.state?.id ? (
          <Edit
            sx={{ position: 'absolute', right: '20px', cursor: 'pointer', padding: '10px', width: '1000px' }}
            onClick={onEdit} />
        ) : (
          <></>
        )}
        <Grid container spacing={3}
          sx={{ flexDirection: { sx: 'column', md: 'row' }, position: 'relative' }}>
          <Grid item xs={12} md={6} lg={8} >


            <Box
              component="img"
              src="https://marketplace.canva.com/EAFSUH0EweU/1/0/1600w/canva-black-elegant-personal-linkedin-banner-eEN5zzEf5VA.jpg"
              alt="profile background"
              width="100%"
              style={{ borderRadius: '8px 8px 0 0', }} />



            <Box
              sx={{
                padding: '80px 20px 20px 20px',
                backgroundColor: 'white',
                borderRadius: '0 0 10px 10px',
                position: 'relative'
              }} >
              <Box
                component="img"
                onClick={() => setModalOpen(true)}
                src={
                  Object.values(currentProfile).length === 0
                    ? currentUser.imageLink
                    : currentProfile?.imageLink
                }
                alt="profile"
                effect="blur"
                sx={{
                  width: { xs: '100px', sm: '120px', lg: '152px' },
                  height: { xs: '100px', sm: '120px', lg: '152px' },
                  position: 'absolute',
                  borderRadius: '50%',
                  left: { xs: '18px', sm: '', md: '', lg: '50px' },
                  top: { xs: '-14%', sm: '-18%', md: '-20%', lg: '-20%' },
                  border: '3px solid white',
                  cursor: 'pointer',
                  objectFit: 'cover'
                }}
              />


              <Box width="auto" height="auto" position="relative" alignItems="center" justifyContent="center" >

                <Edit size='small' onClick={onEdit}
                  sx={{
                    position: 'absolute',
                    right: '-10px',
                    top: '-60px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: 'grey.200',
                    },
                  }} />


                <Grid container display="flex" justifyContent="space-between"
                  sx={{
                    position: 'relative',
                    marginTop: "40px",
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row', },
                  }}>


                  <Grid item xs={12} sm={6} md={6}>
                    <Typography component="div" variant="h5">
                      {Object.values(currentProfile).length === 0
                        ? currentUser.name
                        : currentProfile?.name}
                    </Typography>
                    <Typography component="div" color="grey.700" sx={{ fontSize: '15px' }} >
                      {Object.values(currentProfile).length === 0
                        ? currentUser.headline
                        : currentProfile?.headline}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}
                    sx={{
                      fontSize: '10px',
                      display: { xs: 'flex', sm: 'grid', md: 'grid', lg: 'grid' },
                      color: { xs: 'grey.500', sm: 'grey.900' }
                    }}
                  >
                    <Typography component="div">{Object.values(currentProfile).length === 0 ? currentUser.company : currentProfile?.company}&nbsp;</Typography>

                    <Typography component="div">
                      <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>&#8226; </Box>
                      {Object.values(currentProfile).length === 0 ? currentUser.college : currentProfile?.college}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    {/* {(currentUser.city || currentUser.country) &&
                  (currentProfile?.city || currentProfile?.country) ? ( */}
                    <Typography component="div" color="grey.500" sx={{ fontSize: '13px' }} >
                      {Object.values(currentProfile).length === 0
                        ? `${currentUser.city}, ${currentUser.country}`
                        : `${currentProfile?.city}, ${currentProfile.country}`}
                      &nbsp;&#8226;
                    </Typography>
                    {/* ) : (
                  <></>
                  )}  */}
                    <Typography color="#0a66c2" sx={{ fontSize: '14px', fontWeight: '700' }} >
                      &nbsp;Contact Info
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="#0a66c2" sx={{ fontSize: '14px', fontWeight: '700' }} >
                      26 connections
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    {currentUser.website || currentProfile?.website ? (
                      <Link style={{ textDecoration: "none" }} to={Object.values(currentProfile).length === 0 ? currentUser.website : currentProfile?.website} >
                        <Typography component="div" color="#0a66c2" sx={{ fontSize: '14px', fontWeight: '700' }}>
                          Website </Typography>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="grey.500" sx={{ fontSize: '13px' }} >{Object.values(currentProfile).length === 0 ? currentUser.email : currentProfile?.email}</Typography>
                    {currentUser.aboutMe || currentProfile?.aboutMe ? (
                      <Typography component="div" color="grey.500" sx={{ fontSize: '13px' }} >
                        {Object.values(currentProfile).length === 0 ? currentUser.aboutMe : currentProfile?.aboutMe}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {currentUser.skills || currentProfile?.skills ? (
                      <Typography component="div" color="grey.500" sx={{ fontSize: '13px' }} >{Object.values(currentProfile).length === 0 ? currentUser.skills
                        : currentProfile?.skills}</Typography>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      {allStatus?.map((posts) => (
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
                          <PostCard posts={posts}/>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>


          <Grid item xs={12} md={6} lg={4}>

            <Paper sx={{ padding: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                People Also Viewed
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Sarah Connor</Typography>
                <Typography variant="body2" color="text.secondary">
                  Software Engineer at ABC Corporation
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Tony Stark</Typography>
                <Typography variant="body2" color="text.secondary">
                  CEO at Stark Industries
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>


      </Box>
    </>
  )
}



