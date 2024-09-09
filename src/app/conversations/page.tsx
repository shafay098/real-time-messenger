"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useConverstaion from "../hooks/useConversations";
import EmptyState from "@/components/ProjectComponents/EmptyState/EmptyState";

const Home = () => {
  const { isOpen } = useConverstaion();
  return (
    <div className={`lg:pl-80 h-full lg:block ${isOpen ? "block" : "hidden"}`}>
      <EmptyState />
    </div>
  );
};

export default Home;
