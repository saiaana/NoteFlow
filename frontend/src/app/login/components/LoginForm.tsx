"use client";

import { useState } from "react";

import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import LongButton from "../../../components/ui/buttons/LongButton";
import { useLoginForm } from "@/hooks/auth/useLoginForm";

export default function LoginForm() {
  const {
    email,
    emailError,
    loginError,
    handlePasswordInput,
    handleEmailInput,
    handleSubmit,
    isLoading,
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          fullWidth
          value={email}
          onChange={handleEmailInput}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          onChange={handlePasswordInput}
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

        {loginError && (
          <Typography
            color="error"
            textAlign="center"
            variant="body2"
            fontWeight={500}
          >
            {loginError}
          </Typography>
        )}
        <LongButton buttonText={isLoading ? "Logging in..." : "Log in"} />
      </Stack>
    </form>
  );
}
