"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditItemPage = () => {
  const router = useRouter();
  const { id, item_id } = useParams();
  const [item, setItem] = useState(null);
  const [content, setContent] = useState("");
  const [pdf_url, setPdfUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the current item data
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
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item details.");
      }
    };

    fetchItem();
  }, [item_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/cms/items/${item_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        router.push(`/cms/sections/${id}`);
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
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Advertisement
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            {pdf_url && (
              <a
                className="btn btm-primary"
                href={pdf_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
            )}
          </div>
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={() => router.push(`/cms/sections/${id}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary mr-2">
              Save Changes
            </button>
          </div>
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
            >
              Delete this Advertisement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemPage;
