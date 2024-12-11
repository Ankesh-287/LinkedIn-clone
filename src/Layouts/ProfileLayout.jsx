import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/FireStoreAPI';
import Profile from '../Pages/Profile'
import Header from '../components/Header';
import { Box } from '@mui/material';

export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getCurrentUser(setCurrentUser);
    }, [])
    return (
        <>
            <Box backgroundColor="#f4f2ee">
                <Header currentUser={currentUser} />
                <Profile currentUser={currentUser} />
            </Box>
        </>
    )
}
