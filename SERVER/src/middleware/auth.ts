import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET as string);

    next();
  } catch (error) {
    console.log("Error is", error);
    res.status(400).json({ message: "Invalid or expired Token" });
  }

  next();
};



export const accessRole = (param: ("USER" | "ADMIN" | "CLERK" | "TEACHER") []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    const { role } = jwt.decode(token) as {
      id: string;
      role:"USER" | "ADMIN" | "CLERK" | "TEACHER" ;
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
