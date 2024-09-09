"use client";

import React from "react";
import Link from "next/link";

const MobileItem = ({ label, icon: Icon, href, onClick, active }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gra-500 hover:text-black hover-bg-gray-100 ${
        active && "bg-gray-100 text-black"
      }`}
    >
      {Icon && <Icon className="h-6 w-6 shrink-0" />}
      <span className="sr-only w-3">{label}</span>
    </Link>
  );
};

export default MobileItem;
