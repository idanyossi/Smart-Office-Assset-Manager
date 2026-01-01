import { AuthForm } from "../../components/AuthForm/AuthForm";
import { CenteredPageWrapper } from "../../components/AuthForm/CenteredPageWrapper";

export const Register = () => {
  const handleRegister = (data: {
    name: string;
    password: string;
    role: string;
  }) => {
    // Handle registration logic here
    console.log("Registering user:", data);
  };

  return (
    <CenteredPageWrapper>
      <AuthForm type="register" onSubmit={handleRegister} />
    </CenteredPageWrapper>
  );
};
