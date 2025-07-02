import { Navigate, Outlet } from "react-router-dom";
import { AuthContextType, useAuth } from "../context/AuthContext";
import C_sideBar from "../components/C_sideBar";

const ClerksLayout = () => {
  const { role } = useAuth() as AuthContextType;

  if (role !== "CLERK") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="md:block col-span-3 hidden bg-base-200 h-screen">
        <C_sideBar />
      </div>
      <div className="md:col-span-9 col-span-12 h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default ClerksLayout;
