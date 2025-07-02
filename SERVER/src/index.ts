import express from "express";
import authRoute from "./routes/auth";
// import productRoute from "./routes/products";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkRoute } from "./routes/clerk";
import { urlencoded } from "express";
import fileUpload from "express-fileupload";


const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute); //localhost:3000/api/activity/create-activity
app.use("/api/clerk", clerkRoute);
// app.use("/api/products", productRoute)

app.listen(3000, () => {
  console.log(`app is running on port 3000`);
});
