import React ,{useState, useEffect,} from 'react';
import { Box, Avatar, Typography, Grid, Paper, Button, Divider } from '@mui/material';

const Jobs = () => {
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    const hideSelect = (e) => !e.target.closest('button') && setShowSelect(false);
    document.addEventListener('click', hideSelect);
    return () => document.removeEventListener('click', hideSelect);
  }, []);
  return (
    <>
        <div>
      {showSelect && <select><option>Option 1</option></select>}
      <button onClick={() => setShowSelect(!showSelect)}>Toggle Select</button>
    </div>

    <Box
      sx={{
        width: { xs: '100%', lg: '80%' },
        marginX: 'auto',
        mt: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
      }}
    >
      {/* Outer Grid: Dividing into two columns */}
      <Grid container spacing={2}>
        {/* Main Content Column (8/12) */}
        <Grid item xs={12} lg={8}>
          {/* Banner Section */}
          <Box
            sx={{
              height: '200px',
              backgroundColor: '#005582', // LinkedIn blue color for banner
              position: 'relative',
            }}
          >
            {/* Profile Picture */}
            <Avatar
              src="https://via.placeholder.com/150"
              alt="Profile"
              sx={{
                width: 150,
                height: 150,
                position: 'absolute',
                bottom: '-75px',
                left: '20px',
                border: '4px solid white',
              }}
            />
          </Box>

          {/* Personal Info Section */}
          <Box
            sx={{
              padding: '80px 20px 20px 20px',
              backgroundColor: 'white',
              borderRadius: '0 0 3px 3px',
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Software Engineer at XYZ Company
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              San Francisco, California • 500+ connections
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Connect
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }} />

          {/* About Section */}
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              About
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Passionate software engineer with 5+ years of experience in building scalable web applications and working
              with modern technologies like React, Node.js, and GraphQL. Eager to learn new things and contribute to the
              development of high-quality software.
            </Typography>
          </Paper>

          {/* Experience Section */}
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Experience
            </Typography>

            {/* Experience Item */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Senior Software Engineer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                XYZ Company
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jan 2020 - Present • 2 yrs 8 mos
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Worked on various projects to improve web application performance and scalability using React, Node.js, and
                cloud technologies.
              </Typography>
            </Box>

            {/* More Experience Items */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Software Engineer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ABC Corporation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jun 2017 - Dec 2019 • 2 yrs 6 mos
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Collaborated with cross-functional teams to design and implement features for internal tools and customer-facing products.
              </Typography>
            </Box>
          </Paper>

          {/* Skills Section */}
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Skills
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="outlined">React</Button>
              <Button variant="outlined">Node.js</Button>
              <Button variant="outlined">JavaScript</Button>
              <Button variant="outlined">GraphQL</Button>
            </Box>
          </Paper>

          {/* Recommendations Section */}
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Recommendations
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Jane Smith
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Senior Product Manager at ABC Corporation
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                "John is a highly skilled engineer with a keen eye for detail. He always delivers high-quality code and is a
                pleasure to work with. He has made significant contributions to our team's success."
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar Column (4/12) */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              People Also Viewed
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Sarah Connor</Typography>
              <Typography variant="body2" color="text.secondary">
                Software Engineer at ABC Corporation
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Tony Stark</Typography>
              <Typography variant="body2" color="text.secondary">
                CEO at Stark Industries
              </Typography>
            </Box>
          </Paper>

          {/* Another Sidebar Section */}
          <Paper sx={{ padding: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Featured
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Blog Post: How to Use React Effectively</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Jobs;
