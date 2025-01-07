"use client";

import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { usePathname } from "next/navigation";

function CombinedHeader() {
  const pathname = usePathname();
  const isCmsRoute = pathname.startsWith("/cms");

  return (
    <>
      {!isCmsRoute && <Navbar />}
      <Header />
    </>
  );
}

export default CombinedHeader;
