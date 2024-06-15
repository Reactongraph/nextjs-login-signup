"use client";

import React, { useEffect } from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { paths } from "@/paths";
import { toast } from "react-toastify";
import CustomButton from "../common/custom-button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/store/Features/auth/authApiSlice";
import { EmailInputField, PasswordInputField } from "../form/inputFields";
import { signInSchema } from "@/lib/validationSchema";

type Values = zod.infer<typeof signInSchema>;

const defaultValues = {
  email: "",
  password: "",
} satisfies Values;

export function SignInForm(): React.JSX.Element {
  const [loginUser, { data, isLoading }] = useLoginUserMutation<any>();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: Values) => {
    loginUser(data);
  };

  useEffect(() => {
    if (data) {
      const { token, data: userData } = data;
      try {
        const result: any = signIn("credentials", {
          redirect: true,
          callbackUrl: paths.private.dashboard,
          data: JSON.stringify({ token, ...userData }),
        });
        if (result.error) {
          toast.error(result.error);
          return;
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  }, [data, router]);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{" "}
          <Link
            component={RouterLink}
            href={paths.public.signUp}
            underline="hover"
            variant="subtitle2"
          >
            Sign up
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <EmailInputField
            control={control}
            name="email"
            label="Email address"
            errors={errors}
          />
          <PasswordInputField
            control={control}
            name="password"
            label="Password"
            errors={errors}
          />
          <div>
            <Link
              component={RouterLink}
              href={paths.public.forgetPassword}
              underline="hover"
              variant="subtitle2"
            >
              Forget password
            </Link>
          </div>
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <CustomButton
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            variant="contained"
          >
            Sign in
          </CustomButton>
        </Stack>
      </form>
    </Stack>
  );
}
