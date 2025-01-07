"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LogoutButton() {
  const router = useRouter();
    useEffect(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    }, []);
  return (
    <>
      {router !== "/cms/login" && (
        <button
          className="btn bg-red-600 text-white font-bold "
          onClick={() => {
            document.cookie =
              "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location.href = "/cms/login";
          }}
        >
          Logout
        </button>
      )}
    </>
  );
}
