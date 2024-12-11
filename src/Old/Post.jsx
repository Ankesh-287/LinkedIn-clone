import React, { useState } from 'react'
import { SlLike } from "react-icons/sl";
import { BsChatText } from "react-icons/bs";
import { RiRepeatLine } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { Box, Grid2, Button, Typography, Avatar, AvatarGroup } from '@mui/material'
import { Public, Check } from '@mui/icons-material'

// const posts = [
//     {
//         "id": 1,
//         "postImage": 'https://i.pinimg.com/236x/01/36/4d/01364d9631cd0b360f117aefedd5af12.jpg',
//         "postAuthorImg": "https://preview.redd.it/tuya5a8s2tv71.png?width=422&format=png&auto=webp&s=b379b435e0b570d34bea7eadb00f78faa53ae98d",
//         "postAuthor": "Ankesh Patil",
//         "postComment": 2344,
//         "reposts": 120,
//         "postLikes": 27653,
//         "posted": '2 days, ago',
//         "AuthorLink": 'http://localhost:5173/home',
//         "postFollwers": 2346,
//         "title": "Post 1",
//         "content": "This is the content of post 1",
//         "date": "2022-01-01"
//     },
//     {
//         "id": 2,
//         "postImage": 'https://i.pinimg.com/236x/5f/36/55/5f36556feed042a5f344e9e0b3f22302.jpg',
//         "postAuthorImg": "https://preview.redd.it/tuya5a8s2tv71.png?width=422&format=png&auto=webp&s=b379b435e0b570d34bea7eadb00f78faa53ae98d",
//         "postAuthor": "Ankesh Patil",
//         "postComment": 2344,
//         "reposts": 120,
//         "postLikes": 27653,
//         "posted": '2 days, ago',
//         "AuthorLink": 'http://localhost:5173/home',
//         "postFollwers": 2346,
//         "title": "Post 1",
//         "content": "This is the content of post 1",
//         "date": "2022-01-01"
//     }
// ]

function Post() {
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        setIsFollowed((prev) => !prev);
    }

    return (
        <>
            {/* {
                allStatus.map((post, id) => (
                    return(
                    <Box key={posts,postId}
                        sx={{
                            boxSizing:'border-box',
                            padding: '10px', height: 'maxContent', backgroundColor: 'white',
                            borderRadius: '8px', margin: '20px', display: 'flex',
                            flexDirection: 'column', minWidth: '535px',
                            maxWidth: '535px'
                            
                        }} >
                        <Grid2 container spacing={2} style={{ display: 'flex' }} >

                            <Grid2 >
                                <img src={post.postAuthorImg}
                                    alt="profile-pic" width="50px" style={{ borderRadius: "50px" }} />
                            </Grid2>
                            <Grid2 item flexGrow={1} >

                                <span style={{ display: "flex", direction: "row" }}>
                                    <Typography variant="body1" color='grey.800' fontWeight="600" fontSize='15px' fontStyle="Poppins"
                                    onClick={() =>
                          navigate('/profile', {
                            state: { id: posts?.userId, email: posts.userEmail },
                          })
                        }
                                    >{posts.userName} &#8226; </Typography>
                                    <span style={{ color: "grey", fontSize: '15px' }}> &nbsp; 2nd+ </span>
                                </span>

                                <Typography variant="body2" fontSize="12px" color="grey.600"  > {post.postFollwers} Followers</Typography>

                                <span style={{ display: "flex", direction: "row", }}>
                                    <Typography variant="subtitle2" color="grey.500" fontSize="13px" >{posts.timeStamp} &#8226; &nbsp;</Typography>
                                    <span style={{ color: "grey" }}>
                                        <Public sx={{ fontSize: "15px" }} />
                                    </span>
                                </span>
                            </Grid2>

                            <Grid2 item flexGrow={1} display="flex" justifyContent="end" alignItems="center">

                                <Button
                                    disableRipple
                                    padding="5px"
                                    onClick={handleFollow}
                                    sx={{
                                        textTransform: 'none',
                                        padding: '5px 10px',
                                        fontWeight: 'bold',
                                        transition: 'none',
                                        fontSize: '16px',
                                        color: isFollowed ? 'grey.600' : '#0a66c2',
                                        '&:hover': { backgroundColor: isFollowed ? 'grey.300' : '#d9e8f8', }
                                    }}>
                                    {isFollowed ? (<> <Check /> Following </>) : ` + Follow`}
                                </Button>

                            </Grid2>

                        </Grid2>

                        <Grid2 item flexGrow={1}>

                            <Typography variant="body1" sx={{ fontSize: 14 }}>
                                {posts.status}
                            </Typography>

                        </Grid2>

                        <Grid2 container spacing={2} justifyContent="space-around" direction="row" sx={{ marginTop: '10px', }}>
                            <Grid2 flexGrow={1}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTh_HpEiGxyFbbihIuG5FW_EV49ZgoBQ7z4A&s"
                                 alt="post-img" width="100%" />
                            </Grid2>
                        </Grid2>

                        <Grid2 container spacing={2} justifyContent="space-between" sx={{ marginTop: '10px', paddingX: '15px', fontSize: '12px' }}>

                            <Grid2 item xs={3} sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                color: 'grey',
                                fontSize: '12px'
                            }}>
                                <AvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/2048px-Facebook_Like_button.svg.png" sx={{ width: 15, height: 15 }} />
                                    <Avatar alt="Cindy Baker" src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png" sx={{ width: 15, height: 15 }} />
                                    <Avatar alt="Travis Howard" src="https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_1280.png" sx={{ width: 15, height: 15 }} />

                                    <Typography alignItems='center' display="flex" fontSize="12px">17236</Typography>
                                </AvatarGroup>
                            </Grid2>

                            <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                67 comments&nbsp;
                                &#8226; &nbsp;
                                35 reposts
                            </Grid2>

                        </Grid2>

                        <Grid2 container spacing={2} justifyContent="space-around" sx={{ marginTop: '10px', }}>
                            <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <SlLike style={{ padding: "5px", fontSize: '22px' }} />
                                <Typography fontSize="14px">Like</Typography>
                            </Grid2>

                            <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <BsChatText style={{ padding: "5px", fontSize: '22px' }} />
                                <Typography fontSize="14px">Commment</Typography>
                            </Grid2>

                            <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <RiRepeatLine style={{ padding: "5px", fontSize: '22px' }} />
                                <Typography fontSize="14px">Repost</Typography>
                            </Grid2>

                            <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <IoMdSend style={{ padding: "5px", fontSize: '22px' }} />
                                <Typography fontSize="14px">Send</Typography>
                            </Grid2>

                        </Grid2>

                    </Box>
    
                ))
)} */}
            <Box sx={{
                padding: '10px', height: 'maxContent', backgroundColor: 'white',
                borderRadius: '8px', margin: '20px', display: 'flex',
                flexDirection: 'column', minWidth: '535px',
                maxWidth: '535px'
            }} >
                <Grid2 container spacing={2} style={{ display: 'flex' }} >

                    <Grid2 >
                        <img src="https://xsgames.co/randomusers/assets/avatars/male/46.jpg"
                            alt="profile-pic" width="50px" style={{ borderRadius: "50px" }} />
                    </Grid2>
                    <Grid2 item flexGrow={1} >

                        <span style={{ display: "flex", direction: "row" }}>
                            <Typography variant="body1" color='grey.800' fontWeight="600" fontSize='15px' fontStyle="Poppins">Ankesh Patil &#8226; </Typography>
                            <span style={{ color: "grey", fontSize: '15px' }}> &nbsp; 2nd+ </span>
                        </span>

                        <Typography variant="body2" fontSize="12px" color="grey.600"  > 2345 Followers</Typography>

                        <span style={{ display: "flex", direction: "row", }}>
                            <Typography variant="subtitle2" color="grey.500" fontSize="13px" >2d &#8226; &nbsp;</Typography>
                            <span style={{ color: "grey" }}>
                                <Public sx={{ fontSize: "15px" }} />
                            </span>
                        </span>
                    </Grid2>

                    <Grid2 item flexGrow={1} display="flex" justifyContent="end" alignItems="center">

                        <Button
                            disableRipple
                            padding="5px"
                            onClick={handleFollow}
                            sx={{
                                textTransform: 'none',
                                padding: '5px 10px',
                                fontWeight: 'bold',
                                transition: 'none',
                                fontSize: '16px',
                                color: isFollowed ? 'grey.600' : '#0a66c2',
                                '&:hover': { backgroundColor: isFollowed ? 'grey.300' : '#d9e8f8', }
                            }}>
                            {isFollowed ? (<> <Check /> Following </>) : ` + Follow`}
                        </Button>

                    </Grid2>

                </Grid2>

                <Grid2 item flexGrow={1}>

                    <Typography variant="body1" sx={{ fontSize: 14 }}>
                        Hello
                    </Typography>

                </Grid2>

                <Grid2 container spacing={2} justifyContent="space-around" direction="row" sx={{ marginTop: '10px', }}>
                    <Grid2 flexGrow={1}>
                        <img src="https://xsgames.co/randomusers/assets/avatars/male/46.jpg" alt="post-img" width="100%" />
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={2} justifyContent="space-between" sx={{ marginTop: '10px', paddingX: '15px', fontSize: '12px' }}>

                    <Grid2 item xs={3} sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: 'grey',
                        fontSize: '12px'
                    }}>
                        <AvatarGroup max={4}>
                            <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/2048px-Facebook_Like_button.svg.png" sx={{ width: 15, height: 15 }} />
                            <Avatar alt="Cindy Baker" src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png" sx={{ width: 15, height: 15 }} />
                            <Avatar alt="Travis Howard" src="https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_1280.png" sx={{ width: 15, height: 15 }} />

                            <Typography alignItems='center' display="flex" fontSize="12px">78,658 </Typography>
                        </AvatarGroup>
                    </Grid2>

                    <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        1,649 comments
                        &#183;
                        510 reposts
                    </Grid2>

                </Grid2>

                <Grid2 container spacing={2} justifyContent="space-around" sx={{ marginTop: '10px', }}>
                    <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <SlLike style={{ padding: "5px", fontSize: '22px' }} />
                        <Typography fontSize="14px">Like</Typography>
                    </Grid2>

                    <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <BsChatText style={{ padding: "5px", fontSize: '22px' }} />
                        <Typography fontSize="14px">Commment</Typography>
                    </Grid2>

                    <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <RiRepeatLine style={{ padding: "5px", fontSize: '22px' }} />
                        <Typography fontSize="14px">Repost</Typography>
                    </Grid2>

                    <Grid2 item xs={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <IoMdSend style={{ padding: "5px", fontSize: '22px' }} />
                        <Typography fontSize="14px">Send</Typography>
                    </Grid2>

                </Grid2>
            </Box>
        </>
    )
}

export default Post
