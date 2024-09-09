"use client";

import React from "react";
import Modal from "./Modal";
import Image from "next/image";

const ImageModal = ({ isOpen, onClose, src }) => {
  console.log("🚀 ~ ImageModal ~ src:", src);
  console.log("🚀 ~ ImageModal ~ isOpen:", isOpen);
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="Image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
