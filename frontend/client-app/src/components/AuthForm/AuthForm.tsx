import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export interface AuthFormData {
  name: string;
  password: string;
  role: "Member" | "Admin";
}

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: AuthFormData) => void;
  isLoading?: boolean;
}

export const AuthForm = ({ type, onSubmit, isLoading }: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    password: "",
    role: "Member",
  });
  const theme = useTheme();

  const [touched, setTouched] = useState({
    name: false,
    password: false
  });

  const passwordRequirements = [
    { label: "At least 8 characters", valid: formData.password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(formData.password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(formData.password) },
    { label: "One special character (!@#$%^&*)", valid: /[!@#$%^&*]/.test(formData.password) },
  ];

  const isPasswordValid = type === "login" ? formData.password.length > 0 : passwordRequirements.every(req => req.valid);

  const isNameValid = formData.name.trim().length > 0;

  const isFormValid = isNameValid && isPasswordValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "role" ? (value as "Member" | "Admin") : value,
    });
  };

  const handleBlur = (field:"name" | "password") => {
    setTouched(prev => ({...prev, [field]: true}));
  }

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formData);
    } else {
      setTouched({ name: true, password: true });
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        bgcolor: theme.palette.background.paper,
        borderRadius: 0,
        border: `1px solid ${theme.palette.divider}`,
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.primary.main,
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {type === "login" ? "SECURE LOGIN" : "CREATE ACCOUNT"}
      </Typography>

      <Box
        component="form"
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Name Field */}
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          error={touched.name && !isNameValid}
          helperText={touched.name && !isNameValid ? "Name is required" : ""}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          error={touched.password && !isPasswordValid}
          helperText={type === 'login' && touched.password && !isPasswordValid ? "Password is required" : ""}
        />

        {type === "register" && (
          <Box sx={{ 
            p: 1.5, 
            bgcolor: theme.palette.action.hover, // Subtle background
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
              Password Requirements:
            </Typography>
            <List dense disablePadding>
              {passwordRequirements.map((req) => (
                <ListItem key={req.label} disablePadding sx={{ py: 0.2 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    {req.valid ? (
                      <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                    ) : (
                      <CancelIcon color={touched.password ? "error" : "disabled"} sx={{ fontSize: 18 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={req.label}
                    primaryTypographyProps={{
                      variant: 'caption',
                      // Color text red only if they have started typing and it's still wrong
                      color: req.valid ? 'text.primary' : (touched.password ? 'error' : 'text.secondary')
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {/* Role selection is only required for registration  */}
        {type === "register" && (
          <TextField
            select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Member">Member</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled = {isLoading || !isFormValid}
          sx={{ borderRadius: 0, mt: 2, py: 1.5, fontWeight: "bold" }}
        >
          {isLoading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              type === "login" ? "LOGIN" : "REGISTER"
            )}
        </Button>
      </Box>
    </Paper>
  );
};
