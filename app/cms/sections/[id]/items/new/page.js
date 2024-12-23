"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AddItemPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/cms/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section_id: id, content }),
    });

    if (response.ok) {
      router.push(`/cms/sections/${id}`);
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Item Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
