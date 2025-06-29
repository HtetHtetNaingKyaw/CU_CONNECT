import { useNavigate } from "react-router-dom";
import { AuthContextType, useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { role } = useAuth() as AuthContextType;

  const navigate = useNavigate();

  return (
    <>
      <div className="text-2xl">{role}</div>
      <div
        className="btn btn-primary"
        onClick={() => {
          navigate("/dashboard/" + role.toLowerCase());
        }}
      >
        Go
      </div>
    </>
  );
};

export default Dashboard;
