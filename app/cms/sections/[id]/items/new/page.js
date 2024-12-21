"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddItemPage = ({ params }) => {
  const { id } = params;
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
    <div>
      <h1>Add New Item to Section</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPage;
