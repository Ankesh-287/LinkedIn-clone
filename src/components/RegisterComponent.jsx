import React, { useState } from 'react'
import { Box, Button, Divider, Stack, TextField, Typography, InputAdornment, IconButton, Link } from '@mui/material'
import { SignUpApi, GoogleSignInApi } from '../api/Auth'
import { postUserData } from '../api/FireStoreAPI'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { getUniqueId } from '../helpers/getUniqueId'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const signup = async () => {
    try {
      let res = await SignUpApi(credentials.email, credentials.password)
      toast.success("Account Created")
      localStorage.setItem('userEmail', res.user.email)
      postUserData({userId: getUniqueId(), name: credentials.name, email: credentials.email})
      navigate('/home')
    } catch (error) {
      toast.error("Cannot Create your Account")
    }
  }

  const googleSignIn = () => {
    let response = GoogleSignInApi();
    console.log(response);
    navigate('/home')
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickPassword = () => setShowPassword((show) => !show);
  const handleMouseDown = (event) => {
    event.preventDefault();
  }
  const handleMouseUp = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ fontFamily: 'Poppins, sans-serif', marginTop: "70px" }}
        spacing={2}
      >
        <Typography variant="h5" color="black" fontWeight="700"> Make the most of your professional life
        </Typography>
        <Stack spacing={2} width="380px" sx={{ textAlign: 'center'}}>

          {/* ------------------------------Heading---------------------------------- */}

          <img src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-blue-png-large-size.png" alt="" style={{ position: "absolute", width: "120px", top: "20px", left: "20px" }} />


          {/* ------------------------------Inputs------------------------------------ */}
          <Box style={{ display: 'flex', flexDirection: 'column', fontSize: 'small', textAlign:'left' }}>
            <label htmlFor="name">Enter your name</label>
            <TextField id="name" variant="outlined" size="small" value={credentials.name}
              onChange={(event) => setCredentials({ ...credentials, name: event.target.value })}
              sx={{
                borderColor: 'black',
                '& fieldset': { borderColor: 'black' },
              }}
            />
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', fontSize: 'small', textAlign:'left' }}>
            <label htmlFor="email">Email or Phone Number</label>
            <TextField id="email" variant="outlined" size="small" value={credentials.email}
              onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
              sx={{
                borderColor: 'black',
                '& fieldset': { borderColor: 'black' },
              }}
            />
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', fontSize: 'small', textAlign:'left' }}>
            <label htmlFor="password">Password (6+ characters)</label>
            <TextField id="password" variant="outlined" size="small" type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickPassword}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderColor: 'black',
                  '& fieldset': { borderColor: 'black' },
                }
              }}
            />
          </Box>
          {/* </Box> */}

          {/* -------------------------signup google---------------------------------- */}
          <Typography variant="caption" display="flex" justifyContent="center" style={{ color: "grey.300", textAlign: "center" }}>
            <span sx={{ textAlign: 'center'}}>
              By clicking Continue, you agree to LinkedIn&apos;s
              <Link style={{ textDecoration: 'none', color: '#0a66c2' }}> User Agreement</Link>,
              <Link style={{ textDecoration: 'none', color: '#0a66c2' }}> Privacy Policy&nbsp; </Link>and
              <Link style={{ textDecoration: 'none', color: '#0a66c2' }}> Cookie Policy</Link>
            </span>
          </Typography>

          {/* -------------------------signup button---------------------------------- */}

          <Button variant='contained'
            sx={{ borderRadius: "50px", backgroundColor: "#0a66c2", height: '50px', textTransform: 'none' }}
            onClick={signup}>
            Agree & Join
          </Button>

          <Divider sx={{ my: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">or</Typography>
          </Divider>


          <Button
            variant='outlined'
            color="grey.100"
            fontFamily="Poppins, sans-serif"
            onClick={googleSignIn}
            startIcon={<img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="google icon" width="28px" />}
            sx={{ borderRadius: "20px", borderColor: "grey.500", textTransform: "none", fontFamily: 'Poppins, sans-serif' }}
          >
            Continue with Google
          </Button>

          <Button
            variant='outlined'
            color="grey.100"
            fontFamily="Poppins, sans-serif"
            onClick={googleSignIn}
            startIcon={<img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="google icon" width="22px" />}
            sx={{ borderRadius: "20px", borderColor: "grey.500", textTransform: "none", fontFamily: 'Poppins, sans-serif' }}
          >
            Sign in with Apple
          </Button>


          <Typography display="flex" justifyContent="center" style={{ color: "grey.300" }}>
            Already on LinkedIn?&nbsp;<Link onClick={() => navigate('/')} style={{ textDecoration: 'none' }}> Sign In</Link>
          </Typography>

          <Typography display="flex" justifyContent="center" style={{ color: "grey.300" }}>
            <span>
              Looking to create a page for a business? <Link onClick={() => navigate('/help')} style={{ textDecoration: 'none' }}> Get help</Link>
            </span>
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default RegisterComponent
