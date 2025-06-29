import instance from "../config/axios.config";

export const getProduct = async () => {
  try {
    const response = await instance.get("/products/get-product");

    console.log("response is", response);
  } catch (error) {
    console.log("error is", error);
    return null;
  }
};
