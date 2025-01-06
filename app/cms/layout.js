"use client";
import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

const CmsLayout = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname

const segments = pathname.split("/").filter(Boolean);

// Recursive function to generate the tree structure
const renderTree = (segments) => {
  if (segments.length === 0) return null;

  return (
    <ul className="list-disc pl-6">
      <li className="text-blue-500 font-medium">{segments[0]}</li>
      {renderTree(segments.slice(1))}
    </ul>
  );
};

  // Function to check if a link is active
  const isActive = (path) => pathname === path;

  // Arrow icons to indicate the current active page
  const ArrowIcon = () => <span className="text-xs text-gray-500 mr-2">→</span>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      
      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="bg-white shadow rounded-lg p-6">{children}</div>
      </div>
    </div>
  );
};

export default CmsLayout;
