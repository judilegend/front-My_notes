import React from "react";
import { Input } from "../ui/input";
import { IconType } from "react-icons";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  icon: IconType;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
  placeholder?: string;
  type?: string;
}
function InputField({
  label,
  icon: Icon,
  register,
  error,
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          {...register}
          type={type}
          className="pl-10"
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error?.message}</p>}
    </div>
  );
}

export default InputField;
