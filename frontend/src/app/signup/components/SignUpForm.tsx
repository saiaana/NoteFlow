"use client";

import { useState } from "react";

import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LongButton from "../../../components/ui/buttons/LongButton";
import AvatarUpload from "./AvatarUpload";

import { useSignUpForm } from "@/hooks/auth/useSignUpForm";

import { User } from "@/types/auth";

type SignUpFormProps = {
  onSubmit: (
    name: string,
    email: string,
    photo: string,
    password: string | undefined,
    confirmPassword: string
  ) => Promise<{ success?: boolean; error?: string; data?: User }>;
};

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const {
    name,
    email,
    password,
    confirmPassword,
    photo,
    errors,
    isLoading,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handlePhotoChange,
    handleSubmit,
    clearError,
  } = useSignUpForm(onSubmit);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <AvatarUpload photo={photo} onPhotoChange={handlePhotoChange} />
        <TextField
          label="Name"
          placeholder="John Doe"
          fullWidth
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) clearError("name");
          }}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          fullWidth
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) clearError("email");
          }}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          value={password || ""}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) clearError("password");
          }}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) clearError("confirmPassword");
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <LongButton
          buttonText={isLoading ? "Signing Up..." : "Sign Up"}
          disabled={isLoading}
        />
        {errors.general && (
          <Typography color="error" align="center">
            {errors.general}
          </Typography>
        )}
      </Stack>
    </form>
  );
}
