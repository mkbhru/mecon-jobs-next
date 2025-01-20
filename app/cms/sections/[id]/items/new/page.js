"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import withAuth from "@/utils/withAuth";

const AddItemPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isPdfUploading, setIsPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [applyOnline, setApplyOnline] = useState("");
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
    formData.append("isPdfUploading", isPdfUploading);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("applyOnline", applyOnline);

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
          return prevProgress + 15; // Increment progress by 10%
        });
      }, 100); // Simulate progress every 300ms

      if (response.ok) {
        
        // Redirect after progress reaches 100%
        setTimeout(() => {
          toast.success("Item added Successfully 👍", {
            position: "top-right",
            theme: "light",
          });
          router.push(`/cms/sections/${id}`);
        }, 1000); // Wait for a short delay before redirect
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
    <div className="flex w-full min-h-[80vh] items-center justify-center px-4 bg-base-200 rounded-lg">
      <div className="flex flex-col w-full max-w-lg p-6 rounded-lg shadow-lg bg-base-100">
        <h1 className="text-2xl font-bold text-center mb-6">Create New Item</h1>
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
          {!error && progress >= 0 && progress < 100 && isPdfUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10 text-center">
              <div
                className="bg-blue-600 h-3.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="sr-only font-bold">{progress}%Complete</span>
            </div>
          )}

          {!error && progress === 100 && !isPdfUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 text-green-700 font-bold mb-10 text-center">
              <div
                className="bg-green-600 h-3.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
              SUCCESS!
            </div>
          )}

          <div className="mt-6 mb-6 flex justify-between">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2">
                Start Date:
              </label>
              <input
              required
                type="datetime-local"
                // value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered w-full input-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2">
                End Date:
              </label>
              <input
              required
                type="datetime-local"
                // value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered w-full input-sm"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="flex">
              <label className="block text-sm font-medium">Apply Online (optional):</label>
              <div className="tooltip tooltip-right" data-tip="If the link is filled an apply online button will be shown next to notification, till the end date">
                <p className="pl-1 text-red-500 text-sm font-medium">?</p>
              </div>
            </div>

            {/* Tooltip with question mark */}
            <div className="flex items-center mt-1">
              <input
                type="text"
                onChange={(e) => setApplyOnline(e.target.value)}
                className="input input-bordered w-full input-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full py-2 px-4 text-white bg-blue-600 rounded ${
              isLoading ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "UPLOADING...." : "Create Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddItemPage);
