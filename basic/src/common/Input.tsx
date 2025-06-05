import { twJoin } from "tailwind-merge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> {
  id: string;
  label: string;
}

export function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-black">
        {label}:
      </label>
      <input
        className={twJoin(
          "w-full border-b-2 border-neutral-800 bg-neutral-100/70 p-2 text-black placeholder:text-neutral-400",
          className,
        )}
        {...props}
      />
    </div>
  );
}
