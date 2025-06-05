import React from "react";
import { twJoin } from "tailwind-merge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "id"> {
  label: string;
}

export function Input({ className, label, ...props }: InputProps) {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-black">
        {label}
      </label>
      <input
        id={id}
        className={twJoin(
          "w-full border-b-2 border-neutral-800 bg-neutral-100/70 p-2 text-black placeholder:text-neutral-400",
          className,
        )}
        {...props}
      />
    </div>
  );
}
