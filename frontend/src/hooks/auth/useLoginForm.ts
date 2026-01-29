import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/validateEmail";
import { useAuthStore } from "@/store/useAuthStore";
import { AUTH_ERRORS, SYSTEM_ERRORS } from "../../../../shared/errors";

export function useLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
    setLoginError("");
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(AUTH_ERRORS.INVALID_EMAIL.message);
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, password);

      if (!res.success) {
        if (res.error?.toLowerCase().includes("incorrect")) {
          setLoginError(AUTH_ERRORS.INVALID_CREDENTIALS.message);
        } else {
          setLoginError(SYSTEM_ERRORS.UNKNOWN.message);
        }
        return;
      }
      router.push("/notes");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    emailError,
    loginError,
    password,
    isLoading,
    handleEmailInput,
    handlePasswordInput,
    handleSubmit,
  };
}
