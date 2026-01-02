import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";
import type { AuthFormData } from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite"; // Import observer
import { useStore } from "../../stores/store";

export const Register = observer(() => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const handleRegister = async (data: AuthFormData) => {
    const payload = {
      username: data.name,
      password: data.password,
      role: data.role, 
    };

    try {
      await userStore.register(payload);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed.");
    }
  }

  return (
    <CenteredPageWrapper>
      <AuthForm type="register" onSubmit={handleRegister} />
    </CenteredPageWrapper>
  );
});
