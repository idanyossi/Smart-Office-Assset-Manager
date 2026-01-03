import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";
import { observer } from "mobx-react-lite"; // Import observer
import { useStore } from "../../stores/store";
import { Link as RouterLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Snackbar,Alert, Typography, Box, Link } from "@mui/material";
import axios from "axios";

export const Login = observer(() => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const [open,setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Define the interface for the incoming form data
  const handleLogin = async (data: { name: string; password: string }) => {
    const payload = {
      username: data.name,
      password: data.password
    };

    try {
      await userStore.login(payload);
      navigate("/"); 
    } catch (error: unknown) {
      console.error("Login failed", error);

        if (axios.isAxiosError(error)) {
        // If backend returns { message: "..." }, this captures it
        const backendMessage = error.response?.data?.message || "Invalid username or password.";
        setErrorMsg(backendMessage);
      } else {
        // Fallback for non-Axios errors
        setErrorMsg("A network error occurred. Please try again later.");
      }
        setOpen(true);
    }
  };

  return (
    <CenteredPageWrapper>
      <AuthForm type="login" onSubmit={handleLogin} isLoading={userStore.loading} />
      <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Don't have an account?{" "}
        <Link component={RouterLink} to="/register" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
          Create one now
        </Link>
      </Typography>
    </Box>

      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)} anchorOrigin={{vertical: "top", horizontal:"center"}} 
        sx={{ 
        top: '80px !important'
        }}
        >
        <Alert severity="error" variant="filled" onClose={() => setOpen(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </CenteredPageWrapper>
  );
});