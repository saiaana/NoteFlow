"use client";

import { useRouter } from "next/navigation";
import SignUpForm from "@/app/signup/components/SignUpForm";
import FormCard from "@/components/ui/containers/FormCard";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const router = useRouter();
  const { checkAuth, signup } = useAuthStore();

  const handleSignUp = async (
    name: string,
    email: string,
    photo: string,
    password: string | undefined,
    confirmPassword: string
  ) => {
    try {
      const res = await signup(name, email, photo, password, confirmPassword);

      if (!res.success) {
        return { success: false, error: res.error };
      }

      await checkAuth();

      router.push("/notes");

      return { success: true };
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong during sign-up.";
      console.error("❌ Signup failed:", message);

      return { success: false, error: message };
    }
  };

  return (
    <FormCard
      pageTitle="Create Account"
      helperText="Fill in the details below to get started"
      authPrompt="Already have an account?"
      authLinkText="Log In"
    >
      <SignUpForm onSubmit={handleSignUp} />
    </FormCard>
  );
}
