"use client";

import React, { useEffect, JSX } from "react";
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
import {
  TextInputField,
  PhoneInputField,
  AvatarInputField,
} from "@/components/form/inputFields";
import { useUpdateProfileMutation } from "@/store/Features/auth/authApiSlice";
import { updateData } from "@/store/Features/auth/authSlice";
import { toast } from "react-toastify";
import { updateProfileSchema } from "@/lib/validationSchema";

type Values = zod.infer<typeof updateProfileSchema>;

const defaultValues = {
  fullName: "",
  phone: "",
  avatar: "",
} satisfies Values;

export function UpdateNameForm(): JSX.Element {
  const { fullName, phone, avatar } = useSelector((store: any) => store.auth);
  const [updateProfile, { data: updateResponse, isLoading }] =
    useUpdateProfileMutation<any>();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (fullName || phone) {
      reset({ fullName, phone });
    }
  }, [fullName, phone, reset]);

  const handleAvatarChange = (file: any) => {
    setValue("avatar", file);
    trigger();
  };

  const watcher = watch();
  const hasChange =
    watcher.fullName != fullName || watcher.phone != phone || watcher.avatar;

  const submitHandler = async (data: Values) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    updateProfile(formData);
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
        <CardHeader subheader="General Details" title="General" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AvatarInputField
                name={fullName}
                originalSrc={avatar}
                handleChange={handleAvatarChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInputField
                control={control}
                name="fullName"
                label="Full Name"
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PhoneInputField
                control={control}
                name="phone"
                label="Phone Number"
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
