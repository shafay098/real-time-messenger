"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import useConversation from "../../../hooks/useConversations";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { DialogTitle } from "@headlessui/react";
import { Button } from "../../../../components/CommonComponents/Button/index";

const ConfirmModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState();

  const onDelete = useCallback(() => {
    setIsLoading(false);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  }, [conversationId, router, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600 flex justify-center items-center" />
        </div>
        <div className="text-left sm:ml-4 sm:mt-0 sm-text-left">
          <DialogTitle
            as={"h3"}
            className="text-base font-semibold leading-6 text-gray-600"
          >
            Delete Conversation
          </DialogTitle>
          <div className="mt-2 ">
            <p className="text-sm font text-gray-500">
              Are you sure you want to delete this conversation? this action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
        <button
          onClick={onDelete}
          type="button"
          className="p-2 px-4 bg-red-500 font-medium text-sm rounded text-white"
        >
          Delete
        </button>
        <button
          type="button"
          className="p-2 px-2 bg-white font-medium text-sm rounded  text-black"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
