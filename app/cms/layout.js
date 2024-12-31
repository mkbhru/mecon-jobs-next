"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function CmsLayout({ children }) {
  const router = usePathname();

  useEffect(() => {
    // Check for the presence of the token in cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];


  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 overflow-auto">
        {/* Local Navbar */}
        <div className="navbar bg-primary text-primary-content">
          <Link href="/cms">
            <span className="btn btn-ghost normal-case text-xl">
              CMS Dashboard
            </span>
          </Link>
          <div className="flex-1"></div>
          {(router !== "/cms/login") && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.cookie =
                  "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "/cms/login";
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {/* Main CMS Content */}
      <main className="">
        {children}
      </main>
    </>
  );
}
