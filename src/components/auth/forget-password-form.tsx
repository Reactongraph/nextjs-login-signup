"use client";

import * as React from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Link } from "@mui/material";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { paths } from "@/paths";
import Image from "next/image";
import CustomButton from "../common/custom-button";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "" } satisfies Values;

export function ForgetPasswordForm(): React.JSX.Element {
  const [linkSent] = React.useState<boolean>(false);
  const [targetEmail] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (data: Values) => {
    // eslint-disable-next-line no-console
    console.log("data", data);
    // data submit code
  };

  return (
    <Stack spacing={4}>
      {linkSent ? (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
        </Grid>
      ) : (
        <>
          <Typography variant="h5">Forget password</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email address"
                      type="email"
                    />
                    {errors.email ? (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />

              {errors.root ? (
                <Alert color="error">{errors.root.message}</Alert>
              ) : null}
              <CustomButton disabled={true} type="submit" variant="contained">
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
