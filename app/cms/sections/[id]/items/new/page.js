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
    <div className="flex w-full min-h-screen items-center justify-center px-4 l-2">
      <div className="flex flex-col w-full max-w-lg p-6 rounded-lg shadow-lg md:max-w-3xl lg:max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Item</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base font-medium">
                Item Content
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary w-full py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
