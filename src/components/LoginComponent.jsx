import React, { useState } from 'react'
import { FormControl, OutlinedInput, Box, Button, Divider, Stack, TextField, Typography, InputLabel, InputAdornment, IconButton, Link } from '@mui/material'
import { SignInApi, GoogleSignInApi } from '../api/Auth'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function LoginComponent() { 
  const [credentials, setCredentials] = useState({});
  let navigate = useNavigate();
  const googleSignIn = () => {
    let response = GoogleSignInApi();
    console.log(response);
    navigate('/home')
  }

  const signin = async () => {
    try {
      let res = await SignInApi(credentials.email, credentials.password)
      toast.success("Signed In to LinkedIn!")
      localStorage.setItem('userEmail', res.user.email)
      navigate('/home')
    } catch (error) {
      toast.error("Please check your email or password")
    }
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
        justifyContent="center"
        style={{ fontFamily: 'Poppins, sans-serif', marginTop: "90px" }}
      >
        <Stack spacing={2} width="350px" sx={{textAlign:'left'}} >

          {/* ------------------------------Heading---------------------------------- */}

          <img src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-blue-png-large-size.png" alt="" style={{ position: "absolute", width: "120px", top: "20px", left: "20px" }} />

          <Typography variant="h5" color="black" fontSize="1.6rem" fontWeight="700">Sign in
            <Typography color="grey.500" fontSize="small">stay updated on professional world</Typography>
          </Typography>

          {/* ------------------------------Inputs------------------------------------ */}

          <TextField variant='outlined'
            placeholder='Email'
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} />
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel >Password</InputLabel>
            <OutlinedInput
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickPassword}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/* ------------------------------forgot------------------------------------ */}


          <Typography style={{ color: "#2867b2" }}>
            Forgot Password?
          </Typography>

          {/* -------------------------signup button---------------------------------- */}

          <Button variant='contained'
            sx={{ borderRadius: "50px", backgroundColor: "#0a66c2", height: '50px', textTransform: 'none'}}
            onClick={signin}>
            Sign in
          </Button>

          <Divider sx={{ my: 3, textAlign:'center'}} >
            <Typography variant="body2" color="text.secondary">or</Typography>
          </Divider>

          {/* -------------------------signup google---------------------------------- */}
          <Typography display="flex" justifyContent="center" style={{ color: "grey.300", fontSize: 'small' }}>
            <span >
              By clicking Continue, you agree to LinkedIn&apos;s
              <Link style={{ textDecoration: 'none', color: '#0a66c2' }}> User Agreement</Link>,
              <Link style={{ textDecoration: 'none', color: '#0a66c2' }}> Privacy Policy&nbsp; </Link>and
              <Link style={{ textDecoration: 'none', color: '#0a66c2' }}> Cookie Policy</Link>
            </span>
          </Typography>

          <Button
            variant='outlined'
            color="grey.100"
            fontFamily="Poppins, sans-serif"
            onClick={googleSignIn}
            startIcon={<img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="google icon" width="28px"/>}
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
            New to LinkedIn?&nbsp;<Link onClick={() => navigate('/signup')} style={{ textDecoration: 'none', cursor: 'pointer' }}> Join now</Link>
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default LoginComponent
