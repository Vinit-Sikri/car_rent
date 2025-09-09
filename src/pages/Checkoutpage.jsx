import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  useMediaQuery, 
  useTheme,
  Container,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import { Colors } from '../styles/theme/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockIcon from '@mui/icons-material/Lock';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [locationDetails, setLocationDetails] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [paymentMethod] = useState('razorpay');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!pickupDate) setPickupDate(today);
  }, []);

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
          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
            No booking details available
          </Typography>
          <Button onClick={() => navigate('/')} sx={{ color: 'white', borderColor: 'white' }}>
            Return Home
          </Button>
        </Card>
      </Box>
    );
  }

  const { car, days, totalPayment } = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userDetails) {
      setUserDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'location') {
      setLocationDetails(value);
    } else if (name === 'pickupDate') {
      setPickupDate(value);
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!userDetails.name.trim()) newErrors.name = "Name is required";
    if (!userDetails.email.trim()) newErrors.email = "Email is required";
    if (!userDetails.phone.trim()) newErrors.phone = "Phone is required";
    if (!locationDetails.trim()) newErrors.location = "Location is required";
    if (!pickupDate) newErrors.pickupDate = "Pickup date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/payment', {
        state: {
          car,
          days,
          totalPayment,
          userDetails,
          locationDetails,
          pickupDate,
          paymentMethod,
        },
      });
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
      '&.Mui-focused fieldset': { borderColor: '#FFD700' },
      '&.Mui-focused': {
        background: 'rgba(255, 255, 255, 0.15)',
      },
    },
    '& .MuiInputLabel-root': { 
      color: 'rgba(255, 255, 255, 0.8)',
      '&.Mui-focused': { color: '#FFD700' }
    },
    '& .MuiOutlinedInput-input': { 
      color: 'white',
      fontWeight: 500,
      '&::placeholder': { color: 'rgba(255, 255, 255, 0.5)' }
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      transition: 'color 0.3s ease',
    },
    '& .MuiFormHelperText-root': { color: '#f44336' },
    mb: 2,
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/booking', { state: { car, days } })}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              mr: 2,
              '&:hover': { background: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'white',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Secure Checkout
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={7}>
            <Card
              component="form"
              onSubmit={handleSubmit}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: 4,
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                Booking Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={userDetails.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    required
                    label="Pickup Location"
                    name="location"
                    value={locationDetails}
                    onChange={handleChange}
                    error={!!errors.location}
                    helperText={errors.location}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    label="Pickup Date"
                    name="pickupDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={pickupDate}
                    onChange={handleChange}
                    error={!!errors.pickupDate}
                    helperText={errors.pickupDate}
                    inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>
              </Grid>

              {/* Payment Method */}
              <Box sx={{ mt: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Payment Method
                </Typography>
                <Chip
                  label="Razorpay - Secure Payment Gateway"
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                    color: 'white',
                    fontWeight: 600,
                    py: 2,
                    px: 1,
                    height: 'auto',
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<LockIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                  borderRadius: '12px',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #45a049, #4CAF50)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Complete Secure Booking
              </Button>
            </Card>
          </Grid>

          {/* Summary Section */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
                position: 'sticky',
                top: 20,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={car.image}
                alt={car.name}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  {car.name}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  {car.description}
                </Typography>

                <Box 
                  sx={{ 
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '12px',
                    p: 2,
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Rate per day
                    </Typography>
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>
                      {car.rentPerDay}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Duration
                    </Typography>
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>
                      {days} day{days > 1 ? 's' : ''}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid rgba(255, 215, 0, 0.3)' }}>
                    <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>
                      Total
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 800 }}>
                      ${totalPayment}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;