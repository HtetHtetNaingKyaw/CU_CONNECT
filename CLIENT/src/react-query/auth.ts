import { useMutation, useQuery } from "@tanstack/react-query";
import { register, verifyLogin } from "../api/auth";
import { keys } from "./key";
import { RegisterFormData } from "./type";

export const useVerifyLogin = () => {
  return useQuery({
    queryKey: [keys.VERIFY_LOGIN],
    queryFn: verifyLogin,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, name, rollNumber }: RegisterFormData) =>
      register(email, name, rollNumber),
  });
};
