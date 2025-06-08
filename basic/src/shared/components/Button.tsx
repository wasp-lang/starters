import { Link as RouterLink } from "react-router-dom";
import { ClassNameValue, twJoin } from "tailwind-merge";
import { Link, Routes } from "wasp/client/router";

type ButtonSize = "md" | "sm" | "xs";
type ButtonVariant = "primary" | "danger" | "transparent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  type = "button",
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twJoin(
        "flex shrink-0 items-center gap-2 rounded-md font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = WaspLinkProps & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type WaspLinkProps = Omit<Parameters<typeof RouterLink>[0], "to"> & {
  search?: Record<string, string>;
  hash?: string;
} & Routes;

export function ButtonLink({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={twJoin(
        "flex shrink-0 items-center gap-2 rounded-md font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

const sizeStyles: Record<ButtonSize, ClassNameValue> = {
  md: "px-4 py-2",
  sm: "px-3 py-1.5 text-sm",
  xs: "px-2 py-1 text-xs",
};

const variantStyles: Record<ButtonVariant, ClassNameValue> = {
  primary:
    "bg-primary-500 hover:bg-primary-400 active:bg-primary-300 text-black",
  transparent: "bg-transparent text-black",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};
