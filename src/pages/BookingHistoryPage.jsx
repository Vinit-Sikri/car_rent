import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Container,
  Card,
  Chip,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      setBookings(storedBookings);
    } else {
      setOpen(true);
    }
  }, [isAuth]);

  // Memoized styles
  const cardStyle = useMemo(() => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }), []);

  const handleClose = useCallback(() => {
    setOpen(false);
    navigate('/login');
  }, [navigate]);

  const handleHomeNavigate = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!isAuth) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: cardStyle }}
      >
        <DialogTitle sx={{ color: 'white' }}>Login Required</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Please log in to view your booking history.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            sx={{ 
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#1a1a1a',
              borderRadius: '8px',
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      py: 4,
    }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={handleHomeNavigate}
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
            My Bookings
          </Typography>
        </Box>

        {bookings.length === 0 ? (
          <Card sx={{
            ...cardStyle,
            p: 4,
            textAlign: 'center',
            maxWidth: 500,
            mx: 'auto',
          }}>
            <DirectionsCarIcon sx={{ fontSize: '4rem', color: 'rgba(255, 255, 255, 0.5)', mb: 2 }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              No Bookings Yet
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
              Start exploring our amazing car collection and book your first ride!
            </Typography>
            <Button
              onClick={handleHomeNavigate}
              sx={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                color: '#1a1a1a',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Browse Cars
            </Button>
          </Card>
        ) : (
          <Box sx={{
            height: 'calc(100vh - 120px)',
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.5)',
              },
            },
          }}>
            <Grid container spacing={3}>
              {bookings.map((booking, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card sx={{
                    ...cardStyle,
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                    },
                  }}>
                    <Box sx={{ p: 3 }}>
                      {/* Car Name Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <DirectionsCarIcon sx={{ color: '#FFD700', mr: 1 }} />
                        <Typography variant="h6" sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: '1.1rem'
                        }}>
                          {booking.car.name}
                        </Typography>
                      </Box>

                      {/* Payment Amount */}
                      <Box sx={{ 
                        background: 'rgba(255, 215, 0, 0.1)',
                        borderRadius: '12px',
                        p: 2,
                        mb: 2,
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        textAlign: 'center'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <AttachMoneyIcon sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                          <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                            ₹{booking.totalPayment}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Total Payment
                        </Typography>
                      </Box>

                      {/* Booking Details */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Duration:
                          </Typography>
                          <Chip 
                            label={`${booking.days} day${booking.days > 1 ? 's' : ''}`}
                            size="small"
                            sx={{ 
                              background: 'rgba(255, 255, 255, 0.2)', 
                              color: 'white',
                              fontSize: '0.75rem'
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Pickup:
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                            {new Date(booking.pickupDate).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <LocationOnIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', mt: 0.2 }} />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              Location:
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: 'white', 
                              fontWeight: 500,
                              wordBreak: 'break-word',
                              fontSize: '0.85rem',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}>
                              {booking.locationDetails}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Customer:
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                            {booking.userDetails.name}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Booking Date Footer */}
                      <Box sx={{ 
                        mt: 2, 
                        pt: 2, 
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                        textAlign: 'center'
                      }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Booked on {new Date(booking.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BookingHistoryPage;