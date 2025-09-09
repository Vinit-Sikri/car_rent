import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import { Container, Typography, Paper, Divider, Box } from "@mui/material";
import { PageContainer } from "../styles/page/containers";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const RegisterPage = () => {
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
              <PersonAddIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
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
              Create Account
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.95rem'
              }}
            >
              Join us and start your car rental journey
            </Typography>
          </Box>

          {/* Register Form */}
          <Register />

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

          {/* Login Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2
              }}
            >
              Already have an account?
            </Typography>
            
            <Link 
              to="/login" 
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
              <LoginIcon sx={{ fontSize: '1rem' }} />
              Sign In Instead
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;