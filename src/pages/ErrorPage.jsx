import React from "react";
import { Link } from "react-router-dom";
import { PageContainer, MainImageBox } from "../styles/page/containers";
import { Typography, CardMedia, Box, Container, Paper } from "@mui/material";
import { Colors } from "../styles/theme/theme";
import { MyButton } from "../styles/buttons/buttons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{ 
            mx: 'auto',
            p: { xs: 3, md: 5 },
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 3, md: 5 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {/* Content Section */}
            <Box sx={{ maxWidth: "30rem", flex: 1 }}>
              {/* Error Icon */}
              <Box sx={{ mb: 3, display: { xs: 'flex', md: 'block' }, justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <ErrorOutlineIcon sx={{ color: 'white', fontSize: '2.5rem' }} />
                </Box>
              </Box>

              {/* 404 Title */}
              <Typography
                variant="h1"
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '4rem', md: '6rem' },
                  lineHeight: 1,
                  mb: 1,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                404
              </Typography>

              {/* Error Message */}
              <Typography
                variant="h4"
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Page Not Found
              </Typography>

              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1rem',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                Oops! The page you're looking for seems to have taken a detour. 
                Don't worry, let's get you back on track.
              </Typography>
              
              {/* Back Home Button */}
              <Link to={"/"} style={{ textDecoration: 'none' }}>
                <Box
                  component="button"
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
                      background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                    },
                    '&:active': {
                      transform: 'translateY(0px)',
                    }
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: '1.2rem' }} />
                  Back to Home
                </Box>
              </Link>
            </Box>

            {/* Image Section */}
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                maxWidth: { xs: 300, md: 400 }
              }}
            >
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <CardMedia
                  sx={{
                    width: { xs: 280, md: 380 },
                    height: { xs: 280, md: 350 },
                    borderRadius: '16px',
                    objectFit: 'cover'
                  }}
                  image="/images/Working.png"
                  title="404 Error - Page Not Found"
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ErrorPage;