import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

interface AuthFormData {
  name: string;
  password: string;
  role: "Member" | "Admin";
}

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: AuthFormData) => void;
}

export const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    password: "",
    role: "Member",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "role" ? (value as "Member" | "Admin") : value,
    });
  };

  return (
    <Paper
      sx={{
        p: 4,
        bgcolor: "#161616",
        borderRadius: 0,
        border: "1px solid #333",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#00adef",
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
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />

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
          onClick={() => onSubmit(formData)}
          sx={{ borderRadius: 0, mt: 2, py: 1.5, fontWeight: "bold" }}
        >
          {type === "login" ? "LOGIN" : "REGISTER"}
        </Button>
      </Box>
    </Paper>
  );
};
