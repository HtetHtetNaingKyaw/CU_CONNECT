import {  useQuery } from "@tanstack/react-query";
import {  verifyLogin } from "../api/auth";
import { keys } from "./key";

export const useVerifyLogin = () => {
  return useQuery({
    queryKey: [keys.VERIFY_LOGIN],
    queryFn: verifyLogin,
  });
};

