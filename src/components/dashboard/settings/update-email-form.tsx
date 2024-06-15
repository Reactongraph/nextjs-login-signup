"use client";

import React, { useEffect,JSX } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/common/custom-button";
import { useDispatch, useSelector } from "react-redux";
import { EmailInputField } from "@/components/form/inputFields";
import { useUpdateEmailMutation } from "@/store/Features/auth/authApiSlice";
import { updateData } from "@/store/Features/auth/authSlice";
import { toast } from "react-toastify";
import { updateEmailSchema } from "@/lib/validationSchema";

type Values = zod.infer<typeof updateEmailSchema>;

const defaultValues = {
  email: "",
} satisfies Values;

export function UpdateEmailForm(): JSX.Element {
  const { email } = useSelector((store: any) => store.auth);
  const [updateEmail, { data: updateResponse, isLoading }] =
    useUpdateEmailMutation<any>();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(updateEmailSchema),
  });

  useEffect(() => {
    if (email) {
      reset({ email });
    }
  }, [email, reset]);

  const watcher = watch();
  const hasChange = watcher.email != email;

  const submitHandler = async (data: Values) => {
    updateEmail(data);
  };

  useEffect(() => {
    if (updateResponse) {
      toast.success(updateResponse.message);
      dispatch(updateData(updateResponse.data));
    }
  }, [updateResponse, dispatch]);

  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardHeader subheader="Change Email" title="Email" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <EmailInputField
                control={control}
                name="email"
                label="Email"
                errors={errors}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <CustomButton
            disabled={!hasChange || isLoading}
            loading={isLoading}
            type="submit"
            variant="contained"
          >
            Update
          </CustomButton>
        </CardActions>
      </form>
    </Card>
  );
}
