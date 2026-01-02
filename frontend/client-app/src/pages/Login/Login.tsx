import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";
import {observer} from "mobx-react-lite"; // Import observer
import { useStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";

export const Login = observer(() => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  // Define the interface for the incoming form data
  const handleLogin = async (data: { name: string; password: string }) => {
    const payload = {
      username: data.name,
      password: data.password
    };

    try {
      await userStore.login(payload);
      
      navigate("/"); 
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid username or password");
    }
  };

  return (
    <CenteredPageWrapper>
      <AuthForm type="login" onSubmit={handleLogin} />
    </CenteredPageWrapper>
  );
});