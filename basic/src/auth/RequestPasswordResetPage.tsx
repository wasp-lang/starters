import { ForgotPasswordForm } from "wasp/client/auth";
import { AuthLayout } from "./components/AuthLayout";

export function RequestPasswordResetPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
