import { Link } from "react-router-dom";
import { VerifyEmailForm } from "wasp/client/auth";
import { AuthLayout } from "./components/AuthLayout";

export function EmailVerificationPage() {
  return (
    <AuthLayout>
      <VerifyEmailForm />
      <br />
      <span className="text-sm font-medium text-neutral-900">
        Email verified successfully!{" "}
        <Link to="/login" className="underline font-semibold">
          Go to login
        </Link>
        .
      </span>
    </AuthLayout>
  );
}
