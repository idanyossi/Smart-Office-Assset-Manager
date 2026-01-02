import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export const Navbar = observer(() => {
  const { userStore } = useStore();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
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
              color: theme.palette.primary.main,
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
            {userStore.token ? (
              /* LOGGED IN STATE */
              <>
                <Typography 
                    variant="body2" 
                    sx={{ color: theme.palette.text.secondary, mr: 2, fontWeight: 'medium' }}
                >
                  Hello, <strong>{userStore.user}</strong>
                </Typography>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small" 
                    onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              /* LOGGED OUT STATE */
              <>
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
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
