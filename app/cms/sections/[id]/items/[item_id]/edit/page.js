"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/app/components/Loading";
import withAuth from "@/utils/withAuth";

const EditItemPage = () => {
  const router = useRouter();
  const { id, item_id } = useParams();
  const [item, setItem] = useState(null);
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pdf_url, setPdfUrl] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [applyOnline, setApplyOnline] = useState("");

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
useEffect(() => {
  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/cms/items/${item_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch item details");
      }
      const data = await response.json();
      setItem(data);
      setContent(data.content);
      setPdfUrl(data.pdf_url);
      setIsVisible(data.is_visible);
      setStartDate(formatDateTime(data.start_date)); // Format the date
      setEndDate(formatDateTime(data.end_date)); // Format the date
      setApplyOnline(data.apply_online);
    } catch (err) {
      console.error("Error fetching item:", err);
      setError("Failed to load item details.");
    }
  };

  fetchItem();
}, [item_id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("item_id", item_id);
    formData.append("file", pdfFile);

    if (pdfFile) {
      try {
        const response = await fetch("/api/cms/items/reupload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          toast.success("PDF Updated Successfully 👍");
        } else {
          const data = await response.json();
          setError(data.error || "Error adding item. Please try again.");
          toast.error(`PDF Reupload error, ${data.error}`);
        }
      } catch (error) {
        setError(
          "An unexpected error occurred in reuploading PDF. Please try again."
        );
        toast.error(error);
      }
    } else {
      toast.info("No change in PDF");
    }

    try {
      const response = await fetch(`/api/cms/items/${item_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, isVisible, startDate, endDate, applyOnline }),
      });

      if (response.ok) {
        router.push(`/cms/sections/${id}`);
        toast.success("Item details updated successfully");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update item");
      }
    } catch (err) {
      console.error("Error updating item:", err);
      setError("An error occurred while updating the item.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/cms/items/${item_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdf_url }),
      });

      if (response.ok) {
        router.push(`/cms/sections/${id}`);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("An error occurred while deleting the item.");
    }
  };

  if (!item) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow my-16">
        <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Notice/Corrigendum/etc Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24 font-medium"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end pr-4">
            {item.pdf_url && (
              <button
                type="button"
                onClick={() => setShowFileInput(!showFileInput)}
                className="btn btn-primary mr-2 btn-sm"
              >
                Change PDF
              </button>
            )}
            {item.pdf_url && (
              <div
                onClick={() =>
                  handleViewInNewTab(item.pdf_url.split("/").pop())
                }
                className="btn btn-primary btn-sm"
              >
                View PDF
              </div>
            )}
          </div>
          {showFileInput && (
            <div className="mt-4 flex justify-end pr-4">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>
          )}
          <div className="flex justify-end pr-4 mt-0">
            <h1 className="text-lg font-bold mr-4">Visibility:</h1>
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className={`w-14 h-8 flex items-center rounded-full p-1 ${
                isVisible ? "bg-green-500" : "bg-red-500"
              } transition duration-300`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  isVisible ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2">
                Start Date:
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered w-full input-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2">
                End Date:
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered w-full input-sm"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4 mt-2">
            <div className="flex">
              <label className="block text-sm font-medium">Apply Online:</label>
              <div
                className="tooltip tooltip-right"
                data-tip="If the link is filled an apply online button will be shown next to notification, till the end date"
              >
                <p className="pl-1 text-red-500 text-sm font-medium">?</p>
              </div>
            </div>

            {/* Tooltip with question mark */}
            <div className="flex items-center mt-1">
              <input
                type="text"
                value={applyOnline}
                onChange={(e) => setApplyOnline(e.target.value)}
                className="input input-bordered w-full input-sm"
              />
            </div>
          </div>
          <div className="flex justify-between items-center p-2 mt-16">
            <button
              type="button"
              className="btn btn-primary bg-red-500"
              onClick={handleDelete}
            >
              DELETE
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push(`/cms/sections/${id}`)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary bg-green-500">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(EditItemPage);
