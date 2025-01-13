"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    <div className="min-h-screen bg-base-200 p-4 flex items-center ">
      <div className="card bg-base-100 shadow-lg p-4 max-w-md mx-auto flex-1 w-2/3">
        <h2 className="text-2xl font-bold mb-4">Create New Advertisement</h2>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Advertisement Description</span>
            </label>
            <textarea
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="textarea textarea-bordered w-full h-24 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full bg-green-400 hover:bg-green-500 hover:text-gray-200">
            Create Advertisement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSection;
