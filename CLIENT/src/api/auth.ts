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
