import { Box, Typography, IconButton } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        background: "linear-gradient(to bottom, #a1a1aa,#a1a1aa )",
        color: "white",
        width: "100vw",
        padding: "0.3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2"
      sx={{  marginLeft: "4px"}}>
      </Typography>
    </Box>
  );
};

export default Footer;
