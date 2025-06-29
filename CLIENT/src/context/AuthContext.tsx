import { createContext, ReactNode, useContext } from "react";
import { useVerifyLogin } from "../react-query/auth";

export type AuthContextType = {
  isLogin: boolean;
  role: "ADMIN" | "USER" | "CLERK" | "TEACHER";
  id: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, isSuccess, data: userData } = useVerifyLogin();

  console.log("response is", userData);

  const data = {
    isLogin: isSuccess,
    role: userData?.data?.role,
    id: userData?.data?.id,
  };

  return (
    <AuthContext.Provider value={data}>
      {isLoading ? (
        <div className=" flex justify-center items-center h-screen ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
