"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";

const SectionItemsPage = () => {
  const { id } = useParams(); // Use the `useParams` hook to get the `id`
  const [items, setItems] = useState([]);
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Fetch section details and items
    const fetchSectionData = async () => {
      try {
        // Fetch section details
        const sectionResponse = await fetch(`/api/cms/sections/${id}`);
        if (!sectionResponse.ok) {
          throw new Error("Failed to fetch section details");
        }
        const sectionData = await sectionResponse.json();

        // Fetch items for the section
        const itemsResponse = await fetch(`/api/cms/sections/${id}/items`);
        if (!itemsResponse.ok) {
          throw new Error("Failed to fetch section items");
        }
        const itemsData = await itemsResponse.json();

        setSection(sectionData);
        setItems(itemsData);
      } catch (error) {
        console.error("Error loading section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      {/* Section Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{section.name}</h1>
        <p className="text-gray-600">Manage items for this section.</p>
      </div>

      {/* Section Items */}
      {items.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="card card-bordered bg-base-100 shadow-md"
            >
              <div className="card-body">
                <h3 className="card-title text-lg">{item.content}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No items found for this section.</p>
      )}

      {/* Add New Item */}
      <div className="mt-6">
        <button className="btn btn-primary">Add New Item</button>
      </div>
    </div>
  );
};

export default SectionItemsPage;
