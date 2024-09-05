"use client";

import Image from "next/image";
import React from "react";

const AvatarGroup = ({ users }) => {
  console.log("🚀 ~ AvatarGroup ~ users:", users);
  const slicedUsers = users?.slice(0, 3);
  const positionMap = {
    0: `top-0 right-[15px]`,
    1: `bottom-0`,
    2: `bottom-0 right-0`,
  };
  return (
    <div className="relative w-[40px] h-11 2-11">
      {slicedUsers?.map((user, index) => (
        <div
          key={user?.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index]}`}
        >
          <Image
            alt="Avatar"
            fill
            src={user?.image || "/images/placeholder.png"}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
