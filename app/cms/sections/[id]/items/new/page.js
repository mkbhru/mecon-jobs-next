"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddItemPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isPdfUploaded, setIsPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress
  const router = useRouter();
  const timer = 400;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setIsPdf(true);
      setError("");
    } else {
      setFile(null);
      setIsPdf(false);
      setError("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0); // Reset progress
    const formData = new FormData();
    formData.append("section_id", id);
    formData.append("content", content);
    formData.append("file", file || "");
    formData.append("isPdfUploaded", isPdfUploaded);

    try {
      const response = await fetch("/api/cms/items/upload", {
        method: "POST",
        body: formData,
      });

      // Fake progress simulation
      const fakeProgress = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(fakeProgress); // Stop fake progress
            return 100;
          }
          return prevProgress + 10; // Increment progress by 10%
        });
      }, 100); // Simulate progress every 300ms

      if (response.ok) {
        
        // Redirect after progress reaches 100%
        setTimeout(() => {
          toast.success("Item added Successfully 👍", {
            position: "top-right",
            autoClose: 15000,
            theme: "light",
          });
          router.push(`/cms/sections/${id}`);
        }, 1500); // Wait for a short delay before redirect
      } else {
        const data = await response.json();
        setError(data.message || "Error adding item. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center px-4 bg-base-200 rounded-lg">
      <div className="flex flex-col w-full max-w-lg p-6 rounded-lg shadow-lg bg-base-100">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Item</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full"
          encType="multipart/form-data"
        >
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base font-medium">
                Item (Notification/Corrigendum/etc) Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24 font-medium"
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
              <p className="text-red-500">* upload limited 5MB</p>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Progress bar */}
          {progress >= 0 && progress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10 text-center">
              <div
                className="bg-blue-600 h-3.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="sr-only font-bold">{progress}%Complete</span>
            </div>
          )}
          {progress === 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 text-green-700 font-bold mb-10 text-center">
              <div
                className="bg-green-600 h-3.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              upload successful!
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary w-full py-2 px-4 text-white bg-blue-600 rounded ${
              isLoading ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "UPLOADING...." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
