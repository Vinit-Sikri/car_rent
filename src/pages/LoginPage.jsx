import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Paper, Divider, Box } from "@mui/material";
import Login from "../components/Login";
import { PageContainer } from "../styles/page/containers";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const LoginPage = () => {
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
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{ 
            maxWidth: 400,
            mx: 'auto',
            p: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <LoginIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
            </Box>
            
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              Welcome Back
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.95rem'
              }}
            >
              Sign in to continue your car rental journey
            </Typography>
          </Box>

          {/* Login Form */}
          <Login />

          {/* Divider */}
          <Divider 
            sx={{ 
              my: 3, 
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&::before, &::after': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }
            }} 
          />

          {/* Register Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2
              }}
            >
              Don't have an account?
            </Typography>
            
            <Link 
              to="/register" 
              style={{ 
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FFD700',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                background: 'rgba(255, 215, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 215, 0, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 215, 0, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <PersonAddIcon sx={{ fontSize: '1rem' }} />
              Create Account
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;