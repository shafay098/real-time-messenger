"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../[conversationsId]/components/Modal";
import Select from "../../../components/ProjectComponents/Select";

const GroupChatModal = ({ isOpen, onClose, users }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((e) => {
        // toast.error("Something went wrong");
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              create a chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-3">
              <label className="text-black font-medium ">Name</label>
              <input
                onChange={(e) => {
                  let val = e.target.value;
                  setValue("name", val);
                }}
                id="name"
                disabled={isLoading}
                required
                className="outline-green-500 border border-black px-3 rounded py-1 mb-4"
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users?.map((user) => ({
                  value: user?.id,
                  label: user?.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            className="p-2 px-2 bg-white font-medium text-sm rounded  text-black"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={onSubmit}
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 text-sm "
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
