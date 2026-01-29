"use client";

import { useState } from "react";
import { validateEmail } from "@/utils/validateEmail";
import {
  SIGN_UP_FORM_ERRORS,
  USER_ERRORS,
  SYSTEM_ERRORS,
} from "@shared/errors";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export function useSignUpForm(
  onSubmit: (
    name: string,
    email: string,
    photo: string,
    password: string | undefined,
    confirmPassword: string
  ) => Promise<{ success?: boolean; error?: string }>
) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: "" }));

  const setFormError = (message: string) =>
    setErrors((prev) => ({ ...prev, general: message }));

  const validateForm = () => {
    const newErrors: FieldErrors = {};

    if (!name.trim()) newErrors.name = SIGN_UP_FORM_ERRORS.NAME_REQUIRED;
    if (!email.trim()) newErrors.email = SIGN_UP_FORM_ERRORS.EMAIL_REQUIRED;
    else if (!validateEmail(email))
      newErrors.email = SIGN_UP_FORM_ERRORS.INVALID_EMAIL;

    if (!password?.trim())
      newErrors.password = SIGN_UP_FORM_ERRORS.PASSWORD_REQUIRED;
    else if (password.length < 8)
      newErrors.password = SIGN_UP_FORM_ERRORS.PASSWORD_TOO_SHORT;

    if (!confirmPassword.trim())
      newErrors.confirmPassword = SIGN_UP_FORM_ERRORS.CONFIRM_PASSWORD_REQUIRED;
    else if (password && confirmPassword !== password)
      newErrors.confirmPassword = SIGN_UP_FORM_ERRORS.PASSWORDS_DO_NOT_MATCH;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Max size: 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await onSubmit(name, email, photo, password, confirmPassword);

      if (!res.success) {
        const errorMsg = res.error || SYSTEM_ERRORS.UNKNOWN.message;

        if (res.error?.includes("duplicate key")) {
          setFormError(USER_ERRORS.EMAIL_ALREADY_EXISTS.message);
        } else if (res.error?.includes("minimum")) {
          setFormError(SIGN_UP_FORM_ERRORS.PASSWORD_TOO_SHORT);
        } else {
          setFormError(errorMsg);
        }

        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : SYSTEM_ERRORS.UNKNOWN.message;
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
