"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AddItemPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isPdfUploaded, setIsPdf] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setIsPdf(true); // Set isPdfUploaded to true if a valid PDF is uploaded
      setError(""); // Clear any previous error
    } else {
      setFile(null);
      setIsPdf(false); // Set isPdfUploaded to false if no valid PDF is uploaded
      setError("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("section_id", id);
    formData.append("content", content);
    formData.append("file", file || ""); // If no file, append an empty string
    formData.append("isPdfUploaded", isPdfUploaded);

    try {
      const response = await fetch("/api/cms/items", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Item added successfully");
        router.push(`/cms/sections/${id}`);
      } else {
        setError(data.message || "Error adding item");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center px-4 l-2">
      <div className="flex flex-col w-full max-w-lg p-6 rounded-lg shadow-lg md:max-w-3xl lg:max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Item</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full"
          encType="multipart/form-data"
        >
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
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base font-medium">
                Upload PDF (Optional)
              </span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
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
