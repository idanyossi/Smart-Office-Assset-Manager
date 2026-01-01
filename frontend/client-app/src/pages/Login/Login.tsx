import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";

export const Login = () => {
  const handleLogin = (data: {
    name: string;
    password: string;
    role: string;
  }) => {
    // Handle registration logic here
    console.log("Logging in user:", data);
  };

  return (
    <CenteredPageWrapper>
      <AuthForm type="login" onSubmit={handleLogin} />
    </CenteredPageWrapper>
  );
};
