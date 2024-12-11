import React, { useState, useEffect } from 'react';
import { getConnections } from '../../api/FireStoreAPI';
import { Typography, Box, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

export default function ConnectedUsers({ user, handleAddConnection, currentUser }) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        getConnections(currentUser.id, user.id, setIsConnected);
    }, [currentUser.id, user.id]);

    if (isConnected) return '';

    return (
        <Box
            sx={{
                width:'100%',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'grey.300',
                maxWidth: '200px',
                boxSizing: 'border-box',
                borderRadius: 3,
                p: 2,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <img
                src={user.imageLink || 'default-image-url.jpg'}
                alt={`${user.name || 'User'}'s profile`}
                height="80px"
                width="80px"
                style={{ borderRadius: '50%', marginBottom: '1rem', objectFit: 'cover' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {user.name || 'Anonymous'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', textAlign: 'center', mb: 2 }}>
                {user.headline || 'No headline available'}
            </Typography>
            <Button
                onClick={() => handleAddConnection(user.id)}
                startIcon={<PersonAdd />}
                sx={{
                    mt: 2,
                    color: 'white',
                    backgroundColor: '#1976d2',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
                aria-label={`Connect with ${user.name || 'User'}`}
                fullWidth
            >
                Connect
            </Button>
        </Box>
    );
}
