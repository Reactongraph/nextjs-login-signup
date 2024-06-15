import { z as zod } from "zod";

const emailValidation = zod
  .string()
  .min(1, { message: "Email is required" })
  .email();
const passwordValidation = zod
  .string()
  .min(6, { message: "Password should be at least 6 characters" });
const fullNameValidation = zod.string().min(1, { message: "Name is required" });
const phoneValidation = zod.string().min(6, { message: "Phone is required" });

export const forgetPasswordSchema = zod.object({
  email: emailValidation,
});

export const resetPasswordSchema = zod.object({
  password: passwordValidation,
});

export const signInSchema = zod.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = zod.object({
  fullName: fullNameValidation,
  email: emailValidation,
  password: passwordValidation,
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

export const updateEmailSchema = zod.object({
  email: emailValidation,
});

export const updateProfileSchema = zod.object({
  fullName: fullNameValidation,
  phone: phoneValidation,
  avatar: zod.any(),
});

export const updatePasswordSchema = zod.object({
  password: passwordValidation,
  newPassword: passwordValidation,
});
