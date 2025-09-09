import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  Typography,
  CardMedia,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Container,
  Chip,
  IconButton,
} from "@mui/material";
import { Colors } from "../styles/theme/theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CarRentalIcon from "@mui/icons-material/CarRental";
import StarIcon from "@mui/icons-material/Star";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import bannerImage from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [selectedCar, setSelectedCar] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const bookingRef = useRef(null);
  const vehicleModelsRef = useRef(null);

  const carModels = [
    {
      name: "Sedan",
      description: "Comfortable and efficient for city drives.",
      rentPerDay: "$40",
      originalPrice: "$50",
      rating: 4.8,
      features: ["Fuel Efficient", "Comfortable", "City Drive"],
      image: "https://stimg.cardekho.com/images/car-images/large/Hyundai/Verna/9744/1694602499482/front-left-side-47.jpg",
      popular: false,
    },
    {
      name: "SUV",
      description: "Perfect for off-road adventures and more space.",
      rentPerDay: "$60",
      originalPrice: "$75",
      rating: 4.9,
      features: ["Spacious", "Off-Road", "Family"],
      image: "https://imgd.aeplcdn.com/600x337/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
      popular: true,
    },
    {
      name: "Convertible",
      description: "Enjoy the open air with this stylish option.",
      rentPerDay: "$80",
      originalPrice: "$95",
      rating: 4.7,
      features: ["Stylish", "Open Air", "Premium"],
      image: "https://imgd.aeplcdn.com/600x337/n/cw/ec/149075/z4-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
      popular: false,
    },
    {
      name: "Luxury",
      description: "Experience the ultimate in comfort and style.",
      rentPerDay: "$120",
      originalPrice: "$150",
      rating: 5.0,
      features: ["Luxury", "Premium", "Comfort"],
      image: "https://imgd.aeplcdn.com/600x337/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
      popular: true,
    },
    {
      name: "Sports Car",
      description: "High-performance and stylish, perfect for speed enthusiasts.",
      rentPerDay: "$150",
      originalPrice: "$200",
      rating: 4.9,
      features: ["High Performance", "Speed", "Luxury"],
      image: "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Lamborghini-Revuelto-010220241506.jpg",
      popular: true,
    },
    {
      name: "Electric",
      description: "Eco-friendly and efficient for modern driving.",
      rentPerDay: "$110",
      originalPrice: "$130",
      rating: 4.8,
      features: ["Eco-Friendly", "Silent", "Modern"],
      image: "https://media.zigcdn.com/media/model/2023/Sep/tata-nexon-ev_360x240.jpg",
      popular: false,
    },
  ];

  const features = [
    { icon: <SpeedIcon />, title: "Fast Delivery" },
    { icon: <CheckCircleIcon />, title: "Eco Friendly" },
    { icon: <CheckCircleIcon />, title: "100% Safe" },
    { icon: <ThumbUpIcon />, title: "Top Rated" },
  ];

  const handleBookNowClick = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVehicleClick = () => {
    if (vehicleModelsRef.current) {
      vehicleModelsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConfirmBookingClick = () => {
    if (!isAuth) {
      alert("Please log in first to rent a car.");
      return;
    }

    const car = carModels.find((model) => model.name === selectedCar);
    if (car) {
      navigate("/booking", { state: { car, days: rentalDays } });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 4, pb: 8 }}>
        {/* Hero Section */}
        <Grid container spacing={4} sx={{ mb: 8, alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: { xs: "2rem", md: "3rem" },
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Drive Your
                <br />
                <span style={{ color: "#FFD700" }}>Dream Car</span>
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  fontWeight: 300,
                }}
              >
                Premium car rental service with the finest selection of vehicles
                for every occasion and adventure.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                {features.map((feature, index) => (
                  <Chip
                    key={index}
                    icon={feature.icon}
                    label={feature.title}
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleVehicleClick}
                  sx={{
                    background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
                    borderRadius: "50px",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
                    },
                  }}
                >
                  Explore Fleet
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleBookNowClick}
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Quick Book
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={bannerImage}
                alt="Luxury Car"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 80,
                  height: 80,
                  background: "linear-gradient(45deg, #FFD700, #FFA500)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                  #1
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Vehicle Models Section */}
        <Box ref={vehicleModelsRef} sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
                color: "white",
              }}
            >
              Premium Fleet
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: 600, mx: "auto" }}
            >
              Choose from our carefully curated collection of premium vehicles
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {carModels.map((model, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  {model.popular && (
                    <Chip
                      label="Popular"
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 2,
                        background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      }}
                    />
                  )}

                  <CardMedia
                    component="img"
                    height="200"
                    image={model.image}
                    alt={model.name}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "12px",
                      px: 1.5,
                      py: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <StarIcon sx={{ color: "#FFD700", fontSize: "0.9rem" }} />
                    <Typography variant="body2" sx={{ color: "white", fontWeight: "bold", fontSize: "0.8rem" }}>
                      {model.rating}
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "white",
                        fontSize: "1.2rem",
                      }}
                    >
                      {model.name}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: "rgba(255, 255, 255, 0.8)", 
                        mb: 2,
                        fontSize: "0.9rem",
                      }}
                    >
                      {model.description}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 0.5, mb: 2, flexWrap: "wrap" }}>
                      {model.features.slice(0, 3).map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            fontSize: "0.65rem",
                            height: "24px",
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            color: "#FFD700",
                            fontSize: "1.4rem",
                          }}
                        >
                          {model.rentPerDay}
                          <Typography
                            component="span"
                            sx={{ 
                              fontSize: "0.7rem", 
                              color: "rgba(255, 255, 255, 0.6)",
                              ml: 0.5,
                            }}
                          >
                            /day
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            textDecoration: "line-through",
                            fontSize: "0.8rem",
                          }}
                        >
                          {model.originalPrice}
                        </Typography>
                      </Box>
                      
                      <IconButton
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(45deg, #FF8E53, #FF6B6B)",
                          },
                        }}
                      >
                        <CarRentalIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Booking Section */}
        <Box ref={bookingRef}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
                color: "white",
              }}
            >
              Quick Booking
            </Typography>
          </Box>

          <Card
            sx={{
              maxWidth: 500,
              mx: "auto",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                select
                label="Select Your Dream Car"
                fullWidth
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                SelectProps={{ native: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.8)" },
                  "& .MuiOutlinedInput-input": { color: "white" },
                }}
              >
                <option value="" style={{ background: "#1a1a1a", color: "white" }}>
                  
                </option>
                {carModels.map((model) => (
                  <option key={model.name} value={model.name} style={{ background: "#1a1a1a", color: "white" }}>
                    {model.name} - {model.rentPerDay}/day
                  </option>
                ))}
              </TextField>

              <TextField
                type="number"
                label="Rental Duration (Days)"
                value={rentalDays}
                onChange={(e) => setRentalDays(e.target.value)}
                fullWidth
                InputProps={{ inputProps: { min: 1 } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.8)" },
                  "& .MuiOutlinedInput-input": { color: "white" },
                }}
              />

              {selectedCar && (
                <Box
                  sx={{
                    background: "rgba(255, 215, 0, 0.1)",
                    borderRadius: "12px",
                    p: 2,
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#FFD700", fontWeight: "bold" }}>
                    Total: {carModels.find(car => car.name === selectedCar)?.rentPerDay.replace('$', '') * rentalDays 
                    ? `$${carModels.find(car => car.name === selectedCar)?.rentPerDay.replace('$', '') * rentalDays}` 
                    : "Select a car"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    {rentalDays} days rental
                  </Typography>
                </Box>
              )}

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleConfirmBookingClick}
                disabled={!selectedCar}
                sx={{
                  background: selectedCar 
                    ? "linear-gradient(45deg, #FFD700, #FFA500)"
                    : "rgba(255, 255, 255, 0.2)",
                  color: selectedCar ? "#1a1a1a" : "rgba(255, 255, 255, 0.5)",
                  borderRadius: "12px",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": {
                    background: selectedCar ? "linear-gradient(45deg, #FFA500, #FFD700)" : "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {selectedCar ? "Confirm Booking" : "Select a Car First"}
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;