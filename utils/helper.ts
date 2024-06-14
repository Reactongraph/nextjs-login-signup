import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export const getTokenValue = (input: string) => {
  const tokenParam = "token=";
  const startIndex = input.indexOf(tokenParam);
  if (startIndex !== -1) {
    const tokenStartIndex = startIndex + tokenParam.length;
    const tokenEndIndex =
      input.indexOf("&", tokenStartIndex) !== -1
        ? input.indexOf("&", tokenStartIndex)
        : input.length;
    let token = input.substring(tokenStartIndex, tokenEndIndex);
    return token;
  }
  return null;
};

export const getVerifyEmailTemplate = (link: string) => {
  let text = fs.readFileSync(path.resolve("/emailTemplates/veify.html"), {
    encoding: "utf-8",
    flag: "r",
  });
  text = text.replace("{{LINK}}", link);
  return text;
};

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
