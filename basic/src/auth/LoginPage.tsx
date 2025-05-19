import { Link } from "react-router-dom";
import { LoginForm } from "wasp/client/auth";
import { AuthLayout } from "./components/AuthLayout";

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
      <br />
      <span className="text-sm font-medium text-neutral-900">
        Don't have an account yet?{" "}
        <Link to="/signup" className="underline font-semibold">
          go to signup
        </Link>
        .
      </span>
      <br />
      <span className="text-sm font-medium text-neutral-900">
        Forgot your password?{" "}
        <Link to="/request-password-reset" className="underline font-semibold">
          reset it
        </Link>
        .
      </span>
    </AuthLayout>
  );
}
