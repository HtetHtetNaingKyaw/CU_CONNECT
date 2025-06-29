// appwrite.ts
import { Client, Storage } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config();

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
  .setProject(process.env.CU_CONNECT_APPWRITE_PROJECT_ID as string)
  .setKey(process.env.CU_CONNECT_APPWRITE_SECRET_KEY as string);

export const appwriteStorage = new Storage(client);
