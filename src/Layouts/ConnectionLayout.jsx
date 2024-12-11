import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/FireStoreAPI'
import Network from '../Pages/Network'
import Header from '../components/Header'
import { Box } from '@mui/material'

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, [])
  return (
    <>
      <Box style={{ backgroundColor: '#f4f2ee' }}>
        <Header currentUser={currentUser} />
        <Network currentUser={currentUser} />
      </Box>
    </>
  )
}
