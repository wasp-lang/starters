import React from "react";
import { ControllerFieldState } from "react-hook-form";
import { twJoin } from "tailwind-merge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "id"> {
  label: string;
  fieldState: ControllerFieldState;
}

export function Input({ className, label, fieldState, ...props }: InputProps) {
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
      {fieldState.error && (
        <span className="text-sm text-red-500">{fieldState.error.message}</span>
      )}
    </div>
  );
}
