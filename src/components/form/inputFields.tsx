"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import React, { ReactNode, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { PhotoCamera } from "@mui/icons-material";

type InputProps = {
  control: any;
  name: string;
  label: string | ReactNode;
  errors: any;
  type?: string;
};

export const TextInputField = ({
  control,
  name,
  label,
  errors,
  type,
}: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={Boolean(errors[name])} fullWidth>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput {...field} label={label} type={type || "text"} />
          {errors[name] ? (
            <FormHelperText>{errors[name].message}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};

export const EmailInputField = (props: InputProps) => {
  return <TextInputField {...props} type="email" />;
};

export const PasswordInputField = ({
  control,
  name,
  label,
  errors,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={Boolean(errors[name])} fullWidth>
          <InputLabel>{label}</InputLabel>
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
            label={label}
            type={showPassword ? "text" : "password"}
          />
          {errors[name] ? (
            <FormHelperText>{errors[name].message}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};

export const CheckInputField = ({
  control,
  name,
  label,
  errors,
}: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <FormControlLabel control={<Checkbox {...field} />} label={label} />
          {errors[name] ? (
            <FormHelperText error>{errors[name].message}</FormHelperText>
          ) : null}
        </div>
      )}
    />
  );
};

export const PhoneInputField = ({
  control,
  name,
  label,
  errors,
  type,
}: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl error={Boolean(errors[name])} fullWidth>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            {...field}
            label={label}
            type={type || "text"}
            onChange={(event) => {
              const { value } = event.target;
              if (/^\d*$/.test(value)) {
                event.target.value = value;
              } else {
                return;
              }
              field.onChange(event);
            }}
          />
          {errors[name] ? (
            <FormHelperText>{errors[name].message}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};

export const AvatarInputField = ({
  name,
  originalSrc = undefined,
  handleChange,
}: {
  name: string;
  originalSrc?: string | undefined;
  handleChange: any;
}) => {
  const [imageSrc, setImageSrc] = useState(originalSrc);

  const handleFileChange = (event: any) => {
    const file = event?.target?.files[0];
    if (file) {      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      handleChange(file);
    }
  };

  useEffect(() => {
    setImageSrc(originalSrc)
  }, [originalSrc])

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </>
        }
      >
        <Avatar src={imageSrc} alt={name} sx={{ width: 100, height: 100 }}>
          {!imageSrc && name.charAt(0)}
        </Avatar>
      </Badge>
    </>
  );
};
