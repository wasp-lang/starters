import { cx } from "./tailwind";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        "shrink-0 rounded bg-wasp-yellow px-4 py-2 font-semibold text-black",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
