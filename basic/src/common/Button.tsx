import { ButtonHTMLAttributes } from "react";
import { cx } from "./tailwind";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        "text-black rounded font-semibold px-4 py-2 bg-wasp-yellow shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
