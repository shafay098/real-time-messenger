"use client";

import React from "react";

const MessageInput = ({
  id,
  register,
  errors,
  required,
  placeHolder,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete="id"
        required={required}
        {...register}
        placeholder={placeHolder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
