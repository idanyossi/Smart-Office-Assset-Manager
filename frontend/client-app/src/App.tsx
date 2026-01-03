import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Route: Accessible without JWT */}
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Route: Redirects to /login if no JWT exists */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
