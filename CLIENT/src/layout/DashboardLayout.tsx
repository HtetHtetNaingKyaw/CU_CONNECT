import { Navigate, Outlet } from "react-router-dom";
import { AuthContextType, useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { isLogin } = useAuth() as AuthContextType;
  console.log(isLogin);

  return isLogin ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
