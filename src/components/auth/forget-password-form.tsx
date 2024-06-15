"use client";

import React, { useState, useEffect, JSX } from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { paths } from "@/paths";
import Image from "next/image";
import CustomButton from "../common/custom-button";
import { useForgetPasswordMutation } from "@/store/Features/auth/authApiSlice";
import { EmailInputField } from "../form/inputFields";
import { forgetPasswordSchema } from "@/lib/validationSchema";
import { CCGrid2 } from "../styled/styled";

type Values = zod.infer<typeof forgetPasswordSchema>;

const defaultValues = { email: "" } satisfies Values;

export function ForgetPasswordForm(): JSX.Element {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [forgetPassword, { data, isLoading }] =
    useForgetPasswordMutation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: Values) => {
    forgetPassword(data);
  };

  useEffect(() => {
    if (data) {
      setTargetEmail(data.email);
      setLinkSent(true);
    }
  }, [data]);

  return (
    <Stack spacing={4}>
      {linkSent ? (
        <CCGrid2>
          <Image
            src="/assets/success.png"
            alt="success image"
            height={200}
            width={200}
          />
          <Alert color="success">
            Password reset link is sent on{" "}
            <Typography variant="h6">{targetEmail}</Typography>
          </Alert>
        </CCGrid2>
      ) : (
        <>
          <Typography variant="h5">Forget password</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <EmailInputField
                control={control}
                name="email"
                label="Email address"
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
                Send recovery link
              </CustomButton>
              <div>
                <Link
                  component={RouterLink}
                  href={paths.public.signIn}
                  underline="hover"
                  variant="subtitle2"
                >
                  Login instead
                </Link>
              </div>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
