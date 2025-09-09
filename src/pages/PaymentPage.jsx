import React, { useState, useCallback, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Card,
  Grid,
  Container,
  IconButton,
  Chip
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Early return for missing data
  if (!state) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Card sx={{ p: 4, background: 'rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
            No payment details available
          </Typography>
          <Button onClick={() => navigate('/')} sx={{ color: 'white' }}>
            Return Home
          </Button>
        </Card>
      </Box>
    );
  }

  const { car, days, totalPayment, userDetails, locationDetails, pickupDate } = state;

  // Memoized styles
  const cardStyle = useMemo(() => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    p: 4,
  }), []);

  const handlePayment = useCallback(() => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: totalPayment * 100,
      currency: 'INR',
      name: 'Car Rental Service',
      description: 'Booking Payment',
      handler: function (response) {
        const bookingDetails = {
          car, days, totalPayment, userDetails, locationDetails, pickupDate,
          paymentId: response.razorpay_payment_id,
          date: new Date().toISOString(),
        };

        const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        localStorage.setItem('bookings', JSON.stringify([...allBookings, bookingDetails]));

        setPaymentSuccess(true);
        setTimeout(() => navigate('/booking-history'), 2000);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      theme: { color: '#667eea' },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }, [totalPayment, car, days, userDetails, locationDetails, pickupDate, navigate]);

  const handleConfirm = useCallback((confirm) => {
    if (confirm) handlePayment();
    setIsPopupOpen(false);
  }, [handlePayment]);

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/checkout', { state })}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              mr: 2,
              '&:hover': { background: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{
            fontWeight: 700,
            color: 'white',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}>
            Secure Payment
          </Typography>
        </Box>

        {/* Security Banner */}
        <Card sx={{
          mb: 4,
          background: 'rgba(76, 175, 80, 0.1)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          borderRadius: '16px',
          p: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SecurityIcon sx={{ color: '#4CAF50', fontSize: '2rem' }} />
            <Box>
              <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                Secure Payment Gateway
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Protected by 256-bit SSL encryption
              </Typography>
            </Box>
          </Box>
        </Card>

        <Grid container spacing={4}>
          {/* Booking Summary */}
          <Grid item xs={12} md={7}>
            <Card sx={cardStyle}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                Booking Summary
              </Typography>

              {/* Car Details */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 600, mb: 2 }}>
                  {car.name}
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                  {car.description}
                </Typography>
              </Box>

              {/* Customer Info */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Customer
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 500 }}>
                    {userDetails.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Pickup Date
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 500 }}>
                    {new Date(pickupDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Location
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 500 }}>
                    {locationDetails}
                  </Typography>
                </Grid>
              </Grid>

              <Chip 
                label={`${days} day${days > 1 ? 's' : ''}`}
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </Card>
          </Grid>

          {/* Payment Section */}
          <Grid item xs={12} md={5}>
            <Card sx={{
              ...cardStyle,
              background: 'rgba(255, 255, 255, 0.15)',
              position: 'sticky',
              top: 20,
            }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Payment Details
              </Typography>

              {/* Total Amount */}
              <Box sx={{ 
                background: 'rgba(255, 215, 0, 0.1)',
                borderRadius: '16px',
                p: 3,
                mb: 3,
                border: '2px solid rgba(255, 215, 0, 0.3)',
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                  Total Amount
                </Typography>
                <Typography variant="h3" sx={{ color: '#FFD700', fontWeight: 800 }}>
                  ₹{totalPayment}
                </Typography>
              </Box>

              {/* Payment Method */}
              <Card sx={{ 
                background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                p: 2,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <Box sx={{
                  width: 50,
                  height: 30,
                  background: 'white',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1976d2',
                  fontWeight: 'bold',
                  fontSize: '0.7rem'
                }}>
                  RAZOR
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                    Razorpay Gateway
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Card, UPI, Netbanking & more
                  </Typography>
                </Box>
                <CheckCircleIcon sx={{ color: '#4CAF50', ml: 'auto' }} />
              </Card>

              {/* Pay Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PaymentIcon />}
                onClick={() => setIsPopupOpen(true)}
                sx={{
                  background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                  borderRadius: '16px',
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #45a049, #4CAF50)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Pay Securely Now
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog 
        open={isPopupOpen} 
        onClose={() => handleConfirm(false)}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 600 }}>
          Confirm Payment
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Proceed with payment of ₹{totalPayment} for your car rental?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => handleConfirm(true)} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              borderRadius: '12px',
            }}
          >
            Confirm & Pay
          </Button>
          <Button 
            onClick={() => handleConfirm(false)} 
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
              borderRadius: '12px',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Notification */}
      {paymentSuccess && (
        <Box sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(45deg, #4CAF50, #45a049)',
          color: 'white',
          p: 4,
          borderRadius: '20px',
          textAlign: 'center',
          zIndex: 9999,
        }}>
          <CheckCircleIcon sx={{ fontSize: '3rem', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Payment Successful!
          </Typography>
          <Typography>
            Your booking confirmed. Redirecting...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;