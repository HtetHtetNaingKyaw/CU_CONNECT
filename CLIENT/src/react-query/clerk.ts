import { useMutation } from "@tanstack/react-query";
import { createActivity, register, uploadActivityImages } from "../api/clerk";
import { RegisterFormData } from "./type";
export type Activity = {
  title: string;
  content: string;
};

export type Image = {
  activityId: string;
  image: File[];
};
export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, name, rollNumber }: RegisterFormData) =>
      register(email, name, rollNumber),
  });
};

export const useUploadActivity = () => {
  return useMutation({
    mutationFn: ({ title, content }: Activity) =>
      createActivity(title, content),
  });
};

export const useUploadActivityImage = () => {
  return useMutation({
    mutationFn: ({ activityId, image }: Image) =>
      uploadActivityImages(activityId, image),
  });
};
