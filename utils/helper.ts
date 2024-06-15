import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import User from "~/models/user";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

export const encryptText = async (data: any) => {
  const token = jwt.sign(data, process.env.NEXT_PUBLIC_JWT_KEY || "");
  return token;
};

export const decryptText = async (token: string) => {
  const data: any = await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_JWT_KEY || ""
  );
  // @ts-ignore
  return data;
};

export const hashPassword = async (password: string) => {
  let hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  passRecieved: string,
  passInDB: string
) => {
  return await bcrypt.compare(passRecieved, passInDB);
};

export const getFileBuffer = async (file: any) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};

export const validateSession = async (sessionToken: string) => {
  const tokenData: any = await decode({
    token: sessionToken,
    secret: process.env.NEXT_PUBLIC_JWT_KEY || "",
  });

  if (!tokenData || !tokenData?._id) {
    return false;
  }

  const user = await User.findById(tokenData._id);
  if (!user) {
    return false;
  }
  return user;
};

export const validateUser = async () => {
  const sessionToken: any = cookies().get("next-auth.session-token");
  if (!sessionToken || !sessionToken?.value) {
    cookies().delete("next-auth.session-token");
    redirect(paths.public.signIn);
  }

  const isValid = await validateSession(sessionToken.value);

  if (!isValid) {
    cookies().delete("next-auth.session-token");
    redirect(paths.public.signIn);
  }

  return isValid;
};

export const userPublicData = ["_id", "email", "fullName", "avatar", "phone"];
export const selectFromObj = (source: any, allowed: string[]) => {
  const newData: any = {};
  Object.keys(source).forEach((key) => {
    if (allowed.includes(key)) {
      newData[key] = source[key];
    }
  });
  return newData;
};

// cloudinary --
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});
const options: any = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  resource_type: "auto",
};

export const uploadImageToCloudinary = async (
  imageBuffer: Buffer,
  fileName: string
) => {
  options.public_id = fileName;
  const value = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      })
      .end(imageBuffer);
  });
  return value;
};
export const deleteImageFromCloudinary = async (imageUrl: string) => {
  // @ts-ignore
  const publicId = imageUrl.split("/").pop().split(".")[0];
  const result = await cloudinary.uploader.destroy(publicId);
  const { result: value } = result;
  return value === "ok" ? true : value;
};
