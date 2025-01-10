"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const timer = 5000; // Countdown timer in milliseconds
  const [count, setCount] = useState(timer / 1000); // Store seconds instead of milliseconds

  function redirect() {
    router.push("/");
  }

  useEffect(() => {
    // Start a countdown
    setTimeout(() => {
      redirect();
    }, timer);


    // Update count every second

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval); // Stop the interval
          return 0; // Ensure count doesn't go negative
        }
        return prevCount - 1; // Decrease count by 1 second
      });
    }, 1000); // Run every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 animate-bounce">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to the homepage in {count} second{count !== 1 ? "s" : ""}
          ...
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
