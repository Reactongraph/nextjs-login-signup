"use client";

import React, { useEffect, useState, Fragment, JSX } from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { paths } from "@/paths";
import CustomButton from "../common/custom-button";
import Image from "next/image";
import { useCreateUserMutation } from "@/store/Features/auth/authApiSlice";
import {
  CheckInputField,
  EmailInputField,
  PasswordInputField,
  TextInputField,
} from "../form/inputFields";
import { signUpSchema } from "@/lib/validationSchema";
import { CCGrid2 } from "../styled/styled";

type Values = zod.infer<typeof signUpSchema>;

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  terms: false,
} satisfies Values;

export function SignUpForm(): JSX.Element {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [createUser, { data, isLoading }] = useCreateUserMutation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: Values) => {
    createUser(data);
  };

  useEffect(() => {
    if (data) {
      setTargetEmail(data.email);
      setLinkSent(true);
    }
  }, [data]);

  return (
    <Stack spacing={3}>
      {linkSent ? (
        <CCGrid2>
          <Image
            src="/assets/success.png"
            alt="success image"
            height={200}
            width={200}
          />
          <Alert color="success">
            Email verification link is sent on{" "}
            <Typography variant="h6">{targetEmail}</Typography>
          </Alert>
        </CCGrid2>
      ) : (
        <>
          <Stack spacing={1}>
            <Typography variant="h4">Sign up</Typography>
            <Typography color="text.secondary" variant="body2">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                href={paths.public.signIn}
                underline="hover"
                variant="subtitle2"
              >
                Sign in
              </Link>
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextInputField
                control={control}
                name="fullName"
                label="Full name"
                errors={errors}
              />
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
              <CheckInputField
                control={control}
                name="terms"
                label={
                  <Fragment>
                    I have read the{" "}
                    <Link
                      component={RouterLink}
                      href={paths.common.tnc}
                      target="_blank"
                    >
                      terms and conditions
                    </Link>
                  </Fragment>
                }
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
                Sign up
              </CustomButton>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
