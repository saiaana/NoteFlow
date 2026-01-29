import LoginForm from "@/app/login/components/LoginForm";
import FormCard from "@/components/ui/containers/FormCard";

export default function Page() {
  return (
    <FormCard
      pageTitle="Login"
      helperText="Fill in the details below to get started"
      authPrompt="Don't have an account? "
      authLinkText="Sign Up"
    >
      <LoginForm />
    </FormCard>
  );
}
