"use client";

import * as React from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { paths } from "@/paths";
import CustomButton from "../common/custom-button";
import Image from "next/image";
import { Grid } from "@mui/material";
import { useAction } from "@/hooks/use-action";
import { signup } from "@/lib/actions/auth";
import { toast } from "react-toastify";

const schema = zod.object({
  fullName: zod.string().min(1, { message: "Required" }),
  email: zod.string().min(1, { message: "Required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  terms: false,
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const [linkSent, setLinkSent] = React.useState<boolean>(false);
  const [targetEmail, setTargetEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const { execute, loading } = useAction();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (data: Values) => {
    let result: any = await execute(signup, [data]);
    result = JSON.parse(result);
    if (!result.status) {
      toast.error(result.message || "Something went wrong.");
      return;
    }
    setTargetEmail(result.email);
    setLinkSent(true);
  };

  return (
    <Stack spacing={3}>
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
            Email verification link is sent on{" "}
            <Typography variant="h6">{targetEmail}</Typography>
          </Alert>
        </Grid>
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
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.fullName)}>
                    <InputLabel>Full name</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Full name"
                      autoComplete="off"
                    />
                    {errors.fullName ? (
                      <FormHelperText>{errors.fullName.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput
                      {...field}
                      autoComplete="off"
                      label="Email address"
                      type="email"
                    />
                    {errors.email ? (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      autoComplete="off"
                      endAdornment={
                        showPassword ? (
                          <VisibilityOutlinedIcon
                            cursor="pointer"
                            fontSize="small"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <VisibilityOffOutlinedIcon
                            cursor="pointer"
                            fontSize="small"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Password"
                      type={showPassword ? "text" : "password"}
                    />
                    {errors.password ? (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <div>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label={
                        <React.Fragment>
                          I have read the{" "}
                          <Link
                            component={RouterLink}
                            href={paths.common.tnc}
                            target="_blank"
                          >
                            terms and conditions
                          </Link>
                        </React.Fragment>
                      }
                    />
                    {errors.terms ? (
                      <FormHelperText error>
                        {errors.terms.message}
                      </FormHelperText>
                    ) : null}
                  </div>
                )}
              />
              {errors.root ? (
                <Alert color="error">{errors.root.message}</Alert>
              ) : null}
              <CustomButton
                loading={loading}
                disabled={loading}
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
