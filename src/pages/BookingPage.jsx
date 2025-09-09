import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  Grid, 
  useMediaQuery, 
  useTheme,
  Container,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Colors } from '../styles/theme/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Ensure the data is available
  if (!location.state || !location.state.car) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Card sx={{ p: 4, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)' }}>
          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
            No car details available
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            sx={{ mt: 2, color: 'white', borderColor: 'white' }}
          >
            Return Home
          </Button>
        </Card>
      </Box>
    );
  }

  const { name, description, rentPerDay, image, rating = 4.8, features = ['Premium', 'Comfortable', 'Reliable'] } = location.state.car;
  const days = location.state.days || 1;
  const totalPayment = (parseFloat(rentPerDay.replace('$', '')) * days).toFixed(2);

  const steps = ['Select Car', 'Booking Details', 'Payment', 'Confirmation'];
  const activeStep = 1;

  const bookingFeatures = [
    { icon: <CheckCircleIcon />, title: 'Instant Confirmation', desc: 'Get booking confirmation immediately' },
    { icon: <SpeedIcon />, title: 'Quick Delivery', desc: 'Car delivered within 30 minutes' },
    { icon: <PaymentIcon />, title: 'Secure Payment', desc: 'Safe and encrypted transactions' },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              mr: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            Booking Confirmation
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Paper 
          sx={{ 
            mb: 4, 
            p: 3, 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel 
                  sx={{ 
                    '& .MuiStepLabel-label': { color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 },
                    '& .MuiStepIcon-root': { color: 'rgba(255, 255, 255, 0.5)' },
                    '& .MuiStepIcon-root.Mui-active': { color: '#FFD700' },
                    '& .MuiStepIcon-root.Mui-completed': { color: '#4CAF50' },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Car Details Section */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
              }}
            >
              {/* Car Image */}
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height={isMobile ? '250' : '300'}
                  image={image}
                  alt={name}
                  sx={{ objectFit: 'cover' }}
                />
                
                {/* Rating Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '20px',
                    px: 1.5,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <StarIcon sx={{ color: '#FFD700', fontSize: '1rem' }} />
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {rating}
                  </Typography>
                </Box>

                {/* Premium Badge */}
                <Chip
                  label="Premium"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                  }}
                />
              </Box>

              {/* Car Info */}
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 2, 
                    color: 'white',
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  {name}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3, 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                  }}
                >
                  {description}
                </Typography>

                {/* Features */}
                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  {features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  ))}
                </Box>

                {/* Booking Features */}
                <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                  What's Included
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {bookingFeatures.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                          borderRadius: '50%',
                          p: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {React.cloneElement(feature.icon, { fontSize: 'small' })}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem' }}>
                          {feature.desc}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Booking Summary Section */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: 3,
                height: 'fit-content',
                position: 'sticky',
                top: 20,
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1.3rem'
                }}
              >
                Booking Summary
              </Typography>

              {/* Pricing Details */}
              <Box 
                sx={{ 
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '12px',
                  p: 2.5,
                  mb: 3,
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                    Rate per day
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 600 }}>
                    {rentPerDay}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }} />
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      Duration
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontWeight: 600 }}>
                    {days} day{days > 1 ? 's' : ''}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 215, 0, 0.3)' }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoneyIcon sx={{ color: '#FFD700', fontSize: '1.3rem' }} />
                    <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 800, fontSize: '1.1rem' }}>
                      Total
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 800, fontSize: '1.8rem' }}>
                    ${totalPayment}
                  </Typography>
                </Box>
              </Box>

              {/* Additional Info */}
              <Box 
                sx={{ 
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '10px',
                  p: 2,
                  mb: 3,
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5
                }}
              >
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#4CAF50', fontWeight: 600, fontSize: '0.9rem' }}>
                    Free Cancellation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem' }}>
                    Cancel up to 24 hours before pickup
                  </Typography>
                </Box>
              </Box>

              {/* Payment Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PaymentIcon />}
                onClick={() => {
                  navigate("/checkout", {
                    state: { car: { name, description, rentPerDay, image }, days, totalPayment },
                  });
                }}
                sx={{
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  color: '#1a1a1a',
                  borderRadius: '12px',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                  },
                  mb: 2,
                }}
              >
                Proceed to Payment
              </Button>

              <Typography 
                variant="body2" 
                sx={{ 
                  textAlign: 'center', 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem'
                }}
              >
                Secure payment powered by industry-leading encryption
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingPage;