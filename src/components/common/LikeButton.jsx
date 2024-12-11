import React, { useMemo, useState } from 'react';
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments
} from '../../api/FireStoreAPI';
import { getCurrentTimeStamp } from '../../helpers/useMoment';
import { Box, Grid, Typography, Avatar, AvatarGroup, TextField, InputAdornment } from '@mui/material';
import { ThumbUpAlt, ThumbUpOffAlt, Repeat, Send, Message, } from '@mui/icons-material';


function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    likePost(userId, postId, liked);
    setLiked(!liked);
    setLikesCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));
  };


  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  const handleCommentInput = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    if (comment.trim()) {
      postComment(postId, comment, currentUser?.name, currentUser?.imageLink, getCurrentTimeStamp('LLL'));
      setComment("");
      getComments(postId, setComments);
    }
  };


  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      const now = new Date();
      const secondsAgo = Math.floor((now - date) / 1000);
  
      if (secondsAgo < 60) return `${secondsAgo} s`; 
      const minutesAgo = Math.floor(secondsAgo / 60);
      if (minutesAgo < 60) return `${minutesAgo} m`; 
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo < 24) return `${hoursAgo} h`;
      const daysAgo = Math.floor(hoursAgo / 24);
      if (daysAgo < 30) return `${daysAgo} d`;
      const monthsAgo = Math.floor(daysAgo / 30);
      if (monthsAgo < 12) return `${monthsAgo} mo`; 
      const yearsAgo = Math.floor(monthsAgo / 12);
      return `${yearsAgo} y`; 
    }
    return "";
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        p: '10px',
        cursor: 'pointer',
        mb: '5px'
      }}>


      <Grid container spacing={2} justifyContent="space-between" sx={{ marginTop: '10px', paddingX: '15px', fontSize: '12px' }}>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'grey',
            fontSize: '12px',
          }}
        >
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/2048px-Facebook_Like_button.svg.png" sx={{ width: 15, height: 15 }} />
            <Avatar alt="Cindy Baker" src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png" sx={{ width: 15, height: 15 }} />
            <Avatar alt="Travis Howard" src="https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_1280.png" sx={{ width: 15, height: 15 }} />

            <Typography alignItems="center" display="flex" fontSize="12px">
              {likesCount}
            </Typography>
          </AvatarGroup>
        </Grid>

        <Grid item xs={6} display="flex" alignItems="center" justifyContent="right">
          {comments.length} comments &nbsp;&#8226; &nbsp; 232 reposts
        </Grid>
      </Grid>
          <hr style={{height:'1px', width:'100%', backgroundColor:'#e4dfdf', border:'none'}} />
      <Grid container display="flex">
        <Grid item xs={3} display="flex" justifyContent="center" onClick={handleLike} >
          {liked ? <ThumbUpAlt sx={{fill: '#5e92ff'}} /> : <ThumbUpOffAlt />}
          <Typography sx={{ fontSize: '15px', ml: 1 }}>Like</Typography>
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="center" onClick={() => setShowCommentBox(!showCommentBox)}>
          <Message  />
          <Typography sx={{ fontSize: '15px', ml: 1 }}>Comment</Typography>
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="center">
          <Repeat />
          <Typography sx={{ fontSize: '15px', ml: 1 }}>Repost</Typography>
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="center">
          <Send sx={{ rotate: '-30deg' }} />
          <Typography sx={{ fontSize: '15px', ml: 1 }}>Send</Typography>
        </Grid>
      </Grid>
      {showCommentBox ? (
        <>
          <Grid container padding="10px" display="flex">
            <Grid item xs={12} display="flex" alignItems="center" justifyContent="center" gap={2}>
              <Box
                component="img"
                src={currentUser?.imageLink}
                alt="user-profile"
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
                <TextField
                  id="input-with-icon-textfield"
                  onChange={handleCommentInput}
                  placeholder="Add a Comment"
                  name="comment"
                  value={comment}
                  variant="standard"
                  fullWidth
                  sx={{
                    height: '40px',
                    paddingLeft: '20px',
                    borderRadius: '50px',
                    border: '2px solid',
                    borderColor: 'grey.400',
                    color: 'grey.900',
                    pr:1,
                    pt:1
                  }}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end" 
                        >
                          <Send sx={{ cursor: 'pointer', color:'#0a66C2'}} onClick={addComment} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

              </Box>
            </Grid>


            <Grid item xs={12} display="flex" mt="19px" justifyContent="space-between" flexDirection='column' >
              {comments.length > 0 && comments.map((commentItem, index) => (
                <Box key={index} justifyContent="space-between" sx={{ display: 'flex', flexDirection: 'row', mb: 3 }}>
                  <Grid container display="flex">

                    <Grid item xs={1} display="flex" justifyContent="space-between" flexDirection='row'>
                      <Avatar
                        src={commentItem.imageLink}
                        alt="user-profile"
                        sx={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    </Grid>


                    <Grid item xs={10} display="flex" flexDirection='column'>
                      <Typography variant="subtitle2" fontWeight="bold">{commentItem.name}</Typography>
                      <Typography variant="body2">{commentItem.comment}</Typography>
                    </Grid>


                    <Grid item xs={1} display="flex" justifyContent="space-between" flexDirection='row'>
                      <Typography variant="caption" color="textSecondary">
                        {formatTimestamp(commentItem.timeStamp)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}

    </Box>
  );
}

export default LikeButton;
