import React, { useState, useEffect } from 'react';
import { editProfile } from '../../api/FireStoreAPI';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState({
        name: "",
        headline: "",
        country: "",
        city: "",
        company: "",
        industry: "",
        college: "",
        website: "",
        about: "",
        skills: ""
    })

    useEffect(() => {
        if (currentUser) {
            setEditInputs({
                name: currentUser.name || "",
                headline: currentUser.headline || "",
                country: currentUser.country || "",
                city: currentUser.city || "",
                company: currentUser.company || "",
                industry: currentUser.industry || "",
                college: currentUser.college || "",
                website: currentUser.website || "",
                about: currentUser.about || "",
                skills: currentUser.skills || "",
            });
        }
    }, [currentUser]);

    const getInput = (event) => {
        let { name, value } = event.target;
        setEditInputs({ ...editInputs, [name]: value })
    }

    const updateProfileData = async () => {
        await editProfile(currentUser?.id, editInputs);
        await onEdit();
    }

    return (
        <>
            <Box
                sx={{
                    width: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
                    height: { xs: '500px', lg: '500px' },
                    maxWidth: '500px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    padding: '20px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': { display: 'none', },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                }}
            >
                <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
                    Profile Edit
                </Typography>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <label htmlFor="name">Name</label>
                    <TextField id="name" name="name" variant="outlined" size="small" onChange={getInput} value={editInputs.name}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="headline">Headline</label>
                    <TextField id="headline" name="headline" variant="outlined" size="small" onChange={getInput} value={editInputs.headline}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="country">Country</label>
                    <TextField id="country" name="country" variant="outlined" size="small" onChange={getInput} value={editInputs.country}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="city">City</label>
                    <TextField id="city" name="city" variant="outlined" size="small" onChange={getInput} value={editInputs.city}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="company">Company</label>
                    <TextField id="company" name="company" variant="outlined" size="small" onChange={getInput} value={editInputs.company}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="industry">Industry</label>
                    <TextField id="industry" name="industry" variant="outlined" size="small" onChange={getInput} value={editInputs.industry}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="college">College</label>
                    <TextField id="college" name="college" variant="outlined" size="small" onChange={getInput} value={editInputs.college}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                    <label htmlFor="website">Website</label>
                    <TextField id="website" name="website" variant="outlined" size="small" onChange={getInput} value={editInputs.website}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }} 
                    />
                    <label htmlFor="about">About</label>
                    <TextField id="about" name="about" variant="outlined" size="small" onChange={getInput} value={editInputs.about}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }} 
                    />
                    <label htmlFor="skills">Skills</label>
                    <TextField id="skills" name="skills" variant="outlined" size="small" onChange={getInput}  value={editInputs.skills}
                        sx={{ borderColor: 'black', '& fieldset': { borderColor: 'black' } }}
                    />
                </Box>

                <Box mt={3} sx={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={updateProfileData}>
                        Save
                    </Button>
                </Box>

                <Close
                    color="primary"
                    aria-label="edit"
                    size="small"
                    onClick={onEdit}
                    sx={{
                        position: 'absolute',
                        right: '12px',
                        top: '12px',
                        backgroundColor: 'white',
                        color: 'black',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '50%',
                        '&:hover': {
                            backgroundColor: 'grey.200',
                        },
                    }} />
            </Box>

            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }}
            />
        </>
    );
}

export default ProfileEdit;
