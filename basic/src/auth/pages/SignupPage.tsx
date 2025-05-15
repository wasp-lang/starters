import { Link } from "react-router-dom";
import { SignupForm } from "wasp/client/auth";
import { AuthLayout } from "../AuthLayout";

export function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm
        additionalFields={[
          {
            name: "username",
            type: "input",
            label: "Username",
            validations: {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must be at least 6 characters long",
              },
            },
          },
        ]}
      />
      <br />
      <span className="text-sm font-medium text-gray-900">
        Already have an account?{" "}
        <Link to="/login" className="underline font-semibold">
          go to login
        </Link>
        .
      </span>
    </AuthLayout>
  );
}
