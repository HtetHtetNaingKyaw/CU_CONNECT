import instance from "../config/axios.config";

export const register = async (
  email: string,
  name: string,
  rollNumber: string
) => {
  try {
    const response = await instance.post("/clerk/register", {
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

export const createActivity = async (
  title: string,
  content: string
) => {
  try {
    const res = await instance.post("/clerk/create-activity", {title,content}, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log("error is", error);
    throw error;
  }
};

export const uploadActivityImages = async (
  activityId: string,
  image: File[]
) => {
  try {
    const formData = new FormData();

    image.forEach((file) => formData.append("image", file));

    const res = await instance.post(
      `/clerk/create-activity-img/${activityId}`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
