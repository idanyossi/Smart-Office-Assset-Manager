import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";
import type { AuthFormData } from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async (data: AuthFormData) => {
    const payload = {
      username: data.name,
      password: data.password,
      role: data.role, 
    };

    try {
      const response = await fetch("https://localhost:7061/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert("Registration failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
        
  }

  return (
    <CenteredPageWrapper>
      <AuthForm type="register" onSubmit={handleRegister} />
    </CenteredPageWrapper>
  );
};
