'use client'
import { useState } from "react";

const AddSection = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/cms/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect to the dashboard
      window.location.href = "/cms";
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Add Section</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Section Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Section</button>
      </form>
    </div>
  );
};

export default AddSection;
