"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import CustomButton from "../common/custom-button";
import { useResetPasswordMutation } from "@/store/Features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { PasswordInputField } from "../form/inputFields";
import { resetPasswordSchema } from "@/lib/validationSchema";
import { CCGrid } from "../styled/styled";

type Values = zod.infer<typeof resetPasswordSchema>;

const defaultValues = { password: "" } satisfies Values;

export function ResetPasswordForm({ token }: { token: string }) {
  const [resetPassword, { data, isLoading }] = useResetPasswordMutation<any>();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: Values) => {
    resetPassword({ ...data, token });
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      router.push(paths.public.signIn);
    }
  }, [data, router]);

  return (
    <CCGrid>
      <Stack width={500} spacing={4}>
        <Typography variant="h5">Change password</Typography>
        <Alert color="warning" severity="warning">
          You have to login again after the password is changed!
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <PasswordInputField
              control={control}
              name="password"
              label="New Password"
              errors={errors}
            />
            {errors.root ? (
              <Alert color="error">{errors.root.message}</Alert>
            ) : null}
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              variant="contained"
            >
              Submit
            </CustomButton>
          </Stack>
        </form>
      </Stack>
    </CCGrid>
  );
}
