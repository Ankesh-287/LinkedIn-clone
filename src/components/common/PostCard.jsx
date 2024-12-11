import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import { Public, Check, Add, Edit, Delete} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deletePost, getAllUsers, getConnections, getCurrentUser } from '../../api/FireStoreAPI';
import { Modal } from 'antd';
import LikeButton from './LikeButton'

export default function PostCard({ posts, id, getEditData }) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [imageModal, setImageModal] = useState(false);
    const [isConnected, setIsConnnected] = useState(false);

    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers);
      }, []);

    useEffect(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers);
        if (currentUser.id && posts.userId) {
            getConnections(currentUser.id, posts.userId, setIsConnnected);
        }
    }, [currentUser.id, posts.userId]);

    const [isFollowed, setIsFollow] = useState(false);

    const timeAgo = posts.timeStamp?.seconds
        ? moment.unix(posts.timeStamp.seconds).fromNow() : '';

    const handleFollow = () => {
        setIsFollow((isFollowed) => !isFollowed);
    };

    return (
        <Box
            key={id}
            sx={{
                width: { xs: '100%' },
                backgroundColor: 'white',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                mt: '10px',
            }}>
            <Box>
                <Grid container padding="10px">
                    <Grid item xs={2.2} sm={1.2}>
                        <Avatar
                            src={allUsers
                                .filter((item) => item.id === posts.userId)
                                .map((item) => item.imageLink)[0]}
                            alt="profile-pic"
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                            }}
                        />
                    </Grid>

                    <Grid item xs={6} sm={8} marginLeft="5px">
                        <Typography
                            variant="body1"
                            color="grey.800"
                            fontWeight="600"
                            fontSize="15px"
                            fontStyle="Poppins"
                            onClick={() =>
                                navigate('/profile', {
                                    state: { id: posts?.userId, email: posts.userEmail },
                                })
                            }
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {allUsers.filter((user) => user.id === posts.userId)[0]?.name} &#8226; &nbsp; 2nd+
                        </Typography>

                        <Typography
                            variant="body2"
                            fontSize="12px"
                            color="grey.600"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {allUsers.filter((user) => user.id === posts.userId)[0]?.headline}
                        </Typography>

                        <Typography variant="subtitle2" color="grey.500" fontSize="13px">
                            {timeAgo} &#8226; &nbsp;
                            <Public sx={{ fontSize: '15px' }} />
                        </Typography>
                    </Grid>

                    <Grid item xs={3.6} sm={2.5} display="flex" justifyContent="center" alignItems="center">
                        {currentUser.id === posts.userId ? (
                            <Box width="100%" display="flex" justifyContent="space-around">
                                <Edit onClick={() => getEditData(posts)} />
                                <Delete onClick={() => deletePost(posts.id)} />
                            </Box>
                        ) : null}

                        <Button
                            disableRipple
                            onClick={handleFollow}
                            sx={{
                                textTransform: 'none',
                                p: '10px 20px',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                width: '100%',
                                color: isFollowed ? 'grey.600' : '#0a66c2',
                                '&:hover': {
                                    backgroundColor: isFollowed ? 'grey.300' : '#d9e8f8',
                                },
                            }}
                        >
                            {isFollowed ? (
                                <>
                                    <Check /> Following
                                </>
                            ) : (
                                <>
                                    <Add /> Follow
                                </>
                            )}
                        </Button>
                    </Grid>
                </Grid>

                <Grid container padding="10px">
                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{ __html: posts.status }}
                            sx={{
                                fontSize: 14,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginX: 0,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container justifyContent="space-around" sx={{ marginTop: '10px' }}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                boxSizing: 'border-box',
                                display: 'flex',
                                width: '100%',
                                height: 'auto',
                                justifyContent: 'center',
                                paddingX: '10px',
                            }}
                        >
                            {posts.postImage ? (
                                <Box
                                    component="img"
                                    onClick={() => setImageModal(true)}
                                    src={posts.postImage}
                                    alt="post image"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : null}
                        </Box>
                    </Grid>
                </Grid>
                <LikeButton
                    userId={currentUser?.id}
                    postId={posts.id}
                    currentUser={currentUser}>
                </LikeButton>

                <Modal centered open={imageModal} onOk={() => setImageModal(false)} onCancel={() => setImageModal(false)} footer={[]}>
                    <img onClick={() => setImageModal(true)} src={posts.postImage} alt="post-image" />
                </Modal>
            </Box>
        </Box>
    );
}
