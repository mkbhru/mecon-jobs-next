"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SectionItemsPage = ({ params }) => {
  const { id } = params;
  const [items, setItems] = useState([]);
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch section and its items
    const fetchSectionItems = async () => {
      try {
        const response = await fetch(`/api/cms/sections/${id}`);
        const data = await response.json();
        setSection(data.section);
        setItems(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching section items:", error);
      }
    };

    fetchSectionItems();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Items in Section: {section.name}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
      <button onClick={() => router.push(`/cms/sections/${id}/items/new`)}>
        Add New Item
      </button>
    </div>
  );
};

export default SectionItemsPage;
