"use client";

import Avatar from "@/components/ProjectComponents/Avatar/Avatar";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "./ImageModal";

const MessageBox = ({ data, isLast }) => {
  console.log("🚀 ~ MessageBox ~ data:", data);
  console.log("🚀 ~ MessageBox ~ isLast:", isLast);
  const sessions = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = sessions?.data?.user?.email === data?.sender?.email;
  console.log("🚀 ~ MessageBox ~ isOwn:", isOwn);
  const seenList = (data?.seen || [])
    .filter((user) => user?.email !== data?.sender?.email)
    ?.map((user) => user?.name)
    .join(", ");

  console.log("🚀 ~ MessageBox ~ seenList:", seenList);
  const container = `flex gap-3 p-4 ${isOwn && "justify-end"}`;
  const avatar = `${isOwn && "order-2"}`;

  const body = `flex flex-col gap-2 ${isOwn && "items-end"}`;
  const message = `text-sm w-fit overflow-hidden ${
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100"
  } ${data?.images ? "rounded-md p-0" : "rounded-full py-2 px-3"}`;

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data?.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data?.sender?.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data?.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data?.images}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data?.images ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="image"
              height={288}
              width={288}
              src={data?.images}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data?.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
