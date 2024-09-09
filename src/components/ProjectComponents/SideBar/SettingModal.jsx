"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../../../app/conversations/[conversationsId]/components/Modal";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

const SettingModal = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState } = useForm({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something Went Wrong!");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>
            <div className="mt-10 flex flex-col gap-y-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => {
                  let val = e.target.value;
                  setValue("name", val, { shouldValidate: true });
                }}
                label="Name"
                id="name"
                required
                placeholder="Shafay"
                className="py-2 px-2 outline-blue-700 border border-black rounded"
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.png"
                    }
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="tafgkmjo"
                  >
                    <button
                      disabled={isLoading}
                      type="button"
                      className="italic text-black"
                    >
                      Change
                    </button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button disabled={isLoading} onClick={onClose}>
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;
