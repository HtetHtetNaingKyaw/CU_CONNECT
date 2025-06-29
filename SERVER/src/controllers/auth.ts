import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";



//to verify token
export const verifyLogin = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(400).json({ message: "User is not login!" });
    return;
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET as string);

    const { role, id } = jwt.decode(token) as {
      id: string;
      role: "USER" | "ADMIN" | "CLERK" | "TEACHER";
      iat: number;
      exp: number;
    };

    res.status(200).json({ message: "Login success", role, id });
  } catch (error) {
    console.log("Error is", error);
    res.status(400).json({ message: "failed to verify login" });
  }
};
