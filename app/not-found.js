"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  const timer = 900000;
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, timer); // Redirect to home after 5 seconds

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 animate-bounce">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to the homepage in {timer/1000} seconds...
        </p>
        <button
          className="btn btn-primary mt-6 animate-pulse"
          onClick={() => router.push("/")}
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
}
