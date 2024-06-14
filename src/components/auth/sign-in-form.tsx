"use client";

import * as React from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { paths } from "@/paths";
import { toast } from "react-toastify";
import CustomButton from "../common/custom-button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = zod.object({
  email: zod.string().min(1, { message: "Required" }).email(),
  password: zod.string().min(1, { message: "Required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  email: "",
  password: "",
} satisfies Values;

export function SignInForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (data: Values) => {
    try {
      setLoading(true);
      const result: any = await signIn("credentials", {
        redirect: false,
        email: data?.email,
        password: data?.password,
      });
      setLoading(false);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      router.push(paths.private.dashboard);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

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
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
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
            loading={loading}
            disabled={loading}
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
