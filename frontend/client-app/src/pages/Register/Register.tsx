import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";
import type { AuthFormData } from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite"; // Import observer
import { useStore } from "../../stores/store";
import { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

export const Register = observer(() => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const [feedback,setFeedback] = useState<{open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  }>({open:false,message:'',severity:'success'});

  const handleRegister = async (data: AuthFormData) => {
    const payload = {
      username: data.name,
      password: data.password,
      role: data.role, 
    };

    try {
      await userStore.register(payload);
      setFeedback({ open: true, message: "Registration successful! Redirecting...", severity: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      let detail = "Registration failed. Please check your details.";
      if (axios.isAxiosError(error)) {
        detail = error.response?.data?.message || detail;
      }
      setFeedback({ open: true, message: detail, severity: "error" });
    }
  }

  return (
    <CenteredPageWrapper>
      <AuthForm type="register" onSubmit={handleRegister} />

      <Snackbar open={feedback.open} autoHideDuration={6000} onClose={() => setFeedback(prev => ({...prev, open:false}))} anchorOrigin={{vertical: "top", horizontal:"center"}} 
        sx={{ 
        top: '80px !important'
        }}
        >
        <Alert 
        onClose={() => setFeedback(prev => ({ ...prev, open: false }))} 
        severity={feedback.severity} 
        variant="filled" 
        sx={{ width: '100%' }}
      >
        {feedback.message}
      </Alert>
      </Snackbar>
    </CenteredPageWrapper>
  );
});
