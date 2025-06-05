import { twJoin } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "md" | "sm" | "xs";
  variant?: "primary" | "danger" | "transparent";
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
        variant === "primary" &&
          "bg-primary-500 hover:bg-primary-500/90 active:bg-primary-500/80 text-black",
        variant === "transparent" && "bg-transparent text-black",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-500 active:bg-red-400",
        size === "md" && "px-4 py-2",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "xs" && "px-2 py-1 text-xs",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
