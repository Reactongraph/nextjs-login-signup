"use server";

import { cookies } from "next/headers";
import axiosInstance from "../axiosInstance";

export const verifyEmail = async ({ code }: { code: string }) => {
  try {
    const res = await axiosInstance.post("/user/verify-email", {
      token: code,
    });
    return JSON.stringify(res.data);
  } catch (error) {
    return JSON.stringify({ status: false });
  }
};

export const verifySession = async () => {
  try {
    const sessionCookie: any = cookies().get("next-auth.session-token");
    const res = await axiosInstance.post("/user/verify-session", {
      sessionToken: sessionCookie.value,
    });
    return JSON.stringify(res.data);
  } catch (error: any) {
    return JSON.stringify({
      ...(error?.response?.data || {}),
    });
  }
};

export const verifyForgetPassword = async ({ code }: { code: string }) => {
  try {
    const res = await axiosInstance.post("/user/forget-password/verify", {
      token: code,
    });
    return JSON.stringify(res.data);
  } catch (error) {
    return JSON.stringify({ status: false });
  }
};
