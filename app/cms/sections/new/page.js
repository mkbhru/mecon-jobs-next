"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

      router.push("/cms/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="card bg-base-100 shadow-lg p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Section</h2>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Section Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              placeholder="Enter section name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Add Section
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSection;
