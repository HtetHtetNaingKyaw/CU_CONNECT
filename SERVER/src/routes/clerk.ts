import { Router } from "express";
import {
  createActivity,
  register,
  uploadActivityImage,
} from "../controllers/clerk";
import { accessRole, verifyToken } from "../middleware/auth";

export const clerkRoute = Router();

clerkRoute.use(verifyToken);
clerkRoute.use(accessRole(["CLERK"]));

clerkRoute.post("/register", register);

clerkRoute.post("/create-activity-img/:id", uploadActivityImage);
clerkRoute.post("/create-activity/", createActivity);
