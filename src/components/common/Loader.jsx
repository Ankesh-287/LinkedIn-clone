import React from 'react'
import { Space, Spin } from "antd"
import { Box, Stack, Typography } from '@mui/material'

function Loader() {
  
  return (
    <>
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6">Loading... Please wait.. </Typography>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </Stack>
      </Box>

    </>
  )
}

export default Loader
