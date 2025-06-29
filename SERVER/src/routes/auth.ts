import { Request, Router, Response } from "express";
import {  verifyLogin } from "../controllers/auth";
import passport from "../passport";
import { User } from "../generated/prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authRoute = Router();

authRoute.get("/verify-login", verifyLogin);

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRoute.get("/callback/google", (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    { session: false },
    (err: any, user: User, info: any) => {
      console.log("error is", err);
      console.log("user is", user);
      console.log("info is", info);

      if (err) {
        res.send(
          `
        <h1 style="text-align:center">${err.message}</h1>
        `
        );
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || "Unauthorized" });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      // Set cookie
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      // Redirect to dashboard
      return res.redirect(process.env.CLIENT_DOMAIN + "/dashboard");
    }
  )(req, res);
});

export default authRoute;
