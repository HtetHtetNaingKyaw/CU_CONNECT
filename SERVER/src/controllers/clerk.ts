import { Request, Response } from "express";
import { ID } from "node-appwrite";
import { appwriteStorage } from "../appwrite/appwrite"; // Your Appwrite SDK setup
import { InputFile } from "node-appwrite/file";
import prisma from "../prismaClient";
import jwt from "jsonwebtoken";

//clerk register 
export const register = async (req: Request, res: Response) => {
  const { email, name, rollNumber } = req.body;
  console.log(name,email,rollNumber)
  try {
    if (!email || !name || !rollNumber) {
      res.status(400).json({ message: "fill all the data!" });
      return;
    }

    const isAccountExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isAccountExists) {
      res.status(400).json({ message: "Account is already exit" });
      return;
    }

    const isRollExist = await prisma.user.findUnique({
      where: {
        rollNumber,
      },
    });

    if (isRollExist) {
      res.status(400).json({ message: "Student is already exit" });
      return;
    }

    await prisma.user.create({
      data: {
        name,
        email,
        rollNumber,
      },
    });

    res.status(200).json({
      message: "Register successfully",
    });
  } catch (error) {
    console.log("error is", error);
    res.status(500).json({ message: "Fail to register" });
  }
};

//create activity Image from clerk
export const uploadActivityImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image } = (req.files as any) || { image: undefined };

    if (!image) {
      res.status(404).json({ message: "No image Found!" });
      return;
    }

    if (!Array.isArray(image) && image.length >= 10) {
      res
        .status(400)
        .json({ message: "over limited image that must be 10 images!" });
      return;
    }

    const uploadImages = image && Array.isArray(image) ? image : [image];

    const imageFiles = uploadImages.map((img: any) =>
      InputFile.fromBuffer(img.data, img.name)
    );

    const imageData = imageFiles.map((file: any) =>
      appwriteStorage.createFile(
        process.env.CU_CONNECT_APPWRITE_ACTIVITY_IMAGE_BUCKET_ID as string,
        ID.unique(),
        file
      )
    );

    const uploadedFiles = await Promise.all(imageData);

    const imgId = uploadedFiles.map((img) => {
      return img.$id;
    });

    const uploadToDb = imgId.map((item) => {
      return prisma.image.create({
        data: {
          appWriteImgId: item,
          activityId: id,
        },
      });
    });

    await Promise.all(uploadToDb);

    res.status(201).json({
      message: "Image Upload successfully!",
      uploadToDb,
    });
  } catch (error) {
    console.error("Error uploading file(s):", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};

//createActivity
export const createActivity = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { token } = req.cookies;

    if (!title || !content) {
      res.status(400).json({ message: "Fill all data!" });
    }

    const { role, id } = jwt.decode(token) as {
      id: string;
      role: "USER" | "ADMIN" | "CLERK" | "TEACHER";
      iat: number;
      exp: number;
    };

    console.log("clerk is", id, role);

    const activity = await prisma.activity.create({
      data: {
        title,
        content,
        clerkId: id,
      },
    });
    res.status(200).json({ message: "Ok!", activity });
  } catch (error) {
    console.log("error is", error);
    res.status(500).json({ message: "Failed to create activity!" });
  }
};
