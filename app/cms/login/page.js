"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginImage from "../../../public/login.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    console.log(email, password);
    try {
      const response = await fetch("/api/cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in cookies
        document.cookie = `token=${data.token}; path=/;`;

        // Redirect to the CMS dashboard
        router.push("/cms");
      } else {
        // Set error message from the server response
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle network or other unexpected errors
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-base-300 rounded-xl py-4 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl flex flex-col lg:flex-row">
        {/* Image Section */}
        <figure className="relative w-full h-64 lg:h-auto lg:w-1/2">
          <Image
            src={loginImage}
            alt="Login illustration"
            className="object-cover w-full h-full"
          />
        </figure>

        {/* Form Section */}
        <div className="card-body p-6 lg:p-8 lg:w-1/2">
          <h2 className="card-title text-xl sm:text-2xl font-bold mb-6 text-center lg:text-left">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">Email</span>
              </label>
              <div className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow text-sm sm:text-base"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">
                  Password
                </span>
              </label>
              <div className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow text-sm sm:text-base"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-error text-xs sm:text-sm mt-2">{error}</p>
            )}

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary text-sm sm:text-base"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
