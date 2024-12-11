import React, { useMemo, useState } from 'react'
import Home from '../Pages/Home'
import Header from '../components/Header'
import { getCurrentUser } from '../api/FireStoreAPI'
import { Box } from '@mui/material'

function HomeLayout() {
    const [ currentUser, setCurrentUser] = useState ({})
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, [])
    return (
        <>
            <Box style={{ backgroundColor: '#f4f2ee' }}>
                <Header currentUser={currentUser}/>
                <Home currentUser={currentUser} />
            </Box>
        </>
    )
}

export default HomeLayout
