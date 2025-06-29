import { data } from "react-router-dom";
import instance from "../config/axios.config";

export const verifyLogin = async () => {
  try {
    const response = await instance.get("/auth/verify-login");
    return response;
  } catch (error) {
    console.log("error is", error);
    throw error;
  }
};

export const register = async (
  email: string,
  name: string,
  rollNumber: string
) => {
  try {
    const response = await instance.post("/auth/register", {
      email,
      name,
      rollNumber,
    });
    return response;
  } catch (error) {
    console.log("error is", error);
    throw error;
  }
};
