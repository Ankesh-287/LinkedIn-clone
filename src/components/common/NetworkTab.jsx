import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Person, Group, Groups, Book, CalendarMonth, Receipt, Newspaper, Tag, } from '@mui/icons-material';

export default function NetworkTab() {
  const networkItems = [
    { icon: <Group />, label: 'Connections', count: 37 },
    { icon: <Book />, label: 'Contacts', count:639 },
    { icon: <Person />, label: 'Following & Followers', count: '' },
    { icon: <Groups />, label: 'Groups', count: '' },
    { icon: <CalendarMonth />, label: 'Events', count: '' },
    { icon: <Receipt />, label: 'Pages', count: '' },
    { icon: <Newspaper />, label: 'Newsletter', count: 9 },
    { icon: <Tag />, label: 'Hashtags', count: 1 },
  ];

  const iconStyle = {
    color: 'grey',
    cursor: 'pointer',
    '&:hover': {
      color: 'black',
    },
  };

  return (
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'White',
          borderRadius: { xs: '1px', sm: '10px' },
          mb: '10px',
        }}
      >
        <Box>
          <Grid container >
            <Grid item xs={12} display="flex" justifyContent="flex-start" position="relative">
              <Typography variant="h6" sx={{ fontWeight: 'bold', my: 1, pl:2 }}>
                Manage my network
              </Typography>
            </Grid>

            {networkItems.map(({ count, label, icon }) => (
              <Grid
                item
                key={label}
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box sx={{ ...iconStyle, mr: 1 }}>{icon}</Box>
                  <Typography sx={{ color: 'grey.600', fontSize: '16px' }}>
                    {label}
                  </Typography>
                </Box>
                <Typography sx={{ color: 'grey.600', fontSize: '16px' }}>{count}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
  );
}
