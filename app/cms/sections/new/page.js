"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import withAuth from "@/utils/withAuth";

const AddSection = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/cms/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("New Advertisement created successfully 👍");
      router.push("/cms/");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] bg-base-200 p-4 flex items-center w-full">
      <div className="card bg-base-100 shadow-lg p-4 max-w-lg mx-auto  w-screen">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Advertisement
        </h2>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base font-medium">
                Advertisement Description
              </span>
            </label>
            <textarea
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="textarea textarea-bordered w-full h-24 font-medium"
              placeholder="Enter Description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Create Advertisement
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddSection);
