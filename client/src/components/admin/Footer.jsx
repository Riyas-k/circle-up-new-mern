import { Box, Typography } from "@mui/material";

const footerStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  backgroundColor: "background.paper",
  padding: "6px",
};

function Footer() {
  return (
    <div style={footerStyle}>
      {/* Footer */}
      <Box sx={{ p: 3 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Circle-up@{new Date().getFullYear()}
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
