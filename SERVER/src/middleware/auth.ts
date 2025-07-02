import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  console.log("token is",token)

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: "USER" | "ADMIN" | "CLERK" | "TEACHER";
      iat: number;
      exp: number;
    };

    (req as any).user = decoded;
    next();
  } catch (error) {
    console.log("Token error:", error);
    res.status(401).json({ message: "Invalid or expired Token" });
  }
};

export const accessRole = (
  param: ("USER" | "ADMIN" | "CLERK" | "TEACHER")[]
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    const { role } = jwt.decode(token) as {
      id: string;
      role: "USER" | "ADMIN" | "CLERK" | "TEACHER";
      iat: number;
      exp: number;
    };

    if (!param.includes(role)) {
      res.status(403).json({ message: "Forbidden: Invalid Role" });
      return;
    }

    next();
  };
};
