import { cx } from "./tailwind";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "md" | "sm" | "xs";
  variant?: "primary" | "transparent";
};

export function Button({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        "flex shrink-0 items-center gap-2 rounded font-semibold",
        variant === "primary" &&
          "bg-wasp-yellow text-black hover:bg-wasp-yellow/90 active:bg-wasp-yellow/80",
        variant === "transparent" && "bg-transparent text-black",
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
