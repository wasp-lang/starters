import { ClassNameValue, twJoin } from "tailwind-merge";

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
        "flex shrink-0 items-center gap-2 rounded font-semibold",
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

const sizeStyles: Record<ButtonSize, ClassNameValue> = {
  md: "px-4 py-2",
  sm: "px-3 py-1.5 text-sm",
  xs: "px-2 py-1 text-xs",
};

const variantStyles: Record<ButtonVariant, ClassNameValue> = {
  primary:
    "bg-primary-500 hover:bg-primary-500/90 active:bg-primary-500/80 text-black",
  transparent: "bg-transparent text-black",
  danger: "bg-red-600 text-white hover:bg-red-500 active:bg-red-400",
};
