import { Navigate, Outlet } from "react-router-dom";
import { AuthContextType, useAuth } from "../context/AuthContext";

const ClerksLayout = () => {
  const { role } = useAuth() as AuthContextType;

  if (role !== "CLERK") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 bg-base-200 ">
        <div className="text-3xl p-3 border-b-2 border-b-primary">Clerk</div>
      </div>
      <div className="col-span-9 bg-base-300">
        <Outlet />
      </div>
    </div>
  );
};

export default ClerksLayout;
