"use client";

import React from "react";
import Link from "next/link";

const DesktopItem = ({ label, icon: Icon, href, onClick, active }) => {
  console.log("🚀 ~ DesktopItem ~ active:", active);
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    // <></>
    <li onClick={handleClick}>
      <Link
        href={href}
        className={`flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 ${
          active && "bg-gray-500 text-black"
        }`}
      >
        {Icon && <Icon className="h-6 w-6 shrink-0" />}
        <span className="sr-only w-3">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
