"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "../../../components/ProjectComponents/Avatar/Avatar";
import LoadingModal from "../../../components/ProjectComponents/LoadingModal";

const UserBox = ({ data }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const hanldeClick = useCallback(() => {
    setisLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally((data) => setisLoading(false));
  }, [data, router]);
  return (
    <>
      {isLoading && <LoadingModal />}

      <div
        onClick={hanldeClick}
        className="w-full relative flex items-center space-x-3 bg-white py-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1 ">
              <p className="text-sm font-medium text-gray-900">{data?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
