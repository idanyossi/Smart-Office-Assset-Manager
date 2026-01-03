import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/store";

export const ProtectedRoute = observer(() => {
  const { userStore } = useStore();

  if (userStore.loadingInitial) return <p>Loading...</p>;

  return userStore.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
});