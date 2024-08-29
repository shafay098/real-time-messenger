"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import useConversation from "../../../hooks/useConversations";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const conversationForm = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      let message = values.message;
      resetForm();
      axios.post("/api/messages", {
        message,
        conversationId,
      });
    },
  });

  const onUpload = (result) => {
    console.log("🚀 ~ onUpload ~ res:", result);
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={onUpload}
        uploadPreset="tafgkmjo"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>

      <form
        onSubmit={conversationForm.handleSubmit}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={conversationForm.getFieldProps("message")}
          errors={conversationForm.errors.message}
          required
          placeHolder="Write a message"
        />

        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
