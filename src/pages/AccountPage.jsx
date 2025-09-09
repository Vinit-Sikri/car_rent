import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/user/UserSlice";
import { MyButton } from "../styles/buttons/buttons";
import { PageContainer } from "../styles/page/containers";
import { Typography, Button, Paper, Box, Container, Avatar } from "@mui/material";
import { Logout, History, AccountCircle } from "@mui/icons-material";
import { Colors } from "../styles/theme/theme";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();

  const handleBookingHistory = () => {
    navigate('/booking-history');
  };

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  return isAuth ? (
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
          sx={{
            maxWidth: 400,
            mx: 'auto',
            p: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              fontSize: '2rem',
            }}
          >
            <AccountCircle sx={{ fontSize: '3rem' }} />
          </Avatar>

          {/* Welcome Message */}
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Welcome Back!
          </Typography>

          {/* User Email */}
          <Box
            sx={{
              background: 'rgba(255, 215, 0, 0.1)',
              borderRadius: '12px',
              p: 2,
              mb: 4,
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5 }}
            >
              Signed in as
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#FFD700',
                fontWeight: 600,
                wordBreak: 'break-word'
              }}
            >
              {email}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<History />}
              onClick={handleBookingHistory}
              fullWidth
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                borderRadius: '12px',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              View Booking History
            </Button>

            <Button
              variant="contained"
              startIcon={<Logout />}
              onClick={handleLogout}
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #f44336, #e53935)',
                color: 'white',
                borderRadius: '12px',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #e53935, #f44336)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

export default AccountPage;