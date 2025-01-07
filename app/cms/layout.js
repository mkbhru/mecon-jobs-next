"use client";
import React from "react";

const CmsLayout = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-base-100">
      <div className="flex-1 p-8">
        <div className="bg-slate-300 shadow rounded-lg p-6">{children}</div>
      </div>
    </div>
  );
};

export default CmsLayout;
