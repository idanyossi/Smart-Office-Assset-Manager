import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        backgroundColor: "#0a0a0a",
        borderBottom: "1px solid #333",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flex: 1, display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            sx={{
              flex: 2,
              fontWeight: "bold",
              color: "#00adef",
              letterSpacing: ".2rem",
              textAlign: "center",
            }}
          >
            ASSET MANAGER
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/register"
              sx={{ mx: 1 }}
            >
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
              Login
            </Button>
            {/* The "Admin Only" Add button - we will logic-gate this later */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
